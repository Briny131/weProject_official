<template>
    <div class="body" @click="Click">
        <i-row i-class="height" >
            <i-col :span="6" :i-class="data.warningStatus?'height warning':'height green'" >
                <div :class="data.warningStatus?'left1':'left'" >
                    <div class="left_data">{{data.paramOxygen}}<span v-if="data.warningStatus" class="left_icon"></span></div>
                    <div class="left_tem">{{data.paramTemp}}<span>℃</span></div>
                </div>
            </i-col>
            <i-col :span="15" i-class="height">
                <div class="middle height">
                    <image :src="data.online?'http://map.yujh.cn/img/green1.png':'http://map.yujh.cn/img/red1.png'" style="position:absolute;left:40rpx;top:50%;margin-top:-35rpx;width:18rpx;height:70rpx"/>
                    <span class="mid_info">{{data.sensorName}}</span>
                    <span class="mid_type"><image :src="data.online?'http://map.yujh.cn/img/online.png':'http://map.yujh.cn/img/warning.png'" style="vertical-align:baseline;width:30rpx;height:30rpx;display:inline-block;padding-right:10rpx"/>{{data.online?'在线':'离线'}}</span>
                </div>
            </i-col>
            <i-col :span="3" i-class="height lineHeight white" >
                <span class="icon"></span>
            </i-col>
        </i-row>
    </div>
</template>

<script>
export default {
    props:{
        data:{
            type:Object,
        }
    },
    data(){
        return{
            warning:false,
            ceshi:false
        }
    },
    methods:{
        Click(){
            this.$emit('click')
        }
    },
    created(){
        // console.log(this.data)
    }
}
</script>

<style scoped>
.body{
    margin:10rpx 30rpx;
    height:180rpx;
    border-radius:20rpx;
    overflow: hidden;
    background:white;
}
.icon{
    display:inline-block;
    width:50rpx;
    height:50rpx;
    border:2px solid black;
    border-radius:50%;
    position:relative;
}
.icon::after{
    content:'';
    width:20rpx;
    height:20rpx;
    border-top:2px solid;
    border-right:2px solid;
    transform:rotate(45deg);
    position:absolute;
    top:15rpx;
    left:10rpx;
}
.left{
    background:white;
    margin-left:8px;
    height:100%;
    width:100%;
    overflow: hidden;
    /* border-right:2px solid rgb(240, 240, 240); */
    box-sizing: border-box;
    position:relative;
}
.left::after{
    content:'';
    height:70%;
    width:2px;
    background:rgb(240, 240, 240);;
    margin:auto;
    position:absolute;
    right:8px;
    top:0;
    bottom:0;
}
.left1{
    background:transparent;
    margin-left:10rpx;
    height:100%;
    width:calc(100% - 10rpx);
    overflow: hidden;
    position:relative;
}
.left_data{
    margin:16% 0 0;
    font-size: 160%;
    font-weight: bolder;
    text-align:center;
    position:relative;
    box-sizing: content-box;
}
.left_icon {
	position:absolute;
    height:8rpx;
    width:8rpx;
    border-top:4rpx solid white;
    border-right:4rpx solid white;
    transform:rotate(-45deg);
    top:50%;
    right:10rpx;
}
.left_icon:after {
	content:"";
	position:absolute;
    height:10rpx;
    width:10rpx;
    border-top:4rpx solid;
    border-right:4rpx solid;
    right:4rpx;
    top:4rpx;
}
.left_tem{
    font-size:60%;
    left:50%;
    margin-left:-35rpx;
    position:absolute;
    bottom:20rpx;
}
.middle{
    background:white;
    padding-left:70rpx;
    position:relative;
}
.mid_info{
    display:inline-block;
    width:80%;
    font-size:80%;
    overflow: auto;
    /* text-overflow: ellipsis; */
    white-space: nowrap;
    left:80rpx;
    top:35rpx;
    position:absolute;
}
/* .mid_info::before{
    content:'';
    width:5rpx;
    height:5rpx;
    border:3rpx solid rgb(234, 131, 238);
    border-radius:50%;
    position:absolute;
    left:-30rpx;
    top:50%;
    margin-top:-2rpx;
}
.mid_info::after{
    content:'';
    width:5rpx;
    height:6rpx;
    position:absolute;
    border-top:5rpx solid rgb(234, 131, 238);
    border-bottom:5rpx solid rgb(234, 131, 238);
    left:-13.5px;
    bottom:-17rpx;
} */
.mid_type{
    position:absolute;
    left:80rpx;
    top:95rpx;
    font-size:70%;
}
/* .mid_type::before{
    content:'';
    width:5rpx;
    height:5rpx;
    border:3rpx solid rgb(234, 131, 238);
    border-radius:50%;
    position:absolute;
    left:-30rpx;
    top:40%;
}
.mid_type::after{
    content:'';
    width:3rpx;
    height:6rpx;
    position:absolute;
    border-top:3rpx solid rgb(234, 131, 238);
    border-bottom:3rpx solid rgb(234, 131, 238);
    left:-13px;
    top:-14rpx;
} */

</style>
