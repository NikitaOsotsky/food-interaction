export class MainMenuService {
  constructor() {
  }

  static getBrands(link) {
//    $.ajaxSetup({async:false});
    return $.ajax(link);
  }
}
