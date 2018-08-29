import { MainMenu } from "./component/main-menu/main-menu.js";
import { SubMenu } from "./component/sub-menu/sub-menu.js";
import { choseElems } from "./component/sub-menu/sub-menu.js";

const container = document.querySelector('.main-menu__list');
const menu = new MainMenu(container);

const subMenuContainer = document.querySelector('.sub-menu');
const subMenu = new SubMenu(subMenuContainer);

export const subPanel = document.querySelector('.sub-menu__sub-panel');
const viewedList = document.querySelector('.viewed-list');

export let subMenuState = {stage: false,
                           setStage(a){
                             this.stage = a;
                           }};

menu.getBrands();
container.addEventListener('click', (e) => {
  if (!menu.checkClickedObj(e.target)) {
    if (!subMenuState.stage) {
      subMenuContainer.style.opacity = '1';
      subMenuContainer.style.width = '100%';
      subPanel.classList.add('visible');
      subMenuState.setStage(true);
    }
    menu.getShopData(e.target);
  }
});
subMenu.addListeners(subMenuContainer);
subPanel.querySelector('.button-submit').addEventListener('click', (e) => {
  viewedList.classList.add('visible');
  let html = `<ul class="viewed-list__checklist">`;
  for (let key in choseElems.elemsCollection) {
    let countItems = choseElems.elemsCollection[key].count;
    let name;
    for (let i = 0; i < choseElems.data.length; i++) {
      if (key in choseElems.data[i].menu) {
        name = choseElems.data[i].menu[key];
      }
    }
    console.log(countItems, name);
    html += `<li class="viewed-list__checklist__value">${countItems} `;
    for (let key in name) {
      html += `${key} ${name[key]}</li>`;
    }
  }
  html += `</ul>
           <p class="cost-label">Summary: ${choseElems.sumaryCost}</p><hr>
           <div class="button-submit pay">Pay it</div>
           <div class="button-submit cancel">Cancel</div>`;
  viewedList.innerHTML = html;
});

export { subMenu };
