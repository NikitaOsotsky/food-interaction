export class ElementChooser {
  constructor() {
  }

  init(data) {
    this.sumPanel = document.querySelector('.cost-label__sum');
    if (this.sumPanel.childNodes.length === 0) {
      this.text = document.createTextNode('0');
      this.sumPanel.appendChild(this.text);
    } else {
      this.sumPanel.removeChild(this.sumPanel.firstChild);
      this.init(data);
    }
    this.elemsCollection = {};
    this.sumaryCost = 0;
    this.data = data;
  }

  addChose(elem) {
    if (!this.suchElemExist(elem)) {
      this.elemsCollection[elem.id] = {
        count: 1
      };
    } else {
      this.elemsCollection[elem.id].count++;
    }
    /**
     * sum cost
     */
    ElementChooser.changeSum(elem, 'add', this);
    console.log(this.sumaryCost);
    this.render(elem);
  }

  removeChose(elem) {
    if (!this.suchElemExist(elem)) {
      return false;
    }
    if (this.elemsCollection[elem.id].count > 1) {
      this.elemsCollection[elem.id].count--;
      this.render(elem);
    } else {
      delete this.elemsCollection[elem.id];
      this.render(elem, 'delete');
    }
    ElementChooser.changeSum(elem, 'remove', this);
    console.log(this.sumaryCost);
  }

  static changeSum(elem, effect, self) {
    for (let key in self.data) {
      if (elem.id in self.data[key].menu) {
        for (let name in self.data[key].menu[elem.id]) {
          switch (effect) {
            case 'add':
              self.sumaryCost += self.data[key].menu[elem.id][name];
              break;
            case 'remove':
              self.sumaryCost -= self.data[key].menu[elem.id][name];
              break;
            default: break;
          }
        }
      }
    }
    self.sumaryCost = ElementChooser.gaussRound(self.sumaryCost, 2);
    self.sumPanel.removeChild(self.sumPanel.firstChild);
    self.text = document.createTextNode(self.sumaryCost);
    self.sumPanel.appendChild(self.text);
  }

  static gaussRound(num, decimalPlaces) {
    let d = decimalPlaces || 0,
        m = Math.pow(10, d),
        n = +(d ? num * m : num).toFixed(8),
        i = Math.floor(n), f = n - i,
        e = 1e-8,
        r = (f > 0.5 - e && f < 0.5 + e) ?
            ((i % 2 === 0) ? i : i + 1) : Math.round(n);
    return d ? r / m : r;
  }

  suchElemExist(elem) {
    return elem.id in this.elemsCollection;
  }

  render(elem, key) {
    if (key === 'delete' && elem.lastElementChild.className === 'sub-menu__list__item__mark') {
      elem.lastElementChild.remove();
      return;
    }
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
