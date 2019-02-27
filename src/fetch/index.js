import './host'
import config from './config'

var Fly=require("flyio/dist/npm/wx")
var fly=new Fly

function doPost(url,params){
    return new Promise((resolve,reject)=>{
        fly.post(url,params).then((resp)=>{
            resolve(resp)
        }).catch(e=>{
            reject(e)
        })
    })
    
}

function doGet(url,params){
    // url=url+'?areaId='+params
    return new Promise((resolve,reject)=>{
        fly.get(url,params).then(resp=>{
            resolve(resp)
        }).catch(e=>{
            reject(e)
        })
    })
}

export default {
    getCode(params){
        return doGet(config.getCode,params)
    },
    register(params,code){
        return new Promise((resolve,reject)=>{
            fly.post(config.register+`?code=${code}`,params).then((resp)=>{
                resolve(resp)
            }).catch(e=>{
                reject(e)
            })
        })
    },
    login(params){
        return doGet(config.login,params)
    },
    getTang(params){
        return doGet(config.getTang,params)
    },
    getDaily(params){
        return doGet(config.getDaily,params)
    },
    getOpenid(params){
        return doGet(config.getOpenid,params)
    },
    postContent(params){
        return doPost(config.postContent,params)
    },
    getLun(params){
        return doGet(config.getLun,params)
    },
    getLunDetail(params){
        return doGet(config.getLunDetail,params)
    },
    saveInfo(params){
        return doGet(config.saveInfo,params)
    },
    Talks(params){
        return doPost(config.Talks,params)
    },
    getPing(params){
        return doGet(config.getPing,params)
    },
    getThird(params){
        return doGet('https://miniapp.yujh.cn/list/30detail',params)
    }
}
