<template>
    <div style="height:100%;background:linear-gradient(rgb(94,146,238),rgb(175,198,237));overflow:auto">
        <div class="title">
            <div class="content">
                论坛
            </div>
            <div class="search">
                <img class="img" :src="img" alt="#">
                <div class="input">
                    <input type="text" class="s-input" placeholder="ceshi">
                    <span id="clear"></span>
                    <span class="s-btn">取消</span>
                </div>
            </div>
        </div>
        <!-- <scroll-view style="height:300rpx">
            <Con v-for="item in lun" :key="item.id" @click="jumpInto($event,item.id)" :title='item.title' :Image="item.picture" :data="item.content" :editor="item.name" :date="item.createTime"></Con>
        </scroll-view> -->
        <div class="body">
            <Con v-for="item in lun" :key="item.id" @click="jumpInto($event,item.id)" :title='item.title' :Image="item.picture" :data="item.content" :editor="item.name" :date="item.createTime"></Con>
        </div>
        <div class="submit" @click="turnToW">
            <img src="http://map.yujh.cn/img/icon-pen.png" style="z-index:100;width:60%;height:60%;padding-top:20%;" alt="ss"/>
        </div>
    </div>
</template>

<script>
import Btn from '../../components/button.vue'
import Tip from '../../components/tip'
import Con from '../../components/content.vue'

export default {
  data () {
    return {
        inputShowed:false,
        inputVal:'ssss',
        lun:[]
    }
},


computed:{
    img:function(){
        return this.$store.state.imgUrl
    }
},

components: {
    Btn,
    Tip,
    Con
},

methods: {
    turnToW(){
        wx.redirectTo({
            url:'../tongji/writeMark/main'
        })
    },
    jumpInto(e,id){
        wx.redirectTo({
            url:'../tongji/seeContent/main?id='+id
        })
    }
},
onPageScroll(e){
    console.log(e)
},
created () {
    
},
onShow(){
    this.$fetch.getLun({}).then(res=>{
        for(let i in res.data.topic){
            if(res.data.topic[i].picture)
                res.data.topic[i].picture=res.data.topic[i].picture.split(' ')
            else
                res.data.topic[i].picture=res.data.topic[i].picture
        }
        this.lun=res.data.topic
        console.log(this.lun)
    })
}
}
</script>

<style scoped>
    @import url('./mark.css');
    page{
        height:100%;
    }
</style>
