<template>
    <div @click="handleClick" :class="[clearClass?'clear':'','center',styles]" @touchstart="clearbg()" @touchend="pullbg()">
        <span>{{texts}}</span>
    </div>
</template>

<script>
export default {
    props:['styles','texts'],
    data(){
        return {
            clearClass:false
        }
    },
    methods:{
        handleClick(){
            this.$emit('click')
        },
        clearbg(){
            this.clearClass=true;
        },
        pullbg(){
            this.clearClass=false;
        }
    },
    onLoad(){
        console.log(this.styles)
    }
}
</script>


<style scoped>
    .center{
        text-align: center;
        border-radius: 5px;
        margin:30px auto;
        background:rgb(65, 221, 99);
    }
    .large{
        width:250px;
        height:40px;
        line-height: 40px;
        border:1px solid black;
    }
    .middle{
        width:125px;
        height:40px;
        line-height: 40px;
        border:1px solid black;
    }
    .small{
        width:50px;
        height:30px;
        line-height: 30px;
        border:1px solid black;
    }
    .clear{
        background:transparent
    }
</style>


