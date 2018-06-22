var ns = {};
ns.createRecorder = {};
ns.createElement = {};
ns.createRecorder.wav = function () {
    var recorder = new Recorder({
        monitorGain: parseInt(monitorGain.value, 10),
        recordingGain: parseInt(recordingGain.value, 10),
        numberOfChannels: parseInt(numberOfChannels.value, 10),
        wavBitDepth: parseInt(bitDepth.value, 10),
        encoderPath: "./vendor/waveWorker.min.js"
    });

    return recorder;
}

ns.createRecorder.pcm = function () {
    var recorder = new Recorder({
        monitorGain: parseInt(monitorGain.value, 10),
        recordingGain: parseInt(recordingGain.value, 10),
        numberOfChannels: parseInt(numberOfChannels.value, 10),
        wavBitDepth: parseInt(bitDepth.value, 10),
        encoderPath: "./vendor/pcmWorker.min.js"
    });

    return recorder;
}

ns.createElement.wav = function (typedArray) {
    var dataBlob = new Blob([typedArray], { type: 'audio/wav' });
    var fileName = new Date().toISOString() + ".wav";
    var url = URL.createObjectURL(dataBlob);

    var audio = document.createElement('audio');
    audio.controls = true;
    audio.src = url;

    var link = document.createElement('a');
    link.href = url;
    link.download = fileName;
    link.innerHTML = link.download;

    var li = document.createElement('li');
    li.appendChild(link);
    li.appendChild(audio);

    recordingslist.appendChild(li);
}

ns.createElement.pcm = function (typedArray) {
    var dataBlob = new Blob([typedArray], { type: 'audio/pcm' });
    var fileName = new Date().toISOString() + ".pcm";
    var url = URL.createObjectURL(dataBlob);

    var link = document.createElement('a');
    link.href = url;
    link.download = fileName;
    link.innerHTML = link.download;

    var li = document.createElement('li');
    li.appendChild(link);

    recordingslist.appendChild(li);
}

ns.screenLogger = function(text, data) {
    log.innerHTML = text + " " + (data || '');
}