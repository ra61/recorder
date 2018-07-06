

var H5Container = document.getElementById('H5_container');
var IeContainer = document.getElementById('Ie_container');

if (!Recorder.isRecordingSupported()) {

    // 隐藏H5页面
    H5Container.classList.add('hide');
    // 显示IE页面
    IeContainer.classList.remove('hide');

    // 初始录音机
    var init = document.getElementById('ie_init');
    // 重置录音机
    var reset = document.getElementById('ie_reset');
    var numberOfChannels = document.getElementById('ie_numberOfChannels');
    var wavSampleRate = document.getElementById('ie_wavSampleRate');
    var bitDepth = document.getElementById('ie_bitDepth');
    var format = document.getElementById('ie_format');
    // 开始录音
    var record_button = document.getElementById('record_button');
    // 停止录音
    var stop_recording_button = document.getElementById('stop_recording_button');
    // 播放按钮
    var play_button = document.getElementById('play_button');
    // 暂停按钮
    var pause_button = document.getElementById('pause_button');
    // 播放面板
    var voice_player = document.getElementById('video_player');
    // 保存按钮
    var save_btn = document.getElementById('voice_save');

    // 创建
    init.addEventListener('click', function () {

        if (!FWRecorder.isReady) {
            FWRecorder.record('audio', 'audio.wav');
        }
        
        FWRecorder.configure(wavSampleRate.value, 100, 50, 0);
        FWRecorder.setUseEchoSuppression(true);
        FWRecorder.setLoopBack(false);

        init.disabled = true;
        reset.disabled = false;
        record_button.disabled = false;

    });

    // 重置
    reset.addEventListener('click', function () {
        bitDepth.value = 8;
        init.disabled = false;
        reset.disabled = true;
        record_button.disabled = true;
        voice_player.classList.add('hide');
    });


    // 开始录音
    record_button.addEventListener('click', function () {
        FWRecorder.record('audio', 'audio.wav');
        // 切换按钮
        record_button.classList.add('hide');
        stop_recording_button.classList.remove('hide');
        // 隐藏播放面板
        voice_player.classList.add('hide');
        save_btn.innerHTML = '';
        // 提示
        ns.ieScreenLogger("Recorder is started");
    });

    // 结束录音
    stop_recording_button.addEventListener('click', function () {
        // 停止录音
        FWRecorder.stopRecording('audio');
        // 切换按钮
        record_button.classList.remove('hide');
        stop_recording_button.classList.add('hide');
        // 显示播放面板
        voice_player.classList.remove('hide');
        // 提示
        ns.ieScreenLogger("Recorder is stopped ");

    });

    // 保存按钮
    var voice_save = document.getElementById('voice_save');

    // 保存音频
    voice_save.addEventListener('click', function () {

        // 音频数据
        if(format.value === 'wav'){
            var dataBlob = FWRecorder.getBlob('audio');
            var filename = new Date().toISOString() + ".wav";
        }else{
            var dataBlob = FWRecorder.getPCMBlob('audio');
            var filename = new Date().toISOString() + ".pcm";
        }
        
        // 调用ie特有API
        if (window.navigator.msSaveBlob) {
            window.navigator.msSaveBlob(dataBlob, filename);
        }
    });

    // 播放视频
    play_button.addEventListener('click', function () {

        // 切换按钮
        play_button.classList.add('hide');
        pause_button.classList.remove('hide');

        // 播放进度
        var currentTime;
        // 音频时长
        var duration = FWRecorder.duration('audio');
        // 滑块偏移量
        var slideLeft = $('#progress_slide').position().left;

        if (slideLeft <= 0 || slideLeft >= 50) {
            // 从头播放
            FWRecorder.playBack('audio');
        } else {
            // 从设置时间节点播放
            currentTime = duration / 50 * slideLeft;
            FWRecorder.playBackFrom('audio', currentTime);
        }

        var timer = setInterval(function () {
            // 当前播放时间
            currentTime = FWRecorder.getCurrentTime('audio');
            // 进度条
            var progress = parseInt(currentTime / duration * 50);
            // 滑块偏移量
            $('#progress_slide').css({ left: progress + 'px' });
            // 播放条长度
            $('#progress_active').css({ width: progress + 'px' });
            // 显示当前播放时间
            $('#playedTime').text(ns.formatTime(currentTime.toFixed(0)));
            // 当前播放时间大于音频时长
            if (currentTime >= duration) {
                // 滑块归零
                $('#progress_slide').css({ left: '0px' });
                // 播放条归零
                $('#progress_active').css({ width: '0px' });
                // 停止播放
                FWRecorder.stopPlayBack();
                // 清除循环
                clearInterval(timer);
            }
        }, 35);

    });

    // 暂停视频
    pause_button.addEventListener('click', function () {
        // 暂停
        FWRecorder.pausePlayBack('audio');
        // 切换按钮
        play_button.classList.remove('hide');
        pause_button.classList.add('hide');
    });

    var progress_slide = document.getElementById('progress_slide');
    var progress_active = document.getElementById('progress_active');
    var progress_bar = document.getElementById('progress_bar');

    // 水平拖拽
    ns.horDrag(progress_slide, progress_active, progress_bar);

    progress_bar.addEventListener('click', function (ev) {
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
    var volume_bar = document.getElementById('volume_bar');

    // 水平拖拽
    ns.horDrag(volume_slide, volume_active, volume_bar);

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

} else {

    // 显示H5页面
    H5Container.classList.remove('hide');
    // 隐藏IE页面
    IeContainer.classList.add('hide');

    var init = document.getElementById('init');
    var reset = document.getElementById('reset');
    var numberOfChannels = document.getElementById('numberOfChannels');
    var wavSampleRate = document.getElementById('wavSampleRate');
    var bitDepth = document.getElementById('bitDepth');
    var format = document.getElementById('format');
    var startButton = document.getElementById('start_recording');
    var stopButton = document.getElementById('stop_recording');

    var recorder;
    var flag;

    // 初始化录音机
    init.addEventListener("click", function () {
        init.disabled = true;
        reset.disabled = false;
        startButton.disabled = false;
   
        numberOfChannels.disabled = true;
        wavSampleRate.disabled = true;
        bitDepth.disabled = true;
        format.disabled = true;

        // 重建录音机
        recorder = ns.createRecorder[format.value]();

        // 开始录音
        startButton.onclick = function () {
            recorder.start().catch(function (e) {
                ns.screenLogger('Error encountered:', e.message);
            });
        };

        // 结束录音
        stopButton.onclick = function () {
            recorder.stop();
        };

        // 开始录音成功之后响应
        recorder.onstart = function () {
            ns.screenLogger('Recorder is started');
            startButton.classList.add('hide');
            stopButton.classList.remove('hide');
        };

        // 结束录音成功之后响应
        recorder.onstop = function () {
            ns.screenLogger('Recorder is stopped');
            stopButton.classList.add('hide');
            startButton.classList.remove('hide');
        };

        // 出现错误时打印日志
        recorder.onstreamerror = function (e) {
            ns.screenLogger('Error encountered: ' + e.message);
        };

        // 录音数据可用时创建播放器面板
        recorder.ondataavailable = function (typedArray) {
            ns.createElement[format.value](typedArray);
        };
    });

    // 重置录音机
    reset.addEventListener("click", function () {
        numberOfChannels.disabled = false;
        wavSampleRate.disabled = false;
        bitDepth.disabled = false;
        format.disabled = false;
        init.disabled = false;
        reset.disabled = true;
        startButton.disabled = true;
    });
}