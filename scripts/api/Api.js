class Api {
  /**
   *
   * @param {string} url
   */
  constructor(url) {
    this._url = url;
  }

  // TODO la class Api ne retourne que la partie photographers (ligne 15) ce qui devrait être délégué à la classe enfant PhotographersApi..
  async getPhotographers() {
    return fetch(this._url)
      .then((res) => res.json())
      .then((res) => res.photographers)
      .catch((err) => console.log("an error occurs", err));
  }
}

class PhotographersApi extends Api {
  /**
   *
   * @param {string} url
   */
  constructor(url) {
    super(url);
  }

  // ancien getMovies devenu getDatas
  async getDatas() {
    return await this.getPhotographers();
  }
}
