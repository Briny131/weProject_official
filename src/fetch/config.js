import baseUrl from './host'

const getCode=baseUrl.hostIp+'/admin/getCode'
const register=baseUrl.hostIp+'/admin/register'
const login=baseUrl.hostIp+'/admin/login'
const getOpenid=baseUrl.hostIp+'/admin/getOpenid'
const getTang=baseUrl.hostIp+'/list/poll'
const getDaily=baseUrl.hostIp+'/list/detail'
const postContent=baseUrl.hostIp+'/topic/post'
const getLun=baseUrl.hostIp+'/topic/mini'
const getLunDetail=baseUrl.hostIp+'/topic/content'
const saveInfo=baseUrl.hostIp+'/topic/change'
const Talks=baseUrl.hostIp+'/reply/reply'
const getPing=baseUrl.hostIp+'/topic/reply'

export default{
    getCode,
    register,
    login,
    getTang,
    getDaily,
    getOpenid,
    postContent,
    getLun,
    getLunDetail,
    saveInfo,
    Talks,
    getPing
}