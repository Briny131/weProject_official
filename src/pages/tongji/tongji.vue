<template>
    <div style='width:100%;height:100%;background:linear-gradient(rgb(94,146,238),rgb(175,198,237));overflow:auto' >
        <div class="title">
            <div class="content">
                <div class="back" @click="urlBack"></div>
                数据变化曲线图
                <span>{{title}}</span>
            </div>
            <div class="tab">
                <div class="left">
                    <div class="tab-c" :class="active?'':'active'" @click="active?'':(active=true,change+=1,data2=data1,jisuan(),clearChoose()) ">溶氧</div>
                </div>
                <div class="right">
                    <div class="tab-c" :class="active?'active':''" @click="active?(active=false,change+=1,data2=data,jisuan(),clearChoose()):''">温度</div>
                </div>
            </div>
        </div>
        <div style="height:40%;position:relative">
            <div style="height:100%;margin-top:50rpx"  >
                <mpvue-echarts :echarts="echarts"  :onInit="onInit" :change="change" canvasId="demo-canvas" />
            </div>
        </div>
        <div style="margin:20rpx 20rpx 20rpx;border-radius:12rpx;overflow:hidden" v-if="active&&select.length!=1">
            <p-btn text='溶氧数值警报' src="http://map.yujh.cn/img/icon.png" color="#ddd" :sw="true" @switch="swChange" :uuu="S"  :next="false" :bot="false"></p-btn>
            <p-btn text='溶氧高位报警设置' src="http://map.yujh.cn/img/icon.png" color="white" @click="out('溶氧高位报警设置','up')" :count="num.up" :next="false" :bot="false"></p-btn>
            <p-btn text='溶氧低位报警设置' src="http://map.yujh.cn/img/icon.png" color="white" @click="out('溶氧低位位报警设置','down')" :count="num.down" :next="false" :bot="false"></p-btn>
            <p-btn text='历史溶氧走势表' src="http://map.yujh.cn/img/icon.png" color="white" @click="toBig"  :bot="false"></p-btn>
        </div>
        <div v-if="select.length==1" style="margin:20rpx 20rpx 20rpx;border-radius:12rpx;overflow:hidden">
            <p-btn text='日最高值' src="http://map.yujh.cn/img/icon.png" color="white"  :count="math.max" :next="false" :bot="false"></p-btn>
            <p-btn text='日最低值' src="http://map.yujh.cn/img/icon.png" color="white"  :count="math.min" :next="false" :bot="false"></p-btn>
            <p-btn text='日平均值' src="http://map.yujh.cn/img/icon.png" color="white"  :count="math.ava" :next="false" :bot="false"></p-btn>
        </div>
        <data-tip :title="title" :show='show' :data="num[now]" sure="确定" refuse="取消" @close="show=false" @submit="fullData"></data-tip>
    </div>
    
</template>

<script>   

import * as echarts from 'echarts/echarts.all.js'
// import * as echarts from 'echarts/dist/echarts.simple.min.js'
import mpvueEcharts from 'mpvue-echarts'
import pBtn from '../../components/pBtn.vue'
import dataTip from '../../components/dataTip.vue'

