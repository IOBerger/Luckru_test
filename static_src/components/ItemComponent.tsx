import * as React from "react"
import Item from "./Item"

type ItemProps = {//типы свойств компонента
    key: number,
    id: number,
    item:Item,//Заявка
    deleteItem:(id: number) => void,//функция удаления
    changeEditIndex:(id: number) => void,//Изменить индекс заявки, которую меняем
    editIndex:number,//Индекс заявки, которую меняем
    editItem:(id: number, item:Item) => void,//функция изменения заявки
    inputEditItem:Item,//в объекте хранится то, что прямо сейчас в формах
    //функции, сохраняющие изменения в формах
    changeEditInput: (event:any) => void,
}

//компонент, рисующий одну заявку
export default class ItemComponent extends React.Component<ItemProps,{}> {
    editByEnter = (event: any, resultItem:Item) => {
        if (event.keyCode === 13) { // Enter
            this.props.editItem(this.props.id,resultItem);
        }
    };
   render():React.ReactNode {
        let itemText : React.ReactNode;  
        let resultItem:Item;
        if(this.props.editIndex!==this.props.id){
            //рисуем заявку в обычном случае
            itemText= <div>  
                
                { this.props.item.name } | { this.props.item.phone } | { this.props.item.comments }
            </div>
        }else{            
            resultItem=new Item(
                this.props.inputEditItem.name,
                this.props.inputEditItem.phone,
                this.props.inputEditItem.comments,
            );
            itemText= <div><div>{ this.props.id}:</div> 
                <div>
                <input 
                    onChange={ (event) => this.props.changeEditInput(event) }
                    value={ this.props.inputEditItem.name }
                    onKeyUp={ (event) => this.editByEnter(event,resultItem) } 
                    autoFocus={true}
                    name='name'
                />
                <input 
                    onChange={ (event) => this.props.changeEditInput(event) }
                    value={ this.props.inputEditItem.phone }
                    onKeyUp={ (event) => this.editByEnter(event,resultItem) } 
                    name='phone'
                />
                <input 
                    onChange={ (event) => this.props.changeEditInput(event) }
                    value={ this.props.inputEditItem.comments }
                    onKeyUp={ (event) => this.editByEnter(event,resultItem) } 
                    name='comments'
                />
                <button
                    onClick={ () => this.props.editItem(this.props.id,resultItem) }
                >
                    ОК
                </button>
                </div>
            </div>
        }
        //рисуем кнопки редактировать-изменить
        return <div>{itemText} 
                <button onClick={ () => {
                    this.props.changeEditIndex(this.props.id)
                }
                }>Редактировать</button>
                <button onClick={ () => this.props.deleteItem(this.props.id) }>Удалить</button>
            </div>
                
   }
}
