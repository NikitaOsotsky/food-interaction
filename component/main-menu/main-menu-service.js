export class MainMenuService {
  constructor() {
  }

  static getBrands(link) {
    return $.ajax(link);
  }
}