export default {
    components: {
      mpvueEcharts,
      pBtn,
      dataTip
    },
    data () {//ccz
      return {
        id:'',
        math:{
            max:'',
            min:'',
            ava:''
        },
        S:true,
        num:{
            up:'12',
            down:'2'
        },
        echarts,
        onInit:this.initChart,
        onBar:'',
        change:1,
        c:1,
        title:'',
        width:'',
        height:'',
        output:[],
        input:{},
        active:true,
        show:false,
        week:[],
        data:[
        ],
        data1:[],
        data2:[],
        title:'',
        now:'',
        screen:'',
        thia:null
      }
    },
    computed:{
        select:function(){
            return this.$store.state.select
        }
    },
    // watch:{
    //     select:function(){
    //         console.log(this,'watch')
    //         this.jisuan()
    //     }
    // },
    methods:{
        clearChoose(){
            this.$store.state.select=[]
            this.$store.state.select.push(this.week[4])
        },
        jisuan(){
            var data
            var danwei=this.active?'':'℃'
            if(this.select.length==1){
                for(let i in this.data2){
                    if(this.data2[i].name==this.select[0]){
                        data=this.data2[i].data
                        var max=-9999,min=9999,ava=0
                        for(let j in data){
                            if(data[j]>max)
                                max=data[j]
                            if(data[j]<min)
                                min=data[j]
                            ava+=(+data[j])
                        }
                        ava=(ava/data.length).toFixed(2)
                        this.math={max:max+danwei,min:min+danwei,ava:ava+danwei}
                        break
                    }
                }
            }
            return this
        },
        swChange(x){
            console.log(x)
            this.S=x
            this.clearChoose()
            this.change++
        },
        toBig(){
            var that=this
            wx.redirectTo({
                url:'./big/main?data='+JSON.stringify(that.thia)
            })
        },
        urlBack(){
            wx.switchTab({
                url:'../index/main'
            });
        },
        out(title,x){
            this.title=title
            this.show=true
            if(x)
                this.now=x
            else
                this.now=false
            this.onBar=false
        },
        fullData(data){
            if(this.now)
                this.num[this.now]=data
            this.show=false
            this.clearChoose()
            this.change++
            this.onBar=true
            this.time()
        },
        initChart(canvas, width, height) {
            this.width=width
            this.height=height
            var char=''
            char = echarts.init(canvas, null, {
                width: width,
                height: height
            });
            canvas.setChart(char);

            var option = {
                title: {
                    text: ''
                },
                tooltip : {
                    trigger: 'axis',
                    axisPointer: {
                        type: 'cross',
                        label: {
                            backgroundColor: '#6a7985'
                        }
                    },
                    position: function(point, params, dom, rect, size){
                        var x = point[0];//
                        var y = point[1];
                        var viewWidth = size.viewSize[0];
                        var viewHeight = size.viewSize[1];
                        var boxWidth = size.contentSize[0];
                        var boxHeight = size.contentSize[1];
                        var posX = 0;//x坐标位置
                        var posY = 0;//y坐标位置
                        
                        if(x<viewWidth/2){//左边放不开
                            posX = 5+x;    
                        }else{//左边放的下
                            posX = x-boxWidth; 
                        }
                        
                        posY=viewHeight/2-boxHeight/2
                        return [posX,posY];
                    },
                    formatter:function(params,ticket,callback){
                        let d=new Date(0,0,0,0),c=''
                        for(let i in params){
                            c+=`日期：${params[i].seriesName}--数值：${params[i].value}
`
                        }
                        return `时间：${d.getHours()+Math.floor(params[0].dataIndex/4)}:${d.getMinutes()+params[0].dataIndex%4*15||'00'}
`+c
                    }
                },
                
                legend: 
                {
                    orient: 'horizontal',
                    left:'center',
                    itemGap: 3,
                    itemWidth: 0,
                    itemHeight: 0,
                    // padding: [10, 10],
                    // type:'scroll',
                    // inactiveColor:'#aaa',
                    data:[{
                        name:this.week[0],
                        icon:'circle',
                        textStyle:{
                            backgroundColor:'rgb(113,255,180)',
                            color:'rgb(115,159,238)',
                        },
                        ceshiStyle:{
                            borderColor:'rgb(113,255,180)',
                            fontWeight:'bold',
                            fontSize:15,
                            borderWidth:'2',
                            borderRadius:20,
                            padding:[6,7,6,7]
                        }
                    },{
                        name:this.week[1],
                        icon:'circle',
                        textStyle:{
                            color:'rgb(115,159,238)',
                            backgroundColor:'rgb(175,255,93)'
                        },
                        ceshiStyle:{
                            borderColor:'rgb(175,255,93)',
                            fontWeight:'bold',
                            fontSize:15,
                            borderWidth:'2',
                            borderRadius:20,
                            padding:[6,7,6,7]
                        }
                        
                    },{
                        name:this.week[2],
                        icon:'circle',
                        textStyle:{
                            color:'rgb(115,159,238)',
                            backgroundColor:'rgb(255,250,165)'
                        },
                        ceshiStyle:{
                            borderColor:'rgb(255,250,165)',
                            fontWeight:'bold',
                            fontSize:15,
                            borderWidth:'2',
                            borderRadius:20,
                            padding:[6,7,6,7]
                        }
                    },{
                        name:this.week[3],
                        icon:'circle',
                        textStyle:{
                            color:'rgb(115,159,238)',
                            backgroundColor:'rgb(67,247,227)'
                        },
                        ceshiStyle:{
                            borderColor:'rgb(67,247,227)',
                            fontWeight:'bold',
                            fontSize:15,
                            borderWidth:'2',
                            borderRadius:20,
                            padding:[6,7,6,7]
                        }
                    },{
                        name:this.week[4],
                        icon:'circle',
                        textStyle:{
                            color:'rgb(115,159,238)',
                            backgroundColor:'rgb(157,255,229)'
                        },
                        ceshiStyle:{
                            borderColor:'rgb(157,255,229)',
                            fontWeight:'bold',
                            fontSize:15,
                            borderWidth:'2',
                            borderRadius:20,
                            padding:[6,7,6,7]
                        }
                    },],
                    textStyle:{
                        color:'white',
                        fontWeight:'bold',
                        fontSize:15,
                        borderColor:'white',
                        borderWidth:'2',
                        borderRadius:20,
                        padding:[6,7,6,7]
                    },
                    selected:Object.keys(this.input).map(value=>{
                        if(this.select.indexOf(value)!=-1)
                            return true
                        else
                            return false
                    }).forEach((value,index)=>{
                        this.input[index]=value
                    })||this.input
                },
                grid: {
                    left: '3%',
                    right: '4%',
                    bottom: '5%',
                    containLabel: true
                },
                xAxis :{
                    type : 'category',
                    boundaryGap : false,
                    min:1,
                    data : (function(){
                        let d=[]
                        for(let i=0;i<96;i++){
                            d.push(i)
                        }
                        return d
                    })(),
                    axisLabel : {
                        formatter: function (value, index) {
                            let d=new Date(0,0,0,0)
                            if(value%12==0){
                                return `${d.getHours()+Math.floor(value/4)}:${d.getMinutes()+value%4*15||'00'}`
                                // return '3:45'
                            }else{
                                return ``
                            }
                        },
                        textStyle: {
                            color: '#fff'
                        }
                    },
                    itemStyle:{
                        color:'white',
                        fontSize:'20px'
                    },
                    axisLine:{
                        show:false
                    },
                    axisTick:{
                        show:false
                    }
                },
                yAxis : {
                    type:'value',
                    axisLabel : {
                        formatter: '{value}',
                        textStyle: {
                            color: '#fff'
                        }
                    },
                    axisTick:{
                        show:false
                    },
                    axisLine:{
                        show:false
                    },
                    splitLine:{
                        lineStyle:{
                            color:'rgba(255,255,255,0.2)'
                        }
                    },
                    // splitNumber:3,
                    // // interval:{
                    // //     min:2,max:12
                    // // },
                    // splitArea:{
                    //     areaStyle:{
                    //         color:['rgb(116,227,121)','rgb(201,227,116)','rgb(250,155,157)']
                    //     },
                    //     show:true
                    // }
                },
                // visualMap: {
                //     show:false,
                //     type:'piecewise',
                //     pieces: [
                //     //     {
                //     //     gt: 0,
                //     //     lte:1,
                //     //     color: '#096'
                //     // }, {
                //     //     gt: 1,
                //     //     lte: 2,
                //     //     color: '#ffde33'
                //     // }, 
                //     {
                //         gt: 2,
                //         lte: 3,
                //         color: '#ff9933'
                //     }],
                //     outOfRange: {
                //         color: 'red'
                //     }
                // },
                series :[
                    {
                        name:this.week[0],
                        type:'line',
                        smooth:true,
                        symbol:'none',
                        data:(()=>{
                            try{
                                return this.data2[0].data
                            }
                            catch(err){
                                return []
                            }
                        })(),
                        markLine: this.S?{
                            silent: true,
                            animation:false,
                            data: [{
                                yAxis: this.num.down,
                                lineStyle:{
                                    normal:{
                                        color:'#74E379'
                                    }
                                }
                            }, {
                                yAxis: this.num.up,
                                lineStyle:{
                                    normal:{
                                        color:'#FA3E48'
                                    }
                                }
                            }]
                        }:{}
                    },
                    {
                        name:this.week[1],
                        type:'line',
                        smooth:true,
                        symbol:'none',
                        data:(()=>{
                            try{
                                return this.data2[1].data
                            }
                            catch(err){
                                return []
                            }
                        })(),
                        markLine: this.S?{
                            silent: true,
                            animation:false,
                            data: [{
                                yAxis: this.num.down,
                                lineStyle:{
                                    normal:{
                                        color:'#74E379'
                                    }
                                }
                            }, {
                                yAxis: this.num.up,
                                lineStyle:{
                                    normal:{
                                        color:'#FA3E48'
                                    }
                                }
                            }]
                        }:{}
                    },
                    {
                        name:this.week[2],
                        type:'line',
                        smooth:true,
                        symbol:'none',
                        data:(()=>{
                            try{
                                return this.data2[2].data
                            }
                            catch(err){
                                return []
                            }
                        })(),
                        markLine: this.S?{
                            silent: true,
                            animation:false,
                            data: [{
                                yAxis: this.num.down,
                                lineStyle:{
                                    normal:{
                                        color:'#74E379'
                                    }
                                }
                            }, {
                                yAxis: this.num.up,
                                lineStyle:{
                                    normal:{
                                        color:'#FA3E48'
                                    }
                                }
                            }]
                        }:{}
                    },
                    {
                        name:this.week[3],
                        type:'line',
                        smooth:true,
                        symbol:'none',
                        data:(()=>{
                            try{
                                return this.data2[3].data
                            }
                            catch(err){
                                return []
                            }
                        })(),
                        markLine: this.S?{
                            silent: true,
                            animation:false,
                            data: [{
                                yAxis: this.num.down,
                                lineStyle:{
                                    normal:{
                                        color:'#74E379'
                                    }
                                }
                            }, {
                                yAxis: this.num.up,
                                lineStyle:{
                                    normal:{
                                        color:'#FA3E48'
                                    }
                                }
                            }]
                        }:{}
                    },
                    {
                        name:this.week[4],
                        type:'line',
                        smooth:true,
                        symbol:'none',
                        // areaStyle:{
                        //     // color:'rgba(255,255,255,0.1)'
                        //     color:{
                        //         type: 'linear',
                        //         x: 0,
                        //         y: 0,
                        //         x2: 0,
                        //         y2: 1,
                        //         colorStops: [{
                        //             offset: 0, color: 'rgba(255,255,255,0.1)' // 0% 处的颜色
                        //         }, {
                        //             offset: 1, color: 'rgba(255,255,255,0)' // 100% 处的颜色
                        //         }]
                        //     }
                        // },
                        data:(()=>{
                            try{
                                return this.data2[4].data
                            }
                            catch(err){
                                return []
                            }
                        })(),
                        markLine: this.S?{
                            silent: true,
                            animation:false,
                            data: [{
                                yAxis: this.num.down,
                                lineStyle:{
                                    normal:{
                                        color:'#74E379'
                                    }
                                }
                            }, {
                                yAxis: this.num.up,
                                lineStyle:{
                                    normal:{
                                        color:'#FA3E48'
                                    }
                                }
                            }]
                        }:{}
                    },
                ],
                color:['rgb(113,255,180)','rgb(175,255,93)','rgb(255,250,165)','rgb(67,247,227)','rgb(157,255,229)'],
            }; 

            char.setOption(option);

            return char; 
        },
        time(){
            this.onBar=setTimeout(()=>{
                this.jisuan()
                if(this.onBar){
                    this.time()
                }
            },3e3)
        }
    },
    onShow(){
        let width,height,total
        width=wx.getSystemInfoSync().screenWidth
        height=wx.getSystemInfoSync().screenHeight
        total=width+height
        width=Math.min(width,height)
        height=total-width
        this.screen=`width:${width}px;height:${height}px;`
    },
    onLoad(option){
        let d
        let data=JSON.parse(option.data)
        this.thia=data
        this.id=data.id
        this.title=data.sensorName
        this.active=true
        this.week=[]
        this.data=[]
        this.data1=[]
        let head
        for(let i=4;i>=0;i--){
            d=new Date()
            d.setDate(d.getDate()-i)
            if(i==4){
                let month=d.getMonth()+1
                head=d.getFullYear()+'-'+month+'-'+d.getDate()+' 00:00:00'
            }
            let day=d.getDate()>=10?d.getDate():'0'+d.getDate(),month=d.getMonth()+1>=10?d.getMonth()+1:'0'+(d.getMonth()+1)
            this.week.push(`${month}-${day}`)
        }
        this.$fetch.getDaily({sid:data.id}).then(resp=>{
            head=new Date(head).valueOf()/1000

            let component=[],j=0,NewArray=[]
            for(let i=0;i<(96*5);i++){
                component.push(head+i*900)
            }
            for(let i=0;i<component.length;i++){
                if(component[i]==resp.data.data[j].createTime){
                    NewArray.push(resp.data.data[j])
                    if(j+1!=resp.data.data.length) j++
                }else{
                    NewArray.push({createTime:component[i],paramOxygen:0,paramTemp:0})
                }
            }
            for(let i=0;i<NewArray.length;i++){
                if(NewArray[i].paramOxygen==0&&i>0&&i<NewArray.length-1&&NewArray[i-1].paramOxygen&&NewArray[i+1].paramOxygen){
                    NewArray[i].paramOxygen=(+(NewArray[i-1].paramOxygen)+(+NewArray[i+1].paramOxygen))/2+''
                }
                if(NewArray[i].paramTemp==0&&i>0&&i<NewArray.length-1&&NewArray[i-1].paramTemp&&NewArray[i+1].paramTemp){
                    NewArray[i].paramTemp=(+(NewArray[i-1].paramTemp)+(+NewArray[i+1].paramTemp))/2+''
                }
            }
            console.log(NewArray)
            resp.data.data=NewArray
            for(let i in this.week){
                if(i==4){
                    this.input[this.week[i]]=true
                    head=d.getFullYear()+'-'+d.getMonth()+1+'-'+d.getDate()+' 00:00:00'
                }
                else
                    this.input[this.week[i]]=false
                
                this.data.unshift({name:this.week[i],data:resp.data.data.slice(0+i*96,96+i*96).map(function(x){return x.paramTemp})})
                this.data1.unshift({name:this.week[i],data:resp.data.data.slice(0+i*96,96+i*96).map(function(x){return x.paramOxygen})})
            }
            this.data2=this.data1
            this.change+=1
            this.$store.state.select=[]
            this.$store.state.select.push(this.week[4])
            this.jisuan().time()
        }).catch(error=>{
        })
        // for(let i in this.week){
        //     if(i==4)
        //         this.input[this.week[i]]=true
        //     else
        //         this.input[this.week[i]]=false
            
        //     this.data.unshift({name:this.week[i],data:new Array(96).fill('').map(function(value,index){return 1})})
        //     this.data1.unshift({name:this.week[i],data:[2,1,13,1,2,1,3,2,12,15,2,3,3,15,2,3,3,1,15,2,3,3,1,15,21,3,3,2,1,25,3,3,1]})
        // }
        // this.data2=this.data1
    },
    onUnload:function(){
        this.onBar=false
    }
}
</script>

<style >
    page{
        height:100%;
    }
    .tab{
        position:absolute;
        width:60%;
        left:20%;
        height:80rpx;
        bottom:-30rpx;
    }
    .left,.right{
        float:left;
        width:50%;
        height:100%;
    }
    .tab-c{
        width:80%;
        height:80%;
        margin:auto;
        line-height:64rpx;
        text-align:center;
        border:1px solid white;
        color:white;
        box-shadow:0rpx 0rpx 10rpx #666 inset;
        border-radius:15rpx;
        background:#5A90F5
    }
    .active{
        background:white;
        box-shadow:0rpx 0rpx 10rpx #666;
        color:#5A90F5;
        border:1px solid
    }
    .markData{
        margin:1em 0 2em;
        border-radius:1em
    }
    .title{
        height:250rpx;
        width:100%;
        background:rgb(130, 168, 243);
        box-shadow:0rpx 5rpx 10rpx rgb(67, 123, 235);
        position:relative;
        top:0;
    }
    .content{
        text-align:center;
        position:relative;
        height:200rpx;
        width:100%;
        padding-top:70rpx;
        color:white;
    }
    .content span{
        line-height:40rpx;
        font-size:14px;
        display:block
    }
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
        margin-top:-20rpx;
    }
</style>

