<template>
    <div style="height:100%;background:linear-gradient(rgb(94,146,238),rgb(175,198,237));">
        <div class="back" @click="urlBack" v-if="motion"></div>
        <div style="height:100%;position:relative"> <!--position:absolute;left:0;right:0;top:0;bottom:0;margin:auto-->
            <div :style="{height:width+'px',width:height+'px'}"  ><!--transform:'rotate(0deg)',height:width+'px',width:height+'px',position:'absolute',top:(height-width+25)/2+'px',left:(width-height+25)/2+'px'-->
                <mpvue-echarts :echarts="echarts" v-if="!motion" :onInit="onInit" :change="change"  canvasId="demo" />
            </div>
        </div>
    </div>
    
</template>

<script>   

import * as echarts from 'echarts/echart.cc.js'
// import * as echarts from 'echarts/dist/echarts.simple.min.js'
import mpvueEcharts from 'mpvue-echarts'

export default {
    components: {
      mpvueEcharts,
    },
    data () {//ccz
      return {
        math:{
            max:'',
            min:'',
            ava:''
        },
        S:false,
        num:{
            up:'12',
            down:'2'
        },
        echarts,
        onInit:this.initChart,
        onBar:this.draw,
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
        motion:true
      }
    },
    computed:{
        select:function(){
            return this.$store.state.select
        }
    },
    methods:{
        posChange(){
            if(wx.getSystemInfoSync().screenWidth<wx.getSystemInfoSync().screenHeight){
                return true
            }
            else{
                return false
            }
                
        },
        swChange(x){
            this.S=x
        },
        urlBack(){
            console.log('hhhh')
            wx.redirectTo({url:'../main?data='+JSON.stringify(this.id)})
        },
        out(title,x){
            // this.title=title
            // this.show=true
            // if(x)
            //     this.now=x
            // else
            //     this.now=false
        },
        fullData(data){
            if(this.now)
                this.num[this.now]=data
            this.show=false
        },
        initChart(canvas, width, height) {
            
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
                            c+=`日期：${params[0].seriesName.split(',')[Math.floor(params[0].dataIndex/95)]}--数值：${params[i].value}
`
                        }
                        return `时间：${d.getHours()+Math.floor((params[0].dataIndex%95)/29)}:${d.getMinutes()+(params[0].dataIndex%95)%29*15||'00'}
`+c
                    }
                },
                grid: {
                    left: '3%',
                    right: '4%',
                    bottom: '20%',
                    containLabel: true
                },
                dataZoom: [
                    {
                        dataBackground:{
                            areaStyle:{
                                color:'rgba(255,255,255,0.5)'
                            }
                        },
                        backgroundColor:'rgba(0,0,0,0.2)',
                        height:30,
                        show: true,
                        realtime: true,
                        start: 0,
                        end: 100
                    }
                ],
                xAxis :{
                    type : 'category',
                    boundaryGap : false,
                    min:1,
                    data : (function(){
                        let d=[]
                        for(let i=0;i<2880;i++){
                            d.push(i)
                        }
                        return d
                    })(),
                    axisLabel : {
                        formatter: (value, index) =>{
                            if(index%95==0)
                            return this.week[index/95]
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
                },
                series :{
                    name:this.week,
                    type:'line',
                    smooth:true,
                    symbol:'none',
                    data:(()=>{
                        try{
                            return this.data2
                        }
                        catch(err){
                            return []
                        }
                    })()
                },
                color:['rgb(113,255,180)','rgb(175,255,93)','rgb(255,250,165)','rgb(67,247,227)','rgb(157,255,229)'],
            }; 

            char.setOption(option);

            return char; 
        }
    },
    onShow(){
        var that=this
        wx.getSystemInfo({
            success: function(res) {
                that.width=res.windowWidth
                that.height=res.windowHeight
            },
        })
        this.change+=1
        wx.startDeviceMotionListening({
            success:function(e){
                console.log(e,'device')
            },
            complete:function(e){
                console.log(that)
            }
        })
        wx.onDeviceMotionChange((e)=>{
            that.motion=that.posChange()
        })
    },
    onLoad(option){
        let d
        // let data=JSON.parse(option.data)
        // console.log(option,data)
        // this.title=data.sensorName
        this.active=true
        this.week=[]
        this.data=[]
        this.data1=[]
        this.id=JSON.parse(option.data)
        let head
        for(let i=29;i>=0;i--){
            d=new Date()
            d.setDate(d.getDate()-i)
            if(i==29){
                head=d.getFullYear()+'-'+d.getMonth()+1+'-'+d.getDate()+' 00:00:00'
            }
            let day=d.getDate()>=10?d.getDate():'0'+d.getDate(),month=d.getMonth()+1>=10?d.getMonth()+1:'0'+(d.getMonth()+1)
            this.week.push(`${month}-${day}`)
        }
        
        console.log('hhhh')
        this.$fetch.getThird({sid:this.id.id}).then(resp=>{
            head=new Date(head).valueOf()/1000
            let component=[],j=0,NewArray=[]
            for(let i=0;i<(96*30);i++){
                component.push(head+i*900)
            }
            for(let i=0;i<component.length;i++){
                if(component[i]==resp.data.data[j].createTime){
                    NewArray.push(resp.data.data[j])
                    if(j+1!=resp.data.data.length) j++
                }else{
                    NewArray.push({createTime:component[i],paramOxygen:0})
                }
            }
            for(let i=0;i<NewArray.length;i++){
                if(NewArray[i].paramOxygen==0&&i>0&&i<NewArray.length-1&&NewArray[i-1].paramOxygen&&NewArray[i+1].paramOxygen){
                    NewArray[i].paramOxygen=(+(NewArray[i-1].paramOxygen)+(+NewArray[i+1].paramOxygen))/2+''
                }
            }
            console.log(NewArray,'emememem')
            resp.data.data=NewArray
            for(let i in this.week){
                if(i==29)
                    this.input[this.week[i]]=true
                else
                    this.input[this.week[i]]=false
                
                // this.data.unshift({name:this.week[i],data:resp.data.data.slice(0+i*96,96+i*96).map(function(x){return x.paramTemp})})
                // this.data1.unshift({name:this.week[i],data:resp.data.data.slice(0+i*96,96+i*96).map(function(x){return x.paramOxygen})})
                // console.log(resp.data.data.slice(0+i*96,96+i*96).map(function(x){return x.paramOxygen}))
                
                this.data1=this.data1.concat(resp.data.data.slice(0+i*96,96+i*96).map(function(x){return x.paramOxygen}))
            }
            this.data2=this.data1
            console.log(this.data2)
            this.change+=1
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
        left:45rpx;
        width:45rpx;
        height:45rpx;
        transform:rotate(-45deg);
        color:#fff;
        border-left:2px solid;
        border-top:2px solid;
        top:50%;
        margin-top:-20rpx;
        z-index:1000;
    }
</style>

