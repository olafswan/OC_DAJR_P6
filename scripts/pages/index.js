class App {
  constructor() {
    // 1 cible l'emplacement de l'injection sur la page index.html
    this.$wrapper = document.querySelector(".photographer_section");
    // 2 fetch les données json du fichier photographers.json via le fichier Api.js
    this.photographersApi = new PhotographersApi(
      "../../data/photographers.json"
    );
    // attention seule l'array photographers est récupérée ici
  }

  async main() {
    // récupére les données sous forme d'array
    const photographerRawData = await this.photographersApi.getDatas();

    console.log(
      "🚀 1) file: index.js:16 \n App \n main \n variable: photographerRawData\n",
      photographerRawData
    );

    // TODO c'est ici que sera passer en argument le type "photographers" ou "media"
    //
    // crée un nouveau array via le fichier PhotographersFactory.js ancien MoviesFactory.js
    // transforme le tableau de données en tableau de classe PhotographersFactory
    const Data = photographerRawData.map(
      (data) => new PhotographersFactory(data, "index")
    );

    console.log(
      "🚀 4) file: index.js:28 \n App \n main \n variable: Data\n",
      Data
    );

    // TODO comprendre le mapage, ajout des propriétés du model ?

    // itération sur l'array Data
    Data.forEach((data) => {
      // data vaut ici l'une des photographes application de la classe PhotographerCard
      const Template = new PhotographerCard(data);
      // ajout au parent $wrapper la PhotographerCard
      this.$wrapper.appendChild(Template.createPhotographerCard());
    });
  }
}

const app = new App();
app.main();

// //  ---------------------------------
// //* fonction récupération des données et création d'un object  listant les object de chaque photographer
// //  ---------------------------------

// let photographers;

// async function getPhotographers() {
//   // contact le "serveur" pour récupérer le json
//   const r = await fetch("../../data/photographers.json");
//   // si réponse du serveur
//   if (r.ok === true) {
//     // retourn le json
//     photographers = await r.json();
//     return photographers.photographers;
//   } else {
//     // si pas de réponse retourne une erreur
//     throw new Error("Impossible de récupérer les données");
//   }
// }

// //  ----------------------------------------
// //* fonction affichage des données récupérées
// //  -----------------------------------------

// // argument est un tableau contenant des objets
// async function displayData(photographers) {
//   // cible l'element HTML de classe photographer_section
//   const photographersSection = document.querySelector(".photographer_section");

//   // itération sur chaque élément du tableau photographer
//   photographers.forEach((photographer) => {
//     // utilisation de la fonction photographerFactory qui retourne un object contenant 3 variables : name, picture, getUserCardDOM
//     const photographerModel = photographerFactory(photographer);
//     // assigne à userCardDOM l'element HTML créé grace à la fonction getUserCardDOM
//     const userCardDOM = photographerModel.getUserCardDOM();
//     // ajoute l'element HTML à l'element HTML de classe photographer_section
//     photographersSection.appendChild(userCardDOM);
//   });
// }

// //  ----------------------------------------
// //* fonction intialisation (fetch + display)
// //  -----------------------------------------

// async function init() {
//   // Récupère les datas des photographes
//   const photographers = await getPhotographers();
//   displayData(photographers);
// }

// init();
