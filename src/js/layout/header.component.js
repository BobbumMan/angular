class AppHeaderCtrl {
  constructor(AppConstants) {
    'ngInject';

    this.appName = AppConstants.appName;
  }
}

let AppHeader = {
  controller: AppHeaderCtrl,
  templateUrl: 'layout/header.component.html'
};

export default AppHeader;
