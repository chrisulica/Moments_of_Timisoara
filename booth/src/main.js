import { uploadPhoto, subscribeToPhotos } from "../../shared/api.js";

document.querySelector("#app").innerHTML = `
  <h1>Test Supabase</h1>
  <input type="file" accept="image/*" />
  <p id="status"></p>
  <div id="gallery"></div>
`;

const status = document.querySelector("#status");
const gallery = document.querySelector("#gallery");

subscribeToPhotos((photo) => {
  const img = document.createElement("img");
  img.src = photo.imageUrl;
  img.width = 150;
  gallery.append(img);
});

document.querySelector("input").addEventListener("change", async (e) => {
  const file = e.target.files[0];
  if (!file) return;
  status.textContent = "Se încarcă...";
  try {
    await uploadPhoto(file, "gara-nord");
    status.textContent = "Gata!";
  } catch (err) {
    status.textContent = "Eroare: " + err.message;
  }
});