//функция, проверяющая телефон на соответствие стандарту
function validatePhone(phone:string):boolean{
    let answer=/^\s*((\+7)|8)\s*\(?\s*\d{3}\s*\)?\s*\d{3}\s*\-?\d{2}\s*\-?\d{2}\s*$/.test(phone);
    return answer;
}

export default class Item{
    id: number;//id в базе данных
    name: string;//имя человека
    phone: string;//телефон
    comments:string;//комментарии    
    constructor(name:string,phone:string,comments:string,id:number){
        this.name=name;
        this.phone=phone;
        this.comments=comments;
        this.id=id;
    };
    checkValues (){
        if(this.name.trim()===''){//обрезаем пробелы в названии имени и проверяем, не пусто ли
            console.log('wrong name');
            return false;
        }
        if(!validatePhone(this.phone)){//проверяем телефон
            console.log('wrong phone');
            return false;
        }
        return true;
    };
}
