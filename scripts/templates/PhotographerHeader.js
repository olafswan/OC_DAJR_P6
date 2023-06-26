// création du template choisie par App()
// fichier unique à un template particulier

class PhotographerHeader {
  constructor(photographer) {
    this._photographer = photographer;
  }

  createPhotographerHeader() {
    // création d'un element HTML article
    const $wrapper = document.createElement("article");

    // création d'un element HTML div
    const infosContainer = document.createElement("div");
    infosContainer.classList.add("infos-container");

    // création d'un element HTML H1
    const h1 = document.createElement("h1");
    // attribution de la valeur name au H1
    h1.textContent = this._photographer.name;

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

    // création d'un element HTML div
    const divImg = document.createElement("div");
    // attribution de la classe CSS à l'element
    divImg.classList.add("img-container");

    // création d'un element HTML img
    const img = document.createElement("img");
    // attribution du chemin vers l'image
    img.setAttribute("src", this._photographer.portrait);
    img.setAttribute("alt", this._photographer.name);

    // création d'un element HTML div
    const divRate = document.createElement("div");
    // attribution de la classe CSS à l'element
    divRate.classList.add("rate-container");

    // création d'un element HTML p
    const likes = document.createElement("p");
    // attribution de la valeur par defaut
    likes.innerHTML = `<i class="fa-sharp fa-solid fa-heart"></i>`;
    // attribution de la classe CSS à l'element
    likes.classList.add("rate", "likes-sum");

    // création d'un element HTML p
    const rate = document.createElement("p");
    // attribution de la valeur city & country à l'element p
    rate.textContent = this._photographer.price + "€ / jour";
    // attribution de la classe CSS à l'element
    rate.classList.add("rate");

    // ajout de l'element infosContainer en tant qu'enfant de l'element $wrapper
    $wrapper.appendChild(infosContainer);
    // ajout de l'element H1 en tant qu'enfant de l'element infosContainer
    infosContainer.appendChild(h1);
    // ajout de l'element location en tant qu'enfant de l'element infosContainer
    infosContainer.appendChild(location);
    // ajout de l'element quote en tant qu'enfant de l'element infosContainer
    infosContainer.appendChild(quote);
    // ajout de l'element p en tant qu'enfant de l'element $wrapper
    $wrapper.appendChild(divImg);
    // ajout de l'element img en tant qu'enfant de l'element divImg
    divImg.appendChild(img);

    $wrapper.appendChild(divRate);
    divRate.appendChild(likes);
    divRate.appendChild(rate);

    // retourne l'element HTML $wrapper complet (avec ses enfants)
    return $wrapper;
  }

  customPhotographerContactModal() {
    const contactName = document.querySelector("#contact_name");
    contactName.textContent = this._photographer.name;
  }
}
