import { renderQr, getBoothUrl } from "../../shared/qr.js";

document.querySelector("#app").innerHTML = `
  <h1>Test QR</h1>
  <canvas id="qr"></canvas>
  <p id="url"></p>
`;

async function init() {
  const locationId = "gara-nord";
  await renderQr(document.querySelector("#qr"), locationId);
  document.querySelector("#url").textContent = getBoothUrl(locationId);
}
init();