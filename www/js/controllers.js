angular.module('starter.controllers', [])

.controller('DashCtrl', function($scope, $rootScope, $state) {
  if($rootScope.appDetectedLocation == undefined)
    $rootScope.appDetectedLocation = 'paris'; //Location variable
  if($rootScope.attractionSelected == undefined)
    $rootScope.attractionSelected = -1;
  if($rootScope.daySoFar == undefined)
    $rootScope.daySoFar = []
  if($rootScope.pageReload == undefined)
    $rootScope.pageReload = false;
})

.controller('AgentCtrl', function($scope, $state, Chats) {
  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  $scope.chats = Chats.all();
  $scope.remove = function(chat) {
    Chats.remove(chat);
  };
})

.controller('MoodCtrl', function($scope, $rootScope, $state,Feelings) {
  $scope.curIndex = 0;
  $scope.curRange = 3;
  $scope.feelingsLength = Feelings.all().length;
  $scope.curfeelings = Feelings.getRange($scope.curIndex,$scope.curRange);

  $scope.tapUp = function() {
    if(this.curIndex - this.curRange < 0) {
      this.curIndex = 0;
      this.curfeelings = Feelings.getRange(this.curIndex, this.curRange);

    }
    else {
      this.curIndex = this.curIndex - this.curRange;
      if(this.curIndex < 0)
        this.curIndex = 0;
      this.curfeelings = Feelings.getRange(this.curIndex, this.curRange);
    }
  };

  $scope.tapDown = function() {
    console.log(this.curIndex)
    if(this.curIndex > this.feelingsLength - this.curRange) {
      this.curIndex = this.feelingsLength - this.curRange;
      this.curfeelings = Feelings.getRange(this.curIndex, this.curRange);
    }
    else {
      this.curIndex = this.curIndex + this.curRange;
      if(this.curIndex > this.feelingsLength - this.curRange)
        this.curIndex = this.feelingsLength - this.curRange;
      this.curfeelings = Feelings.getRange(this.curIndex, this.curRange);
    }
  };
})

.controller('ReminderCtrl', function($scope, $state, $rootScope) {
})

.controller('AttCtrl', function($scope, $rootScope, $stateParams, $state, AttractionsParis, AttractionsSFBay, Feelings) {
  if($scope.appDetectedLocation == 'sfbay') {
    $scope.attraction = AttractionsSFBay.get($stateParams.moodId);
    $rootScope.attractionSelected = $stateParams.moodId;
    $scope.attractionSelected = $stateParams.moodId;
    $scope.attractions = AttractionsSFBay.all();
  }
  else {
    $scope.attraction = AttractionsParis.get($stateParams.moodId);
    $rootScope.attractionSelected = $stateParams.moodId;
    $scope.attractionSelected = $stateParams.moodId;
    $scope.attractions = AttractionsParis.all();
  }
  
  $scope.feeling = Feelings.get($stateParams.moodId);

  $scope.tapPrev = function() {
    var curId = this.attraction.id;
    if(curId < 1)
      curId = this.attractions.length - 1;
    else
      curId = curId - 1;
    if(this.appDetectedLocation == 'sfbay')
      $scope.attraction = AttractionsSFBay.get(curId);
    else
      $scope.attraction = AttractionsParis.get(curId);
    $rootScope.attractionSelected = curId;
    $scope.attractionSelected = curId;
  }

  $scope.tapNext = function() {
    var curId = this.attraction.id;
    if(curId > this.attractions.length - 2)
      curId = 0;
    else
      curId = curId + 1;
    if(this.appDetectedLocation == 'sfbay')
      $scope.attraction = AttractionsSFBay.get(curId);
    else
      $scope.attraction = AttractionsParis.get(curId);
    $rootScope.attractionSelected = curId;
    $scope.attractionSelected = curId;
  }

})

.controller('DirCtrl', function($scope, $rootScope, $stateParams, $state, $ionicModal, AttractionsParis, AttractionsSFBay) {
  if($scope.appDetectedLocation == 'sfbay') {
    $scope.attractions = AttractionsSFBay.all();
    $scope.attractionsSFBayLength = $scope.attractions.length;
  }
  else {
    $scope.attractions = AttractionsParis.all();
    $scope.attractionsParisLength = $scope.attractions.length;
  }

  if($scope.attractionSelected < 0 || $scope.attractionSelected >= $scope.attractionsParisLength || $scope.attractionSelected >= $scope.attractionsSFBayLength) {
    $rootScope.attractionSelected = 0;
    $scope.attractionSelected = 0;
  }

  if($scope.appDetectedLocation == 'sfbay')
    $scope.attraction = AttractionsSFBay.get($scope.attractionSelected);
  else
    $scope.attraction = AttractionsParis.get($scope.attractionSelected);

  $ionicModal.fromTemplateUrl('direction-modal.html', {
    scope: $scope,
    animation: 'slide-in-up'
  }).then(function(modal) {
    $scope.modal = modal
  })  

  $scope.openModal = function() {
    $scope.modal.show()
  }

  $scope.closeModal = function() {
    $scope.modal.hide();
  };

  $scope.$on('$destroy', function() {
    $scope.modal.remove();
  });
})

.controller('DayCtrl', function($scope, $rootScope, $stateParams, $state, AttractionsParis, AttractionsSFBay) {
  if(!$rootScope.pageReload) {
    //Add attraction to daySoFar
    if($scope.appDetectedLocation == 'sfbay')
      $scope.attraction = AttractionsSFBay.get($scope.attractionSelected);
    else
      $scope.attraction = AttractionsParis.get($scope.attractionSelected);

    var d = new Date();
    var hour = d.getHours();
    var ampm = "AM";
    if(hour > 11)
      var ampm = "PM";
    if(hour > 12)
      hour = hour - 12
    if(hour == 0)
      hour = 12;
    var minute = d.getMinutes();
    if(minute >= 10)
      var timeString = hour + ":" + minute + " " + ampm;
    else
      var timeString = hour + ":0" + minute + " " + ampm;

  $rootScope.daySoFar.push({time: timeString, activity: $scope.attraction.activity});
}
else
  $rootScope.pageReload = false;

  $scope.clearDay = function() {
    $rootScope.daySoFar = [];
    $rootScope.pageReload = true;
    $state.go($state.current, {}, {reload: true});
  }

  $scope.daySoFar = $rootScope.daySoFar;
});

  