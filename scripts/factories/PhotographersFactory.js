// factory, fichier commun aux 2 pages html
// applique la bonne classe (xxxxModel) en fonction de critères

class PhotographersFactory {
  constructor(data, type, url, direction) {
    // les données étant des photographes doivent recevoir la classe PhotographerModel
    // les données étant des media doivent recevoir la classe PhotoModel ou VideoModel

    if (type === "photographer") {
      // console.log("type photographer !!!!! | type : ", type);
      return new PhotographerModel(data);
    } else if (!isNaN(type)) {
      // cas où l'argument type est l'id d'un photographe
      return new PhotographerModel(data);
    } else if (type === "media") {
      return data.hasOwnProperty("image") // applique la classe ImageModel
        ? new ImageModel(data)
        : // applique la classe VideoModel
          new VideoModel(data);
    } else if (direction == "previous") {
      // cas où l'argument type est un array
      return new previousLightboxModel(data, type, url);
    } else if (direction == "next") {
      // cas où l'argument type est un array
      return new nextLightboxModel(data, type, url);
    } else if (Array.isArray(type)) {
      // cas où l'argument type est un array
      return new LightboxModel(data, type, url);
    } else {
      throw "Unknow format type";
    }
  }
}
