// fonction principale, construction des cards des photographes
// fichier unique à la page index.html

class App {
  constructor() {
    // 1 cible l'emplacement de l'injection sur la page index.html
    this.$wrapper = document.querySelector(".photographer_section");
    // 2 fetch les données json du fichier photographers.json via le fichier Api.js
    this.photographersApi = new PhotographersApi(
      "https://olafswan.github.io/OC_DAJR_P6/data/photographers.json"
    );
  }

  async main() {
    // récupére les données sous forme d'array
    const photographerRawData = await this.photographersApi.getPhotographers();

    console.log(
      "🚀 1) file: index.js:16 \n App \n main \n variable: photographerRawData\n",
      photographerRawData
    );

    console.log(
      "🚀 newwww \n file: index.js:18 \n App \n main \n photographerRawData constructor name\n",
      photographerRawData.constructor.name
    );

    // TODO c'est ici que sera passer en argument le type "photographers" ou "media"
    //
    // crée un nouveau array via le fichier PhotographersFactory.js ancien MoviesFactory.js
    // transforme le tableau de données en tableau de classe PhotographersFactory
    const Data = photographerRawData.map(
      (data) => new PhotographersFactory(data, "photographer")
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

  // ----------------------------------
  // ----------------------------------
  // FOCUS TRAP
  // ----------------------------------
  // ----------------------------------

  focusTrap() {
    // type d'elements que l'ont souhaite focusable
    const focusableElements =
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])';
    const target = document.querySelector("body"); // element dans lequel on souhaite instauré le focus trap

    // 1er element focusable
    const firstFocusableElement = target.querySelectorAll(focusableElements)[0];
    // liste des elements focusables
    const focusableContent = target.querySelectorAll(focusableElements);
    // dernier element focusable
    const lastFocusableElement = focusableContent[focusableContent.length - 1];

    // ajoute le trap
    document.addEventListener("keydown", function (e) {
      let isTabPressed = e.key === "Tab" || e.keyCode === 9;

      console.log(e.key);

      if (!isTabPressed) {
        return;
      }

      // ajoute la classe CSS ada lors de la première pression de tab
      if (document.getElementsByClassName("ada").length === 0) {
        for (const element of focusableContent) {
          element.classList.add("ada");
        }
      }

      //  si shift est pressé (pour shift + tab)
      if (e.shiftKey) {
        // si le focus est actuellement sur le premier element focusable
        if (document.activeElement === firstFocusableElement) {
          lastFocusableElement.focus(); // mettre le focus sur le dernier element
          e.preventDefault();
        }
      } else {
        // si seul tab est pressé
        if (document.activeElement === lastFocusableElement) {
          // si le focus est actuellement sur le dernier element focusable
          firstFocusableElement.focus(); // mettre le focus sur le premier element
          e.preventDefault();
        }
      }
    });
    firstFocusableElement.focus();
  }
}

// const app = new App();
// app.main();

async function init() {
  const app = new App();
  await app.main();
  app.focusTrap();
}

init();
