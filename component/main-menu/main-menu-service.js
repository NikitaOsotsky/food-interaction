export class MainMenuService {
  constructor() {
  }

  static getBrands() {
    return $.ajax('/data/main-menu__brands.json');
  }
}
