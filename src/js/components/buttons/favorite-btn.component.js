class FavoriteBtnCtrl {
  constructor() {
    'ngInject';

  }
}

let FavoriteBtn = {
  bindings: {
    article: '='
  },
  transclude: true,
  controller: FavoriteBtnCtrl,
  templateUrl: 'components/buttons/favorite-btn.html'
};

export default FavoriteBtn;
