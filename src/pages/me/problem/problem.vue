<template>
    <div>
        <div class="_div data-v-262c43c3 weui-cells__title">问题反馈</div>
        <div class="_div data-v-262c43c3 weui-cells weui-cells_after-title">
            <div class="_div data-v-262c43c3 weui-cell">
                <div class="_div data-v-262c43c3 weui-cell__bd">
                    <textarea class="_textarea data-v-262c43c3" placeholder="请输入文本" style="height: 10em" maxlength="200" v-model="proDetail"/> 
                    <div class="_div data-v-262c43c3 weui-textarea-counter">{{proDetail.length}}/200</div>
                </div>
            </div>
        </div>
        <i-button @click="proCommit" type="success" shape="circle" size="small" >提交</i-button>
    </div>
</template>

<script>
export default {
    data(){
        return{
            proDetail:''
        }
    }
}
</script>

