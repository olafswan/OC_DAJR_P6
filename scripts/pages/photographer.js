// fonctions principales :
//      construction du header photographe
//      construction du portfolio
// fichier unique à la page photographer.html

class App {
  constructor() {
    // 1 cible l'emplacement de l'injection du header sur la page photographer.html
    this.$headerWrapper = document.querySelector(".photograph-header");
    // 2 cible l'emplacement de l'injection de la galerie photo/video sur la page photographer.html
    this.$mediasWrapper = document.querySelector(".medias-container");
    this.$lightboxWrapper = document.querySelector("body");
    // 3 fetch les données json du fichier photographers.json via le fichier Api.js
    this.photographersApi = new PhotographersApi(
      "../../data/photographers.json"
    );
    this.mediaApi = new MediaApi("../../data/photographers.json");
    // 4 récupère l'id dans l'url
    this.photographerId = window.location.search.substring(4);
  }

  async main() {
    // stocke les données de l'API sous forme d'array
    const photographerRawData = await this.photographersApi.getPhotographers();
    const mediaRawData = await this.mediaApi.getMedia();

    // console.log(
    //   " Data 🧑📸 file: photographer.js:16 \n App \n main \n variable: photographerRawData\n",
    //   photographerRawData
    // );
    // console.log(
    //   " Data 🖼👩🖼 file: photographer.js:16 \n App \n main \n variable: mediaRawData\n",
    //   mediaRawData
    // );

    // selectione puis traite les donnés du photographe via la factory
    const PhotographerData = new PhotographersFactory(
      photographerRawData.filter(
        (photographer) => photographer.id == this.photographerId
      )[0],
      this.photographerId
    );

    // selectione puis traite les media du photographe via la factory
    const MediaData = mediaRawData.reduce((reducedData, currentMedia) => {
      if (currentMedia.photographerId == this.photographerId) {
        reducedData.push(new PhotographersFactory(currentMedia, "media"));
      }
      return reducedData;
    }, []);
    // console.log(
    //   "🚀 ~ file: photographer.js:50 ~ App ~ MediaData ~ MediaData:",
    //   MediaData
    // );

    // création du header via le template
    const HeaderTemplate = new PhotographerHeader(PhotographerData);
    // ajout du header à son element parent
    this.$headerWrapper.appendChild(HeaderTemplate.createPhotographerHeader());

    // ajout du nom du photographe dans la modale contact
    HeaderTemplate.customPhotographerContactModal();

    // création de la galerie media par itération sur l'array MediaData
    MediaData.forEach((medium) => {
      // création de la media card via le template
      const MediaTemplate = new MediaCard(medium);
      // ajout de la media card à son element parent
      this.$mediasWrapper.appendChild(MediaTemplate.createMediaCard());
    });

    return MediaData;
  }

  likesCounter() {
    // récupère tous les elements HTML de classe likes
    const likesNodeList = document.querySelectorAll(".likes");
    // transforme la nodeList en array
    const likesArr = Array.from(likesNodeList);

    // totalise le nombre de like dans l'array
    const likesCount = likesArr.reduce(
      (likesCounter, currentValue) =>
        likesCounter + Number(currentValue.innerText),
      0
    );

    // ajout du total de like dans la div rate-container
    const rateContainer = document.querySelector(".rate-container");
    const likes = document.createElement("p");
    likes.innerHTML = `${likesCount} <i class="fa-sharp fa-solid fa-heart"></i>`;
    likes.classList.add("rate");
    rateContainer.prepend(likes);
  }

  // TODO
  //* gestion de la lightbox
  lightbox(MediaData) {
    // récupère la node list des medias
    const mediaNodeList = document.querySelectorAll("figure");

    // récupère un tableau des url des media
    const mediaNodeArray = Array.from(mediaNodeList).map(
      (img) => img.firstChild.src
    );

    // écoute le click sur un des media de la gallerie
    document.querySelectorAll("figure :first-child").forEach((media) => {
      media.addEventListener("click", (event) => {
        console.log("1) data = le tableau MediaData est : ", MediaData);
        console.log("2) type = l'array des url est : ", mediaNodeArray);
        console.log("3) url = l'url du media clické est : ", media.src);
        // TODO envoyer au à la factory le tableau MediaData, l'array des url et l'url du media clické pour formaté l'objet
        const mediaToEnlight = new PhotographersFactory(
          MediaData,
          mediaNodeArray,
          media.src
        );
        console.log(
          "🚀 ~ file: photographer.js:114 ~ App ~ media.addEventListener ~ mediaToEnlight:",
          mediaToEnlight
        );

        const lightboxElement = new LightboxModal(mediaToEnlight);
        console.log(
          "🚀 ~ file: photographer.js:124 ~ App ~ media.addEventListener ~ LightboxElement:",
          lightboxElement
        );
        // TODO terminer l'affichage de la lighbox

        this.$lightboxWrapper.appendChild(lightboxElement.createLightbox());
        let toto = document.querySelector(".lightbox");
        toto.showModal();
        // toto.classList.add("open")
      });
    });
  }
}

