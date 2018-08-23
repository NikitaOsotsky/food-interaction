import {MainMenuService} from "./main-menu-service.js"
import {subMenu} from "../../app.js"
// TODO: template comes from 'main-menu.tpl'
// TODO: template comes from 'main-menu__list-element.tpl'

class MainMenu {
  constructor (container) {
    this.container = container;
  }

  getBrands() {
    MainMenuService.getBrands('/data/main-menu__brands.json')
        .done((data) => {
          this.data = data;
          this.render(data)
        })
        .fail((data) => {
          this.default = [{},{}];//TODO: description some default data
          this.render(this.default)
        });
  }

  render(data) {
    let html = '';
    for (let i = 0; i < data.length; i++) {
      html +=
          `<li id="${data[i].id}" class="main-menu__list__element">
              <img class="main-menu__list__element__logo" src="${data[i].image ? data[i].image : 'https://via.placeholder.com/32x32' }" alt="${data[i].name}">
              <label class="main-menu__list__element__text">${data[i].name}</label>
              <span class="main-menu__list__element__time">${data[i].duration.from}-${data[i].duration.to} min</span> 
          </li>`;
    }

    this.container.innerHTML = html;
  }
  getShopData (target) {
    const self = this;
    return new Promise(function(resolve, reject) {
      if (target.className === 'main-menu__list') {
        return;
      }
      self.foodData = "";
      self.liChildren = target.parentElement;
      MainMenuService.getBrands('/data/'+self.liChildren.id+'.json')
          .done((data) => {
            resolve(data);
          })
          .fail((data) => {
            reject(data);
          });
    }).then(resolve => {
      subMenu.render(resolve)
    })
  }
}
export {MainMenu};
