// 播放器元素
const myaudio = document.querySelector("audio");
const b_play = document.querySelector(".play");
const b_pause = document.querySelector(".pause");
const b_fast_forward = document.querySelector(".fast_forward");
const b_fast_rewind = document.querySelector(".fast_rewind");
const t_audio_time_start = document.querySelector(".times .start");
const t_audio_time_end = document.querySelector(".times .end");
const v_audio_progress_bar = document.querySelector(".process_in");
const v_audio_progress_bg = document.querySelector(".opacity_progress_bar");
// 節目資訊元素
const t_audio_title = document.querySelector(".control info title");
const t_audio_intro = document.querySelector(".control info intro");
// 作者資訊元素
const t_profile_img = document.querySelector(".profile img");
const t_profile_name = document.querySelector(".porfile_info .name");
const t_profile_intro = document.querySelector(".porfile_info .intro");
// 狀態
let onplay = false 
let currentTime = ''
// const t_bufferBar = document.querySelector('.buffer')
// const t_duration = document.querySelector('.duration')
// const t_currentTime = document.querySelector('.currentTime')
// const t_volume = document.querySelector('.volume')
// const t_mute = document.querySelector('.mute')
// const t_autoplay = document.querySelector('.autoplay')
// const t_control = document.querySelector('.control')
// const t_currentSrc = document.querySelector('.currentSrc')
// const t_currentPercent = document.querySelector('.currentPercent')
// const t_end = document.querySelector('.end')
// const t_pause = document.querySelector('.pause')
// const t_timeStamp = document.querySelector('.timeStamp')
myaudio.addEventListener("timeupdate", e => {
  console.log(e);
  // t_control.textContent = "是否顯示控制器: " + e.target.controls;
  // t_bufferBar.textContent - "是否顯示緩衝條" + e.target.buffered.end;
  // t_autoplay.textContent = "是否自動播放: " + e.target.autoplay;
  // t_currentSrc.textContent = "檔案來源: " + e.target.currentSrc;
  // t_duration.textContent = "音軌總長: " + e.target.duration;
  // t_currentTime.textContent = "現在秒數:" + e.target.currentTime;
  // t_currentPercent.textContent =
  //   "播放進度:" +
  //   Math.round((e.target.currentTime / e.target.duration) * 100) +
  //   "%";
  // t_end.textContent = "是否播完:" + e.target.ended;
  // t_pause.textContent = "是否暫停中:" + e.target.paused;
  // t_volume.textContent = "音量(0~1):" + e.target.volume;
  // t_mute.textContent = "是否靜音:" + e.target.muted;
  // t_timeStamp.textContent = "timeStamp(意義不明):" + e.timeStamp;
  let progress =
    ((e.target.currentTime / e.target.duration) * 100).toFixed(2) + "%";
  console.log(progress);
  v_audio_progress_bar.style.width = progress;
  v_audio_progress_bg.style.width = progress;
  t_audio_time_start.textContent = formatSecond(
    e.target.currentTime.toFixed(0)
  );
  t_audio_time_end.textContent = formatSecond(
    e.target.duration.toFixed(0)
  );
});

function formatSecond(secs) {
  let date = new Date(null);
  date.setSeconds(secs); // specify value for SECONDS here
  let result = date.toISOString().substr(11, 8);
  return result
}

function btn_switch () {
  onplay = !onplay
  if(onplay){ // 沒在播放 顯示播放
    b_play.style.display = 'none'
    b_pause.style.display = 'inline-block'
  }else{ // 正在播放 顯示暫停
    b_play.style.display = 'inline-block'
    b_pause.style.display = 'none'
  }
}

b_play.addEventListener("click", () => {
  myaudio.play();
  btn_switch()
});
b_pause.addEventListener("click", () => {
  myaudio.pause();
  btn_switch()
});

b_fast_forward.addEventListener("click", () => {
  myaudio.currentTime += 20
  myaudio.play();
});
b_fast_rewind.addEventListener("click", () => {
  myaudio.currentTime -= 20
  myaudio.play();
});
