import * as React from "react"
import ItemComponent from './ItemComponent';
import Item from "./Item"
import SimpleDialogDemo from "./SimpleDialog"

type ItemFieldState = {
    items: Item[],//массив телефонов
    inputAddItem: Item,//объект, хранящий то, что сейчас в поле создания телефона
    editIndex: number,//индекс телефона, который сейчас редактируем, не редактируем ничего - значит, -1
    inputEditItem: Item,//объект, хранящий то, что сейчас в поле редактирования телефона
    lock: boolean,//блокируем добавление на время выполнения функции чтоб не добавть два раза
}

export default class ItemField extends React.Component<{},ItemFieldState> {
    state : ItemFieldState = {
        items: [],
        inputAddItem: new Item('','','',-2),
        editIndex: -1,
        inputEditItem: new Item('','','',-2),
        lock: false,
    };
    //загружаем массив телефонов
    componentDidMount() {
        this.getPhones();       
    }
    getPhones = async ()=>{
        let myHeaders = new Headers();
        myHeaders.append('pragma', 'no-cache');
        myHeaders.append('cache-control', 'no-cache');
        let response = await fetch('pages/get-phones.php',{
            method: 'GET',
            headers: myHeaders,
          });
        if (response.ok){
            let result;
            try{
                result = await response.json();
            }catch(e){
                alert('Ошибка в json');
                return;
            }
            if(result.code===2){
                alert('error in getting phonebook: error of database');
            }else{
                this.setState({ items: result});
            }
        }else{
            alert('error in getting phonebook: error with connection');
        }
    }
    //при клике на кнопку проверяем корректность и добавляем телефон
    handleClickAddItem = (item:Item, handleClose:any) => {
        console.log('adding. lock=',this.state.lock); 
        if(this.state.lock===true){
            return false;
        }else{    
            this.state.lock=true;
        }
        if(item.checkValues && item.checkValues()){
            this.addItem(item).then(
                function(result){
                    if(result===true){
                        handleClose();
                    }
                }
            );
        }else{
            alert('Ошибка в данных!');
            this.setState({ lock: false});
            return false;
        }
        return true;
    };
    //Сохраняем изменения в форме добавки
    handleChangeAdd = (event:any) => {
        const {name, value} = event.target
        let tmpItem=this.state.inputAddItem;
        if(name==='name')tmpItem.name=value;
        else if(name==='phone')tmpItem.phone=value;
        else if(name==='comments')tmpItem.comments=value;
        this.setState({ inputAddItem: tmpItem});
    };
    //по нажатию enter пытаемся добавить новую заявку
    handleKeyUpAddItem = (event:any, item:Item, handleClose:any) => {
        if (event.keyCode === 13) { // Enter
            this.handleClickAddItem(item,handleClose);
        }
    }
    //непосредственно добавление заявки
    addItem = async (item:Item) => {     
        let myHeaders = new Headers();
        myHeaders.append('pragma', 'no-cache');
        myHeaders.append('cache-control', 'no-cache');
        myHeaders.append('Content-Type', 'application/json;charset=utf-8');

        let response = await fetch('pages/add-phone.php', {
            method: 'POST',
            headers: myHeaders,
            body: JSON.stringify(item)
        });        
        
        if (response.ok){
            let result;
            try{
                result = await response.json();
            }catch(e){
                alert('Ошибка в json');
                return false;
            }
            this.setState({ lock: false});
            if(result.code===0){
                this.setState({ 
                    items: [ 
                        ...this.state.items, new Item(item.name,item.phone,item.comments,item.id)
                    ],
                    inputAddItem : new Item('','','',-2),
                });
                return true;        
            }else if(result.code===1){
                alert('error in adding phone: wrong data');
                console.log('result ',result);
                return false;
            }else if(result.code===2){
                alert('error in adding phone: no connection with bd');
                return false;
            }else{
                alert('error in adding phone: unknown error');
                return false;
            }        
        }else{
            alert('error in adding phone: error with connection');
            return false;
        }
    };
    //удаление телефона
    deleteItem = async (id:number) => {
        let request={id:this.state.items[id].id};
        let response = await fetch('pages/delete-phone.php', {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json;charset=utf-8',
                'pragma': 'no-cache',
                'cache-control':'no-cache'
            },
            body: JSON.stringify(request)
         });
      
