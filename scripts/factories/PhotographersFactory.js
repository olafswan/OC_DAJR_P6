class PhotographersFactory {
  constructor(data, type) {
    console.log(
      "🚀 2) file: PhotographersFactory.js:4 \n PhotographersFactory \n constructor \n varibale: data\n",
      data
    );

    return new PhotographersModel(data);

    // if (type.includes("index")) {
    //   // applique la classe PhotographersModel
    //   return new PhotographersModel(data);
    // } else if (type.includes("photographer")) {
    //   // TODO changer Movie pour son remplacent
    //   return new Movie(data);
    // } else {
    //   throw "Unknow format type";
    // }
  }
}
