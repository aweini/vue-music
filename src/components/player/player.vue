<template>
  <div class="player" v-show="fullScreen">
    <div class="background">
      <!--div设置了opacity为透明或filter模糊都会影像到内部内容,设置它的index为－1让她不和其他在同一个层上就不会影像其他-->
      <img class="background-image" :src="currentSong.image" />
    </div>
    <div class="top">
      <h1 class="title">{{currentSong.name}}</h1>
      <h2 class="subtitle">{{currentSong.singer}}</h2>
      <div class="back">
        <i class="icon-back" @click="closePlayer"></i>
      </div>
    </div>
    
    <div class="middle">
      <div class="middle-l">
        <div class="cd-wrapper">
          <div class="cd">
            <img class="image play" :src="currentSong.image"/>
          </div>
        </div>
      </div>
    </div>
    <div class="bottom">
      <div class="progress-bar-wrapper">
        {{format(currentTime)}}<progress-bar :percent="percent" @changeProgress="changeProgress"></progress-bar>{{format(durantionTime)}}
      </div>
      <div class="operators">
        <div class="operator-item i-left">
          <i :class="iconMode" @click="changeMode"></i>
        </div>
        <div class="operator-item i-left">
          <i class="icon-prev" @click="prev"></i>
        </div>
        <div class="operator-item i-center">
          <i :class="playIcon" @click="togglePlaying"></i>
        </div>
        <div class="operator-item i-right">
          <i class="icon-next" @click="next"></i>
        </div>
        <div class="operator-item i-right">
          <i class="icon-not-favorite"></i>
        </div>
      </div>
    </div>
    <audio ref="audio" @timeupdate="updateTime"></audio>
  </div>
</template>
<script>
// 不写export 组件也可使用
import {mapGetters, mapMutations} from 'vuex';
import {playerMixin} from '@common/js/mixin';
import progressBar from '@base/progress-bar/progress-bar';
export default {
  mixins: [playerMixin],
  data () {
    return {
      currentTime: 0
    }
  },
  components: {
    progressBar
  },
  computed: {
    durantionTime () {
      return this.currentSong.duration;
    },
    ...mapGetters([
      'fullScreen',
      'currentSong',
      'playing',
      'currentIndex'
    ]),
    playIcon () {
      let icon = '';
      icon = this.playing ? 'icon-pause' : 'icon-play';
      return icon;
    },
    percent () {
      return this.currentTime / this.durantionTime;
    }
  },
  methods: {
    closePlayer () {
      this.setFullScreen(false);
    },
    togglePlaying () {
      this.setPlayingState(!this.playing);
    },
    prev () {
      console.log(['this.currentIndex', this.currentIndex]);
      this.setCurrentIndex(this.currentIndex--);
    },
    next () {
      this.setCurrentIndex(this.currentIndex++);
    },
    updateTime (e) {
      this.currentTime = e.target.currentTime;
    },
    format (time) {
      time = time | 0;
      let m = time / 60 | 0;
      let s = time % 60;
      s = s < 10 ? `0${s}` : s;
      time = `${m}:${s}`;
      return time;
    },
    changeProgress (percent) {
      // this.percent = percent; 不能改变计算属性
      console.log(['changeProgress', percent]);
      this.currentTime = this.durantionTime * percent;
      this.$refs.audio.currentTime = this.currentTime;
      console.log(['currentTime', this.currentTime]);
      console.log(['this.percent', this.percent]);
    },
    ...mapMutations({
      setFullScreen: 'SET_FULL_SCREEN',
      setPlayingState: 'SET_PLAYING_STATE',
      setCurrentIndex: 'SET_CURRENT_INDEX'
    })
  },
  watch: {
    currentSong (newSong) {
      this.$refs.audio.src = newSong.url;
      this.$refs.audio.play();
    },
    playing (newPlaying) {
      let audio = this.$refs.audio;
      newPlaying ? audio.play() : audio.pause();
    }
  }
}
</script>
<style lang="scss">
@import 'src/common/style/variable';
@import 'src/common/style/mixin';
.player{
    position: fixed;
    top: 0;
    bottom: 0;
    width: 100%;
    background: $color-background;
    color: $color-text;
    .background{
        position: absolute;
        width: 100%;
        height: 100%;
        opacity: 0.6;
        filter: blur(20px);
        z-index: -1;
        .background-image{
            width: 100%;
            height: 100%;
        }
    }
    .top{
        position: relative;
        margin-bottom: 25px;
        .title{
            width: 70%;
            height: 40px;
            line-height: 40px;
            margin: 0 auto;
            text-align: center;
            @include nowrap();
            font-size: $font-size-large;
        }
        .subtitle{
            width: 100%;
            text-align: center;
            font-size: $font-size-medium;
            @include nowrap();
            line-height: 20px;
        }
        .back{
            position: absolute;
            left: 0px;
            top: 6px;
            transform: rotate(-90deg);
            .icon-back{
                padding: 9px;
                color: $color-theme;
                font-size: $font-size-large-x;
            }
        }
    }
    .middle{
        position: fixed;
        top: 80px;
        bottom: 170px;
        width: 100%;
        .middle-l{
            width: 100%;
            height: 100%;
            .cd-wrapper{
                position: relative;
                width: 80%;
                height: 0;
                padding-top: 80%;
                margin: 0 auto;
                .cd{
                    position: absolute;
                    left: 0;
                    top: 0;
                    width: 100%;
                    height: 100%;
                    border-radius: 50%;
                    .image{
                        width: 100%;
                        height: 100%;
                        border-radius: 50%;
                        box-sizing: border-box;
                        border: 10px solid rgba(255, 255, 255, 0.1);
                    }
                    .play{
                        animation: rotate 20s linear infinite;
                    }
                }
            }
        }
    }
    .bottom{
        position: absolute;
        width: 100%;
        bottom: 50px;
        .progress-bar-wrapper{
            width: 80%;
            margin: 10px auto;
        }
        .operators{
          display: flex;
          text-align: center;
          align-items: center;
          .operator-item{
            flex: 1;
            font-size: 30px;
            color: $color-theme;
          }
          .i-left{
            text-align: right;
          }
          .i-center{
            font-size: 40px;
            padding: 0 20px;
          }
          .i-right{
            text-align: left;
          }
        }
    }
@keyframes rotate{
    0% {
        transform: rotate(0);
    }
    100% {
        transform: rotate(360deg);
    }
}    
}
</style>