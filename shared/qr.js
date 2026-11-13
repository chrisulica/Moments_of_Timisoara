import QRCode from "qrcode";

export function getBoothUrl(locationId) {
  const base = import.meta.env.VITE_BOOTH_URL;
  if (!base) console.warn("Lipsește VITE_BOOTH_URL din .env.local");
  const url = new URL(base || window.location.origin);
  if (locationId) url.searchParams.set("loc", locationId);
  return url.toString();
}

export async function renderQr(canvas, locationId, size = 220) {
  await QRCode.toCanvas(canvas, getBoothUrl(locationId), {
    width: size,
    margin: 2,
    errorCorrectionLevel: "M",
    color: { dark: "#000000", light: "#ffffff" },
  });
}