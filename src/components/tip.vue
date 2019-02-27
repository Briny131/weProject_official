<template>
    <div class="tip" v-if="iShow">
        <div class="Con">
            <div class="Head">{{title}}</div>
            <div class="Body">{{content}}</div>
            <div class="Foot">
                <i-row i-class="height">
                    <i-col i-class="btns b" span="12" @click="sureCom">{{sure}}</i-col>
                    <i-col i-class="btns" span="12" @click="hide">{{refuse}}</i-col>
                </i-row>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props:['title','content','sure','refuse','show','sureCom'],
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
    }
}

</script>

<style scoped>
    .tip{
        background:rgba(90, 93, 97,0.4);
        z-index:2000;
    }
    .Con{
        text-align: center;
    }
    .Con{
        width:80%;
        height:500rpx;
        margin:auto;
        background:white;
        z-index:2001;
    }
    .tip,.Con{
        position: absolute;
        top:0;
        right:0;
        left:0;
        bottom:0;
    }
    .Head{
        height:100rpx;
        line-height:100rpx;
        color:rgb(63, 177, 112);
        border-bottom: 1px solid rgb(201, 200, 200)
    }
    .Body{
        height:300rpx;
        line-height: 300rpx;
        font-size:80%;
        color:rgba(0,0,0,0.9)
    }
    .Foot{
        border-top: 1px solid rgb(201,200,200);
        height:100rpx;
        font-size:80%
    }
    
</style>


