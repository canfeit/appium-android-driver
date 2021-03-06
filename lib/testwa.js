import {logger} from 'appium-support';

const log = logger.getLogger('Testwa');

let exec = require('child_process').exec
    , spawn = require('child_process').spawn
    , fs = require('fs');

let testwa = {};

testwa.startLogcat = function startLogcat(adb, deviceLogPath, sessionId) {
  let adbPath = adb.sdkRoot + '/platform-tools/adb';
  // log.debug(`adb path: ${adbPath}`);
  let logcatProcess;
  let logcatPath = deviceLogPath;

  adb.shell(['logcat', '-c']);

  logcatProcess = spawn(adbPath, ['-s', adb.curDeviceId, 'shell', 'logcat', '*:E']);
  logcatProcess.stdout.on('data', function (data) {
    fs.appendFile(logcatPath + '/' + sessionId + '.log', data.toString(), function (err) {
      if (err) throw err;
    });
  });
  return logcatProcess;
};

export default testwa;
