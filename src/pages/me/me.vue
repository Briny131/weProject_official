<template>
    <div style="height:100%;background:linear-gradient(rgb(94,146,238),rgb(175,198,237));overflow:auto" >
        <div class="title">
            <div class="content">
                信息
            </div>
            <div class="info"> 
                <img class="img" :src="imgUrl" alt="#">
                <p>{{nickName}}</p>
            </div>
        </div>
        <div class="body">
            <p-btn text="个人信息" @click="next('./baseMsg/main')"></p-btn>
            <p-btn text='退出登入' @click="out" :bot="false"></p-btn>
        </div>
    </div>
</template>

<script>
import Tip from '../../components/tip'
import pBtn from '../../components/pBtn'
export default {
    data(){
        return{
            userInfo:{
                nickName:'',
                avatarUrl:''
            },
            show:false,
            main:true,
            showAd:true,
            d:{},
            stroage:false,
            width:''
        }
    },
    methods:{
        next(url){
            wx.redirectTo({
                url:url
            })
        },
        out(){
            wx.removeStorage({
                key:'userInfo',
                success:(res)=>{
                    console.log(res)
                    wx.redirectTo({
                        url:'./res/main'
                    })
                }
            })
            wx.getStorage({
            key:'userInfo',
            success:(res)=>{
                console.log(res)
            }
        })
        }
    },
    watch:{
    },
    computed:{
        nickName:function(){
            return this.$store.state.nickName
        },
        imgUrl:function(){
            return this.$store.state.imgUrl
        }
    },
    components: {
        Tip,
        pBtn
    },
    onShow(){
    },
    created(){
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
    }
    .content{
        text-align:center;
        position:relative;
        height:100rpx;
        width:100%;
        padding-top:70rpx;
        color:white;
    }
    .content span{
        line-height:40rpx;
        font-size:14px;
        display:block
    }
    .info{
        text-align:center;
    }
    .img{
        display:inline-block;
        width:70rpx;
        height:70rpx;
        border-radius:50%;
    }
    .body{
        height:calc(100% - 400rpx);
        padding-top:30rpx;
        margin-top:400rpx;
    }
</style>
    