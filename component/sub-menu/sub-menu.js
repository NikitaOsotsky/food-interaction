class SubMenu {
  constructor(data, container) {
    this.data = data;
    this.container = container;
    if (!this.data) {
      console.log('No data');
    } else {
      console.log(this.data);
      this.render(this.data);
    }
  }
  render(data) {
    this.html = '';
    for (let key in data[0].menu) {
      for (let item in data[0].menu[key]) {
        this.html +=
            `<li class="sub-menu__list__item">${item}
              <span class="sub-menu__list__item__cost">${data[0].menu[key][item]} min</span> 
            </li>`;
      }
    }
    this.container.innerHTML = this.html;
  }

}
export {SubMenu};
