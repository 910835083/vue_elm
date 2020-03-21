
<template>
      <div class="msite">
        <!--首页头部-->
        <HeaderTop :title="adderss.name">
          <router-link class="header_search" slot="left" to="/search">
            <i class="iconfont icon-sousuo"></i>
          </router-link>
          <router-link class="header_login" slot="right" :to="userInfo._id ? '/userInfo' :'/login'">
            <span class="header_login_text" v-if="!userInfo._id">登录|注册</span>
             <span class="header_login_text" v-else>
              <i class="iconfont icon-geren1"></i> 
             </span>
          </router-link>
        </HeaderTop>
        <!--首页导航-->
        <nav class="msite_nav">
          <div class="swiper-container" v-if="categorys.length">
            <div class="swiper-wrapper">
              <div class="swiper-slide" v-for="(categorys,index) in categorysArr" :key="index">
                <a href="javascript:" class="link_to_food" v-for="(category,index) in categorys" :key="index">
                  <div class="food_container">
                    <img :src="baseurl+category.image_url">
                  </div>
                  <span>{{category.title}}</span>
                </a>
              </div>
            </div>
            <!-- Add Pagination -->
            <div class="swiper-pagination"></div>
          </div>
          <img src="../../assets/msite_back.svg" alt="back" v-else>
        </nav>
        <!--首页附近商家-->
        <div class="msite_shop_list">
          <div class="shop_header">
            <i class="iconfont icon-xuanxiang"></i>
            <span class="shop_header_title">附近商家</span>
          </div>
        <ShopList></ShopList>
        </div>
      </div>
</template>

<script>
import HeaderTop from '../../components/HeaderTop/HeaderTop'
import ShopList from '../../components/ShopList/ShopList'
import {mapState} from 'vuex'
import Swiper from 'swiper'
import 'swiper/css/swiper.min.css'
export default {
    data() {
      return {
        baseurl:'http://fuss10.elemecdn.com'
      }
    },
    mounted(){
    this.$store.dispatch('getCategorys')
    this.$store.dispatch('getShops')  
    },
    components:{ 
      HeaderTop,
      ShopList
      },
    computed:{
      ...mapState(['adderss','categorys','userInfo']),
      categorysArr(){
        const {categorys} = this
        const arr = []
        let minArr = []
        categorys.forEach(c => {
          if(minArr.length===8){
            minArr = []
          }
          if(minArr.length===0){
            arr.push(minArr)
          }
          minArr.push(c)

        })
        return arr
      }
    },
    watch:{
      categorys(value){  
      this.$nextTick( () => {
                  new Swiper ('.swiper-container', {
          loop: true, // 循环模式选项
          
          // 如果需要分页器
          pagination: {
            el: '.swiper-pagination',
          },
        })
        
      })
      }
    }
}
</script>

<style lang="stylus" scoped>
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
 &.msite  //首页
          width 100%
         .msite_nav
            bottom-border-1px(#e4e4e4)
            margin-top 45px
            height 200px
            background #fff
            .swiper-container
              width 100%
              height 100%
              .swiper-wrapper
                width 100%
                height 100%
                .swiper-slide
                  display flex
                  justify-content center
                  align-items flex-start
                  flex-wrap wrap
                  .link_to_food
                    width 25%
                    .food_container
                      display block
                      width 100%
                      text-align center
                      padding-bottom 10px
                      font-size 0
                      img
                        display inline-block
                        width 50px
                        height 50px
                    span
                      display block
                      width 100%
                      text-align center
                      font-size 13px
                      color #666
              .swiper-pagination
                >span.swiper-pagination-bullet-active
                  background #02a774
          .msite_shop_list
            top-border-1px(#e4e4e4)
            margin-top 10px
            background #fff
            .shop_header
              padding 10px 10px 0
              .shop_icon
                margin-left 5px
                color #999
              .shop_header_title
                color #999
                font-size 14px
                line-height 20px
            .shop_container
              margin-bottom 50px
              .shop_list
                .shop_li
                  bottom-border-1px(#f1f1f1)
                  width 100%
                  >a
                    clearFix()
                    display block
                    box-sizing border-box
                    padding 15px 8px
                    width 100%
                    .shop_left
                      float left
                      box-sizing border-box
                      width 23%
                      height 75px
                      padding-right 10px
                      .shop_img
                        display block
                        width 100%
                        height 100%
                    .shop_right
                      float right
                      width 77%
                      .shop_detail_header
                        clearFix()
                        width 100%
                        .shop_title
                          float left
                          width 200px
                          color #333
                          font-size 16px
                          line-height 16px
                          font-weight 700
                          &::before
                            content '品牌'
                            display inline-block
                            font-size 11px
                            line-height 11px
                            color #333
                            background-color #ffd930
                            padding 2px 2px
                            border-radius 2px
                            margin-right 5px
                        .shop_detail_ul
                          float right
                          margin-top 3px
                          .supports
                            float left
                            font-size 10px
                            color #999
                            border 1px solid #f1f1f1
                            padding 0 2px
                            border-radius 2px
                      .shop_rating_order
                        clearFix()
                        width 100%
                        margin-top 18px
                        margin-bottom 8px
                        .shop_rating_order_left
                          float left
                          color #ff9a0d
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
                          .rating_section
                            float left
                            font-size 10px
                            color #ff6000
                            margin-left 4px
                          .order_section
                            float left
                            font-size 10px
                            color #666
                            transform scale(.8)
                        .shop_rating_order_right
                          float right
                          font-size 0
                          .delivery_style
                            transform-origin 35px 0
                            transform scale(.7)
                            display inline-block
                            font-size 12px
                            padding 1px
                            border-radius 2px
                          .delivery_left
                            color #fff
                            margin-right -10px
                            background-color #02a774
                            border 1px solid #02a774
                          .delivery_right
                            color #02a774
                            border 1px solid #02a774
                      .shop_distance
                        clearFix()
                        width 100%
                        font-size 12px
                        .shop_delivery_msg
                          float left
                          transform-origin 0
                          transform scale(.9)
                          color #666
                        .segmentation
                          color #ccc

</style>

