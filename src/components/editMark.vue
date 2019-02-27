<template>
    <div class="wai" style="height:100%;width:100%;overflow-y:auto">
        <div style="font-size:110%;position:relative;margin:1rpx 0rpx;box-sizing:border-box;" v-for="(item,index) in o.list" :key="item.id">
            <p v-if="item.type=='text'" :style="(data[index].auto?'color:#000':'color:#aaa')+';min-height:78rpx;padding:10rpx;word-break:break-all;background:#ddd'" @click="cao($event,index)">{{data[index].value}}</p>
            <input v-if="item.type=='text'" :focus="data[index].auto" style="height:0px;width:0px;position:absolute;top:0;left:0" maxlength="-1" :name="item.id" :id="item.id"  @focus="ceshi" @input="shuchu" v-model="item.value"></input>

            <!-- <p v-if="item.type=='text'" style="width:100%;visibility:hidden;min-height:70rpx;word-break:break-all;white-space:pre-line">{{data[index].value}}</p>
            <textarea v-if="item.type=='text'" placeholder-style="color:rgba(0,0,0,0.4);font-size:90%" :placeholder="o.list.length==1?'写点东西吧':''" :focus="item.auto" @blur="autoFalse($event,item)" style="height:100%;width:100%;;position:absolute;top:0;left:0" :name="item.id" :id="item.id" maxlength="-1" @focus="ceshi" @input="shuchu" v-model="item.value"></textarea> -->
            <image :src="item.value" alt="#" mode="aspectFit"  v-if="item.type=='image'" style="position:relative;overflow:visible" >
                <div style="width:50rpx;height:50rpx;background:red;position:absolute;top:-25rpx;right:-25rpx;border-radius:50%" @click="delImg($event,item.id)"></div>
            </image>
        </div>
        <button class="btn" style="font-size:100%;width:calc(100% - 30rpx);height:100rpx;background:white;margin:100rpx 15rpx 0 15rpx;border-radius:10rpx;text-align:center;line-height:100rpx;color:rgb(99,149,238)" size="mini" @click="mkH">提交</button>
        <div class="submit" @click="img">
            <img src="http://map.yujh.cn/img/picture.png" style="z-index:100;width:60%;height:60%;padding-top:20%;" alt="ss"/>
        </div>
    </div>
</template>

<script>
import TextArray from './TextArray.js'
export default {
    data(){
        return{
            data:'wwwwwww',
            o:null,
        }
    },
    methods:{
        cao(e,index){
            // this.o.list[index].auto=true
            this.data.forEach((value)=>{
                value.auto=false
            })
            this.data[index].auto=true
            console.log(index,this.data,'click')
        },
        ceshi(e){
            this.o.type='text'
            console.log(e)
            this.o.changeId(e.target.id)
        },
        delImg(e,id){
            this.o.changeId(id)
            this.o.del()
        },
        autoFalse(e,item,index){
            // item.auto=false
            this.data[index].auto=false
            console.log(index,this.data,'blur')
        },
        img(){
            let that=this
            wx.chooseImage({
                count: 1,
                sizeType: ['original', 'compressed'],
                sourceType: ['album', 'camera'],
                success(res) {
                    wx.uploadFile({
                        url: 'http://192.168.1.105:8081/topic/picture', 
                        filePath: res.tempFilePaths[0],
                        name: 'file',
                        formData: {
                            user: 'test'
                        },
                        success(res) {
                            that.o.type='image'
                            that.o.init(res.data)
                            that.o.nowIndex=that.o.nowIndex+1
                            if(that.o.list[that.o.nowIndex+1]==undefined||that.o.list[that.o.nowIndex+1].type=='image'){
                                that.o.type='text'
                                that.o.init()
                            }
                        }
                    })
                    
                }
            })
            
            
        },
        shuchu(e){
            let data=this.o.list[this.o.nowIndex]
            this.data=this.o.list
            if(data.value[data.value.length-1]=='/'){
                data.value=data.value.slice(0,data.value.length-1)
                this.o.init()
                this.data.forEach((value)=>{
                    value.auto=false
                })
                this.data[this.o.nowIndex+1].auto=true
            }
            if(data.value.length==0&&this.o.list.length!=1){
                console.log('del')
                this.o.del()
                this.data.forEach((value)=>{
                    value.auto=false
                })
                this.data[this.o.nowIndex].auto=true
            }
        },
        mkH(){
            this.$emit('submit',this.o)
            
        }
    },
    created(){
        this.o=new TextArray()
        this.o.init('')
        this.data=this.o.list
    }
}
</script>

<style>
    .wai::-webkit-scrollbar {
        display: none;
    }
    .btn:active{
        background:rgb(196, 196, 196) !important
    }
    .submit{
        position:fixed;
        z-index:1000;
        bottom:40rpx;
        right:40rpx;
        width:100rpx;
        height:100rpx;
        background:rgba(253, 252, 252, 0.8);
        box-shadow:0 0 15rpx #777;
        border-radius:50%;
        text-align:center;
    }
</style>


