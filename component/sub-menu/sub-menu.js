class SubMenu {
  constructor(container) {
    this.container = container;
  }
  render(data, name, logo) {
    this.html = '';
    this.html +=//TODO: add groups to json. Restructured string to groups.
        `<img class="sub-menu__logo" src="${logo}" alt="${name}">
         <h3 class="sub-menu__header main-header">${name}</h3>
         
         `;
    for (let i = 0; i < data.length; i++) {
      this.html += `<h4 class="sub-menu__header slave-header">${data[i].menuName}</h4>
                    <ul class="sub-menu__list">`;
      for (let key in data[i].menu) {
        for (let item in data[i].menu[key]) {
          this.html +=
              `<li class="sub-menu__list__item">${item}
              <span class="sub-menu__list__item__cost">${data[i].menu[key][item]}</span> 
            </li>`;
        }
      }
      this.html += `</ul>`;
    }
    this.container.innerHTML = this.html;
  }

}
export {SubMenu};
