// création du template choisie par App()
// fichier unique à un template particulier

class MediaCard {
  constructor(medium) {
    this._medium = medium;
  }

  createMediaCard() {
    const $wrapper = document.createElement("figure");
    $wrapper.classList.add("medium-container");

    // TODO gérer les différence image / video avec :
    let media = "";
    if (this._medium.hasOwnProperty("_image")) {
      // création de l'element img dans le cas d'une photo
      media = document.createElement("img");
    } else if (this._medium.hasOwnProperty("_video")) {
      // création de l'element video dans le cas d'une video
      media = document.createElement("video");
      // media.setAttribute("controls", true);
      // media.setAttribute("muted", false);
    }
    media.classList.add("thumbnail");
    media.setAttribute("src", this._medium.src);
    media.setAttribute("alt", this._medium.title);
    media.setAttribute("tabindex", "0");

    // // création de la div popur l'affichage des likes
    // const likes = document.createElement("div");
    // likes.classList.add("likes");
    // likes.innerHTML = `${this._medium.likes} <i class="fa-sharp fa-solid fa-heart"></i>`;

    // création de la div popur l'affichage des likes
    const likes = document.createElement("div");
    likes.classList.add("likes");
    const span = document.createElement("span");
    span.innerHTML = `${this._medium.likes} `;
    const i = document.createElement("i");
    i.classList.add("fa-sharp", "fa-solid", "fa-heart");
    i.setAttribute("aria-label", "Likes");

    // création de l'element figcaption pour l'affichage du titre
    const figcaption = document.createElement("figcaption");
    figcaption.textContent = this._medium.title;
    figcaption.setAttribute(
      "aria-label",
      `Titre du média ${this._medium.title}`
    );

    likes.append(span, i);

    // ajout des element media, likes et figcatpion à leur parent $wrapper
    $wrapper.append(media, likes, figcaption);

    return $wrapper;
  }
}
