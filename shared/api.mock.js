export async function uploadPhoto(blob, locationId) {
  await new Promise((r) => setTimeout(r, 500));
  return URL.createObjectURL(blob);
}

export function subscribeToPhotos(callback) {
  const timer = setInterval(() => {
    callback({
      id: crypto.randomUUID(),
      locationId: "gara-nord",
      imageUrl: "/placeholder.webp",
      createdAt: new Date().toISOString(),
      approved: true,
    });
  }, 5000);
  return () => clearInterval(timer);
}