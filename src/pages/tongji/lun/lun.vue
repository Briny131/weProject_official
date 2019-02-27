<template>
    <div style="height:100%;background:linear-gradient(rgb(94,146,238),rgb(175,198,237));overflow:auto">
        <div class="title">
            <div class="content">
                论坛
            </div>
            <div class="search">
                <div class="img"></div>
                <div class="input">
                    <input type="text" class="s-input" placeholder="ceshi">
                    <span id="clear"></span>
                    <span class="s-btn">取消</span>
                </div>
            </div>
        </div>
        <div class="body">
            <Con v-for="item in lun" :key="item.title" :title='item.title' :Image="item.img" :data="item.data"></Con>
        </div>
        <div class="submit" @click="turnToW">
            <img src="http://map.yujh.cn/img/icon-pen.png" style="z-index:100;width:60%;height:60%;padding-top:20%;" alt="ss"/>
        </div>
    </div>
</template>

<script>
import Btn from '../../../components/button.vue'
import Tip from '../../../components/tip'
import Con from '../../../components/content.vue'

export default {
  data () {
    return {
        inputShowed:false,
        inputVal:'ssss',
        lun:[
            {
                title:'1',
                img:[
                    {
                        id:11,
                        url:'http://map.yujh.cn:8088/map/img/1.jpg'
                    },
                ]
            },
            {
                title:'2',
                data:'这是第二个标签这是第二个标签这是第二个标签这ssa是第二个标签这是第二个标签这是第二个标签这是第二个标签这是第二个标签这是第二个标签这是第二个标ssa签这是第二个标签这是第二个标签这是第二个标签这是第二个标签这是第二个标签这是第二个标签这是第二个标签这是第二个标签这是第二个标签这是第二个标签这是第二个标签这是ss第二个标签这是第二个标签这是第二个标签',
                img:[
                    {
                        id:11,
                        url:'http://map.yujh.cn:8088/map/img/1.jpg'
                    },
                    {
                        id:11,
                        url:'http://map.yujh.cn:8088/map/img/1.jpg'
                    },
                    {
                        id:11,
                        url:'http://map.yujh.cn:8088/map/img/1.jpg'
                    },
                ]
            },
            {
                title:'3',
                img:[
                    {
                        id:11,
                        url:'http://map.yujh.cn:8088/map/img/1.jpg'
                    },
                    {
                        id:11,
                        url:'http://map.yujh.cn:8088/map/img/1.jpg'
                    },
                    {
                        id:11,
                        url:'http://map.yujh.cn:8088/map/img/1.jpg'
                    },
                    {
                        id:11,
                        url:'http://map.yujh.cn:8088/map/img/1.jpg'
                    },
                ]
            }
        ]
    }
},


computed:{
    
},

components: {
    Btn,
    Tip,
    Con
},

methods: {
    turnToW(){
        console.log('jjj')
        wx.navigateTo({
            url:'../writeMark/main'
        })
    }
},

created () {
    console.log(this.data)
},
onShow(){
}
}
</script>

<style scoped>
    @import url('./mark.css');
    page{
        height:100%;
    }
</style>
