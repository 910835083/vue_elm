<template>
  <div class="star" :class="'star-'+size">
    <span class="star-item " v-for="(sc,index) in starClasses" :class="sc" :key="index"></span>
</div>
</template>

<script>
const CLASS_ON = 'on'
const CLASS_HALF = 'half'
const CLASS_OFF = 'off'
export default {
    props:{
        score:Number,
        size:Number
    },
    computed:{
      starClasses (){
        const {score} = this
        const scs = []
        const intner = Math.floor(score)
        for (let i = 0; i< intner; i++) {
          scs.push(CLASS_ON)
        }
        if(score*10-intner*10>=5){
          scs.push(CLASS_HALF)
        }
        while (scs.length<5){
          scs.push(CLASS_OFF)
        }
      return scs
      }
    }
}
</script>

<style lang="stylus">
$green = #02a774;
$yellow = #F5A100;
$bc = #e4e4e4;

// 一像素下边框
bottom-border-1px($color)
  position relative
  border none
  &:after
    content ''
    position absolute
    left 0
    bottom 0
    width 100%
    height 1px
    background-color $color
    transform scaleY(0.5)

// 一像素上边框
top-border-1px($color)
  position relative
  &::before
    content ''
    position absolute
    z-index 200
    left 0
    top 0
    width 100%
    height 1px
    background-color $color

//根据像素比缩放1px像素边框
@media only screen and (-webkit-device-pixel-ratio: 2 )
  .border-1px
    &::before
      transform scaleY(.5)

@media only screen and (-webkit-device-pixel-ratio: 3 )
  .border-1px
    &::before
      transform scaleY(.333333)

//根据像素比来使用 2x图 3x图
bg-image($url)
  background-image: url($url + "@2x.png")
  @media (-webkit-min-device-pixel-ratio: 3),(min-device-pixel-ratio: 3)
    background-image: url($url + "@3x.png")

//清除浮动
clearFix()
  *zoom 1
  &::after
    content ''
    display block
    clear both
.star //2x图 3x图
                            float left
                            font-size 0
                            .star-item
                              display inline-block
                              background-repeat no-repeat
                            &.star-48
                              .star-item
                                width 20px
                                height 20px
                                margin-right 22px
                                background-size 20px 20px
                                &:last-child
                                  margin-right: 0
                                &.on
                                  bg-image('../../assets/stars/star48_on')
                                &.half
                                  bg-image('../../assets/stars/star48_half')
                                &.off
                                  bg-image('../../assets/stars/star48_off')
                            &.star-36
                              .star-item
                                width 15px
                                height 15px
                                margin-right 6px
                                background-size 15px 15px
                                &:last-child
                                  margin-right 0
                                &.on
                                  bg-image('../../assets/stars/star36_on')
                                &.half
                                  bg-image('../../assets/stars/star36_half')
                                &.off
                                  bg-image('../../assets/stars/star36_off')
                            &.star-24
                              .star-item
                                width 10px
                                height 10px
                                margin-right 3px
                                background-size 10px 10px
                                &:last-child
                                  margin-right 0
                                &.on
                                  bg-image('../../assets/stars/star24_on')
                                &.half
                                  bg-image('../../assets/stars/star24_half')
                                &.off
                                  bg-image('../../assets/stars/star24_off')
</style>