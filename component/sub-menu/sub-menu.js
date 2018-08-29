import { subMenuState } from "../../app.js";
import { ElementChooser } from "./sub-menu-chooser.js";
import { subPanel } from "../../app.js";

const choseElems = new ElementChooser();
class SubMenu {
  constructor(container) {
    this.container = container;
  }

  render(data, name, logo) {
    this.html = '';
    this.html +=//TODO: add groups to json. Restructured string to groups.
        `<span class="close-div">&#9587</span>
         <img class="sub-menu__logo" src="${logo}" alt="${name}">
         <h3 class="sub-menu__header main-header">${name}</h3>`;
    for (let i = 0; i < data.length; i++) {
      this.html += `<h4 class="sub-menu__header slave-header">${data[i].menuName}</h4>
                    <ul class="sub-menu__list">`;
      for (let key in data[i].menu) {
        for (let item in data[i].menu[key]) {
          this.html +=
              `<li id="${key}" class="sub-menu__list__item">${item}
               <span class="sub-menu__list__item__cost">${data[i].menu[key][item]}</span> 
               </li>`;
        }
      }
      this.html += `</ul>`;
    }
    this.container.innerHTML = this.html;
    choseElems.init(data);
  }

  addListeners(target) {
    target.addEventListener('click', (evt) => {
      this.chooseIt(evt.target, 'click');
    });
    target.addEventListener('contextmenu', (evt) => {
      evt.preventDefault();
      this.chooseIt(evt.target, 'contextmenu');
      return false;
    }, false);
  }

  chooseIt(elem, event) {
    switch (event) {
      case 'click':
        /**
         * closer
         */
        if (elem.className === 'close-div') {
          this.container.style.opacity = '0';
          this.container.style.width = '0';
          subMenuState.setStage(false);
          subPanel.classList.remove('visible');
          choseElems.init();
          return;
        }
        /**
         * choosing elem to buy
         */
        if (elem.className !== this.container.className && elem.parentNode !== this.container) {
          choseElems.addChose(elem);
        }
        break;
      case 'contextmenu':
        if (elem.className !== this.container.className && elem.parentNode !== this.container) {
          choseElems.removeChose(elem);
        }
        break;
      default:
        break;
    }
  }
}

export { SubMenu };
export { choseElems };
