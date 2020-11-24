class Comunicazione {
  constructor(titolo, testo) {
    //this.id = id;
    this.titolo = titolo;
    this.testo = testo;
    this.dataCreazione = new Date();
  }
  getId() {
    return this.id;
  }
  setId(id) {
    this.id = id;
  }
  getTitolo() {
    return this.titolo;
  }
  setTitolo(titolo) {
    this.titolo = titolo;
  }
  getTesto() {
    return this.testo;
  }
  setTesto(testo) {
    this.testo = testo;
  }
  getData() {
    return this.data;
  }
  setData(data) {
    this.data = data;
  }
  exportObject() {
    return {
      titolo: this.titolo,
      testo: this.testo,
      data: this.data,
    };
  }
}
