<template>
    <div class="body" :style="{background:color}" @click="N">
        <image :src="src" v-if="src" class="img"></image>
        <span class="text">{{text}}</span>
        <i class="next" v-if="next&&!sw"></i>
        <div class="rText" v-if="!next&&!sw">{{count}}</div>
        <i-switch class="S" :value="S" @change="changeS" v-if="sw"></i-switch>
        <i class="bot" v-if="bot"></i>
    </div>
</template>

<script>
export default {
    props:{
        text:{
            type:String
        },
        count:{
            type:[Number,String]
        },
        next:{
            type:Boolean,
            default:true
        },
        bot:{
            type:Boolean,
            default:true
        },
        src:{
            type:String,
            default:''
        },
        color:{
            type:String,
            default:'#E0E8FA'
        },
        sw:{
            type:Boolean,
            default:false
        }
    },
    methods:{
        N(){
            this.$emit('click')
        },
        changeS(e){
            console.log(e)
            this.S=e.mp.detail.value
            this.$emit('switch',this.S)
        }
    },
    data(){
        return{
            S:true
        }
    }
}
</script>

<style scoped>
    .body{
        color:#777;
        font-size:80%;
        width:100%;
        height:90rpx;
        position:relative
    }
    .S{
        position:absolute;
        right:40rpx;
        top:15rpx;
    }
    .text{
        float:left;
        line-height: 90rpx;
        padding-left:30rpx;
    }
    .rText{
        position:absolute;
        right:40rpx;
        line-height:90rpx;
        color:rgb(108, 164, 248)
    }
    .next{
        position:absolute;
        right:40rpx;
        top:50%;
        margin-top:-10rpx;
        display:inline-block;
        width:20rpx;
        height:20rpx;
        color: #999;
        transform:rotate(45deg);
        border-top:2rpx solid ;
        border-right:2rpx solid;
    }
    .img{
        float:left;
        width:50rpx;
        height:50rpx;
        margin:20rpx 0 10rpx 40rpx;
        border-radius:50%;
        background-size:100% 100%;
        box-shadow:0px 0px 20rpx rgb(73, 89, 94)
    }
    .bot{
        position:absolute;
        width:96%;
        height:4rpx;
        background:rgb(201, 212, 223);
        bottom:0;
        left:2%;
    }
</style>
