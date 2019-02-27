<template>
    <div >
        <div style="height:200rpx;background:rgb(94,146,238);box-shadow:0rpx 5rpx 10rpx #bbb;position:relative">
            <div class="back" @click="urlBack"></div>
        </div>
        <div class="_div data-v-262c43c3 weui-cells__title">个人信息</div>
        <div class="_div data-v-262c43c3 weui-cells weui-cells_after-title input-margin" style="margin-bottom:2em" >
            <div class="_div data-v-262c43c3 weui-cell weui-cell_input">
                <div class="_div data-v-262c43c3 weui-cell__hd">
                    <div class="_div data-v-262c43c3 weui-label">昵称</div>
                </div>
                <div class="_div data-v-262c43c3 weui-cell__bd">
                    <input class="_input data-v-262c43c3 weui-input"  v-model="data.nickName" :placeholder="modifyOrNot?'请输入昵称':''" />
                </div>
            </div>
            <div class="_div data-v-262c43c3 weui-cell weui-cell_input" :class="{'weui-cell_warn':!checkPhone}">
                <div class="_div data-v-262c43c3 weui-cell__hd">
                    <div class="_div data-v-262c43c3 weui-label">手机号</div>
                </div>
                <div class="_div data-v-262c43c3 weui-cell__bd">
                    <input class="_input data-v-262c43c3 weui-input" disabled v-model="data.phone"  />
                </div>
                <div class="_div data-v-262c43c3 weui-cell__ft" v-if="!checkPhone">
                    <icon type="warn" size="18" color="#E64340" class="_icon data-v-262c43c3"></icon>
                </div>
            </div>
        </div>
        <!-- <i-button @click="modify" type="success" shape="circle" size="small" v-if="!modifyOrNot">修改</i-button> -->
        <i-button @click="save" type="primary" shape="circle" size="small"  :loading="L">保存</i-button>
        <i-toast id="toast" />
    </div>

</template>

<script>
// import Btn from '../../../components/button'
import { setTimeout } from 'timers';
export default {
    data(){
        return {
            // data:{
            //     username:'',
            //     phoneNumber:''
            // },
            modifyOrNot:false,
            L:false,
            checkPhone:true
        }
    },
    computed:{
        data:function(){
            return this.$store.state
        }
    },
    methods:{
        save(){
            if(this.checkPhone){
                this.L=true
                console.log(this.data)
                this.$fetch.saveInfo(this.data).then(resp=>{
                    this.L=false
                    this.$store.state.nickName=this.data.nickName
                    this.$toast({
                        content:'保存成功',
                        type:'success'
                    })
                    setTimeout(() => {
                        wx.switchTab({
                            url:'../main'
                        })
                    }, 1500);
                    
                })
            }else{
                this.$toast({
                    content:'请核对信息',
                    type:'error'
                })
            }
            
        },
        urlBack(){
            wx.switchTab({
                url:'../main'
            })
        }
    },
    components:{
        // Btn
    },
    onShow(){
    },
    onUnload(){
    }
}
</script>

<style scoped>
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
        margin-top:-15rpx;
    }
</style>

