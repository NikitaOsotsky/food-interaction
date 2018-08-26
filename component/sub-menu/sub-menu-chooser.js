export class ElementChooser {
  constructor() {
    this.elemsCollection = {};
  }

  init() {
    this.elemsCollection = {};
  }

  addChose(elem) {
    if (!this.suchElemExist(elem)) {
      let key = elem.id;
      this.elemsCollection[key] = {
        count: 1
      };
    } else {
      this.elemsCollection[elem.id].count++;
    }
    this.render(elem);
  }

  suchElemExist(elem) {
    if (elem.id in this.elemsCollection) {
      return true;
    }
    return false;
  }

  render(elem) {
    if (elem.lastElementChild.className === 'sub-menu__list__item__mark') {
      elem.lastElementChild.innerHTML = this.elemsCollection[elem.id].count;
    } else {
      const mark = document.createElement('span');
      mark.classList.add('sub-menu__list__item__mark');
      const text = document.createTextNode(this.elemsCollection[elem.id].count);
      mark.appendChild(text);
      elem.appendChild(mark);
    }
  }
}
