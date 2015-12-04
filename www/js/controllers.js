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
  if($rootScope.tripDates == undefined)
    $rootScope.tripDates = {startDate: null, endDate: null};
  if($rootScope.searchString == undefined)
    $rootScope.searchString = "Paris, France";
  if($rootScope.mustDoList == undefined)
    $rootScope.mustDoList = [];
  if($rootScope.tripSet == undefined)
    $rootScope.tripSet = false;
})

.controller('DebugCtrl', function($scope, $rootScope, $state, $ionicPopup, $ionicHistory) {
  $scope.triggerAlarm = function() {
    if($rootScope.reminders.length == 0)
      $scope.showAlertAlarm();
    else {
      //Find next alarm
      var minId = 0;
      for(var i=1; i<$rootScope.reminders.length; i++) {
        if($rootScope.reminders[i].startTime.getTime() < $rootScope.reminders[minId].startTime.getTime())
          minId = i;
      }
      //Set scope, remove alarm, and trigger Popup
      $scope.remind = $rootScope.reminders[minId];
      $rootScope.reminders.splice(minId, 1);
      $ionicHistory.clearHistory();
      $scope.showAlarmPopup();
    }
  };

  $scope.triggerTrip = function() {
    if(!$rootScope.tripSet)
      $scope.showAlertTrip();
    else {
      //Unset trip and trigger Popup
      $rootScope.tripSet = false;
      $scope.tempStartDate = $rootScope.tripDates.startDate;
      $scope.tempEndDate = $rootScope.tripDates.endDate;
      $rootScope.tripDates = {startDate: null, endDate: null};
      $rootScope.searchString = "Paris, France";
      $rootScope.mustDoList = [];
      $ionicHistory.clearHistory();
      $scope.showTripPopup();
    }
  };

  $scope.showAlertAlarm = function() {
    var alertPopup = $ionicPopup.alert({
      title: 'No Reminders Found',
      template: 'No reminders found! Please ensure you have set reminders before using this debug item!'
    });
    alertPopup.then(function(res) {
      console.log('Alert!');
    });
  };

  $scope.showAlertTrip = function() {
    var alertPopup = $ionicPopup.alert({
      title: 'No Trip Set!',
      template: 'No trip has been set yet! Please ensure you have set a trip before using this debug item!'
    });
    alertPopup.then(function(res) {
      console.log('Alert!');
    });
  };

  $scope.showAlarmPopup = function() {
    var rem = $scope.remind;
    var tempString = '';
    var tempStringDate = '';
    tempStringDate += (rem.startTime.getMonth()+1).toString() + '/' + rem.startTime.getDate().toString() + '/' + rem.startTime.getFullYear().toString();
    
    if(rem.startTime.getHours() < 10 && rem.startTime.getMinutes() < 10)
      tempString += '0' + rem.startTime.getHours() + ':' + '0' + rem.startTime.getMinutes();
    else if(rem.startTime.getHours() < 10)
      tempString += '0' + rem.startTime.getHours() + ':' + rem.startTime.getMinutes();
    else if(rem.startTime.getMinutes() < 10)
      tempString += rem.startTime.getHours() + ':' + '0' + rem.startTime.getMinutes();
    else
      tempString += rem.startTime.getHours() + ':' + rem.startTime.getMinutes();

    tempString += " - "

    if(rem.endTime.getHours() < 10 && rem.endTime.getMinutes() < 10)
      tempString += '0' + rem.endTime.getHours() + ':' + '0' + rem.endTime.getMinutes();
    else if(rem.endTime.getHours() < 10)
      tempString += '0' + rem.endTime.getHours() + ':' + rem.endTime.getMinutes();
    else if(rem.endTime.getMinutes() < 10)
      tempString += rem.endTime.getHours() + ':' + '0' + rem.endTime.getMinutes();
    else
      tempString += rem.endTime.getHours() + ':' + rem.endTime.getMinutes();
    $scope.alarmDate = tempStringDate;
    $scope.alarmTimes = tempString;

    var alarmPopup = $ionicPopup.show({
        template: '<p style="text-align:center;">It\'s Mingo Time</p><p>Date: {{alarmDate}}</p><p>Time: {{alarmTimes}}</p>',
        title: 'Mingo Alarm',
        scope: $scope,
        buttons: [
          {
            text: 'Cancel Alarm',
            type: 'button-assertive',
            onTap: function(e) {
              $state.go('tab.dash', {}, {reload: true});
            }
          },
          {
            text: 'Start Exploring',
            type: 'button-positive',
            onTap: function(e) {
              $state.go('tab.mood', {}, {reload: true});
            }
          }
        ]
      });
      alarmPopup.then(function(res) {
        console.log('Tapped!', res);
      });
    };

    $scope.showTripPopup = function() {
      console.log($rootScope.tripDates.startDate);
      var s = $scope.tempStartDate;
      var e = $scope.tempEndDate;
      $scope.startDateString = (s.getMonth()+1).toString() + '/' + s.getDate().toString() + '/' + s.getFullYear().toString();
      $scope.endDateString = (e.getMonth()+1).toString() + '/' + e.getDate().toString() + '/' + e.getFullYear().toString();

      var tripPopup = $ionicPopup.show({
        template: '<p style="text-align:center;">It\'s Mingo Time</p><p>Trip Dates: {{startDateString}} - {{endDateString}}</p><div ng-if="appDetectedLocation == \'paris\'"><p>Trip Location: Paris, France</p></div><div ng-if="appDetectedLocation != \'paris\'"><p>Trip Location: San Francisco, California, USA</p></div>',
        title: 'Mingo Trip',
        scope: $scope,
        buttons: [
          {
            text: 'Cancel',
            type: 'button-assertive',
            onTap: function(e) {
              $state.go('tab.dash', {}, {reload: true});
            }
          },
          {
            text: 'Start Exploring',
            type: 'button-positive',
            onTap: function(e) {
              $state.go('tab.mood', {}, {reload: true});
            }
          }
        ]
      });
      tripPopup.then(function(res) {
        console.log('Tapped!', res);
      });
    };
})

