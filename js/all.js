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
const t_audio_title = document.querySelector(".control info title");
const t_audio_intro = document.querySelector(".control info intro");
// 作者資訊元素
const t_profile_img = document.querySelector(".profile img");
const t_profile_name = document.querySelector(".porfile_info .name");
const t_profile_intro = document.querySelector(".porfile_info .intro");
// 狀態
let onplay = false 
let currentTime = ''
// Visualizations
let canvas, ctx, source, context, analyser, fbc_array, bars, bar_x
let audio = new Audio();
audio.src = 'sounds/sounds.mp3';
audio.controls = false ; // 不顯示預設播放器
audio.autoplay = false ;
function initMp3Player(){
	document.querySelector('body').appendChild(audio);
	context = new AudioContext(); // AudioContext object instance
	analyser = context.createAnalyser(); // AnalyserNode method
	canvas = document.getElementById('analyser_render');
	ctx = canvas.getContext('2d');
	// Re-route audio playback into the processing graph of the AudioContext
	source = context.createMediaElementSource(audio); 
	source.connect(analyser);
	analyser.connect(context.destination);
	frameLooper();
}
function frameLooper(){
	window.requestAnimationFrame(frameLooper);
	fbc_array = new Uint8Array(analyser.frequencyBinCount);
	analyser.getByteFrequencyData(fbc_array);
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	ctx.fillStyle = '#fff'; 
	bars = 200;
	for (var i = 0; i < bars; i++) {
		bar_x = i * 2;
		bar_width = 0.8;
		bar_height = -(fbc_array[i]/3);
		ctx.fillRect(bar_x, canvas.height, bar_width, bar_height);
	}
}

audio.addEventListener("timeupdate", e => {
  console.log(e);

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

// Seconds to H:M:S
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


window.addEventListener("load", initMp3Player, false);

b_play.addEventListener("click", () => {
  audio.play();
  btn_switch()
});
b_pause.addEventListener("click", () => {
  audio.pause();
  btn_switch()
});

b_fast_forward.addEventListener("click", () => {
  audio.currentTime += 20
  audio.play();
});
b_fast_rewind.addEventListener("click", () => {
  audio.currentTime -= 20
  audio.play();
});
