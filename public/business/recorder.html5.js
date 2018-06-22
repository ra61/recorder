if (!Recorder.isRecordingSupported()) {
    ns.screenLogger("Recording features are not supported in your browser.");
} else {

    var recorder;

    init.addEventListener("click", function () {
        init.disabled = true;
        start.disabled = false;
        monitorGain.disabled = true;
        recordingGain.disabled = true;
        numberOfChannels.disabled = true;
        bitDepth.disabled = true;
        format.disabled = true;

        recorder = ns.createRecorder[format.value]();

        pause.addEventListener("click", function () { recorder.pause(); });
        resume.addEventListener("click", function () { recorder.resume(); });
        stopButton.addEventListener("click", function () { recorder.stop(); });
        start.addEventListener("click", function () {
            recorder.start().catch(function (e) {
                ns.screenLogger('Error encountered:', e.message);
            });
        });

        recorder.onstart = function () {
            ns.screenLogger('Recorder is started');
            start.disabled = resume.disabled = true;
            pause.disabled = stopButton.disabled = false;
        };

        recorder.onstop = function () {
            ns.screenLogger('Recorder is stopped');
            start.disabled = false;
            pause.disabled = resume.disabled = stopButton.disabled = true;
        };

        recorder.onpause = function () {
            ns.screenLogger('Recorder is paused');
            pause.disabled = start.disabled = true;
            resume.disabled = stopButton.disabled = false;
        };

        recorder.onresume = function () {
            ns.screenLogger('Recorder is resuming');
            start.disabled = resume.disabled = true;
            pause.disabled = stopButton.disabled = false;
        };

        recorder.onstreamerror = function (e) {
            ns.screenLogger('Error encountered: ' + e.message);
        };

        recorder.ondataavailable = function (typedArray) {
            ns.createElement[format.value](typedArray);
        };
    });

    reset.addEventListener("click", function () {
        monitorGain.disabled = false;
        recordingGain.disabled = false;
        numberOfChannels.disabled = false;
        bitDepth.disabled = false;
        format.disabled = false;
        init.disabled = false;
        start.disabled = true;
        recorder = undefined;
    });
}