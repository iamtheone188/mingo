angular.module('starter.controllers', [])

.controller('DashCtrl', function($scope, $rootScope, $state) {
  if($rootScope.appDetectedLocation == undefined)
    $rootScope.appDetectedLocation = 'paris'; //Location variable
  if($rootScope.attractionSelected == undefined)
    $rootScope.attractionSelected = -1;
  if($rootScope.daySoFar == undefined)
    $rootScope.daySoFar = [];
  if($rootScope.pageReload == undefined)
    $rootScope.pageReload = false;
  if($rootScope.reminders == undefined)
    $rootScope.reminders = [];
  if($rootScope.searchString == undefined)
    $rootScope.searchString = "Paris, France";
})

.controller('AgentCtrl', function($scope, $state, $ionicPopup) {
  $scope.inputStartDate = '';
  $scope.changeStartDate = function(newStartDate) { $scope.inputStartDate = newStartDate; };
  $scope.inputEndDate = '';
  $scope.changeEndDate = function(newEndDate) { $scope.inputEndDate = newEndDate; };

  $scope.next = function() {
    if($scope.inputStartDate == '' || $scope.inputEndDate == '')
      $scope.showAlertBlank();
    else {
      //SAVE THINGS HERE
      $state.go('tab.agent-where', {}, {reload: true});
    }
  }

  $scope.showAlertBlank = function() {
    var alertPopup = $ionicPopup.alert({
      title: 'Blank Fields',
      template: 'Please do not leave fields blank!'
    });
    alertPopup.then(function(res) {
      console.log('Alert!');
    });
  };
})

.controller('WhereCtrl', function($scope, $state, $rootScope) {
  $scope.searchString = $rootScope.searchString;
  $scope.changeSearch = function(newString) { $scope.searchString = newString; };

  $scope.changeLocation = function() {
    if($rootScope.searchString == "Paris, France") {
      $rootScope.searchString = "San Francisco, California, USA";
      $scope.searchString = "San Francisco, California, USA";
    }
    else {
      $rootScope.searchString = "Paris, France";
      $scope.searchString = "Paris, France";
    }
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
  var rems = $rootScope.reminders;
  $scope.remindersFormatted = []
  for(var i=0; i<rems.length; i++) {
    var tempString = '';
    var tempStringDate = '';
    tempStringDate += rems[i].startTime.getMonth().toString() + '/' + rems[i].startTime.getDate().toString() + '/' + rems[i].startTime.getFullYear().toString();
    
    if(rems[i].startTime.getHours() < 10 && rems[i].startTime.getMinutes() < 10)
      tempString += '0' + rems[i].startTime.getHours() + ':' + '0' + rems[i].startTime.getMinutes();
    else if(rems[i].startTime.getHours() < 10)
      tempString += '0' + rems[i].startTime.getHours() + ':' + rems[i].startTime.getMinutes();
    else if(rems[i].startTime.getMinutes() < 10)
      tempString += rems[i].startTime.getHours() + ':' + '0' + rems[i].startTime.getMinutes();
    else
      tempString += rems[i].startTime.getHours() + ':' + rems[i].startTime.getMinutes();

    tempString += " - "

    if(rems[i].endTime.getHours() < 10 && rems[i].endTime.getMinutes() < 10)
      tempString += '0' + rems[i].endTime.getHours() + ':' + '0' + rems[i].endTime.getMinutes();
    else if(rems[i].endTime.getHours() < 10)
      tempString += '0' + rems[i].endTime.getHours() + ':' + rems[i].endTime.getMinutes();
    else if(rems[i].endTime.getMinutes() < 10)
      tempString += rems[i].endTime.getHours() + ':' + '0' + rems[i].endTime.getMinutes();
    else
      tempString += rems[i].endTime.getHours() + ':' + rems[i].endTime.getMinutes();
    $scope.remindersFormatted.push({
      id: i,
      strDate: tempStringDate,
      strTime: tempString
    });
  }

  $scope.removeEntry = function(entry) {
    $rootScope.reminders.splice(entry.id, 1);
    $state.go('tab.reminder', {}, {reload: true});
  }
})

.controller('ReminderAddCtrl', function($scope, $state, $rootScope, $ionicPopup) {
  $scope.inputStartDate = '';
  $scope.changeStartDate = function(newStartDate) { $scope.inputStartDate = newStartDate; };
  $scope.inputHour = '';
  $scope.changeHour = function(newHour) { $scope.inputHour = newHour; };
  $scope.changeMinute = '';
  $scope.changeMinute = function(newMinute) { $scope.inputMinute = newMinute; };
  $scope.inputDuration = '';
  $scope.changeDuration = function(newDuration) { $scope.inputDuration = newDuration; };

  $scope.addTime = function() {
    if($scope.inputStartDate == '' || $scope.inputAMPM == '' || $scope.inputMinute == '' || $scope.inputDuration == '') {
      $scope.showAlertBlank();
    }
    else {
      var tempTime = $scope.inputStartDate;
      var tempHour;
      tempHour = $scope.inputHour;
      tempTime.setHours(tempHour.toString());
      tempTime.setMinutes($scope.inputMinute);
      console.log("Start Time: "+tempTime);

      var tempTime2 = new Date(tempTime);
      tempTime2.setHours(tempTime.getHours() + parseInt($scope.inputDuration));
      if(parseFloat($scope.inputDuration) % 1 != 0) { //Add 30 minutes
        tempTime2.setMinutes(tempTime.getMinutes() + 30);
      }
      console.log("End Time: "+tempTime2);

      //Checks
      var isDup = false;
      for(var i=0; i<$rootScope.reminders.length; i++) {
        if($rootScope.reminders[i].startTime.getTime() == tempTime.getTime())
          isDup = true;
      }
      if(tempTime2.getDate() != tempTime.getDate())
        $scope.showAlertOverlap();
      else if(isDup)
        $scope.showAlertDuplicate();
      else {
        //Add to rootScope
        $rootScope.reminders.push({startTime: tempTime, endTime: tempTime2});
        $state.go('tab.reminder', {}, {reload: true});
      }
    }
  };

  $scope.showAlertBlank = function() {
    var alertPopup = $ionicPopup.alert({
      title: 'Blank Fields',
      template: 'Please do not leave fields blank!'
    });
    alertPopup.then(function(res) {
      console.log('Alert!');
    });
  };

  $scope.showAlertDuplicate = function() {
    var alertPopup = $ionicPopup.alert({
      title: 'Duplicate Start Time',
      template: 'You already have a reminder at this time!'
    });
    alertPopup.then(function(res) {
      console.log('Alert!');
    });
  };

  $scope.showAlertOverlap = function() {
    var alertPopup = $ionicPopup.alert({
      title: 'Multiple Day Reminder',
      template: 'Reminders cannot span multiple days!'
    });
    alertPopup.then(function(res) {
      console.log('Alert!');
    });
  };

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

  