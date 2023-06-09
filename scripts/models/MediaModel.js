// applique la class choisie par la factory
// fichier unique à une classe particulière

class MediaModel {
  constructor(data) {
    this._id = data.id;
    this._photographerId = data.photographerId;
    this._title = data.title;
    // this._image = data.image;
    this._likes = data.likes;
    this._price = data.price;
    this._price = data.price;
  }

  get id() {
    return this._id;
  }

  get photographerId() {
    return this._photographerId;
  }

  get title() {
    return this._title;
  }

  get likes() {
    return this._likes;
  }

  get price() {
    return this._price;
  }

  get price() {
    return this._thisprice;
  }
}

class ImageModel extends MediaModel {
  constructor(data) {
    super(data);
    this._image = data.image;
  }

  get src() {
    return `./assets/media/${this._image}`;
  }
}

class VideoModel extends MediaModel {
  constructor(data) {
    super(data);
    this._video = data.video;
  }

  get src() {
    return `./assets/media/${this._video}`;
  }
}
