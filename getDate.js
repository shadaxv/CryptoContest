class getDate {
  constructor() {
    this.timestamp = new Date();
    this.date = {
      'day': ('0' + this.timestamp.getDate()).slice(-2),
      'month': ('0' + (this.timestamp.getMonth() + 1)).slice(-2),
      'year': this.timestamp.getFullYear(),
      'hours': ('0' + this.timestamp.getHours()).slice(-2),
      'minutes': ('0' + this.timestamp.getMinutes()).slice(-2)
    }
    this.now = `${this.date.day}/${this.date.month}/${this.date.year} ${this.date.hours}:${this.date.minutes}`;
  }

  update() {
    this.timestamp = new Date();
    this.date.day = ('0' + this.timestamp.getDate()).slice(-2);
    this.date.month = ('0' + (this.timestamp.getMonth() + 1)).slice(-2);
    this.date.year = this.timestamp.getFullYear();
    this.date.hours = ('0' + this.timestamp.getHours()).slice(-2);
    this.date.minutes = ('0' + this.timestamp.getMinutes()).slice(-2);
    this.now = `${this.date.day}/${this.date.month}/${this.date.year} ${this.date.hours}:${this.date.minutes}`;
  }
}

module.exports = getDate;
