class SubMenu {
  constructor(data) {
    this.data = data;
    if (!this.data) {
      console.log('No data');
    } else {
      console.log(this.data);
      this.render(this.data);
    }
  }
  render(data) {

  }

}
export {SubMenu};
