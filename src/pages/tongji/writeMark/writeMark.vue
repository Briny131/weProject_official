<template>
    <div>
        <div class="title">
            <div class="content">
                <div class="back" @click="urlBack"></div>
                编辑稿件
            </div>
        </div>
        <div class="edit">
            <div style="position:relative;border-bottom:4rpx dotted #ddd;font-size:150%">
                <div style="width:100%;visibility:hidden;min-height:90rpx;word-break:break-all;white-space:pre-line">{{title}}</div>
                <textarea placeholder="写个标题吧. . ." placeholder-style="color:rgba(0,0,0,0.4)" style="height:100%;width:100%;position:absolute;top:0;left:0" name="title" id="title" maxlength="50" @input="delEnter"  v-model="title"></textarea>
            </div>
            <edit-mark @submit="submit"></edit-mark>
        </div>
    </div>
</template>

<script>
// import wxParse from 'mpvue-wxparse'
import editMark from '../../../components/editMark.vue'
export default {
    data(){
        return {
            value:'',
            cHtml:'<p class="xing-p">不谈琐碎的细节，突出主题，颜色运用。这些都是行为，这些行为是纹身师的能力表达，而他们要达到一个目标：</p><p class="xing-p">创作出来的这个纹身，有没有在瞬间抓住人眼球，让人不断的想一直看。<br><br><br><br><br>wwww</p>',
            title:''
        }
    },
    methods:{
        urlBack(){
            wx.switchTab({
                url:'../../mark/main'
            });
            console.log('hhh')
        },
        imgAdd(){

        },
        imgDel(){

        },
        delEnter(){
            if(this.title[this.title.length-1]=='\n')
                this.title=this.title.slice(0,this.title.length-1)
        },
        submit(e){
            this.$fetch.postContent({title:this.title,content:e.Make(),userId:this.$store.state.phone,name:this.$store.state.nickName,img:this.$store.state.imgUrl}).then(res=>{
                console.log(res)
                if(res.data.returnCode==1){
                    wx.switchTab({
                        url:'../../mark/main'
                    })
                }
            })
        }
    },
    components:{
        // wxParse,
        editMark
    }
}
</script>

<style>
/* @import url("~mpvue-wxparse/src/wxParse.css"); */
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
        padding-top:90rpx;
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
    .edit{
        width:100%;
        margin-top:210rpx;
        padding:0 30rpx 40rpx 30rpx;
        height:calc(100% - 200rpx);
        box-sizing:border-box;
        overflow:hidden;
    }
</style>
