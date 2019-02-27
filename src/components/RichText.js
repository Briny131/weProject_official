function richText(id,type,url){
    this.id=id
    this.value=url||''
    this.type=type
    this.auto=false
}

richText.prototype.makeHtml=function(){
    if(this.type=='text'){
        return `<p style="word-break:break-all;white-space:pre-line;font-size:16px">${this.value}</p>`
    }else if(this.type=='image'){
        return `<img src="${this.value}" style="width:100%;padding:0 5%;box-sizing:border-box" alt="#" />`
    }
}



export default richText