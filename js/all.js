// 資料
let audio_list = []
let nowAudio_detail
let $lists = $('.lists')
// 播放器元素
const b_play = document.querySelector(".play");
const b_pause = document.querySelector(".pause");
const b_fast_forward = document.querySelector(".fast_forward");
const b_fast_rewind = document.querySelector(".fast_rewind");
const t_audio_time_start = document.querySelector(".times .start");
const t_audio_time_end = document.querySelector(".times .end");
const v_audio_progress_bar = document.querySelector(".process_in");
const v_audio_progress_bg = document.querySelector(".opacity_progress_bar");
// 節目資訊元素
const $t_audio_title = $(".control .info .title");
const $t_audio_intro = $(".control .info .intro");
// 作者資訊元素
const $t_profile_img = $(".profile img");
const $t_profile_name = $(".porfile_info .name");
const $t_profile_intro = $(".porfile_info .intro");
// 狀態
let onplay = false;
let currentTime = "";
// Visualizations
let canvas, ctx, source, context, analyser, fbc_array, bars, bar_x;
let audio
// init
function getData() {
  fetch('js/list.json')
  .then(function(response) {
    return response.json();
  })
  .then(function(myJson) {
    audio_list = myJson
    initlist()
  });
}
function initlist() { 
  audio_list.forEach(item=>{
    $lists.append(`
    <div class="item">
      <div class="content">
        <div class="index">${item.id+1}</div>
        <div class="thumb" data-key=${item.id}>
          <img src="${item.thumb}" alt="" />
          <div class="play">
            <i class="material-icons play"> play_circle_filled </i>
          </div>
        </div>
        <div class="info">
          <div class="item_name">${item.title}</div>
          <div class="item_info">${item.intro}</div>
        </div>
      </div>
      <div class="item_duration">00:04:33</div>
    </div>`)
  })
}
function initAudioData(nowTargetIndex) {
  fetch('js/data.json')
  .then(function(response) {
    return response.json();
  })
  .then(function(myJson) {
    nowAudio_detail = myJson[nowTargetIndex]
    initMp3Player(nowAudio_detail)
    initMp3Info(nowAudio_detail)
    audio.play()
    btn_switch(true);
  });
}
function initMp3Player(nowAudio_detail) {
  console.log(nowAudio_detail);
  $('audio').remove()
  audio = new Audio
  audio.src = nowAudio_detail.content.work.url;
  audio.controls = false;
  audio.autoplay = false;
  document.querySelector("body").appendChild(audio);
  context = new AudioContext(); // AudioContext object instance
  analyser = context.createAnalyser(); // AnalyserNode method
  canvas = document.getElementById("analyser_render");
  ctx = canvas.getContext("2d");
  // Re-route audio playback into the processing graph of the AudioContext
  source = context.createMediaElementSource(audio);
  source.connect(analyser);
  analyser.connect(context.destination);
  audio.addEventListener("timeupdate", e => {
    // console.log(e);
    let progress =
      ((e.target.currentTime / e.target.duration) * 100).toFixed(2) + "%";
    v_audio_progress_bar.style.width = progress;
    v_audio_progress_bg.style.width = progress;
    t_audio_time_start.textContent = formatSecond(
      e.target.currentTime.toFixed(0)
    );
    t_audio_time_end.textContent = formatSecond(e.target.duration.toFixed(0));
  });
  frameLooper();
}
function initMp3Info(nowAudio_detail) { 
  $t_audio_title.text(nowAudio_detail.content.work.title)
  $t_audio_intro.text(nowAudio_detail.content.work.subtitle)
}
// 音訊視覺化 Canvas
function frameLooper() {
  window.requestAnimationFrame(frameLooper);
  fbc_array = new Uint8Array(analyser.frequencyBinCount);
  analyser.getByteFrequencyData(fbc_array);
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = "#fff";
  bars = 200;
  for (var i = 0; i < bars; i++) {
    bar_x = i * 2;
    bar_width = 0.8;
    bar_height = -(fbc_array[i] / 3);
    ctx.fillRect(bar_x, canvas.height, bar_width, bar_height);
  }
}
// Seconds to H:M:S
function formatSecond(secs) {
  let date = new Date(null);
  date.setSeconds(secs); // specify value for SECONDS here
  let result = date.toISOString().substr(11, 8);
  return result;
}
// 播放暫停按鈕切換
function btn_switch(sta) {
  onplay = sta;
  if (onplay) {
    // 沒在播放 顯示播放
    b_play.style.display = "none";
    b_pause.style.display = "inline-block";
  } else {
    // 正在播放 顯示暫停
    b_play.style.display = "inline-block";
    b_pause.style.display = "none";
  }
}

window.addEventListener("load", getData); // list data
window.addEventListener("load", initAudioData(0));

$lists.on('click','.thumb',(e)=>{
  let nowTargetIndex = e.currentTarget.dataset.key;
  initAudioData(nowTargetIndex)
})
b_play.addEventListener("click", () => {
  audio.play();
  btn_switch(true);
});
b_pause.addEventListener("click", () => {
  audio.pause();
  btn_switch(false);
});
b_fast_forward.addEventListener("click", () => {
  audio.currentTime += 20;
  audio.play();
});
b_fast_rewind.addEventListener("click", () => {
  audio.currentTime -= 20;
  audio.play();
});
