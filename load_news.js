document.addEventListener("DOMContentLoaded", function () {
  const API_URL = "https://uh.cu/wp-json/wp/v2/posts";
  const newsSection = document.getElementById("news-banner-6n"); // ID de la sección de noticias
  const newsContainer = document.getElementById("news-container");

  async function getNews() {
    try {
      const response = await fetch(API_URL);
      const data = await response.json();

      // Filtrar las noticias que tengan el tag "SaberUH" y limitar a 3
      const saberUHNews = data
        .filter((newsItem) => {
          if (newsItem.tags && Array.isArray(newsItem.tags)) {
           // TODO: Eduardo return newsItem.tags.includes("SaberUH"); Descomenta esto para que filtre solo lo que tiene ese tag
           return true // TODO: Eduardo Elimina esto solo esta hardcodeado para que veas que devuelve 3 noticias
          }
           return true// TODO: Eduardo borra esto y dejalo en return false 
          // return false;  // TODO: Eduardo Descomenta esto
        })
        .slice(0, 3); // Limitar a 3 noticias

      return saberUHNews;
    } catch (error) {
      console.error("Error al obtener los datos de la API:", error);
      return [];
    }
  }

  async function getImage(featuredMediaId) {
    try {
      const mediaResponse = await fetch(featuredMediaId);
      const mediaData = await mediaResponse.json();
      return mediaData.guid.rendered;
    } catch (error) {
      console.error("Error al obtener la imagen:", error);
      return "";
    }
  }

  function createNewsCard(newsItem, imageUrl) {
    const card = document.createElement("div");
    card.className = "col-sm-6 col-md-4";
    card.style.padding = "10px";

    card.innerHTML = `
            <div class="news-card" style="background: rgba(255,255,255,0.95); border-radius: 8px; padding: 1rem; height: 100%; box-shadow: 0 2px 8px rgba(0,0,0,0.1);">
                <div class="news-image-container" style="height: 120px; overflow: hidden; border-radius: 6px; margin-bottom: 0.8rem; position: relative;">
                    <img src="${imageUrl}" alt="${newsItem.title.rendered}" style="width: 100%; height: 100%; object-fit: cover;">
                </div>
                <h3 class="news-title" style="color: #063d73 !important; font-weight: 600; margin-bottom: 0.5rem;">
                    ${newsItem.title.rendered}
                </h3>
                <p style="color: #555; font-size: 0.9rem; margin-bottom: 1rem;">
                    ${newsItem.excerpt.rendered}
                </p>
                <a href="${newsItem.link}" style="color: #063d73; font-weight: 500; text-decoration: none;">
                    Leer más <span class="mbri-arrow-next mbr-iconfont"></span>
                </a>
            </div>
        `;

    return card;
  }

  async function displayNews() {
    const newsData = await getNews();

    // Si no hay noticias, ocultar la sección
    if (newsData.length === 0) {
      newsSection.style.display = "none";
      return; // Salir de la función
    }

    for (const newsItem of newsData) {
      let imageUrl = "";
      if (newsItem._links && newsItem._links["wp:featuredmedia"]) {
        const featuredMediaId = newsItem._links["wp:featuredmedia"][0].href;
        imageUrl = await getImage(featuredMediaId);
      }

      const newsCard = createNewsCard(newsItem, imageUrl);
      newsContainer.appendChild(newsCard);
    }
  }

  displayNews();
});
