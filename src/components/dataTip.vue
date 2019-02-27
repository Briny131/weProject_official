<template>
    <div class="tip" v-if="iShow">
        <div class="Content">
            <div class="Head">{{title}}</div>
            <div class="Body">
                <i-row>
                    <i-col :span="6" :offset="1">数值：</i-col>
                    <i-col :span="16">
                        <input type="text " style="padding-top:50rpx;border-bottom:2rpx solid;border-radius:10rpx;padding-left:20rpx" v-model="data">
                    </i-col>
                </i-row>
            </div>
            <div class="Foot">
                <i-row i-class="height">
                    <i-col i-class="btns b" style="color:rgb(55, 185, 55)" span="12" @click="sureCom">{{sure}}</i-col>
                    <i-col i-class="btns" style="color:rgb(255, 129, 129)" span="12" @click="hide">{{refuse}}</i-col>
                </i-row>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props:['title','content','sure','refuse','show','data'],
    data(){
        return{
            iShow:false
        }
    },
    watch:{
        show(value){
            this.iShow=value;
        }
    },
    methods:{
        hide(){
            this.iShow=false;
            this.$emit('close')
        },
        sureCom(){
            this.$emit('submit',this.data)
            this.data=''
        }
    }
}

</script>

<style scoped>
    .tip{
        background:rgba(90, 93, 97,0.4);
        z-index:2000;
    }
    .Content{
        text-align: center;
        border-radius:30rpx;
        overflow:hidden;
    }
    .Content{
        width:80%;
        height:350rpx;
        margin:auto;
        background:white;
        z-index:2001;
    }
    .tip,.Content{
        position: absolute;
        top:0;
        right:0;
        left:0;
        bottom:0;
    }
    .Head{
        height:100rpx;
        line-height:100rpx;
        color:rgb(95, 95, 95);
        border-bottom: 1px solid rgb(201, 200, 200)
    }
    .Body{
        height:150rpx;
        line-height: 150rpx;
        font-size:80%;
        color:rgba(0,0,0,0.9);
        text-align:left;
    }
    .Foot{
        border-top: 1px solid rgb(201,200,200);
        height:100rpx;
        font-size:80%;
    }
    
</style>


