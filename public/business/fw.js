
window.onload = function () {

    var init = document.getElementById('init');
    var numberOfChannels = document.getElementById('numberOfChannels');
    var bitDepth = document.getElementById('bitDepth');
    var format = document.getElementById('format');
    var record_button = document.getElementById('record_button');
    var stop_recording_button = document.getElementById('stop_recording_button');
    var play_button = document.getElementById('play_button');
    var pause_button = document.getElementById('pause_button');

    var recordingslist = document.getElementById('recordingslist');

    init.addEventListener('click', function () {

        if (!FWRecorder.isReady) {
            return;
        }

        FWRecorder.configure(bitDepth.value, 100, 100, 0);
        FWRecorder.setUseEchoSuppression(true);
        FWRecorder.setLoopBack(false);

        init.disabled = true;
        record_button.disabled = false;

    });

    // 开始录音
    record_button.addEventListener('click', function(){
        FWRecorder.record('audio', 'audio.wav');
        record_button.classList.add('hide');
        stop_recording_button.classList.remove('hide');
    });

    // 结束录音
    stop_recording_button.addEventListener('click', function(){
        FWRecorder.stopRecording('audio');
        record_button.classList.remove('hide');
        stop_recording_button.classList.add('hide');
    });

    play_button.addEventListener('click', function(){
        FWRecorder.playBack('audio');
        play_button.classList.add('hide');
        pause_button.classList.remove('hide');
    });

    pause_button.addEventListener('click', function(){
        FWRecorder.pausePlayBack('audio');
        play_button.classList.remove('hide');
        pause_button.classList.add('hide');
    });


}
