var ns = {};
ns.createRecorder = {};
ns.createElement = {};
ns.createRecorder.wav = function () {
    var recorder = new Recorder({
        monitorGain: 0,
        recordingGain: 1,
        numberOfChannels: parseInt(numberOfChannels.value, 10),
        wavBitDepth: parseInt(bitDepth.value, 10),
        encoderPath: "vendor/h5/waveWorker.min.js"
    });

    return recorder;
}

ns.createRecorder.pcm = function () {
    var recorder = new Recorder({
        monitorGain: 0,
        recordingGain: 1,
        numberOfChannels: parseInt(numberOfChannels.value, 10),
        wavBitDepth: parseInt(bitDepth.value, 10),
        encoderPath: "vendor/h5/pcmWorker.min.js"
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
    log.style = "display:block;";
    log.innerHTML = text + " " + (data || '');
}

ns.ieScreenLogger = function(text, data){
    var log = $('#ie_log');
    log.css({display:'block'});
    log.text(text + " " + (data || ''));
}

ns.horDrag = function(subDom, activeDom, wrapDom){
    subDom.onmousedown = function (ev) {
        ev = ev || window.event;
        // 计算偏移距离
        var disX = ev.clientX - subDom.offsetLeft;
        // 开始拖动
        document.onmousemove = function (ev) {
            ev = ev || window.event;
            var l = ev.clientX - disX; // 滑块left偏移量
            var w = wrapDom.clientWidth; // 进度条宽度
            // 限制范围
            if (l < 0) {
                l = 0;
            };

            if (l > w - subDom.offsetWidth) {
                l = w - subDom.offsetWidth;
            };
            // 滑块位置
            subDom.style.left = l + "px";
            activeDom.style.width = l + "px";

        };

        //停止拖动 动作写在document上-----------------------------
        document.onmouseup = function () {
            document.onmousemove = null;
        };
        //阻止默认事件
        return false;
    };   
}

// 时间格式化
ns.formatTime = function(seconds) {
    var min = Math.floor(seconds / 60),
        second = seconds % 60,
        hour, newMin, time;

    if (min > 60) {
        hour = Math.floor(min / 60);
        newMin = min % 60;
    }

    if (second < 10) { second = '0' + second; }
    // if (min < 10) { min = '0' + min; }

    return time = hour ? (hour + ':' + newMin + ':' + second) : (min + ':' + second);
}