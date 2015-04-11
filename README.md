# sleepwalker
Sample app to show the usage of the insomnia plugin for Meteor/Cordova apps

Add [the insomnia plugin for Cordova](https://build.phonegap.com/plugins/842) to your [Meteor](http://meteor.com) application via 

`meteor add cordova:nl.x-services.plugins.insomnia@https://github.com/EddyVerbruggen/Insomnia-PhoneGap-Plugin/tarball/89374cb52b049fe4e9836e4b702591f35c875805`

You can then toggle sleepless mode using code similar to this:

    Template.counter.events({
      'click button': function () {
        if (Session.get('insomnia')) {
          Session.set('insomnia', false);
          if (Meteor.isCordova) {
            window.plugins.insomnia.allowSleepAgain();
          }
        } else {
          Session.set('insomnia', true);
          if (Meteor.isCordova) {
            window.plugins.insomnia.keepAwake();
          }
        }
      }
    });