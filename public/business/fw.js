
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

        FWRecorder.configure(bitDepth.value, 100, 50, 0);
        FWRecorder.setUseEchoSuppression(true);
        FWRecorder.setLoopBack(false);

        init.disabled = true;
        record_button.disabled = false;

    });

    // 开始录音
    record_button.addEventListener('click', function(){
        FWRecorder.record('audio', 'audio.wav');
        // 切换按钮
        record_button.classList.add('hide');
        stop_recording_button.classList.remove('hide');
    });

    // 结束录音
    stop_recording_button.addEventListener('click', function(){
        FWRecorder.stopRecording('audio');
        // 切换按钮
        record_button.classList.remove('hide');
        stop_recording_button.classList.add('hide');
    });

    play_button.addEventListener('click', function(){

        // 切换按钮
        play_button.classList.add('hide');
        pause_button.classList.remove('hide');

        // 播放进度
        var currentTime;
        // 音频时长
        var duration = FWRecorder.duration('audio');

        var slideLeft = $('#slide').position().left;

        if (slideLeft <= 0 || slideLeft >= 95) {
            // 播放
            FWRecorder.playBack('audio');
        } else {
            currentTime = duration / 100 * slideLeft;
            FWRecorder.playBackFrom('audio', currentTime);
        }
        
        var timer = setInterval(function(){
            // 当前播放时间
            currentTime = FWRecorder.getCurrentTime('audio');
            // 进度条
            var progress = parseInt(currentTime / duration * 100);
            $('#slide').css({ left: progress + 'px' });
            $('#played').css({ width: progress + 'px' });
            // 显示当前播放时间
            $('#playedTime').text(formatTime(currentTime.toFixed(0)));
            // 当前播放时间大于音频时长
            if(currentTime >= duration){
                $('#played').css({ width: '0px' });
                // 停止播放
                FWRecorder.stopPlayBack();
                // 清除循环
                clearInterval(timer);
            }
        }, 35);

    });

    pause_button.addEventListener('click', function(){
        // 暂停
        FWRecorder.pausePlayBack('audio');
        // 切换按钮
        play_button.classList.remove('hide');
        pause_button.classList.add('hide');
    });


    function formatTime(seconds) {
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

    var slide = document.getElementById('slide');
    var progressBar = document.getElementById('progressBar');

    slide.onmousedown = function (ev) {
        ev = ev || window.event;
        // 计算偏移距离
        var disX = ev.clientX - slide.offsetLeft;
        // 开始拖动
        document.onmousemove = function (ev) {
            ev = ev || window.event;
            var l = ev.clientX - disX; // 滑块left偏移量
            var w = progressBar.clientWidth; // 进度条宽度
            // 限制范围
            if (l < 0) {
                l = 0;
            };

            if (l > w - slide.offsetWidth) {
                l = w - slide.offsetWidth;
            };
            // 滑块位置
            slide.style.left = l + "px";

        };

        //停止拖动 动作写在document上-----------------------------
        document.onmouseup = function () {
            document.onmousemove = null;
        };
        //阻止默认事件
        return false;
    };

    progressBar.addEventListener('click', function(ev){
        ev = ev || window.event;
        // 计算偏移距离
        var disX = ev.clientX - progressBar.offsetLeft;
        // 滑块位置
        slide.style.left = disX + "px";
    })
}