        if (response.ok){
            let result;
            try{
                result = await response.json();
            }catch(e){
                alert('Ошибка в json');
                return false;
            }
            if(result.code===0){
                let leftItems=this.state.items;
                delete leftItems[id];
                this.setState({items: leftItems, editIndex: -1});
                return true;        
            }else if(result.code===1){
                alert('error in deleting phone: wrong data');
                return false;
            }else if(result.code===2){
                alert('error in deleting phone: no connection with bd');
                return false;
            }else{
                alert('error in deleting phone: unknown error');
                return false;
            }        
        }else{
            alert('error in deleting phone: error with connection');
            return false;
        }
    }
    //сохраняем изменения edit
    changeEditInput = (event:any) => {
        const {name, value} = event.target

        let tmpItem=this.state.inputEditItem;
        if(name=='name')tmpItem.name=value;
        else if(name=='phone')tmpItem.phone=value;
        else if(name=='comments')tmpItem.comments=value;

        this.setState({ inputEditItem: tmpItem});
    }
    //изменяет индекс телефона, изменяемой в текущий момент (-1 - ничего не изменяем)
    changeEditIndex = (id:number) => {
        console.log('id='+id)
        this.setState({
            editIndex: id,
            inputEditItem: new Item(
                this.state.items[id].name,
                this.state.items[id].phone,
                this.state.items[id].comments,
                this.state.items[id].id
                )
        });
    }
    //проверка корректности данных и изменение телефона
    editItem = async (id:number,item:Item) => {
        let request={id:this.state.items[id].id, item: item};
        let response = await fetch('pages/edit-phone.php', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json;charset=utf-8',
                'pragma': 'no-cache',
                'cache-control':'no-cache'
            },
            body: JSON.stringify(request)
         });
      
        if (response.ok){
            let result;
            try{
                result = await response.json();
            }catch(e){
                alert('Ошибка в json');
                return false;
            }
            if(result.code===0){
                if(item.checkValues && item.checkValues()){
                    let leftItems:Item[]=this.state.items;
                    leftItems[id]=new Item(item.name,item.phone,item.comments,item.id);
                    this.setState({items: leftItems, editIndex: -1,inputEditItem:new Item('','','',-2)});    
                }else{
                    alert('Ошибка в данных!');
                }
                return true;        
            }else if(result.code===1){
                alert('error in editing phone: wrong data');
                return false;
            }else if(result.code===2){
                alert('error in editing phone: error with bd');
                return false;
            }else{
                alert('error in editing phone: unknown error');
                return false;
            }        
        }else{
            alert('error in editing phone: error with connection');
            return false;
        }
    }
    render() : any {
        //собираем компоненты телефонов в массив
        console.log('length',this.state.items.length);
        const itemElements: React.ReactNode[] = this.state.items.map((item:Item, index) => {
            if(item===undefined) 
                return;
            return <ItemComponent 
                key={index}
                id={index}
                item={ item } 
                deleteItem={this.deleteItem}
                changeEditIndex={this.changeEditIndex}
                editIndex={this.state.editIndex}
                editItem={this.editItem}
                changeEditInput={this.changeEditInput}
                inputEditItem={this.state.inputEditItem}
            />});
        //разворачиваем массив
        itemElements.reverse();
        //отрисовываем таблицу целиком
        let answer: React.ReactElement = <div className="layout">
                    <SimpleDialogDemo 
                        handleChangeAdd={this.handleChangeAdd}
                        inputAddItem={this.state.inputAddItem}
                        handleKeyUpAddItem={this.handleKeyUpAddItem}
                        handleClickAddItem={this.handleClickAddItem}
                    />
                <table className={"table-phones"}>
                        { itemElements }
                </table>
            </div>  
        return answer;
   }
}
