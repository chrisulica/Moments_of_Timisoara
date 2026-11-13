import { createClient } from "@supabase/supabase-js";

let _client;
const supabase = () =>
  (_client ??= createClient(
    import.meta.env.VITE_SUPABASE_URL,
    import.meta.env.VITE_SUPABASE_ANON_KEY
  ));

const toPhoto = (row) => ({
  id: row.id,
  locationId: row.location_id,
  imageUrl: row.image_url,
  createdAt: row.created_at,
  approved: row.approved,
});

export async function uploadPhoto(blob, locationId) {
  const id = crypto.randomUUID();
  const ext = blob.type === "image/webp" ? "webp" : blob.type === "image/png" ? "png" : "jpg";
  const path = `${locationId}/${id}.${ext}`;

  const { error: uploadError } = await supabase()
    .storage.from("photos")
    .upload(path, blob, { contentType: blob.type });
  if (uploadError) throw uploadError;

  const { data } = supabase().storage.from("photos").getPublicUrl(path);
  const imageUrl = data.publicUrl;

  const { error: insertError } = await supabase()
    .from("photos")
    .insert({ id, location_id: locationId, image_url: imageUrl });
  if (insertError) throw insertError;

  return imageUrl;
}

export function subscribeToPhotos(callback) {
  const onChange = (payload) => {
    if (payload.new.approved) callback(toPhoto(payload.new));
  };

  const channel = supabase()
    .channel("photos-live")
    .on("postgres_changes", { event: "INSERT", schema: "public", table: "photos" }, onChange)
    .on("postgres_changes", { event: "UPDATE", schema: "public", table: "photos" }, onChange)
    .subscribe();

  return () => supabase().removeChannel(channel);
}