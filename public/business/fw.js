
window.onload = function () {



    var init = document.getElementById('init');
    var reset = document.getElementById('reset');
    // var numberOfChannels = document.getElementById('numberOfChannels');
    var bitDepth = document.getElementById('bitDepth');
    // var format = document.getElementById('format');
    var record_button = document.getElementById('record_button');
    var stop_recording_button = document.getElementById('stop_recording_button');
    var play_button = document.getElementById('play_button');
    var pause_button = document.getElementById('pause_button');

    var recordingslist = document.getElementById('recordingslist');

    // 播放面板
    var voice_player = document.getElementById('video-player');
    // 保存按钮
    var save_btn = document.getElementById('voice_save');

    // 创建
    init.addEventListener('click', function () {

        if (!FWRecorder.isReady) {
            FWRecorder.record('audio', 'audio.wav');
        }

        FWRecorder.configure(bitDepth.value, 100, 50, 0);
        FWRecorder.setUseEchoSuppression(true);
        FWRecorder.setLoopBack(false);

        init.disabled = true;
        reset.disabled = false;
        record_button.disabled = false;

    });

    // 重置
    reset.addEventListener('click', function(){
        bitDepth.value = 8;
        init.disabled = false;
        reset.disabled = true;
        record_button.disabled = true;
        voice_player.classList.add('hide');
    });

    
    // 开始录音
    record_button.addEventListener('click', function(){
        FWRecorder.record('audio', 'audio.wav');
        // 切换按钮
        record_button.classList.add('hide');
        stop_recording_button.classList.remove('hide');
        // 隐藏播放面板
        voice_player.classList.add('hide');
        save_btn.innerHTML = '';
    });

    // 结束录音
    stop_recording_button.addEventListener('click', function(){
        // 停止录音
        FWRecorder.stopRecording('audio');
        // 切换按钮
        record_button.classList.remove('hide');
        stop_recording_button.classList.add('hide');
        // 显示播放面板
        voice_player.classList.remove('hide');
        
    });

    var voice_save = document.getElementById('voice_save');

    voice_save.addEventListener('click', function(){

        // 音频数据
        var dataBlob = FWRecorder.getBlob('audio');
        var filename = new Date().toISOString() + ".wav";

        if (window.navigator.msSaveBlob) {
            window.navigator.msSaveBlob(dataBlob, filename);
        }
    });

    play_button.addEventListener('click', function(){

        // 切换按钮
        play_button.classList.add('hide');
        pause_button.classList.remove('hide');

        // 播放进度
        var currentTime;
        // 音频时长
        var duration = FWRecorder.duration('audio');

        var slideLeft = $('#progress_slide').position().left;

        if (slideLeft <= 0 || slideLeft >= 50) {
            // 播放
            FWRecorder.playBack('audio');
        } else {
            currentTime = duration / 50 * slideLeft;
            FWRecorder.playBackFrom('audio', currentTime);
        }
        
        var timer = setInterval(function(){
            // 当前播放时间
            currentTime = FWRecorder.getCurrentTime('audio');
            // 进度条
            var progress = parseInt(currentTime / duration * 50);
            $('#progress_slide').css({ left: progress + 'px' });
            $('#progress_active').css({ width: progress + 'px' });
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

    var progress_slide = document.getElementById('progress_slide');
    var progress_bar = document.getElementById('progress_bar');

    progress_slide.onmousedown = function (ev) {
        ev = ev || window.event;
        // 计算偏移距离
        var disX = ev.clientX - progress_slide.offsetLeft;
        // 开始拖动
        document.onmousemove = function (ev) {
            ev = ev || window.event;
            var l = ev.clientX - disX; // 滑块left偏移量
            var w = progress_bar.clientWidth; // 进度条宽度
            // 限制范围
            if (l < 0) {
                l = 0;
            };

            if (l > w - progress_slide.offsetWidth) {
                l = w - progress_slide.offsetWidth;
            };
            // 滑块位置
            progress_slide.style.left = l + "px";

        };

        //停止拖动 动作写在document上-----------------------------
        document.onmouseup = function () {
            document.onmousemove = null;
        };
        //阻止默认事件
        return false;
    };

    progress_bar.addEventListener('click', function(ev){
        ev = ev || window.event;
        // 计算偏移距离
        var disX = ev.clientX - progress_bar.offsetLeft;
        // 滑块位置
        slide.style.left = disX + "px";
    })

    // 静音切换
    var volume_up = document.getElementById('volume_up');
    var volume_off = document.getElementById('volume_off');
    var volume_active = document.getElementById('volume_active');
    var volume_slide = document.getElementById('volume_slide');

    volume_up.addEventListener('click', function () {
        // 切换按钮
        volume_off.classList.remove('hide');
        volume_up.classList.add('hide');
        // 音量归零
        volume_active.style.width = 0;
        volume_slide.style.left = 0;
    });

    volume_off.addEventListener('click', function () {
        // 切换按钮
        volume_up.classList.remove('hide');
        volume_off.classList.add('hide');
        // 音量最大
        volume_active.style.width = '25px';
        volume_slide.style.left = '25px';
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
}
