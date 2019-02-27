<template>
<div style="height:100%;background:#eee;overflow:hidden" >
        <div class="title">
            <div class="content">
                <div class="back" @click="urlBack"></div>
                水质综合数据指标
            </div>
        </div>
        <div class="body">
            <img-btn src="http://map.yujh.cn/img/icon.png" text="PH" :count="data.ph" :next="data.ph!=''" @click="tip('ph','PH')"></img-btn>
            <img-btn src="http://map.yujh.cn/img/icon1.png" text="氨氮" :count="data.ad" :next="data.ad!=''" @click="tip('ad','氨氮')"></img-btn>
            <img-btn src="http://map.yujh.cn/img/icon2.png" text="亚硝酸盐" :count="data.yxsy" :next="data.yxsy!=''" @click="tip('yxsy','亚硝酸盐')"></img-btn>
            <img-btn src="http://map.yujh.cn/img/icon.png" text="浮游生物" :count="data.fysw" :next="data.fysw!=''" @click="tip('fysw','浮游生物')"></img-btn>
            <img-btn src="http://map.yujh.cn/img/icon1.png" text="水体肥瘦度" :count="data.stfsd" :next="data.stfsd!=''" @click="tip('stfsd','水体肥瘦度')"></img-btn>
        </div>
        <i-button @click="save" type="primary" shape="circle" size="small" >一键诊断</i-button>
        <data-tip :title="title" :show='show' :data="data[now]" sure="确定" refuse="取消" @close="show=false" @submit="fullData"></data-tip>
    </div>
</template>

<script>
import imgBtn from '../../../components/imgBtn.vue'
import dataTip from '../../../components/dataTip.vue'
export default {
  data() {
    return {
        data:{
            ph:'',
            ad:'',
            yxsy:'',
            fysw:'',
            stfsd:''
        },
        title:'',
        show:false,
        now:''
    }
  },
  methods: {
      urlBack(){
          wx.switchTab({
              url:'../main'
          })
      },
      tip(x,title){
          this.title=title
          this.show=true
          this.now=x
      },
      fullData(x){
          this.data[this.now]=x
          this.show=false
      },
      save(){
          for(let i in this.data){
              if(!this.data[i])
                return false
          }
          console.log(this.data)
      }
  },
  components:{
      imgBtn,
      dataTip
  }
}
</script>

<style scoped>
.title{
    height:200rpx;
    width:100%;
    background:rgb(96, 146, 248);
    box-shadow:0rpx 5rpx 10rpx rgb(34, 101, 235);
    position:fixed;
    top:0;
}
.content{
    text-align:center;
    position:relative;
    height:200rpx;
    width:100%;
    padding-top:100rpx;
    color:white;
}
.content span{
    line-height:40rpx;
    font-size:14px;
    display:block
}
.back{
    position:absolute;
    left:30rpx;
    width:30rpx;
    height:30rpx;
    transform:rotate(-45deg);
    color:#fff;
    border-left:2px solid;
    border-top:2px solid;
    top:50%;
    margin-top:-20rpx;
}
.body{
    margin-top:200rpx;
}
</style>
