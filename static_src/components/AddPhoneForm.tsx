import * as React from "react"
import Item from "./Item"//компонент одного телефона

type AddProps = {//типы свойств компонента формы для добавления телефона
    handleChangeAdd: (event:any)=>void,
    inputAddItem: Item,
    handleKeyUpAddItem:(event:any, Item:Item, handleClose:any)=>void,
    handleClickAddItem: (item:Item, handleClose: any)=>void,
    handleClose: ()=>void,
}

//компонент, рисующий форму для добавления телефона
export default class AddPhoneForm extends React.Component<AddProps,{}> {
   render():React.ReactNode {
        return <div><h3 className={"header-addPhone"}>Добавить телефон</h3> 
        <div className={"dialog-addPhone-wrp-form"}>
                        <input
                            onChange={ this.props.handleChangeAdd }//при изменении сохраняем изменения
                            value={ this.props.inputAddItem.name }//подставляем текущее значение
                            onKeyUp={ (event) => this.props.handleKeyUpAddItem(event, this.props.inputAddItem,this.props.handleClose) }//при нажатии enter добавляем телефон
                            autoFocus={true}//при открытии  фокус тут
                            placeholder="Имя"
                            name="name"
                        />
                        <input
                            onChange={ this.props.handleChangeAdd }
                            value={ this.props.inputAddItem.phone }
                            onKeyUp={ (event) => this.props.handleKeyUpAddItem(event, this.props.inputAddItem,this.props.handleClose) }
                            placeholder="Телефон"
                            name="phone"
                        />
                        <input
                            onChange={ this.props.handleChangeAdd }
                            value={ this.props.inputAddItem.comments }
                            onKeyUp={ (event) => this.props.handleKeyUpAddItem(event, this.props.inputAddItem,this.props.handleClose) }
                            placeholder="Комментарий"
                            name="comments"
                        />  
                        <button
                          onClick={ () => {
                              this.props.handleClickAddItem(this.props.inputAddItem,this.props.handleClose)//по клику на кнопке добавляем телефон
                                }
                            }
                        >
                          Добавить телефон
                      </button>
                  </div> 
                </div>        
   }
}


