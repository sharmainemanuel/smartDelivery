app.config(function($stateProvider, $urlRouterProvider,$ionicConfigProvider) {
  $ionicConfigProvider.views.maxCache(0);
  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider

  .state('delivery', {
    url: '/delivery',
    templateUrl: 'templates/delivery-info.html',
    controller: 'DeliveryCtrl'
  })

  .state('login', {
    url: '/login',
    templateUrl: 'templates/login.html',
    controller: 'LoginCtrl'
  })

  .state('location', {
    url: '/location',
    templateUrl: 'templates/change-location.html',
    controller: 'LocationCtrl'
  })

  // setup an abstract state for the tabs directive
    .state('tab', {
    url: '/tab',
    abstract: true,
    templateUrl: 'templates/tabs.html'
  })

  // Each tab has its own nav history stack:

  .state('tab.dash', {
    url: '/dash',
    views: {
      'tab-dash': {
        templateUrl: 'templates/tab-dash.html',
        controller: 'DashCtrl'
      }
    }
  })

  .state('tab.profile', {
    url: '/profile',
    views: {
      'tab-profile': {
        templateUrl: 'templates/tab-profile.html',
        controller: 'ProfileCtrl'
      }
    }
  })

  .state('tab.list', {
      url: '/list',
      views: {
        'tab-list': {
          templateUrl: 'templates/tab-list.html'
        }
      }
    })
  .state('tab.list-product', {
      url: '/list/product/:category',
      views: {
        'tab-list': {
          templateUrl: 'templates/tab-list-product.html',
          controller: 'ListCtrl'
        }
      }
    })
  .state('tab.product/profile', {
      url: '/list/product/profile/:productid',
      views: {
        'tab-list': {
          templateUrl: 'templates/product-profile.html',
          controller: 'ProductProfileCtrl'
        }
      }
    })
    .state('tab.chat-detail', {
      url: '/chats/:chatId',
      views: {
        'tab-chats': {
          templateUrl: 'templates/chat-detail.html',
          controller: 'ChatDetailCtrl'
        }
      }
    })

  .state('tab.account', {
    url: '/account',
    views: {
      'tab-account': {
        templateUrl: 'templates/tab-account.html',
        controller: 'AccountCtrl'
      }
    }
  })



  .state('tabdelivery', {
    url: '/tabdelivery',
    abstract: true,
    templateUrl: 'templates/tabdelivery.html'
  })
  .state('tabdelivery.ddash', {
    url: '/ddash',
    views: {
      'tabdelivery-dash': {
        templateUrl: 'templates/tabdelivery-dash.html',
        controller: 'DeliveryDashCtrl'
      }
    }
  })
  .state('tabdelivery.ddelivered', {
    url: '/ddelivered',
    views: {
      'tabdelivery-delivered': {
        templateUrl: 'templates/tab-delivered.html',
        controller: 'DeliveredCtrl'
      }
    }
  })
  .state('tabdelivery.dprofile', {
    url: '/dprofile',
    views: {
      'tabdelivery-profile': {
        templateUrl: 'templates/tab-deliverprofile.html'
      }
    }
  })
  .state('tabdelivery.daccount', {
    url: '/daccount',
    views: {
      'tabdelivery-account': {
        templateUrl: 'templates/tab-deliveraccount.html',
        controller: 'DeliveryAccountCtrl'
      }
    }
  });
  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/login');

});