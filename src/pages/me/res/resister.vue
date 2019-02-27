<template>
    <div class="bg" style="color:white">
        <div v-if="!res" style="height:100%;">
            <div id="icon">
                <image src="http://map.yujh.cn/img/logo1.png" style="width:100rpx;height:100rpx;position:absolute;top:0;bottom:0;right:0;left:0;margin:auto"/>
            </div>
            <div id="inp">
                <i-row i-class="inpH border">
                    <i-col :span="3" i-class="height ">
                        <div id="user"></div>
                    </i-col>
                    <i-col :span="21" i-class="height">
                        <input type="number" style="height:100%;background:transparant;" @input="checkTel" placeholder-style="color:rgba(255,255,255,0.4);font-size:16px" v-model="userInfo.telphone" maxlength="11" placeholder="手机号">
                    </i-col>
                </i-row>
                <i-row v-if="userInfo.type==0" i-class="inpH border">
                    <i-col :span="3" i-class="height">
                        <div id="pw"></div>
                    </i-col>
                    <i-col :span="17" i-class="height">
                        <input type="text" v-if="check.showPw" style="height:100%;background:transparant;" @input="checkPassword" v-model="userInfo.password" placeholder-style="color:rgba(255,255,255,0.4);font-size:16px" placeholder="密码">
                        <input type="password" v-else style="height:100%;background:transparant;" @input="checkPassword" v-model="userInfo.password" placeholder-style="color:rgba(255,255,255,0.4);font-size:16px" placeholder="密码">
                    </i-col>
                    <i-col :span="4" i-class="height">
                        <div @click="check.showPw?check.showPw=false:check.showPw=true" class="eye"></div>
                    </i-col>
                </i-row>
                <i-row v-else i-class="inpH border">
                    <i-col :span="3" i-class="height">
                        <div id="phone"></div>
                    </i-col>
                    <i-col :span="14" i-class="height">
                        <input type="number" style="height:100%;background:transparant;" placeholder-style="color:rgba(255,255,255,0.4);font-size:16px" @input="checkCode" v-model="userInfo.code" maxlength="6" placeholder="验证码">
                    </i-col>
                    <i-col :span="7" i-class="height">
                        <div id="check" style="color:#8EB1ED;font-size:50%;text-align:center;line-height:70rpx;" @click="time==120?sendCheck():''">{{checkTime}}</div>
                    </i-col>
                </i-row>
            </div>
            <span style="float:right;font-size:60%;position:relative;top:30rpx;right:10rpx">忘记密码？</span>
            <span style="float:left;font-size:60%;position:relative;top:30rpx;right:10rpx;padding-left:40rpx" @click="clear(),userInfo.type==0?userInfo.type=1:userInfo.type=0">切换登入方式</span>
            <button class="btn" style="font-size:100%;width:calc(100% - 30rpx);height:100rpx;background:white;margin:100rpx 15rpx 0 15rpx;border-radius:10rpx;text-align:center;line-height:100rpx;color:#8EB1ED" size="mini" open-type="getUserInfo" @getuserinfo="onGetUserInfo" >登入</button>
            <!-- <div @touchend="gary=false,login()" @touchstart="gary=true" :class="gary?'gary':''" style="width:calc(100% - 30rpx);height:100rpx;background:white;margin:100rpx 15rpx 0 15rpx;border-radius:10rpx;text-align:center;line-height:100rpx;color:#8EB1ED" >登入</div> -->
            <div id="res" style="" @click="res=true,clear()">注册账号</div>
        </div>
        <div v-else style="height:100%">
            <div id="inp" style="margin-top:300rpx">
                <i-row i-class="inpH border">
                    <i-col :span="3" i-class="height ">
                        <div id="phone"></div>
                    </i-col>
                    <i-col :span="21" i-class="height">
                        <input type="number" style="height:100%;background:transparant;" @input="checkTel" v-model="userInfo.telphone" placeholder-style="color:rgba(255,255,255,0.4);font-size:16px" placeholder="手机号">
                    </i-col>
                </i-row>
                <i-row i-class="inpH border">
                    <i-col :span="3" i-class="height ">
                        <div id="user"></div>
                    </i-col>
                    <i-col :span="21" i-class="height">
                        <input type="text" style="height:100%;background:transparant;" v-model="userInfo.name" maxlength="20" placeholder-style="color:rgba(255,255,255,0.4);font-size:16px" placeholder="姓名">
                    </i-col>
                </i-row>
                <i-row i-class="inpH border">
                    <i-col :span="3" i-class="height">
                        <div id="pw"></div>
                    </i-col>
                    <i-col :span="17" i-class="height">
                        <input type="text" v-if="check.showPw" style="height:100%;background:transparant;" @input="checkPassword" v-model="userInfo.password" placeholder-style="color:rgba(255,255,255,0.4);font-size:16px" placeholder="密码">
                        <input type="password" v-else style="height:100%;background:transparant;" @input="checkPassword" v-model="userInfo.password" placeholder-style="color:rgba(255,255,255,0.4);font-size:16px" placeholder="密码">
                    </i-col>
                    <i-col :span="4" i-class="height">
                        <div class="eye" @click="check.showPw?check.showPw=false:check.showPw=true"></div>
                    </i-col>
                </i-row>
                <i-row i-class="inpH border">
                    <i-col :span="3" i-class="height">
                        <div id="pw"></div>
                    </i-col>
                    <i-col :span="17" i-class="height">
                        <input type="text" v-if="check.showRpw" style="height:100%;background:transparant;" @input="checkRePw" v-model="userInfo.rePassword" placeholder-style="color:rgba(255,255,255,0.4);font-size:16px" placeholder="确认密码">
                        <input type="password" v-else style="height:100%;background:transparant;" @input="checkRePw" v-model="userInfo.rePassword" placeholder-style="color:rgba(255,255,255,0.4);font-size:16px" placeholder="确认密码">
                    </i-col>
                    <i-col :span="4" i-class="height">
                        <div class="eye" @click="check.showRpw?check.showRpw=false:check.showRpw=true"></div>
                    </i-col>
                </i-row>
                <i-row i-class="inpH border">
                    <i-col :span="3" i-class="height">
                        <div id="phone"></div>
                    </i-col>
                    <i-col :span="14" i-class="height">
                        <input type="number" style="height:100%;background:transparant;" @input="checkCode" v-model="userInfo.code" placeholder-style="color:rgba(255,255,255,0.4);font-size:16px" maxlength="6" placeholder="验证码">
                    </i-col>
                    <i-col :span="7" i-class="height">
                        <div id="check" style="color:#8EB1ED;font-size:50%;text-align:center;line-height:70rpx;" @click="time==120?sendCheck():''">{{checkTime}}</div>
                    </i-col>
                </i-row>
                <span style="font-size:14px;padding-left:30rpx">密码必须6-16位,由大小写字母、数字、-_组成</span>
                <div @touchend="gary=false,Resister()" @touchstart="gary=true" :class="gary?'gary':''" style="width:calc(100% - 30rpx);height:100rpx;background:white;margin:20rpx 15rpx 0 15rpx;border-radius:10rpx;text-align:center;line-height:100rpx;color:#8EB1ED" >注册</div>
                <div @click="res=false,clear()"  style="width:calc(100% - 30rpx);height:100rpx;margin:30rpx 15rpx 0 15rpx;border-radius:10rpx;text-align:center;line-height:100rpx;" >返回</div>
            </div>
        </div>
        <i-toast id="toast" />
    </div>
