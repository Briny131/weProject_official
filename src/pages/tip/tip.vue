<template>
<div style="height:100%;background:#eee;" >
        <div class="title">
            <swiper style="width:80%;margin:0 10%;height:80%;position:absolute;bottom:5rpx" :indicator-dots="indicatorDots" :autoplay="autoplay" :interval="interval" :duration="duration" :circular="circular" @change="swiperChange" @animationfinish="animationfinish">
                <div v-for="(item,index) in imgUrls" :key="index">
                <swiper-item>
                    <image :src="item" class="slide-image" />
                </swiper-item>
                </div>
            </swiper>
        </div>
        <div class="body">
            <div id="line"></div>
            <div class="content" @click="jumpInto($event,'./useless/main')">
                <image src="http://map.yujh.cn/img/icon.png" class="img"></image>
                <!-- <div class="img" style="background:url('http://map.yujh.cn/img/icon.png') no-repeat;"></div> -->
                <div class="text">智能辅助诊断</div>
            </div>
            <div class="content">
                <image src="http://map.yujh.cn/img/icon1.png" class="img"></image>
                <!-- <div class="img" style="background:url('http://map.yujh.cn/img/icon1.png') no-repeat;"></div> -->
                <div class="text">知识库</div>
            </div>
            <div class="content">
                <image src="http://map.yujh.cn/img/icon2.png" class="img"></image>
                <!-- <div class="img" style="background:url('http://map.yujh.cn/img/icon2.png') no-repeat;"></div> -->
                <div class="text">在线咨询</div>
            </div>
            <div class="content">
                <image src="http://map.yujh.cn/img/icon.png" class="img"></image>
                <!-- <div class="img" style="background:url('http://map.yujh.cn/img/icon.png') no-repeat;"></div> -->
                <div class="text">商城</div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
  data() {
    return {
      indicatorDots: true,
      autoplay: true,
      interval: 5000,
      duration: 900,
      circular: true,
      imgUrls: [
        'http://map.yujh.cn/img/doctor.png',
        'http://map.yujh.cn/img/line.png'
      ]
    }
  },
  methods: {
    swiperChange(e) {
      console.log('第' + e.mp.detail.current + '张轮播图发生了滑动');
    },
    animationfinish(e) {
      console.log('第' + e.mp.detail.current + '张轮播图滑动结束');
    },
    jumpInto(e,url){
        wx.redirectTo({
            url:url
        })
    }
  }
}
</script>

<style scoped>
.title{
    height:400rpx;
    width:100%;
    background:rgb(96, 146, 248);
    box-shadow:0rpx 5rpx 10rpx rgb(34, 101, 235);
    position:fixed;
    top:0;
    z-index:10;
}
.title:before{
    content:'';
    width:100rpx;
    height:64%;
    line-height:320rpx;
    background:#aaa;
    border:10rpx solid white;
    border-radius:20rpx;
    position:absolute;
    left:-100rpx;
    top:107rpx;
}
.title:after{
    content:'';
    width:100rpx;
    height:64%;
    line-height:320rpx;
    background:#aaa;
    border:10rpx solid white;
    border-radius:20rpx;
    position:absolute;
    right:-100rpx;
    top:107rpx;
}
.slide-image{
    height:100%;
    width:100%;
}
.body{
    width:600rpx;
    height:600rpx;
    margin:0rpx auto 0rpx;
    position:absolute;
    top:450rpx;
    border:10rpx solid white;
    border-radius:30rpx;
    overflow:hidden;
    position:relative;
    box-shadow:0px 0px 30rpx #777
}
.content{
    float: left;
    margin:0;
    padding:0;
    width:50%;
    height:50%;
    display: inline-block;
    background:rgb(156, 204, 250);
    text-align:center;
    font-size:80%;
}
#line{
    position:absolute;
    width:100rpx;
    height:100rpx;
    background:white;
    top:50%;
    left:50%;
    margin-top:-50rpx;
    margin-left:-50rpx;
    border-radius:50%;
    text-align: center;
}
#line:before,#line:after{
    content:'';
    display:inline-block;
    position:absolute;
    left:-250rpx;
    top:35rpx;
    width:600rpx;
    height:30rpx;
    background:white;
    line-height:100rpx;
}
#line:before{
    transform:rotate(90deg)
}
.img{
    width:121rpx;
    height:121rpx;
    border-radius:50%;
    margin:50rpx auto 0;
    background-size:100% 100%;
    overflow: hidden;
}
</style>
