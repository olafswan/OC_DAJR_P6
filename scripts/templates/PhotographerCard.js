// création du template choisie par App()
// fichier unique à un template particulier

class PhotographerCard {
  constructor(photographer) {
    this._photographer = photographer;
  }

  createPhotographerCard() {
    // création d'un element HTML article
    const $wrapper = document.createElement("article");

    // création d'un element HTML a
    const divLink = document.createElement("a");
    // attribution de la classe CSS à l'element
    divLink.href = `photographer.html?id=${this._photographer.id}`;
    divLink.classList.add("photographer-link");

    // création d'un element HTML div
    const divImg = document.createElement("div");
    // attribution de la classe CSS à l'element
    divImg.classList.add("img-container");

    // création d'un element HTML img
    const img = document.createElement("img");
    // attribution du chemin vers l'image
    img.setAttribute("src", this._photographer.portrait);
    img.setAttribute("alt", this._photographer.name);

    // création d'un element HTML H2
    const h2 = document.createElement("h2");
    // attribution de la valeur name au H2
    h2.textContent = this._photographer.name;

    // création d'un element HTML p
    const location = document.createElement("p");
    // attribution de la valeur city & country à l'element p
    location.textContent =
      this._photographer.city + ", " + this._photographer.country;
    // attribution de la classe CSS à l'element
    location.classList.add("location");

    // création d'un 2nd element HTML p
    const quote = document.createElement("p");
    // attribution de la valeur tagline à l'element p
    quote.textContent = this._photographer.tagline;
    // attribution de la classe CSS à l'element
    quote.classList.add("quote");

    // création d'un 3eme element HTML p
    const rate = document.createElement("p");
    // attribution de la valeur price à l'element p
    rate.textContent = this._photographer.price + "€/jour";
    // attribution de la classe CSS à l'element
    rate.classList.add("rate");

    // ajout de l'element divLink en tant qu'enfant de l'element $wrapper
    $wrapper.appendChild(divLink);
    // ajout de l'element divImg en tant qu'enfant de l'element divLink
    divLink.appendChild(divImg);
    // ajout de l'element img en tant qu'enfant de l'element divImg
    divImg.appendChild(img);
    // ajout de l'element h2 en tant qu'enfant de l'element divLink
    divLink.appendChild(h2);
    // ajout de l'element location en tant qu'enfant de l'element $wrapper
    $wrapper.appendChild(location);
    // ajout de l'element quote en tant qu'enfant de l'element $wrapper
    $wrapper.appendChild(quote);
    // ajout de l'element rate en tant qu'enfant de l'element $wrapper
    $wrapper.appendChild(rate);

    return $wrapper;
  }
}
