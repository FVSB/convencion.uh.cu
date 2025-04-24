const API_BASE = "http://localhost:3000";

async function fetchSponsors() {
  const response = await fetch(`${API_BASE}/sponsors`);
  return await response.json();
}

function chunkArray(array, size) {
  const result = [];
  for (let i = 0; i < array.length; i += size) {
    result.push(array.slice(i, i + size));
  }
  return result;
}

function createCarouselItem(sponsors, isActive = false) {
  const row = sponsors
    .map(
      (sponsor) => `
    <div class="col d-flex justify-content-center align-items-center">
      <img src="${API_BASE}/uploads/${sponsor.image}" 
           alt="${sponsor.name}" 
           title="${sponsor.name}"
           class="img-fluid sponsor-img"
           style="max-width: 120px; max-height: 100px; object-fit: contain;">
    </div>
  `
    )
    .join("");
  return `
    <div class="carousel-item${isActive ? " active" : ""}">
      <div class="row justify-content-center">${row}</div>
    </div>
  `;
}

async function loadSponsorsCarousel() {
  const sponsors = await fetchSponsors();
  const slides = chunkArray(sponsors, 5);
  const carouselInner = document.querySelector("#carousel .carousel-inner");
  carouselInner.innerHTML = slides
    .map((slide, idx) => createCarouselItem(slide, idx === 0))
    .join("");
}

document.addEventListener("DOMContentLoaded", loadSponsorsCarousel);
