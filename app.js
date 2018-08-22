import {MainMenu} from "./component/main-menu/main-menu.js";
import {SubMenu} from "./component/sub-menu/sub-menu.js";
const container = document.querySelector('.main-menu__list');
const menu = new MainMenu(container);
console.log(menu);
menu.getBrands();
container.addEventListener('click', (evt) => {
  const subMenu = new SubMenu(menu.getShopData(evt.target));
});