//* gestion de la modale contact
let contactButton = document.querySelector(".contact_button");
let contactModal = document.querySelector(".modal");
let closeButton = document.querySelector(".close");
let sendButton = document.querySelector(".send_button");
// ouverture
contactButton.addEventListener("click", () => {
  console.log("ouverture modal");
  contactModal.classList.toggle("open");
  contactModal.showModal();
});
// fermeture
closeButton.addEventListener("click", () => {
  console.log("fermeture modal");
  contactModal.close();
  contactModal.classList.toggle("open");
});
// bouton Envoyer
sendButton.addEventListener("click", (e) => {
  e.preventDefault();
  console.log("fermeture modal (envoi des données)");
  // TODO gérer l'envoi des données de la modale
  contactModal.close();
  contactModal.classList.toggle("open");
});

// const app = new App();
// app.main();
// app.likesCounter();

async function init() {
  const app = new App();
  const toto = await app.main();
  app.likesCounter();
  app.lightbox(toto);
  // console.log("toto :", toto);
}

init();

// // récupère l'id du photographe contenu dans l'url
// const photographerId = window.location.search.substring(4);

// //* FONCTION RÉCUPÉRATION DES DONNÉES

// // TODO importer la fonction similaire contenu dans index.js et la modifier pour qu'elle accepte un argument (photographers ou media) ?

// // déclaration de 2 variables pour stockage des données brutes
// let photographers, medias;

// async function getDatas() {
//   // contact le "serveur" pour récupérer le json
//   const r = await fetch("../../data/photographers.json");
//   // si réponse du serveur
//   if (r.ok === true) {
//     // stocke le json complet
//     const datas = await r.json();
//     // stocke la partie photographers
//     photographers = datas.photographers;
//     // stocke la partie media
//     medias = datas.media;
//     // retourne le json complet
//     return datas;
//   } else {
//     // si pas de réponse retourne une erreur
//     throw new Error("Impossible de récupérer les données");
//   }
// }

// //* FONCTION TRI DES DONNÉES RÉCUPÉRÉES

// // déclaration de 2 variables pour stockage des données du photographe sélectionné
// let thisPhotographer,
//   theseMedias = [];

// // tri les données du photographe sélectionné
// function cleaning(id) {
//   // tri pour conserver uniquement les données du photographe
//   for (const photographer of photographers) {
//     if (photographer.id == id) {
//       thisPhotographer = photographer;
//     }
//   }
//   // tri pour conserver uniquement les médias du photographe
//   for (const media of medias) {
//     if (media.photographerId == id) {
//       theseMedias.push(media);
//     }
//   }
// }

// //* FONCTION AFFICHAGE DES DONNÉES RÉCUPÉRÉES

// async function displayData(thisPhotographer, theseMedias) {
//   //* CONSTRUCTION DU HEADER

//   // cible l'element HTML de classe photographerHeader
//   const photographHeader = document.querySelector(".photograph-header");

//   // utilisation de la fonction photographerFactory qui retourne un object contenant 3 variables : name, picture, getUserCardDOM
//   // TODO a on besoin de ces 3 variables en return de la fonction précédente ?
//   const photographerModel = photographerFactory(thisPhotographer);

//   // assigne à userCardDOM l'element HTML créé grace à la fonction getUserCardDOM
//   const userCardDOM = photographerModel.getUserCardDOM();

//   // ajoute l'element HTML à l'element HTML de classe photographer_section
//   photographHeader.appendChild(userCardDOM);

//   //* CONSTRUCTION DE LA SECTION MEDIA

//   // cible l'element HTML de classe medias-container
//   const mediasContainer = document.querySelector(".medias-container");

//   // itération sur chaque élément du tableau theseMedia
//   theseMedias.forEach((media) => {
//     // utilisation de la fonction mediaFactory qui retourne un object contenant 3 variables : name, picture, getUserCardDOM
//     const photographerModel = mediaFactory(media);
//     // assigne à userCardDOM l'element HTML créé grace à la fonction getUserCardDOM
//     const userCardDOM = photographerModel.getMediaCardDOM();
//     // ajoute l'element HTML à l'element HTML de classe photographer_section
//     mediasContainer.appendChild(userCardDOM);
//   });
// }

//* FONCTION DU COMPTEUR DE LIKE

// function likesCounter() {
//   // déclaration de la variable à incrémenter
//   let likesCount = 0;
//   // récupère tous les elements HTML de classe likes
//   const likesNodeList = document.querySelectorAll(".likes");
//   // itération sur chaque élément
//   for (const likeElement of likesNodeList) {
//     // incrémentation du compteur de like
//     likesCount += Number(likeElement.innerText.replace(/[^0-9]/g, ""));
//   }
//   // ajout du total de like dans la div rate-container
//   const rateContainer = document.querySelector(".rate-container");
//   const likes = document.createElement("p");
//   likes.innerHTML = `${likesCount} <i class="fa-sharp fa-solid fa-heart"></i>`;
//   likes.classList.add("rate");
//   rateContainer.prepend(likes);
// }

// //* FONCTION D'INITIALISATION

// async function init() {
//   // récupère les données
//   await getDatas();
//   // tri les données
//   cleaning(photographerId);
//   // affiche les données
//   displayData(thisPhotographer, theseMedias);
//   // affiche le nombre de likes
//   likesCounter();
//   // construit la modal
//   buildModal(thisPhotographer.name);
//   // comportement du formulaire
//   sendForm(thisPhotographer.name);
// }

// init();
