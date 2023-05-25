// récupère l'id du photographe contenu dans l'url
const photographerId = window.location.search.substring(4);

//* FONCTION RÉCUPÉRATION DES DONNÉES

// TODO importer la fonction similaire contenu dans index.js et la modifier pour qu'elle accepte un argument (photographers ou media) ?

// déclaration de 2 variables pour stockage des données brutes
let photographers, medias;

async function getDatas() {
  // contact le "serveur" pour récupérer le json
  const r = await fetch("../../data/photographers.json");
  // si réponse du serveur
  if (r.ok === true) {
    // stocke le json complet
    const datas = await r.json();
    // stocke la partie photographers
    photographers = datas.photographers;
    // stocke la partie media
    medias = datas.media;
    // retourne le json complet
    return datas;
  } else {
    // si pas de réponse retourne une erreur
    throw new Error("Impossible de récupérer les données");
  }
}

//* FONCTION TRI DES DONNÉES RÉCUPÉRÉES

// déclaration de 2 variables pour stockage des données du photographe sélectionné
let thisPhotographer,
  theseMedias = [];

// tri les données du photographe sélectionné
function cleaning(id) {
  // tri pour conserver uniquement les données du photographe
  for (const photographer of photographers) {
    if (photographer.id == id) {
      thisPhotographer = photographer;
    }
  }
  // tri pour conserver uniquement les médias du photographe
  for (const media of medias) {
    if (media.photographerId == id) {
      theseMedias.push(media);
    }
  }
}

//* FONCTION AFFICHAGE DES DONNÉES RÉCUPÉRÉES

async function displayData(thisPhotographer, theseMedias) {
  //* CONSTRUCTION DU HEADER

  // cible l'element HTML de classe photographerHeader
  const photographHeader = document.querySelector(".photograph-header");

  // utilisation de la fonction photographerFactory qui retourne un object contenant 3 variables : name, picture, getUserCardDOM
  // TODO a on besoin de ces 3 variables en return de la fonction précédente ?
  const photographerModel = photographerFactory(thisPhotographer);

  // assigne à userCardDOM l'element HTML créé grace à la fonction getUserCardDOM
  const userCardDOM = photographerModel.getUserCardDOM();

  // ajoute l'element HTML à l'element HTML de classe photographer_section
  photographHeader.appendChild(userCardDOM);

  //* CONSTRUCTION DE LA SECTION MEDIA

  // cible l'element HTML de classe medias-container
  const mediasContainer = document.querySelector(".medias-container");

  // itération sur chaque élément du tableau theseMedia
  theseMedias.forEach((media) => {
    // utilisation de la fonction mediaFactory qui retourne un object contenant 3 variables : name, picture, getUserCardDOM
    const photographerModel = mediaFactory(media);
    // assigne à userCardDOM l'element HTML créé grace à la fonction getUserCardDOM
    const userCardDOM = photographerModel.getMediaCardDOM();
    // ajoute l'element HTML à l'element HTML de classe photographer_section
    mediasContainer.appendChild(userCardDOM);
  });
}

//* FONCTION DU COMPTEUR DE LIKE

function likesCounter() {
  // déclaration de la variable à incrémenter
  let likesCount = 0;
  // récupère tous les elements HTML de classe likes
  const likesNodeList = document.querySelectorAll(".likes");
  // itération sur chaque élément
  for (const likeElement of likesNodeList) {
    // incrémentation du compteur de like
    likesCount += Number(likeElement.innerText.replace(/[^0-9]/g, ""));
  }
  // ajout du total de like dans la div rate-container
  const rateContainer = document.querySelector(".rate-container");
  const likes = document.createElement("p");
  likes.innerHTML = `${likesCount} <i class="fa-sharp fa-solid fa-heart"></i>`;
  likes.classList.add("rate");
  rateContainer.prepend(likes);
}

//* FONCTION D'INITIALISATION

async function init() {
  // récupère les données
  await getDatas();
  // tri les données
  cleaning(photographerId);
  // affiche les données
  displayData(thisPhotographer, theseMedias);
  // affiche le nombre de likes
  likesCounter();
  // construit la modal
  buildModal(thisPhotographer.name);
  // comportement du formulaire
  sendForm(thisPhotographer.name);
}

init();
