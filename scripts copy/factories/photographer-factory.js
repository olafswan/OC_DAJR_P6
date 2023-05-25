function photographerFactory(data) {
  // création des variables récupérées dans l'object
  const { city, country, name, portrait, price, tagline, id } = data;

  // création du chemin de l'image
  const picture = `./assets/photographers/${portrait}`;

  // création de la card du photographe avec les données précédemment récupérées
  function getUserCardDOM() {
    // création d'un element HTML article
    const article = document.createElement("article");

    if (window.location.pathname == "/index.html") {
      //* AFFICHAGE PAGE INDEX.HTML

      // création d'un element HTML a
      const divLink = document.createElement("a");
      // attribution de la classe CSS à l'element
      divLink.href = `photographer.html?id=${id}`;
      divLink.classList.add("photographer-link");

      // création d'un element HTML div
      const divImg = document.createElement("div");
      // attribution de la classe CSS à l'element
      divImg.classList.add("img-container");

      // création d'un element HTML img
      const img = document.createElement("img");
      // attribution du chemin vers l'image
      img.setAttribute("src", picture);

      // création d'un element HTML H2
      const h2 = document.createElement("h2");
      // attribution de la valeur name au H2
      h2.textContent = name;

      // création d'un element HTML p
      const location = document.createElement("p");
      // attribution de la valeur city & country à l'element p
      location.textContent = city + ", " + country;
      // attribution de la classe CSS à l'element
      location.classList.add("location");

      // création d'un 2nd element HTML p
      const quote = document.createElement("p");
      // attribution de la valeur tagline à l'element p
      quote.textContent = tagline;
      // attribution de la classe CSS à l'element
      quote.classList.add("quote");

      // création d'un 3eme element HTML p
      const rate = document.createElement("p");
      // attribution de la valeur price à l'element p
      rate.textContent = price + "€/jour";
      // attribution de la classe CSS à l'element
      rate.classList.add("rate");

      // ajout de l'element divLink en tant qu'enfant de l'element article
      article.appendChild(divLink);
      // ajout de l'element divImg en tant qu'enfant de l'element divLink
      divLink.appendChild(divImg);
      // ajout de l'element img en tant qu'enfant de l'element divImg
      divImg.appendChild(img);
      // ajout de l'element h2 en tant qu'enfant de l'element divLink
      divLink.appendChild(h2);
      // ajout de l'element p en tant qu'enfant de l'element article
      article.appendChild(location);
      // ajout de l'element p en tant qu'enfant de l'element article
      article.appendChild(quote);
      // ajout de l'element p en tant qu'enfant de l'element article
      article.appendChild(rate);
    } else {
      //* AFFICHAGE PAGE PHOTOGRAPHER.HTML

      // création d'un element HTML article
      const infosContainer = document.createElement("div");
      infosContainer.classList.add("infos-container");

      // création d'un element HTML H1
      const h1 = document.createElement("h1");
      // attribution de la valeur name au H1
      h1.textContent = name;

      // création d'un element HTML p
      const location = document.createElement("p");
      // attribution de la valeur city & country à l'element p
      location.textContent = city + ", " + country;
      // attribution de la classe CSS à l'element
      location.classList.add("location");

      // création d'un 2nd element HTML p
      const quote = document.createElement("p");
      // attribution de la valeur tagline à l'element p
      quote.textContent = tagline;
      // attribution de la classe CSS à l'element
      quote.classList.add("quote");

      // création d'un element HTML div
      const divImg = document.createElement("div");
      // attribution de la classe CSS à l'element
      divImg.classList.add("img-container");

      // création d'un element HTML img
      const img = document.createElement("img");
      // attribution du chemin vers l'image
      img.setAttribute("src", picture);

      // création d'un element HTML div
      const divRate = document.createElement("div");
      // attribution de la classe CSS à l'element
      divRate.classList.add("rate-container");

      // création d'un element HTML p
      const rate = document.createElement("p");
      // attribution de la valeur city & country à l'element p
      rate.textContent = price + "€ / jour";
      // attribution de la classe CSS à l'element
      rate.classList.add("rate");

      // ajout de l'element infosContainer en tant qu'enfant de l'element article
      article.appendChild(infosContainer);
      // ajout de l'element H1 en tant qu'enfant de l'element infosContainer
      infosContainer.appendChild(h1);
      // ajout de l'element location en tant qu'enfant de l'element infosContainer
      infosContainer.appendChild(location);
      // ajout de l'element quote en tant qu'enfant de l'element infosContainer
      infosContainer.appendChild(quote);
      // ajout de l'element p en tant qu'enfant de l'element article
      article.appendChild(divImg);
      // ajout de l'element img en tant qu'enfant de l'element divImg
      divImg.appendChild(img);

      article.appendChild(divRate);
      divRate.appendChild(rate);
    }

    // retourne l'element HTML article complet (avec ses enfants)
    return article;
  }
  // TODO pourquoi retourner name et picture ?
  return { /*name, picture,*/ getUserCardDOM };
}
