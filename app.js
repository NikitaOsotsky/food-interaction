import { MainMenu } from "./component/main-menu/main-menu.js";
import { SubMenu } from "./component/sub-menu/sub-menu.js";
import { choseElems } from "./component/sub-menu/sub-menu.js";

const mainMenu = document.querySelector('.main-menu');
const container = mainMenu.querySelector('.main-menu__list');
const menu = new MainMenu(container);

const subMenuContainer = document.querySelector('.sub-menu');
const subMenu = new SubMenu(subMenuContainer);

export const subPanel = document.querySelector('.sub-menu__sub-panel');
const viewedList = document.querySelector('.viewed-list');

export let subMenuState = {
  stage: false,
  setStage(a) {
    this.stage = a;
  }
};

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

//TODO: cut this callback function to some logic blocks functions
subPanel.querySelector('.button-submit').addEventListener('click', (e) => {
  mainMenu.style.zIndex = '-1';
  subMenuContainer.style.zIndex = '-1';
  viewedList.classList.add('visible');
  let clientData = {};
  let html = `<ul class="viewed-list__checklist">`;

  for (let key in choseElems.elemsCollection) {
    let countItems = choseElems.elemsCollection[key].count;
    let name;
    for (let i = 0; i < choseElems.data.length; i++) {
      if (key in choseElems.data[i].menu) {
        name = choseElems.data[i].menu[key];
      }
    }
    html += `<li class="viewed-list__checklist__value">${countItems} `;
    for (let key in name) {
      html += `${key} ${name[key]}</li>`;
      let aKey = Math.random()*999;
      clientData[aKey] = {
        'count': countItems,
        'name': key,
        'cost': name[key]
      };
    }
  }

  html += `</ul>
           <p class="cost-label">Summary: ${choseElems.sumaryCost}</p><hr>`;
  viewedList.innerHTML = html;

  const pay = document.createElement('div');
  pay.classList.add('button-submit', 'pay');
  let text = document.createTextNode('Pay it');
  pay.appendChild(text);
  pay.addEventListener('click', () => {
    const myStorage = window.localStorage;
    console.log(clientData);
    myStorage.setItem('key' + Math.floor(Math.random() * Math.floor(999))+'w', JSON.stringify(clientData));
    viewedList.innerHTML = `<p>All Done!</p>`;
    setTimeout(() => {
      cancel.click();
    }, 1500);
  });
  viewedList.appendChild(pay);

  const cancel = document.createElement('div');
  cancel.classList.add('button-submit', 'cancel');
  text = document.createTextNode('Cancel');
  cancel.appendChild(text);
  cancel.addEventListener('click', () => {
    viewedList.innerHTML = ``;
    mainMenu.style.zIndex = 'auto';
    subMenuContainer.style.zIndex = 'auto';
    const elem = {
      className: 'close-div'
    };
    subMenu.chooseIt(elem, 'click');
  });
  viewedList.appendChild(cancel);
});

export { subMenu };
