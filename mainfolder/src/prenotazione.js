export default class Prenotazione {
  constructor(id, servizio, data, ora, motivazione) {
    this.id = id;
    this.servizio = servizio;
    this.data = data;
    this.ora = ora;
    this.motivazione = motivazione;
  }
  getId() {
    return this.id;
  }
  setId(id) {
    this.id = id;
  }
  getServizio() {
    return this.servizio;
  }
  setServizio(servizio) {
    this.servizio = servizio;
  }
  getOra() {
    return this.ora;
  }
  setOra(ora) {
    this.ora = ora;
  }
  getData() {
    return this.data;
  }
  setData(data) {
    this.data = data;
  }
  getMotivazione() {
    return this.motivazione;
  }
  setMotivazione(motivazione) {
    this.motivazione = motivazione;
  }
}
