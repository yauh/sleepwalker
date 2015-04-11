if (Meteor.isClient) {
  // counter starts at 0

  Meteor.startup(function () {
    // code to run on client at startup
  });

  Session.setDefault('counter', 0);
  Session.setDefault('insomnia', false);
  Tracker.autorun(function () {
    var counterHandle = Meteor.setInterval(function () {
      var count = Session.get('counter');
      count++
      Session.set('counter', count);
    }, 1000);
  })

  Template.counter.helpers({
    counter: function () {
      return Session.get('counter');
    },
    status: function () {
      switch (Session.get('insomnia')) {
      case true:
        return 'awake';
      case false:
        return 'tired';
      default:
        return 'undefined status'
      }
    }
  });

  Template.counter.events({
    'click button': function (event, template) {
      event.stopImmediatePropagation();
      if (Session.get('insomnia')) {
        console.log('Enabling sleep again');
        Session.set('insomnia', false);
        if (Meteor.isCordova) {
          console.log('this only works within Cordova');
          window.plugins.insomnia.allowSleepAgain();
        }
      } else {
        console.log('No more sleep');
        Session.set('insomnia', true);
        if (Meteor.isCordova) {
          console.log('this only works within Cordova');
          window.plugins.insomnia.keepAwake();
        }
      }
    }
  });
}

if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
  });
}