.controller('AgentCtrl', function($scope, $state, $rootScope, $ionicPopup) {
  $scope.inputStartDate = '';
  if($rootScope.tripDates.startDate != null)
    $scope.inputStartDate = $rootScope.tripDates.startDate;
  $scope.changeStartDate = function(newStartDate) { $scope.inputStartDate = newStartDate; };
  $scope.inputEndDate = '';
  if($rootScope.tripDates.endDate != null)
    $scope.inputEndDate = $rootScope.tripDates.endDate;
  $scope.changeEndDate = function(newEndDate) { $scope.inputEndDate = newEndDate; };

  $scope.next = function() {
    if($scope.inputStartDate == '' || $scope.inputEndDate == '')
      $scope.showAlertBlank();
    else {
      if($scope.inputStartDate.getTime() > $scope.inputEndDate.getTime())
        $scope.showAlertDates();
      else {
        $rootScope.tripDates.startDate = $scope.inputStartDate;
        $rootScope.tripDates.endDate = $scope.inputEndDate;
        $state.go('tab.agent-where', {}, {reload: true});
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

  $scope.showAlertDates = function() {
    var alertPopup = $ionicPopup.alert({
      title: 'Invalid Dates',
      template: 'Trip End Date must be the same or after Trip Start Date!'
    });
    alertPopup.then(function(res) {
      console.log('Alert!');
    });
  };

  $scope.showPopup = function() {
    var s = $rootScope.tripDates.startDate;
    var e = $rootScope.tripDates.endDate;
    $scope.startDateString = (s.getMonth()+1).toString() + '/' + s.getDate().toString() + '/' + s.getFullYear().toString();
    $scope.endDateString = (e.getMonth()+1).toString() + '/' + e.getDate().toString() + '/' + e.getFullYear().toString();

    var myPopup = $ionicPopup.show({
      template: '<p>Trip Dates: {{startDateString}} - {{endDateString}}</p><div ng-if="appDetectedLocation == \'paris\'"><p>Trip Location: Paris, France</p></div><div ng-if="appDetectedLocation != \'paris\'"><p>Trip Location: San Francisco, California, USA</p></div>',
      title: 'Your Mingo Trip Has Been Set!',
      scope: $scope,
      buttons: [
        {
          text: 'Cancel Trip',
          type: 'button-small button-assertive',
          onTap: function(e) {
            $rootScope.tripSet = false;
            $rootScope.tripDates = {startDate: null, endDate: null};
            $rootScope.searchString = "Paris, France";
            $rootScope.mustDoList = [];
            $scope.showAlertCancelled();
            $state.go('tab.dash', {}, {reload: true});
          }
        },
        {
          text: 'Edit Trip',
          type: 'button-small button-royal',
          onTap: function(e) {
            $rootScope.tripSet = false;
            $state.go('tab.agent', {}, {reload: true});
          }
        },
        {
          text: 'Home',
          type: 'button-small button-positive',
          onTap: function(e) {
            $state.go('tab.dash', {}, {reload: true});
          }
        }
      ]
    });
    myPopup.then(function(res) {
      console.log('Tapped!', res);
    });
  };

  $scope.showAlertCancelled = function() {
    var alertPopup = $ionicPopup.alert({
      title: 'Trip Cancelled',
      template: 'Trip has been cancelled!'
    });
    alertPopup.then(function(res) {
      console.log('Alert!');
    });
  };

  //Page Guard for setTrip
  if($rootScope.tripSet)
    $scope.showPopup();
})

.controller('WhereCtrl', function($scope, $state, $rootScope, $ionicPopup) {
  $scope.searchString = $rootScope.searchString;
  $scope.stringChangedManually = false; //Fixing the weird two way update bug
  $scope.changeSearch = function(newString) { $scope.searchString = newString; $scope.stringChangedManually = true;};

  $scope.changeLocation = function() {
    if($rootScope.searchString == "Paris, France") {
      $rootScope.searchString = "San Francisco, California, USA";
      $scope.searchString = "San Francisco, California, USA";
    }
    else {
      $rootScope.searchString = "Paris, France";
      $scope.searchString = "Paris, France";
    }
    if($scope.stringChangedManually) {
      $state.go('tab.agent-where', {}, {reload: true});
      $scope.stringChangedManually = false;
    }
  };

  $scope.next = function() {
    //Match the string against paris, sf, and san francisco, clear list if necessary
    if($scope.searchString.toLowerCase().match('paris') != null) {
      if($rootScope.appDetectedLocation != 'paris')
        $rootScope.mustDoList = [];
      $rootScope.appDetectedLocation = 'paris';
      $state.go('tab.agent-mustdo', {}, {reload: true});
    }
    else if($scope.searchString.toLowerCase().match('sf') != null || $scope.searchString.toLowerCase().match('san') != null) {
      if($rootScope.appDetectedLocation != 'sfbay')
        $rootScope.mustDoList = [];
      $rootScope.appDetectedLocation = 'sfbay';
      $state.go('tab.agent-mustdo', {}, {reload: true});
    }
    else {
      $scope.showAlertInvalid();
    }
  };

  $scope.showAlertInvalid = function() {
    var alertPopup = $ionicPopup.alert({
      title: 'Unsupported Location',
      template: 'Location not yet supported! Please enter either Paris or San Francisco!'
    });
    alertPopup.then(function(res) {
      console.log('Alert!');
    });
  };

})

.controller('MustDoCtrl', function($scope, $state, $rootScope, $ionicPopup) {
  var s = $rootScope.tripDates.startDate;
  var e = $rootScope.tripDates.endDate;
  $scope.startDateString = (s.getMonth()+1).toString() + '/' + s.getDate().toString() + '/' + s.getFullYear().toString();
  $scope.endDateString = (e.getMonth()+1).toString() + '/' + e.getDate().toString() + '/' + e.getFullYear().toString();

  $scope.getDetails = function(attId) {
    $state.go('tab.agent-details', {attId: attId}, {reload: true});
  };

  $scope.removeEntry = function(entry) {
    //Find entry in list and remove
    for(var i=0; i<$rootScope.mustDoList.length; i++) {
      if($rootScope.mustDoList[i].id == entry.id) {
        $rootScope.mustDoList.splice(i, 1);
        break;
      }
    }
    $state.go('tab.agent-mustdo', {}, {reload: true});
  };

  $scope.setTrip = function() {
    $rootScope.tripSet = true;
    $scope.showPopup();
  }

  $scope.showPopup = function() {
    var myPopup = $ionicPopup.show({
      template: '<p>Trip Dates: {{startDateString}} - {{endDateString}}</p><div ng-if="appDetectedLocation == \'paris\'"><p>Trip Location: Paris, France</p></div><div ng-if="appDetectedLocation != \'paris\'"><p>Trip Location: San Francisco, California, USA</p></div>',
      title: 'Your Mingo Trip Has Been Set!',
      scope: $scope,
      buttons: [
        {
          text: 'Cancel Trip',
          type: 'button-small button-assertive',
          onTap: function(e) {
            $rootScope.tripSet = false;
            $rootScope.tripDates = {startDate: null, endDate: null};
            $rootScope.searchString = "Paris, France";
            $rootScope.mustDoList = [];
            $scope.showAlertCancelled();
            $state.go('tab.dash', {}, {reload: true});
          }
        },
        {
          text: 'Edit Trip',
          type: 'button-small button-royal',
          onTap: function(e) {
            $rootScope.tripSet = false;
            $state.go('tab.agent', {}, {reload: true});
          }
        },
        {
          text: 'Home',
          type: 'button-small button-positive',
          onTap: function(e) {
            $state.go('tab.dash', {}, {reload: true});
          }
        }
      ]
    });
    myPopup.then(function(res) {
      console.log('Tapped!', res);
    });
  };

  $scope.showAlertCancelled = function() {
    var alertPopup = $ionicPopup.alert({
      title: 'Trip Cancelled',
      template: 'Trip has been cancelled!'
    });
    alertPopup.then(function(res) {
      console.log('Alert!');
    });
  };

  //Page Guard
  if($rootScope.tripSet)
    $scope.showPopup();

})

.controller('AddAttractionCtrl', function($scope, $state, $rootScope, $ionicPopup, AttractionsParis, AttractionsSFBay) {
  if($scope.appDetectedLocation == 'sfbay') {
    $scope.attraction = AttractionsSFBay.get(0);
    $scope.attractions = AttractionsSFBay.all();
  }
  else {
    $scope.attraction = AttractionsParis.get(0);
    $scope.attractions = AttractionsParis.all();
  }

  $scope.attractionSelected = 0;

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
  };

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
  };

  $scope.add = function() {
    var curId = this.attraction.id;
    //Figure out if this is a duplicate
    var duplicateFlag = false;
    for(var i=0; i<$rootScope.mustDoList.length; i++) {
      if($rootScope.mustDoList[i].id == curId) {
        duplicateFlag = true;
        $scope.showAlertDuplicate();
      }
    }
    if(!duplicateFlag) {
      //Add attraction to Must Do List
      $rootScope.mustDoList.push({name: this.attraction.attraction, id: this.attraction.id});
      $state.go('tab.agent-mustdo', {}, {reload: true});
    }
  };

  $scope.showAlertDuplicate = function() {
    var alertPopup = $ionicPopup.alert({
      title: 'Duplicate Attraction',
      template: 'You already have this attraction in your list!'
    });
    alertPopup.then(function(res) {
      console.log('Alert!');
    });
  };

})

.controller('DetailsCtrl', function($scope, $state, $rootScope, $stateParams, AttractionsParis, AttractionsSFBay) {
  if($scope.appDetectedLocation == 'sfbay') {
    $scope.attraction = AttractionsSFBay.get(parseInt($stateParams.attId));
    $scope.attractions = AttractionsSFBay.all();
  }
  else {
    $scope.attraction = AttractionsParis.get(parseInt($stateParams.attId));
    $scope.attractions = AttractionsParis.all();
  }
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
    tempStringDate += (rems[i].startTime.getMonth()+1).toString() + '/' + rems[i].startTime.getDate().toString() + '/' + rems[i].startTime.getFullYear().toString();
    
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

.controller('DayCtrl', function($scope, $rootScope, $stateParams, $state, AttractionsParis, AttractionsSFBay, $ionicHistory) {
  $ionicHistory.clearHistory();
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

  