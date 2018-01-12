<template>
    <div class="player" v-show="playList.length>0">
        <transition name="normal"
            @enter="enter"
            @after-enter="afterEnter"
            @leave="leave"
            @after-leave="afterLeave"
        >
            <div class="normal-player" v-show="fullScreen">
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
    
                <div class="middle" ref="middleWrapper" @touchstart="middleTouchStart"
                                    @touchmove="middleTouchMove"
                                    @touchend="middleTouchEnd"
                >
                    <div class="middle-l" ref="cd">
                        <div class="cd-wrapper" ref="cdWrapper">
                            <div class="cd" ref="imageWrapper">
                                <img ref="image" class="image" :src="currentSong.image" :class="playClass"/>
                            </div>
                        </div>
                        <div class="playingLyric">
                        {{playingLyric}}
                        </div>
                    </div>
                    <scroll class="middle-r" ref="lyricList" :data="currentLyric && currentLyric.lines">
                         <!--在v-if=currentLyric外面加一层lyric-wrapper 是保证scroll的第一个子元素存在-->
                        <div class="lyric-wrapper">
                            <div v-if="currentLyric">
                                <p ref="lyricLine" class="lyric-txt" v-for="(item, index) in currentLyric.lines" :class="{'current-txt':index===currentLineNum}">
                                    {{item.txt}}
                                </p>
                            </div>
                        </div>
                    </scroll>
                </div>
                <div class="bottom">
                    <div class="dot-wrapper">
                        <span :class="{'active': currentShow==='cd'}"></span>
                        <span :class="{'active': currentShow==='lyric'}"></span>
                    </div>
                    <div class="progress-wrapper">
                        <span class="time">{{format(currentTime)}}</span>
                        <div class="progress-bar-wrapper">
                            <progress-bar :percent="percent" @progressChanging="progressChanging" @progressChange="progressChange"></progress-bar>
                        </div>
                        <span class="time">{{format(durantionTime)}}</span>
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
   
            </div>
        </transition>
        <transition name="mini">
            <div class="mini-wrapper" v-show="!fullScreen" @click="openPlayer">
                <div class="icon">
                    <div ref="miniImageWrapper">
                        <img ref="miniImage" :src="currentSong.image" :class="playClass"/>
                    </div>
                </div>
                <div class="song-desc">
                    <h1 class="song-name">{{currentSong.name}}</h1>
                    <span class="singer-name">{{currentSong.singer}}</span>
                </div>
                <div class="control">
                    <i :class="miniPlayIcon" @click.stop="togglePlaying"></i>
                </div>
                <div class="control">
                    <i class="icon-playlist"></i>
                </div>
            </div>
        </transition>
    <audio ref="audio" @timeupdate="updateTime" @ended="end"></audio>
  </div>
  
</template>
<script>
// 不写export 组件也可使用
import {mapGetters, mapMutations} from 'vuex';
import {playerMixin} from '@common/js/mixin';
import progressBar from '@base/progress-bar/progress-bar';
import {playMode} from '@common/js/config';
import animations from 'create-keyframe-animation';
import {prefixStyle} from '@common/js/dom';
import Lyric from 'lyric-parser';
import scroll from '@base/scroll/scroll';

const transform = prefixStyle('transform');
// const trasitionDuration = prefixStyle('transitionDuration');

