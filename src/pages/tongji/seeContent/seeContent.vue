<template>
    <div id="wai" style="height:100%;background:linear-gradient(rgb(94,146,238),rgb(175,198,237));overflow:auto">
        <div class="title">
            <div class="content">
                <div class="back" @click="urlBack"></div>
                文章
            </div>
        </div>
        <div class="see_body">
            <div class="editor">
                <div style="height:100rpx">
                    <img class="imgs" :src="user.img" alt="#">
                    <div class="name">{{user.name}}</div>
                </div>
                <div class="date" style="margin-top:-50rpx">{{user.createTime}}</div>
            </div>
            <div style="box-sizing:border-box;width:100%;padding:50rpx 20rpx 0">
                <wxParse :content="artical" />  
            </div>
            <div style="width:90%;margin:100rpx auto 0;z-index:10;position:relative" >
                <div>评论</div>
                <div style="box-sizing:border-box;width:100%;background:#eee;border:2rpx solid;border-radius:30rpx">
                    <input placeholder="写点啥吧" :focus="show" @blur="show=false" v-model="ping" style="height:0;width:0;padding:0 10rpx;visibility:hidden;position:absolute"></input>
                    <p :style="(show?'color:#000':'color:#aaa')+';min-height:80rpx;padding:10rpx;word-break:break-all'" @click="show=true">{{ping||(show?'':'写点什么吧')}}</p>
                </div>
                <div @click="sendTalk" id="BTn" style="font-size:80%;width:200rpx;height:80rpx;line-height:80rpx;text-align:center;border-radius:12rpx;float:right;margin-right:30rpx;margin-top:15rpx">发表</div>
            </div>
            <div style="width:100%;margin-top:100rpx;" >
                <div v-for="item in talks" :key="item.id" id="ccc">
                    <div class="editor" style="padding-top:30rpx">
                        <div style="height:100rpx">
                            <img class="imgs" :src="item.img" alt="#">
                            <div class="name">{{item.replyName}}</div>
                        </div>
                        <div class="date" style="margin-top:-50rpx">{{item.createTime}}</div>
                    </div>
                    <div style="box-sizing:border-box;width:100%;padding:10rpx 20rpx 20rpx;font-size:60%;word-break:break-all;white-space:pre-line">
                        {{item.content}}
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import wxParse from 'mpvue-wxparse'
import { setTimeout } from 'timers';
export default {
    data(){
        return {
            artical:'<p>111111</p>',
            id:'',
            user:{
                userId:'',
                createTime:'1992-10-10 22:10:1',
                name:'222123',
                img:'http://map.yujh.cn/img/icon.png'
            },
            ping:'',
            talks:[],
            show:false
        }
    },
    methods:{
        urlBack(){
            wx.switchTab({
                url:'../../mark/main'
            });
        },
        sendTalk(){
            if(this.ping)
                this.$fetch.Talks({replyName:this.$store.state.nickName,topicId:this.id,content:this.ping,img:this.$store.state.imgUrl}).then(res=>{
                    this.ping=''
                    this.getTalk()
                })
        },
        getTalk(){
            this.$fetch.getPing({id:this.id}).then(res=>{
                this.talks=res.data.reply
            })
        }
    },
    components: {
        wxParse
    },
    onLoad(option){
        console.log(option,'cnbb')
        this.id=option.id
        this.$fetch.getLunDetail({id:this.id}).then(res=>{
            this.artical=res.data.content.content
            this.user=res.data.content
        })
    },
    onShow(){
        this.getTalk()
    }
}
</script>

<style>
@import url("~mpvue-wxparse/src/wxParse.css");
.editor{
    width:100%;
    height:100rpx;
    line-height:100rpx;
}
.editor .name{
    font-size:120%;
    padding-left:40rpx;
    line-height:100rpx;
    float:left;
}
.editor .date{
    font-size:60%;
    color:#777;
    float:left;
    height:30rpx;
    padding-left:40rpx;
}
.title{
    height:200rpx;
    width:100%;
    background:rgb(99,149,238);
    box-shadow:0rpx 5rpx 10rpx rgb(21, 92, 233);
    position:fixed;
    top:0;
    z-index:100
}
.content{
    text-align:center;
    position:relative;
    height:200rpx;
    width:100%;
    box-sizing: border-box;
    padding-top:80rpx;
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
    margin-top:0rpx;
}
.see_body{
    margin-top:200rpx;
    background: #fff;
    height:calc(100% - 200rpx);
    overflow:auto;
}
page{
    height:100%;
    width:100%;
}
#wai::-webkit-scrollbar{
    display:none
}
.imgs{
    display:inline-block;
    margin-left:30rpx;
    width:70rpx;
    height:70rpx;
    border-radius:50%;
    background: black;
    margin-top:10rpx;
    float:left;
}
#BTn{
    background:rgb(78, 148, 253);
    color:white
}
#BTn:active{
    background:rgb(53, 114, 206);
}
#ccc{
    position:relative
}
#ccc:after{
    content:'';
    width:90%;
    height:4rpx;
    background:#aaa;
    position:absolute;
    margin-left:5%;
}
</style>
