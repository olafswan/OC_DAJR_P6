// création du template choisie par App()
// fichier unique à un template particulier

class LightboxModal {
  constructor(medium) {
    this._medium = medium;
    this._currentUrl = medium.currentUrl;
    this._previousUrl = medium.previousUrl;
    this._nextUrl = medium.nextUrl;
    this._title = medium.title;
  }

  createLightbox() {
    // création de l'element dialog
    const $wrapper = document.createElement("dialog");
    $wrapper.classList.add("modal");
    $wrapper.classList.add("lightbox");

    // création de l'element div .previous
    const previous = document.createElement("div");
    previous.classList.add("lightbox_previous");
    // previous.setAttribute("href", this._previousUrl);

    // création de l'element img previous
    const previousIcon = document.createElement("img");
    previousIcon.src = "./assets/icons/left-arrow-prim-color.svg";
    previousIcon.classList.add("arrow");
    // previousIcon.setAttribute("rotate", " -webkit-transform: rotateX(180deg)");

    // création de l'element figure
    const figure = document.createElement("figure");

    // création de l'element img ou video

    let media = "";
    if (this._currentUrl.slice(-3) === "jpg") {
      // création de l'element img dans le cas d'une photo
      media = document.createElement("img");
      media.setAttribute("src", this._currentUrl);
      media.setAttribute("alt", this._title);
    } else if (this._currentUrl.slice(-3) === "mp4") {
      // création de l'element video dans le cas d'une video
      media = document.createElement("video");
      media.setAttribute("src", this._currentUrl);
      media.setAttribute("alt", this._title);
      media.setAttribute("controls", true);
      media.setAttribute("muted", false);
    }

    // création de l'element div .figcatpion
    const figcaption = document.createElement("figcaption");
    figcaption.textContent = this._title;

    // création de l'element div .next
    const next = document.createElement("div");
    next.classList.add("lightbox_next");
    // next.setAttribute("href", this._nextUrl);

    // création de l'element img close
    const close = document.createElement("img");
    close.src = "./assets/icons/close-prim-color.svg";
    close.classList.add("close");

    // création de l'element img next
    const nextIcon = document.createElement("img");
    nextIcon.src = "./assets/icons/left-arrow-prim-color.svg";
    nextIcon.classList.add("arrow");

    // ajout des element media, likes et figcatpion à leur parent $wrapper
    $wrapper.append(previous, figure, next);
    previous.append(previousIcon);
    figure.append(media, figcaption);
    next.append(close, nextIcon);

    return $wrapper;
  }

  updateLightbox() {
    const lightbox = document.querySelector(".lightbox");
    const figure = lightbox.querySelector("figure");
    const figcaption = lightbox.querySelector("figcaption");
    const oldMedia = lightbox.querySelector("figure :first-child");

    // 1. suppression de l'element img ou video, first-child de figure
    oldMedia.remove();

    // 2. créer l'element img ou video
    let media = "";
    if (this._currentUrl.slice(-3) === "jpg") {
      // création de l'element img dans le cas d'une photo
      media = document.createElement("img");
      media.setAttribute("src", this._currentUrl);
    } else if (this._currentUrl.slice(-3) === "mp4") {
      // création de l'element video dans le cas d'une video
      media = document.createElement("video");
      media.setAttribute("src", this._currentUrl);
      media.setAttribute("controls", true);
      media.setAttribute("muted", false);
    }

    // 3. ajouter l'element img ou video dans figure
    figure.prepend(media);

    // 4. mettre à jour le titre
    figcaption.textContent = this._title;
  }
}
