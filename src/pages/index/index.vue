<template>
    <div style="height:100%;background:linear-gradient(rgb(94,146,238),rgb(175,198,237));overflow:hidden" >
        <div style="color:white;font-size:60rpx;position:absolute;top:50rpx;left:30rpx" >水质在线监测</div>
        <div style="overflow:auto;margin-top:150rpx;height:calc(100% - 150rpx);" >
            <Card v-for="item in data" :data="item" :key="item.name" @click="turnTo($event,item)"></Card>
        </div>
        <i-toast id="toast" />
    </div>
</template>

<script>
import Card from '@/components/card'
import Btn from '../../components/button.vue'
import Tip from '../../components/tip'
import editMark from '../../components/editMark.vue'

export default {
  data () {
    return {
      motto: 'Hello World',
      userInfo: {},
      date:{
        year:null,
        month:null
      },
      input:{
        num:0,
        point:'00'
      },
      output:{
        num:0,
        point:'00'
      },
      classL:'',
      classR:'',
      data:[]
    }
  },

  computed:{
    da: () => {
      let array = [];
      const date = new Date();
      const years = [];
      const months = [];
      for (let i = date.getFullYear(); i >= 1990; i--) {
        years.push("" + i+'年');
      }
      array.push(years);
      for (let i = 1; i <= 12; i++) {
        if (i < 10) {
          i = "0" + i;
        }
        months.push("" + i+'月');
      }
      array.push(months);
      return array;
    },
    id:function(){
      return this.$store.state.id
    }
  },

  components: {
    Card,
    Btn,
    Tip,
    editMark
  },

  methods: {
    ceshi(){
      console.log('1111')
    },
    fun(){
      this.$fetch.getUserInfo({areaId:'111'}).then(resp=>{
      })
    },
    turnTo(e,x){
      wx.redirectTo({url:'../tongji/main?data='+JSON.stringify(x)})
    },
    fun1(){
      this.ceshi=false;
    },
    DateChange(e){
      this.date.year=parseInt(this.da[0][e.mp.detail.value[0]])
      this.date.month=parseInt(this.da[1][e.mp.detail.value[1]])
      this.$fetch.getMonthIn({openId:this.$store.state.baseData.openId,time:`${this.date.year}-${this.date.month}`}).then(res=>{
        this.changeStyleL(res.data.ZongShouRu)
        this.input.num=res.data.ZongShouRu
      })
      this.$fetch.getMonthOut({openId:this.$store.state.baseData.openId,time:`${this.date.year}-${this.date.month}`}).then(res=>{
        this.changeStyleR(res.data.ZongZhiChu)
        this.output.num=res.data.ZongZhiChu
      })
    },
    getUserInfo () {
      // 调用登录接口
      wx.login({
        success: () => {
          wx.getUserInfo({
            success: (res) => {
              this.userInfo = res.userInfo
            }
          })
        }
      })
    },
    clickHandle (msg, ev) {
      console.log('clickHandle:', msg, ev)
    },
    changeStyleR(x){
      if(x>=10000000&&x<1000000000){
        this.classR='font-1'
      }else if(x>=1000000000){
        this.classR='font-2'
      }
    },
    changeStyleL(x){
      if(x>=10000000&&x<1000000000){
        this.classL='font-1'
      }else if(x>=1000000000){
        this.classL='font-2'
      }
    },
  },

  created () {
    // this.$fetch.getTang({uid:this.id}).then(res=>{
    //   if(!res.data.code){
    //     this.data=JSON.parse(JSON.stringify(res.data.data))
    //   }else{
    //     this.$toast({
    //       content:res.data.msg,
    //       type:'error'
    //     })
    //   }
    // })
    // this.data=[{warningStatus:false,online:true,sensorName:'ceshi',paramOxygen:20,paramTemp:9}]
  },
  onShow(){
    // console.log(this.$store.state)
    this.$fetch.getTang({uid:this.id}).then(res=>{
      if(!res.data.code){
        this.data=JSON.parse(JSON.stringify(res.data.data))
      }else{
        this.$toast({
          content:res.data.msg,
          type:'error'
        })
      }
    })
  }
}
</script>

<style scoped>
.userinfo {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.userinfo-avatar {
  width: 128rpx;
  height: 128rpx;
  margin: 20rpx;
  border-radius: 50%;
  color: transparent
}

.userinfo-nickname {
  color: #aaa;
}

.usermotto {
  margin-top: 150px;
}

.form-control {
  display: block;
  padding: 0 12px;
  margin-bottom: 5px;
  border: 1px solid #ccc;
}

.counter {
  display: inline-block;
  margin: 10px auto;
  padding: 5px 10px;
  color: blue;
  border: 1px solid blue;
}
.bc{
  background:white;
  margin:0.5em 1em;
  border-radius:0.5em;
  padding:0.8em 0.3em
}
.weui-cells_after-title:after,.weui-cells_after-title::before,.bc:after,.bc:before{
  border-color:transparent
}
.h{
  width:100%;
  height:4em;
  background:#51cc99;
  position:fixed;
  top:0;
  z-index: 1000;
}
#content{
  margin-top:4.5em
}
.w-all{
  padding:0.5em 0 0 0.5em;
}
.shu{
  position:relative;
}
/* .shu::after{
  content:'';
  position:absolute;
  width:1rpx;
  height:40%;
  background:rgb(129, 129, 129);
  right:0;
  bottom:10rpx;
} */
.w{
  position:relative;
}
.w::after{
  content:'';
	width:0;
	height:0;
  position:absolute;
  right:-20rpx;
  bottom:10rpx;
	border-top:10rpx solid #000;
	border-right:10rpx solid transparent;
	border-left:10rpx solid transparent;
}
.w-title{
  font-size: 70%;
  color:#777
}
.main-font{
  font-size:120%;
  height:90rpx;
  line-height:90rpx
}
.main-font>span{
  font-size: 70%
}
.add{
  width: 3em;
  height:3em;
  border-radius: 50%;
  background:rgb(81, 204, 153);
  position: fixed;
  right:1em;
  bottom:1em;
}
.ad {
  position:relative;
  top:48%;
  left:25%;
	width:1.5em;
	height:.1em;
	background-color:#000;
	border-radius:.15em;
}
.ad:after {
	content:"";
	position:absolute;
	width:1.5em;
	height:.1em;
	background-color:#000;
	transform:rotate(90deg);
	border-radius:.15em;
}
.font-1{
  font-size:90%
}
.font-2{
  font-size:80%;
  width:100%;
  overflow:auto
}
.font-2::-webkit-scrollbar{
  display:none
}
</style>
