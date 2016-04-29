class AppFooterCtrl {
  constructor(AppConstants) {
    'ngInject';

    this.appName = AppConstants.appName;
    this.date = new Date();
  }
}

let AppFooter = {
  controller: AppFooterCtrl,
  templateUrl: 'layout/footer.component.html'
};

export default AppFooter;