</template>

<script>
import md5 from 'js-md5'
let sha1=require('js-sha1')
// let Base64 = require('js-base64').Base64;
export default {
    data(){
        return{
            userInfo:{
                telphone:'',
                password:'',
                rePassword:'',
                type:0,
                code:'',
                name:''
            },
            resister:false,
            gary:false,
            res:false,
            time:120,
            checkTime:'获取验证码',
            lazy:'',
            longLazy:'',
            check:{
                tel:false,
                code:false,
                pw:false,
                rpw:false,
                showPw:false,
                showRpw:false
            },
            log:false
        }
    },
    methods:{
        onGetUserInfo(e) {
            var that=this
            console.log(e)
            let obj=JSON.parse(e.mp.detail.rawData)
            this.$store.state.imgUrl=obj.avatarUrl
            this.$store.state.nickName=obj.nickName
            this.login().then(res=>{
                if(e.mp.detail.rawData){
                wx.login({
                    success:function(res){
                        var code=res.code;
                        that.$fetch.getOpenid({url:code,phone:that.userInfo.telphone}).then(resp=>{
                        console.log(resp)
                            let name=resp.data.userData.name,id=resp.data.userData.id
                            name?that.$store.state.nickName=obj.nickName=name:''
                            resp.data=JSON.parse(resp.data.e)
                            that.$store.state.openId=resp.data.openid
                            that.$store.state.phone=that.userInfo.telphone
                            console.log(resp.data)
                            that.$store.state.id=id
                            wx.setStorage({key:'userInfo',data:JSON.stringify({
                                id:id,
                                openId:resp.data.openid,
                                phone:that.$store.state.phone,
                                nickName:name||that.$store.state.nickName,//
                                imgUrl:that.$store.state.imgUrl
                            })})
                            that.userInfo.telphone=''
                            that.userInfo.password=''
                            wx.switchTab({
                                url:"/pages/index/main"
                            })
                            console.log(that.$store.state)
                        }).catch(e=>{
                            console.log(e)
                        })
                    }
                    
                })
                }else{
                    wx.switchTab({
                        url:"/pages/index/main"
                    })
                }
            })
        },
        login(){
            return new Promise((resolve,reject)=>{
                if(!this.userInfo.type){
                    let j=this.userInfo.pssword
                    //md5(sha1(this.userInfo.password)+'dJm;Y3VXve2:N,<OCn@|L(%iu$g~Wx6^>qfT`4!0')
                    this.userInfo.password=md5(sha1(this.userInfo.password)+'dJm;Y3VXve2:N,<OCn@|L(%iu$g~Wx6^>qfT`4!0')
                    this.$fetch.login(this.userInfo).then(resp=>{
                        console.log(resp)
                        if(resp.data.returnCode){
                            resolve()
                        }else if(!resp.data.returnCode||typeof resp.data.returnCode=='undefined'){
                            this.userInfo.password=''
                            this.$toast({
                                content:resp.data.returnMsg,
                                type:'error'
                            })
                            reject()
                        }
                    })
                }else{
                    if(this.check.tel&&this.check.code){
                        this.$fetch.login(this.userInfo).then(resp=>{
                            console.log(resp)
                            if(resp.data.returnCode){
                                resolve()
                            }else if(resp.data.returnCode||typeof resp.data.returnCode=='undefined'){
                                this.$toast({
                                    content:resp.data.returnMsg,
                                    type:'error'
                                })
                                reject()
                            }
                        })
                    }else{
                        this.$toast({
                            content:'请正确填写信息',
                            type:'error'
                        })
                    }
                }
            })
            
        },
        Resister(){
            if(this.check.tel&&this.check.code&&this.check.pw&&this.check.rpw){
                let p=this.userInfo.password//md5(sha1(this.userInfo.password)+'dJm;Y3VXve2:N,<OCn@|L(%iu$g~Wx6^>qfT`4!0')
                this.userInfo.password=md5(sha1(this.userInfo.password)+'dJm;Y3VXve2:N,<OCn@|L(%iu$g~Wx6^>qfT`4!0')
                this.userInfo.rePassword=md5(sha1(this.userInfo.rePassword)+'dJm;Y3VXve2:N,<OCn@|L(%iu$g~Wx6^>qfT`4!0')
                this.$fetch.register({...this.userInfo,provinceId:0,cityId:0,countryId:0},this.userInfo.code).then(resp=>{
                    if(resp.data.returnCode){
                        this.res=false
                        this.clear()
                    }else if(!resp.data.returnCode||typeof resp.data.returnCode=='undefined'){
                        this.userInfo.password=this.userInfo.rePassword=p
                        this.$toast({
                            content:resp.data.returnMsg,
                            type:'error'
                        })
                    }
                })
            }else{
                this.$toast({
                    content:'请核对信息',
                    type:'error'
                })
            }
        },
        sendCheck(){
            if(this.check.tel){
                this.time--
                this.checkTime='剩余'+this.time+'s'
                this.$fetch.getCode(this.userInfo).then(resp=>{
                    console.log(resp)
                })
                this.deTime()
            }else{
                this.$toast({
                    content:'请输入正确手机号',
                    type:'error'
                })
            }
            
        },
        deTime(){
            if(this.time!=0){
                setTimeout(()=>{
                    this.time--;
                    this.checkTime='剩余'+this.time+'s'
                    this.deTime()
                },1000) 
            }else{
                this.checkTime='获取验证码'
                this.time=120
            }
        },
        checkTel(e){
            clearTimeout(this.lazy)
            this.lazy=setTimeout(()=>{
                if(/^1[345789]\d{9}$/.test(this.userInfo.telphone)){
                    this.check.tel=true
                }else{
                    console.log('hhh')
                    this.check.tel=false
                }
            },200)
        },
        checkCode(e){
            clearTimeout(this.lazy)
            this.lazy=setTimeout(()=>{
                if(/^\d{6}$/.test(this.userInfo.code)){
                    this.check.code=true
                }else{
                    console.log('hhh')
                    this.check.code=false
                }
            },200)
        },
        checkPassword(e){
            clearTimeout(this.lazy)
            this.lazy=setTimeout(()=>{
                if(/^[\w_-]{6,16}$/.test(this.userInfo.password)){
                    this.check.pw=true
                }else{
                    console.log('hhh')
                    this.check.pw=false
                }
            },200)
        },
        checkRePw(e){
            clearTimeout(this.longLazy)
            this.longLazy=setTimeout(()=>{
                if(this.userInfo.password==this.userInfo.rePassword){
                    this.check.rpw=true
                }else{
                    this.$toast({
                        content:'两次密码不一致',
                        type:'warning'
                    })
                    this.check.rpw=false
                }
            },2000)
        },
        clear(){
            let j=this.userInfo.type
            for(let i in this.check){
                this.check[i]=false
            }
            this.userInfo.res()
            this.userInfo.type=j
        }
    },
    onShow(){
        // console.log(sha1)
        console.log()
    },
    mounted(){
        wx.getStorage({
            key:'userInfo',
            success:(res)=>{
                let data=JSON.parse(res.data)
                for(let i in data){
                    this.$store.state[i]=data[i]
                }
                wx.switchTab({
                    url:"/pages/index/main"
                })
            }
        })
    }
}
</script>

