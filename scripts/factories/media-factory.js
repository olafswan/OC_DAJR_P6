function mediaFactory(data) {
  console.log("==========================");
  console.log("❓ argument passé à la fonction mediaFactory", data);

  // création des variables récupérées dans l'object
  const { date, id, image, video, likes, photographerId, price, title } = data;

  // création du chemin de l'image
  const picture = `assets/medias/${image}`;

  // création du chemin de l'image
  const clip = `assets/medias/${video}`;

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

    let media = "";
    if (image != null) {
      console.log("⚠️ c'est une photo ! 📸");
      media = document.createElement("img");
      media.setAttribute("src", picture);
      console.log("📸 media:", media);
    } else if (video != null) {
      console.log("⚠️ c'est une video ! 🎥");
      media = document.createElement("video");
      console.log("🎥 media:", media);
      media.setAttribute("src", clip);
      media.setAttribute("controls", true);
      media.setAttribute("muted", false);
      // media.height = 240; // in px
      // media.width = 320;
    }

    // const media = document.createElement("img");
    // media.setAttribute("src", picture);

    const likes = document.createElement("div");
    likes.classList.add("likes");
    likes.textContent = Math.round(Math.random() * (499 - 49) + 499) + " ❤️";

    const figcaption = document.createElement("figcaption");
    figcaption.textContent = title;

    // mediasSection.appendChild(sortingContainer);
    // mediasSection.appendChild(mediasContainer);
    // mediasContainer.appendChild(mediaContainer);
    // mediaContainer.appendChild(figure);

    mediaContainer.appendChild(media);
    console.log(
      "🚀 ~ file: media-factory.js:60 ~ getMediaCardDOM ~ media:",
      media
    );
    mediaContainer.appendChild(likes);
    mediaContainer.appendChild(figcaption);

    return mediaContainer;
  }
  return { /*name, picture,*/ getMediaCardDOM };
}
