if (!Recorder.isRecordingSupported()) {
    ns.screenLogger("Recording features are not supported in your browser.");
} else {

    var recorder;
    var flag;

    init.addEventListener("click", function () {
        init.disabled = true;
        reset.disabled = false;
        control.disabled = false;
   
        numberOfChannels.disabled = true;
        bitDepth.disabled = true;
        format.disabled = true;

        recorder = ns.createRecorder[format.value]();

        flag = 'start';

        control.onclick = function () {
            if (flag === 'start') {
                recorder.start().catch(function (e) {
                    ns.screenLogger('Error encountered:', e.message);
                });
            } else {
                recorder.stop();
            }
        };

        recorder.onstart = function () {
            ns.screenLogger('Recorder is started');
            flag = 'stop';
            control.innerHTML = '结束录音';
        };

        recorder.onstop = function () {
            ns.screenLogger('Recorder is stopped');
            flag = 'start';
            control.innerHTML = '开始录音';
        };

        recorder.onstreamerror = function (e) {
            ns.screenLogger('Error encountered: ' + e.message);
        };

        recorder.ondataavailable = function (typedArray) {
            ns.createElement[format.value](typedArray);
        };
    });

    reset.addEventListener("click", function () {
        numberOfChannels.disabled = false;
        bitDepth.disabled = false;
        format.disabled = false;
        init.disabled = false;
        reset.disabled = true;
        control.disabled = true;
    });
}