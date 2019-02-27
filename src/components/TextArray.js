import richText from './RichText'
function TextArray(){
    this.id=0
    this.list=[]
    this.type='text'
    this.nowId=0
    this.nowIndex=0

}

TextArray.prototype.init=function(x){
    this.list.splice(this.nowIndex+1,0,new richText(this.id,this.type,x||''))
    this.id++
}
TextArray.prototype.del=function(){
    this.list.splice(this.nowIndex,1)
    this.nowIndex-=1
}

TextArray.prototype.changeId=function(id){
    this.nowId=id
    this.nowIndex=this.find(this.nowId)
    console.log(this.nowIndex,id)
    // this.list[this.nowIndex].auto=true

}
TextArray.prototype.find=function(x){
    for(let i in this.list){
        if(this.list[i].id==x){
            return +i
        }
    }
}

TextArray.prototype.Make=function(){
    let char=''
    for(let i of this.list){
        char+=i.makeHtml()
    }
    return char
}

export default TextArray