class SubMenu {
  constructor(container) {
    this.container = container;
  }
  render(data, name, logo) {
    this.html = '';
    this.html +=
        `<img class="sub-menu__logo" src="${logo}" alt="${name}">
         <h3 class="sub-menu__header main-header">${name}</h3>
         <h4 class="sub-menu__header slave-header">${name}</h4>
         <ul class=".sub-menu__list">`;
    for (let key in data[0].menu) {
      for (let item in data[0].menu[key]) {
        this.html +=
            `<li class="sub-menu__list__item">${item}
              <span class="sub-menu__list__item__cost">${data[0].menu[key][item]}</span> 
            </li>`;
      }
    }
    this.html += `</ul>`;
    this.container.innerHTML = this.html;
  }

}
export {SubMenu};
