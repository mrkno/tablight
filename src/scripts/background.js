'use strict';

console.log('Tab Search starting!');

chrome.runtime.onInstalled.addListener(function (details) {
  if (details.reason == "install") {
    var permissionUrl = chrome.extension.getURL('../views/permission.html');

    chrome.tabs.create({ url: permissionUrl });
  } else if (details.reason == "update") {
    var thisVersion = chrome.runtime.getManifest().version;
    console.log("Updated from " + details.previousVersion + " to " + thisVersion + "!");
    var noticeUrl = chrome.extension.getURL('../views/permission.html');

    chrome.tabs.create({ url: noticeUrl });
  }
});

chrome.commands.onCommand.addListener(function (command) {
  // var contentScript = chrome.extension.getURL('scripts/contentscript.js');
  var contentStyle = chrome.extension.getURL('styles/main.css');

  chrome.tabs.query({ active: true }, function (tabs) {
    var currentTab = tabs[0];
    console.log(contentScript);
    chrome.tabs.insertCSS({ file: 'styles/main.css' });
  });
});

var actions = {
  facebook: {

  }
};

function lookup(type) {
  actions[type];
}

function handleSpotlight(request) {
  var port = this;

  if (request.hasOwnProperty('query')) {
    var query = request.query.trim();

    if (query.indexOf('fb ') === 0) {

      chrome.tabs.query({ url: '*://www.facebook.com/*' }, function (tabs) {
        if (tabs.length < 1) {
          chrome.tabs.create({
            url: 'https://www.facebook.com',
            active: false
          }, function () {
            lookup('facebook');
          });
        } else {
          lookup('facebook');
        }
      });
    }
    // chrome.tabs.query({active: false}, function(tabs) {
    //   chrome.tabs.sendMessage(port.sender.tab.id, {tabs: tabs});
    // });
  } else if (request.hasOwnProperty('activate')) {
    chrome.tabs.update(request.activate, { active: true });
  }
}
