class HomeCtrl {
  constructor(User, Tags, AppConstants) {
    'ngInject';
    this.appName = AppConstants.appName;

    Tags.getAll().then(
      (tags) => {
        this.tagsLoaded = true;
        this.tags = tags;
      }
    );

    this.listConfig = {
      type: User.current ? 'feed' : 'all'
    };
    
  }
}

export default HomeCtrl;