<style scoped>
    ::-webkit-input-placeholder {
         color: #ffffff;
         font-size: 12px;
     }
    .bg{
        height:100%;
        width:100%;
        background:linear-gradient(rgb(94,146,238),rgb(175,198,237));
        overflow:hidden;
    }
    #res{
        width:300rpx;
        height:70rpx;
        margin:100rpx auto 0;
        border:1px solid;
        border-radius:10rpx;
        text-align:center;
        line-height:70rpx
    }
    #res:active{
        background:white;
        color:rgb(133, 171, 238)
    }
    #icon{
        height:30%;
        margin-top:5%;
        position:relative;
    }
    #inp{

    }
    #user {
        margin-top:30rpx;
        margin-left:30rpx;
        box-sizing:border-box;
        position:relative;
        width:20rpx;
        height:20rpx;
        border:1px solid white;
        border-radius:50%;
    }
    #user:after {
        content:"";
        position:absolute;
        top:20rpx;
        left:50%;
        margin-left:-15rpx;
        width:30rpx;
        height:15rpx;
        border:1px solid white;
        border-top-left-radius:30rpx;
        border-top-right-radius:30rpx;
        border-bottom-right-radius:15rpx;
        border-bottom-left-radius:15rpx;
    }
    #pw {
        margin-left:30rpx;
        margin-top:45rpx;
        box-sizing:border-box;
        position:relative;
        width:32rpx;
        height:25rpx;
        border:3rpx solid white;
        border-radius:10rpx;
    }
    #pw:before {
        box-sizing:border-box;
        content:"";
        position:absolute;
        top:-10rpx;
        left:50%;
        margin-left:-7rpx;
        width:14rpx;
        height:10rpx;
        border:3rpx solid white;
        border-style:solid none none solid;
        border-radius:50%;
    }
    #pw::after{
        content:'';
        width:4rpx;
        height:10rpx;
        background:white;
        position:absolute;
        top:50%;
        left:50%;
        margin-top:-5rpx;
        margin-left:-2rpx;
    }
    .gary{
        background:rgb(196, 196, 196) !important
    }
    .btn:active{
        background:rgb(196, 196, 196) !important
    }
    #phone {
        margin-left:30rpx;
        margin-top:40rpx;
        box-sizing:border-box;
        position:relative;
        width:28rpx;
        height:35rpx;
        border-width:5rpx 4rpx 8rpx;
        border-style:solid;
        border-radius:5rpx;
    }
    #phone:after {
        content:"";
        position:absolute;
        right:0;
        bottom:-4rpx;
        left:0;
        margin:auto;
        width:6rpx;
        height:4rpx;
        background-color:#8EB1ED;
        border-radius:4rpx;
    }
    #check{
        width:100%;
        height:calc(100% - 30rpx);
        background:white;
        border-radius:10rpx;
        margin:15rpx 0
    }
    .eye {
        top:37rpx;
        left:50%;
        margin-left:-25rpx;
        box-sizing:border-box;
        position:relative;
        width:50rpx;
        height:35rpx;
        background-color:#fff;
        border-radius:50%;
    }
    .eye:before {
        content:"";
        position:absolute;
        top:0;
        right:0;
        bottom:0;
        left:0;
        margin:auto;
        width:20rpx;
        height:20rpx;
        background:#8EB1ED;
        border-radius:50%;
    }
    .eye:after {
        content:"";
        position:absolute;
        top:0;
        right:0;
        bottom:0;
        left:0;
        margin:auto;
        width:10rpx;
        height:10rpx;
        background-color:#fff;
        border-radius:50%;
    }
</style>


