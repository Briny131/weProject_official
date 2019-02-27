<template>
    <div class="c_body" @click="jumpInto">
        <div class="c_title">{{title}}</div>
        <div class="c_content">{{data}}</div>
        <div class="c_img" v-if="ImgData">
            <img :class="imgStyle" v-for="item in ImgData" :key="item" width="100%" height="100%" :src="item" >
            <div class="mb" v-if="Image.length>3">共有{{Image.length}}张图片</div>
        </div>
        <div class="c_editor">
            <span>{{editor}}&nbsp;&nbsp;&nbsp;&nbsp;</span>
            <span>{{date}}</span>
        </div>
    </div>    
</template>

<script>
export default {
    props:{
        title:{
            type:String,
            default:''
        },
        data:{
            type:String,
            default:''
        },
        Image:{
            type:[Array,String]
        },
        date:{
            type:String
        },
        editor:{
            type:String
        }
    },
    data(){
        return{
            imgStyle:'c_img_big',
            ImgData:null,
        }
    },
    methods:{
        jumpInto(){
            this.$emit('click')
        }
    },
    created(){
        if(this.Image.length==1){
            this.imgStyle='c_img_big'
        }else{
            this.imgStyle='c_img_sm'
        }
        if(this.Image.length>3){
            this.ImgData=this.Image.slice(0,3)
        }else{
            this.ImgData=this.Image
        }
    }
}
</script>

<style scoped>
    .c_body{
        margin:20rpx 0;
        width:100%;
        box-sizing: border-box;
        padding:0 10rpx;
        box-shadow: 0rpx 5rpx 5rpx #666;
        font-weight:bold;
        background:white;
        border-radius:20rpx;
    }
    .c_title{
        padding:20rpx;
        overflow:hidden;
        white-space:nowrap;
        text-overflow: ellipsis;
    }
    .c_content{
        font-size:70%;
        font-weight:initial;
        padding:0 40rpx;
        word-break:break-all;
        max-height:150rpx;
        overflow: hidden;
    }
    .c_img_big{
        width:400rpx;
        height:250rpx;
    }
    .c_img_sm{
        width:200rpx;
        height:200rpx;
        padding:0 5rpx;
        overflow: hidden;
    }
    .c_img{
        padding:10rpx 30rpx;
        position:relative;
    }
    .mb{
        width:200rpx;
        height:200rpx;
        z-index:50;
        padding:20rpx;
        box-sizing:border-box;
        background:rgba(0,0,0,0.5);
        color:white;
        position:absolute;
        font-size:80%;
        letter-spacing:10rpx;
        top:10rpx;
        left:450rpx;
    }
    .c_editor{
        font-size:50%;
        color:#aaa
    }
</style>
