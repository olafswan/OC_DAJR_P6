// applique la class choisie par la factory
// fichier unique à une classe particulière

class LightboxModel {
  constructor(data, type, url) {
    // 3 parametres :
    // data = le tableau MediaData,
    // type = l'array des url,
    // index = l'index du media clické
    this._MediaData = data;
    this._urlList = type;
    this._currentUrl = url;
  }

  get currentUrl() {
    return this._currentUrl;
  }

  get title() {
    // recherche du titre en fonction de l'url
    // trouvé l'objet dans l'array this._MediaData qui a une value incluant l'url du media clické
    for (const media of this._MediaData) {
      // console.log("A: media", media);
      // console.log("B: media._image", media._image);
      // console.log("C: splited URL", this._currentUrl.split("media/").pop());
      if (
        media._image === this._currentUrl.split("media/").pop() ||
        media._video === this._currentUrl.split("media/").pop()
      ) {
        return media._title;
      }
    }
  }

  get previousUrl() {
    // cherche l'url précédent dans la liste d'url
    const currentIndex = this._urlList.indexOf(this._currentUrl);
    // cas ou le media est le premier de la liste
    if (currentIndex === 0) {
      return this._urlList[this._urlList.length - 1];
    } else {
      // cas ou le media n'est pas premier
      return this._urlList[currentIndex - 1];
    }
  }

  get nextUrl() {
    // cherche l'url suivant dans la liste d'url
    const currentIndex = this._urlList.indexOf(this._currentUrl);
    // cas ou le media est le dernier de la liste
    if (currentIndex === this._urlList.length - 1) {
      return this._urlList[0];
    } else {
      // cas ou le media n'est pas dernier
      return this._urlList[currentIndex + 1];
    }
  }
}
