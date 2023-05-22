function mediaFactory(data) {
  // création des variables récupérées dans l'object
  const { date, id, image, video, likes, photographerId, price, title } = data;

  // création du chemin de l'image
  const picture = `./assets/medias/${image}`;

  // création du chemin de la video
  const clip = `./assets/medias/${video}`;

  // création de la card du media avec les données précédemment récupérées
  function getMediaCardDOM() {
    // création de l'element figure
    const mediaContainer = document.createElement("figure");
    mediaContainer.classList.add("media-container");

    let media = "";
    if (image != null) {
      // création de l'element img dans le cas d'une photo
      media = document.createElement("img");
      media.setAttribute("src", picture);
    } else if (video != null) {
      // création de l'element video dans le cas d'une video
      media = document.createElement("video");
      media.setAttribute("src", clip);
      media.setAttribute("controls", true);
      media.setAttribute("muted", false);
    }

    // création de la div popur l'affichage des likes
    const likes = document.createElement("div");
    likes.classList.add("likes");
    const likeNumber = Math.round(Math.random() * (499 - 49) + 49);
    likes.innerHTML = `${likeNumber} <i class="fa-sharp fa-solid fa-heart"></i>`;

    // création de l'element figcaption pour l'affichage du titre
    const figcaption = document.createElement("figcaption");
    figcaption.textContent = title;

    // ajout des element media, likes et figcatpion à leur parent mediaContainer
    mediaContainer.append(media, likes, figcaption);

    return mediaContainer;
  }
  // TODO supprimer name et picture ?
  return { /*name, picture,*/ getMediaCardDOM };
}
