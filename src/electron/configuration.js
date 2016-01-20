'use strict';

var nconf = require('nconf').file({file: getUserHome() + '/.packetbeat-analyzer-config.json'});

function saveSettings(settingKey, settingValue) {
  nconf.set(settingKey, settingValue);
  nconf.save();
}

function readSettings(settingKey) {
  nconf.load();
  return nconf.get(settingKey);
}

function getUserHome() {
  return process.env[(process.platform == 'win32') ? 'USERPROFILE' : 'HOME'];
}

function setDefault() {
  if(!readSettings('es')) {
    saveSettings('es', { 'host': "localhost:9200" });
  }
}

function getConfiguration() {
  return nconf.load();
}

module.exports = {
  saveSettings: saveSettings,
  readSettings: readSettings,
  setDefault: setDefault,
  getConfiguration: getConfiguration
};