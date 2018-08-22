import {MainMenu} from "./component/main-menu/main-menu.js";

const container = document.querySelector('.main-menu__list');
const menu = new MainMenu(container);
console.log(menu);
menu.getBrands();
