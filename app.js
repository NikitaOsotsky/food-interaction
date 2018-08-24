import {MainMenu} from "./component/main-menu/main-menu.js";
import {SubMenu} from "./component/sub-menu/sub-menu.js";

const container = document.querySelector('.main-menu__list');
const menu = new MainMenu(container);

const subMenuContainer = document.querySelector('.sub-menu');
const subMenu = new SubMenu(subMenuContainer);

export let subMenuState = {stage: false,
                           setStage(a){
                             this.stage = a;
                           }};

menu.getBrands();
container.addEventListener('click', (evt) => {
  if (!subMenuState.stage) {
    subMenuContainer.style.opacity = '1';
    subMenuContainer.style.width = '100%';
    subMenuState.setStage(true);
  }
  menu.getShopData(evt.target);
});
subMenu.addListeners(subMenuContainer);
export {subMenu};
