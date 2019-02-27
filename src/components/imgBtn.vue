<template>
    <div style="color:#777;font-size:80%;width:100%;background:white;position:relative;overflow:hidden"  @click="N">
        <image :src="src" v-if="src" class="img"></image>
        <div class="Con">
            <div class="name">{{text}}</div>
            <div class="count">{{count}}</div>
        </div>
        <i class="next" v-if="next&&!sw"></i>
        <i class="no" v-if="!next&&!sw"></i>
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
        }
    },
    data(){
        return{
            S:false
        }
    }
}
</script>

<style scoped>
    span{
        float:left;
        line-height: 90rpx;
        padding-left:30rpx;
    }
    .S,.next{
        position:absolute;
        right:40rpx;
    }
    .S{
        top:10rpx;
    }
    .next{
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
    .bot{
        position:absolute;
        width:96%;
        height:4rpx;
        background:rgb(201, 212, 223);
        bottom:0;
        left:2%;
    }
    .Con,.img{
        float:left;
    }
    .img{
        width:100rpx;
        height:100rpx;
        margin:20rpx 0 20rpx 30rpx;
        border-radius:50%;
        background-size:100% 100%;
        box-shadow:0px 0px 40rpx rgb(0, 105, 131)
    }
    .Con{
        padding-left:30rpx;
        padding-top:10rpx;
    }
    .Con .name{
        font-size: 120%;
        font-weight: bold;
    }
    .Con .count{
        color:rgb(108, 164, 248)
    }
    .no{
        position:absolute;
        right:40rpx;
        top:50%;
        margin-top:-2rpx;
        display:inline-block;
        width:30rpx;
        height:4rpx;
        background: red;
        transform:rotate(45deg)
    }
    .no:after{
        content:'';
        display:inline-block;
        width:30rpx;
        height:4rpx;
        background:red;
        position:absolute;
        transform:rotate(90deg)
    }
</style>
