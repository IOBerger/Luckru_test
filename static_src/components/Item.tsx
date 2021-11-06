function validatePhone(phone:string):boolean{
    let answer=/^\s*((\+7)|8)\s*\(?\s*\d{3}\s*\)?\s*\d{3}\s*\-?\d{2}\s*\-?\d{2}\s*$/.test(phone);
    console.log('phone='+phone+' answer='+answer);
    return answer;
}

export default class Item{
    name: string;//имя человека
    phone: string;//телефон
    comments:string;//комментарии    
    constructor(name:string,phone:string,comments:string){
        this.name=name;
        this.phone=phone;
        this.comments=comments;
    };
    checkValues (){
        console.log('this');
        console.log(this);
        if(this.name.trim()===''){//обрезаем пробелы в названии компании и проверяем, не пусто ли
            console.log('wrong name');
            return false;
        }
        if(!validatePhone(this.phone)){
            console.log('wrong phone');
            return false;
        }
        return true;
    };
}
