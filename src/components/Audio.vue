<template>
  <div class="audioConatainer">
    <div class="audioIcon" @click="handlePlay">
      <img :src="isPlay ? playIcon : pauseIcon" alt="" />
    </div>
    <div class="audioContent">
      <audio :src="audioUrl"></audio>
      <div class="audioBar">
        <div class="audioStart">{{ audioCurrentTime }}</div>
        <div class="audioProgress">
          <!-- <div class="progressBar"></div>
          <div class="progressPortion" ref="progressPortionRef"></div> -->

          <van-progress :percentage="audioProgress" pivot-text=" " />
        </div>

        <div class="audioEnd">{{ audioDuration }}</div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { defineProps, ref } from "vue";
import playIcon from "../assets/playIcon.png";
import pauseIcon from "../assets/pauseIcon.png";

import moment from "moment";

const progressPortionRef = ref(null);

const props = defineProps({
  audioUrl: {
    type: String,
    default: "",
  },
});

const audio = new Audio(props.audioUrl);
const audioDuration = ref("00:00");
const audioCurrentTime = ref("00:00");
const audioProgress = ref(0);

const isPlay = ref(false);
const isEnd = ref(false);

audio.addEventListener("loadedmetadata", function () {
  audioDuration.value = moment(audio.duration * 1000).format("mm:ss");
  console.log(audioDuration.value);
});
audio.addEventListener("play", function () {
  console.log("Audio is playing...", audio.currentTime);
});

audio.addEventListener("pause", function () {
  console.log("Audio is paused...");
});

audio.addEventListener("timeupdate", function () {
  audioCurrentTime.value = moment(audio.currentTime * 1000).format("mm:ss");
  audioProgress.value = (audio.currentTime / audio.duration) * 100;

  progressPortionRef.value.style.width = audioProgress.value + "%";
});
audio.addEventListener("ended", function () {
  isPlay.value = false;
  isEnd.value = true;
  // progressPortionRef.value.style.transition = "none";
  // progressPortionRef.value.style.width = "0%";
});

const handlePlay = () => {
  if (isPlay.value) {
    audio.pause();
    isPlay.value = false;
  } else {
    audio.play();
    isPlay.value = true;
    if (isEnd.value) {
      audioProgress.value = 0;
      progressPortionRef.value.style.width = "0%";
      isEnd.value = false;
      nextTick(() => {
        progressPortion.style.transition = "all 0.3s linear";
        setTimeout(() => {
          audio.play();
          isPlay.value = true;
        }, 0);
      });
    } else {
      audio.play();
      isPlay.value = true;
    }
  }
};

audio.load();
</script>
<style lang="scss" scoped>
.audioConatainer {
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 52px;
  background-color: #f7f8fb;
  .audioIcon {
    height: 104px;
    width: 104px;
    img {
      width: 100%;
      height: 100%;
    }
  }
  .audioContent {
    flex: 1;
    .audioBar {
      display: flex;
      justify-content: space-between;
      align-items: center;
      .audioStart {
        margin: 0 24px 0 10px;
        font-size: 24px;
        font-weight: 400;
        line-height: 34px;
        color: #81818b;
      }
      .audioProgress {
        flex: 1;
        .progressBar {
          width: 100%;
          height: 8px;
          background-color: #ededed;
          border-radius: 4px;
          transform: translateY(50%);
        }
        .progressPortion {
          width: 0%;
          height: 8px;
          background-color: #525058;
          border-radius: 4px;
          transform: translateY(-50%);
          transition: all 0.3s linear;
        }
        :deep(.van-progress) {
          height: 8px;
          background-color: #ededed;
          border-radius: 4px;
          .van-progress__portion {
            background-color: #525058;
          }
          .van-progress__pivot {
            height: 18px;
            width: 18px;
            min-width: 0;
            border-radius: 50%;
            background-color: #525058;
            transform: translate(-5%, -50%);
          }
        }
      }
      .audioEnd {
        margin: 0 40px 0 24px;
        font-size: 24px;
        font-weight: 400;
        line-height: 34px;
        color: #81818b;
      }
    }
  }
}
</style>
