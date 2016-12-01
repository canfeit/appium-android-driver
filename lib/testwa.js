var  exec = require('child_process').exec
    , spawn = require('child_process').spawn
    ,fs = require('fs')

let testwa = {};

testwa.startLogcat = function startLogcat(adb,opts,androidDriver) {
    let adbPath = adb.sdkRoot+'/adb.exe';
    // let ifLogcat = opts.genLogcat;
    let logcatProcess;
    let sessionId = androidDriver.sessionId;
    let logcatPath = opts.logcatPath

    adb.shell(['logcat','-c']);
    logcatProcess = spawn(adbPath,['-s',adb.curDeviceId,'shell','logcat']);
    logcatProcess.stdout.on('data', function(data) {
        fs.appendFile(logcatPath+'/' + sessionId + '.log', data.toString(), function(err){
          if (err) throw err;
          // console.log('logcat datas \'s saved!');
        });
    });
    androidDriver.logcatProcess = logcatProcess;
};

export default testwa;
