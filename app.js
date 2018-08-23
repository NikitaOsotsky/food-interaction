import {MainMenu} from "./component/main-menu/main-menu.js";
import {SubMenu} from "./component/sub-menu/sub-menu.js";
const container = document.querySelector('.main-menu__list');
const menu = new MainMenu(container);
const subMenuContainer = document.querySelector('.sub-menu__list');
const subMenu = new SubMenu(subMenuContainer);
menu.getBrands();
container.addEventListener('click', (evt) => {
  menu.getShopData(evt.target);
});
export {subMenu};
