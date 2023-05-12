function mediaFactory(data) {
  console.log("❓ argument passé à la fonction mediaFactory", data);

  // création des variables récupérées dans l'object
  const { date, id, image, likes, photographerId, price, title } = data;

  // création du chemin de l'image
  const picture = `assets/medias/${image}`;

  // TODO continuer la fonction en dessous

  // création de la card du media avec les données précédemment récupérées
  function getMediaCardDOM() {
    // const mediasSection = document.createElement("div");
    // mediasSection.classList.add("medias_section");

    // const sortingContainer = document.createElement("div");
    // sortingContainer.textContent = "Trier par";
    // sortingContainer.classList.add("sorting");

    // const mediasContainer = document.createElement("div");
    // mediasContainer.classList.add("medias-container");

    // const mediaContainer = document.createElement("div");

    const mediaContainer = document.createElement("figure");
    mediaContainer.classList.add("media-container");

    const img = document.createElement("img");
    img.setAttribute("src", picture);

    const likes = document.createElement("div");
    likes.classList.add("likes");
    likes.textContent = Math.round(Math.random() * (499 - 49) + 499) + " ❤️";

    const figcaption = document.createElement("figcaption");
    figcaption.textContent = title;

    // mediasSection.appendChild(sortingContainer);
    // mediasSection.appendChild(mediasContainer);
    // mediasContainer.appendChild(mediaContainer);
    // mediaContainer.appendChild(figure);
    mediaContainer.appendChild(img);
    mediaContainer.appendChild(likes);
    mediaContainer.appendChild(figcaption);

    return mediaContainer;
  }
  return { /*name, picture,*/ getMediaCardDOM };
}
