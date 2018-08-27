import { MainMenuService } from "./main-menu-service.js"
import { subMenu } from "../../app.js"
// TODO: template comes from 'main-menu.tpl'
// TODO: template comes from 'main-menu__list-element.tpl'

class MainMenu {
  constructor(container) {
    this.container = container;
  }

  getBrands() {
    MainMenuService.getBrands('/data/main-menu__brands.json')
        .done((data) => {
          this.data = data;
          this.render(data)
        })
        .fail((jqXHR, textStatus, errorThrown) => {
          console.log(errorThrown);
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

  getAttribute(id, attr) {
    for (let key in this.data) {
      if (this.data[key].id === id) {
        return this.data[key][attr];
      }
    }
  }

  checkClickedObj(target) {
    return target.className === 'main-menu__list';
  }

  getShopData(target) {
    const self = this;
    self.liChildren = target.parentElement;
    self.restName = self.getAttribute(self.liChildren.id, 'name');
    self.restLogo = self.getAttribute(self.liChildren.id, 'image');
    return new Promise(function(resolve, reject) {
      self.foodData = "";
      MainMenuService.getBrands('/data/'+self.liChildren.id+'.json')
          .done((data) => {
            resolve(data);
          })
          .fail((data) => {
            reject(data);
          });
    }).then(resolve => {
      subMenu.render(resolve, self.restName, self.restLogo)
    })
  }
}

export { MainMenu };