export default {
  mixins: [playerMixin],
  data () {
    return {
      currentTime: 0,
      playClass: 'play',
      currentLyric: null,
      currentLineNum: 0,
      playingLyric: '',
      currentShow: 'cd',
      touch: {}
    }
  },
  components: {
    progressBar,
    scroll
  },
  computed: {
    durantionTime () {
      return this.currentSong.duration;
    },
    ...mapGetters([
      'fullScreen',
      'currentSong',
      'playing',
      'currentIndex',
      'mode',
      'playList'
    ]),
    playIcon () {
      let icon = '';
      icon = this.playing ? 'icon-pause' : 'icon-play';
      return icon;
    },
    miniPlayIcon () {
      let icon = '';
      icon = this.playing ? 'icon-pause-mini' : 'icon-play-mini';
      return icon;
    },
    percent () {
      return this.currentTime / this.durantionTime;
    }
  },
  methods: {
    enter (el, done) {
      const {x, y, scale} = this._getPosAndScale();
      let animation = {
        0: {
          transform: `translate3d(${x}px, ${y}px, 0), scale(${scale})`
        },
        60: {
          transform: 'translate3d(0, 0, 0) scale(1.1)'
        },
        100: {
          transform: 'translate3d(0, 0, 0) scale(1)'
        }
      }
      animations.registerAnimation({
        name: 'move',
        animation,
        presets: {
          duration: 400,
          easing: 'linear'
        }
      })
      animations.runAnimation(this.$refs.cdWrapper, 'move', done);
    },
    afterEnter () {
      animations.unregisterAnimation('move');
      this.$refs.cdWrapper.style.animation = '';
    },
    leave (el, done) {
      this.$refs.cdWrapper.style.transition = 'all 0.4s';
      let {x, y, scale} = this._getPosAndScale();
      this.$refs.cdWrapper.style[transform] = `translate3d(${x}px, ${y}px, 0) scale(${scale})`;
      let timer = setTimeout(done, 400);
      this.$refs.cdWrapper.addEventListener('transitionend', function () {
        clearTimeout(timer);
        done();
      })
    },
    afterLeave () {
      this.$refs.cdWrapper.style.transition = '';
      this.$refs.cdWrapper.style[transform] = '';
    },
    openPlayer () {
      this.setFullScreen(true);
    },
    closePlayer () {
      this.setFullScreen(false);
    },
    togglePlaying () {
      this.setPlayingState(!this.playing);
    },
    prev () {
      console.log(['this.currentIndex', this.currentIndex]);
      let newCurrentIndex = this.currentIndex;
      newCurrentIndex = newCurrentIndex - 1;
      this.setCurrentIndex(newCurrentIndex);
    },
    next () {
      let newCurrentIndex = this.currentIndex;
      newCurrentIndex = newCurrentIndex + 1;
      this.setCurrentIndex(newCurrentIndex);
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
    progressChanging (percent) {
      // this.percent = percent; 不能改变计算属性
      // console.log(['changeProgress', percent]);
      this.currentTime = this.durantionTime * percent;
      // console.log(['currentTime', this.currentTime]);
      // console.log(['this.percent', this.percent]);
    },
    progressChange (percent) {
      this.currentTime = this.durantionTime * percent;
      this.$refs.audio.currentTime = this.currentTime;
      if (!this.playing) {
        this.togglePlaying();
      }
    },
    end () {
      if (this.mode === playMode.loop) {
        this.currentTime = 0;
        this.$refs.audio.currentTime = this.currentTime;
        this.$refs.audio.play();
        if (!this.playing) {
          this.setPlayingState(true);
        }
      } else {
        let newCurrentIndex = this.currentIndex;
        newCurrentIndex = newCurrentIndex + 1;
        this.setCurrentIndex(newCurrentIndex);
      }
    },
    _getPosAndScale () {
      // min播放器的旋转cd的位置，由小的cd的位置到大的cd的位置
      const targetWidth = 40; // min cd 的宽
      const paddingLeft = 40; // min cd 中心 距离左侧窗口的距离
      const paddingBottom = 30; // min cd 距离底部窗口的距离
      const paddingTop = 80; // 大 cd距离顶部窗口的距离
      const normalWidth = window.innerWidth * 0.8;
      const scale = targetWidth / normalWidth;
      const x = -(window.innerWidth / 2 - paddingLeft);
      const y = window.innerHeight - paddingTop - normalWidth / 2 - paddingBottom;
      return {
        x,
        y,
        scale
      }
    },
    _getLyric () {
      this.currentSong.getLyric().then((lyric) => {
        this.currentLyric = new Lyric(lyric, this._handleLyric);
        console.log(['lyric', this.currentLyric]);
        this.currentLyric.seek(this.currentTime * 1000);
      }).catch(() => {
        this.currentLyric = null;
      })
    },
    _handleLyric ({lineNum, txt}) {
      this.currentLineNum = lineNum;
      if (lineNum > 5) {
        let p = this.$refs.lyricLine[lineNum - 5];
        this.$refs.lyricList.scrollToElement(p, 1000)
      }
      this.playingLyric = txt;
    },
    _syncWrapperTransform (wrapper, inner) {
      let imageWrapper = this.$refs[wrapper];
      let image = this.$refs[inner];
      let iTransfrom = getComputedStyle(image)[transform];
      let wTransform = getComputedStyle(imageWrapper)[transform];
      imageWrapper.style[transform] = wTransform === 'none' ? iTransfrom : wTransform.concat(' ', iTransfrom);
    },
    middleTouchStart (e) {
      this.touch = e.touches[0];
      this.touch.startX = this.touch.clientX;
      this.touch.deltaX = 0;
    },
    middleTouchMove (e) {
      this.touch.deltaX = e.touches[0].clientX - this.touch.startX;
      let middleWidth = this.$refs.middleWrapper.offsetWidth;
      // this.$refs.lyricList.$el.style[trasitionDuration] = '';
      if (this.currentShow === 'cd') {
        if (this.touch.deltaX < 0) {
          this.$refs.lyricList.$el.style[transform] = `translate3d(${this.touch.deltaX}px, 0, 0)`;
          let opacity = 1 - (Math.abs(this.touch.deltaX) / middleWidth);
          this.$refs.cd.style.filter = `opacity(${opacity})`;
        }
      } else if (this.currentShow === 'lyric') {
        if (this.touch.deltaX > 0) {
          this.$refs.lyricList.$el.style[transform] = `translate3d(${this.touch.deltaX - middleWidth}px, 0, 0)`;
          let opacity = Math.abs(this.touch.deltaX) / middleWidth;
          this.$refs.cd.style.filter = `opacity(${opacity})`;
        }
      }
    },
    middleTouchEnd () {
      let middleWidth = this.$refs.middleWrapper.offsetWidth;
      let limitWidth = middleWidth / 3;
      // this.$refs.lyricList.$el.style[trasitionDuration] = '300ms';
      if (this.currentShow === 'cd') {
        if (this.touch.deltaX < 0 && this.touch.deltaX > -limitWidth) {
          this.$refs.lyricList.$el.style[transform] = `translate3d(0, 0, 0)`;
          this.$refs.cd.style.filter = 'opacity(1)';
          this.currentShow = 'cd';
        } else if (this.touch.deltaX < 0 && this.touch.deltaX < -limitWidth) {
          this.$refs.lyricList.$el.style[transform] = `translate3d(${-middleWidth}px, 0, 0)`;
          this.$refs.cd.style.filter = 'opacity(0)';
          this.currentShow = 'lyric';
        }
      } else if (this.currentShow === 'lyric') {
        if (this.touch.deltaX > 0 && this.touch.deltaX < limitWidth) {
          this.$refs.lyricList.$el.style[transform] = `translate3d(${-middleWidth}px, 0, 0)`;
          this.$refs.cd.style.filter = 'opacity(0)';
          this.currentShow = 'lyric';
        } else if (this.touch.deltaX > 0 && this.touch.deltaX > limitWidth) {
          this.$refs.lyricList.$el.style[transform] = `translate3d(0, 0, 0)`;
          this.$refs.cd.style.filter = 'opacity(1)';
          this.currentShow = 'cd';
        }
      }
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
      this._getLyric();
    },
    playing (newPlaying) {
      let audio = this.$refs.audio;
      newPlaying ? audio.play() : audio.pause();
      this.playClass = newPlaying ? 'play' : 'play stop';
      if (!newPlaying) {
        // this._syncWrapperTransform('imageWrapper', 'image');
        // this._syncWrapperTransform('miniImageWrapper', 'miniImage')
      }
    }
  }
}
</script>
<style lang="scss">
@import 'src/common/style/variable';
@import 'src/common/style/mixin';
.player{
    .normal-player{
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
            white-space: nowrap;
            .middle-l{
                display: inline-block;
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
                        .stop{
                            animation-play-state: paused;
                        }
                    }
                }
                .playingLyric{
                  position: absolute;
                  left: 10%;
                  width: 80%;
                  margin: 30px auto 0;
                  text-align: center;
                  color: $color-text-l;
                  font-size: $font-size-medium; 
                }
            }
            .middle-r{
              display: inline-block;
              width: 100%;
              height: 100%;
             // transform: translate3d(100%, 0, 0);
              overflow: hidden;
              transition: all 0.4s;
              .lyric-wrapper{
                width: 100%;
                text-align: center;
                .lyric-txt{
                    line-height: 32px;
                    color: $color-text-l;
                    font-size: $font-size-medium;
                    &.current-txt{
                        color: $color-text;
                    }
                }
              }
            }
        }
        .bottom{
            position: absolute;
            width: 100%;
            bottom: 50px;
            .dot-wrapper{
                text-align: center;
                span{
                    display: inline-block;
                    width: 8px;
                    height: 8px;
                    border-radius: 50%;
                    background: $color-text-l;
                    margin:0 5px;
                    &.active{
                        width: 20px;
                        border-radius: 4px;
                        background: $color-text-ll;
                    }
                }
            }
            .progress-wrapper{
                width: 80%;
                margin: 10px auto;
                display: flex;
                align-items: center;
                .progress-bar-wrapper {
                    flex: 1;
                }
                .time{
                    flex: 0 0 30px;
                    font-size: $font-size-small;
                    color: $color-text;
                    &:nth-of-type(1){
                        text-align: left;
                    }
                    &:nth-of-type(2){
                        text-align: right;
                    }
                }

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
    .mini-wrapper{
        width: 100%;
        height: 60px;
        position: absolute;
        left: 0;
        bottom: 0;
        display: flex;
        align-items: center;
        z-index: 120;
        background: $color-highlight-background;
        .icon {
            flex: 0 0 40px;
            width: 40px;
            height: 40px;
            padding: 0 10px 0 20px;
            img{
                width: 100%;
                height: 100%;
                border-radius: 50%;
                &.play{
                    animation: rotate 20s linear infinite;
                }
                &.stop{
                    animation-play-state: paused;
                }
            }
        }
        .song-desc{
            flex: 1;
            display: flex;
            flex-direction: column;
            justify-content: center;
            line-height: 20px;
            .song-name{
                font-size: $font-size-medium;
                color: $color-text;
                height: 20px;
            }
            .singer-name{
                font-size: $font-size-small;
                color: $color-text-d;
                height: 20px;
            }
        }
        .control{
            flex: 0 0 40px;
            width: 40px;
            height: 40px;
            font-size: 30px;
            color: $color-theme-d;
            display: flex;
            align-items: center;
            
        }
    }
}

</style>