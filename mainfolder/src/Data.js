export default class Data {
  constructor() {
    const oggettoData = new Date();
    this.giorno = oggettoData.getDate();
    this.mese = oggettoData.getMonth() + 1;
    this.anno = oggettoData.getFullYear();
  }
  setData(giorno, mese, anno) {
    this.giorno = giorno;
    this.mese = mese;
    this.anno = anno;
  }
  setDataFromString(data) {
    const trattino = "-";
    const slash = "/";
    const componenti =
      data.indexOf(trattino) != -1 ? data.split(trattino) : data.split(slash); //se il separatore non è il trattino utilizza per gli slash per separare
    this.mese = componenti[1];
    if (componenti[0].length > componenti[2].length) {
      this.giorno = componenti[2];
      this.anno = componenti[0];
    } else {
      this.giorno = componenti[0];
      this.anno = componenti[2];
    }
  }
  getFullData(separatore = "/") {
    return `${this.giorno}${separatore}${this.mese}${separatore}${this.anno}`;
  }
  getFullDataHTML(separatore = "-") {
    return `${
      this.anno.length == 2 ? "20".concat(this.anno) : this.anno
    }${separatore}${this.mese}${separatore}${this.giorno}`;
  }
}
