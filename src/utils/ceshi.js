Object.defineProperty(Object.prototype, "res", { 
value: function() { 
    for(let i in this){
        if(typeof this[i]=='string'||typeof this[i]=='number'){
            this[i]=''
        }else if(Array.isArray(this[i])==true){
            this[i]=[]
        }else if(typeof this[i]=='object'){
            this[i]=null
        }
    }
}, 
writable: true, 
enumerable: false, 
configurable: true
});

export default{
    madeTime(x){
        return (/(.*)T/).exec(x)[1]||x
    }
}


