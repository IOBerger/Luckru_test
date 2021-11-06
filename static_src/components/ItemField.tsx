import * as React from "react"
import ItemComponent from './ItemComponent';
import Item from "./Item"
import SimpleDialogDemo from "./SimpleDialog"


type ItemFieldState = {
    items: Item[],//массив заявок
    inputAddItem: Item,//объект, хранящий то, что сейчас в поле создания заявки
    editIndex: number,//индекс заявки, которую сейчас редактируем, не редактируем ничего - значит, -1
    inputEditItem: Item,//объекст, хранящий то, что сейчас в поле редактирования заявки
}

export default class ItemField extends React.Component<{},ItemFieldState> {
    state : ItemFieldState = {
        items: [],
        inputAddItem: new Item('','',''),
        editIndex: -1,
        inputEditItem: new Item('','',''),
    };
    //при клике на кнопку проверяем корректность и добавляем заявку
    handleClickAddItem = (item:Item) => {
        console.log('item');
        console.log(item);
        if(item.checkValues && item.checkValues()){
            this.addOrder(item);
            return true;        
        }else{
            alert('Ошибка в данных!');
            return false;
        }
    };
    //Сохраняем изменения в форме добавки
    handleChangeAdd = (event:any) => {
        const {name, value} = event.target
        
        // let tmpItem= {
        //     ...this.state.inputAddItem,
        //     [name]: String(value),
        // }
        let tmpItem=this.state.inputAddItem;
        //console.log('name='+name);
        if(name==='name')tmpItem.name=value;
        else if(name==='phone')tmpItem.phone=value;
        else if(name==='comments')tmpItem.comments=value;

        this.setState({ inputAddItem: tmpItem});


    };
    //по нажатию enter пытаемся добавить новую заявку
    handleKeyUpAddOrder = (event:any, item:Item, handleClose:any) => {
        if (event.keyCode === 13) { // Enter
            if(this.handleClickAddItem(item))
                handleClose();
        }
    };
    //непосредственно добавление заявки
    addOrder = (item:Item) => {        
        this.setState({ 
            items: [ 
                ...this.state.items, new Item(item.name,item.phone,item.comments)
            ],
            inputAddItem : new Item('','',''),
        });
    };
    //удаление заявки
    deleteItem = (id:number) => {
        let leftItems=this.state.items;
        delete leftItems[id];//!edit
        this.setState({items: leftItems, editIndex: -1});
    }
    //сохраняем изменения edit
    changeEditInput = (event:any) => {
        const {name, value} = event.target

        let tmpItem=this.state.inputEditItem;
        if(name=='name')tmpItem.name=value;
        else if(name=='phone')tmpItem.phone=value;
        else if(name=='comments')tmpItem.comments=value;


        this.setState({ inputEditItem: tmpItem});

        // this.setState({ inputEditItem: {
        //     ...this.state.inputEditItem,
        //     [name]: String(value),
        // } });      
    }
    //изменяет индекс заявки, изменяемой в текущий момент (0 - ничего не изменяем)
    changeEditIndex = (id:number) => {
        console.log('id='+id)
        this.setState({
            editIndex: id,
            inputEditItem: new Item(this.state.items[id].name,this.state.items[id].phone,this.state.items[id].comments)
        });
    }
    //проверка корректности данных и изменение заявки
    editItem= (id:number,item:Item) => {
        if(item.checkValues && item.checkValues()){
            let leftItems:Item[]=this.state.items;
            leftItems[id]=new Item(item.name,item.phone,item.comments);
            this.setState({items: leftItems, editIndex: -1,inputEditItem:new Item('','','')});    
        }else{
            alert('Ошибка в данных!');
        }

    }
    render() : any {
        //собираем компоненты заявок в массив
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
                {/* { addItem } */}
                <SimpleDialogDemo 
                    // id={index}
                    handleChangeAdd={this.handleChangeAdd}
                    inputAddItem={this.state.inputAddItem}
                    handleKeyUpAddOrder={this.handleKeyUpAddOrder}
                    handleClickAddItem={this.handleClickAddItem}
                />
                <div className="item-field">
                   { itemElements }
                </div>
            </div>  
        return answer;
   }
}
