import * as React from "react"
import Item from "./Item"

type AddProps = {//типы свойств компонента
    handleChangeAdd: (event:any)=>void,
    inputAddItem: Item,
    handleKeyUpAddOrder:(event:any, order:Item, handleClose:any)=>void,
    handleClickAddItem: (item:Item)=>void,
    handleClose: ()=>void,
}

//компонент, рисующий одну заявку
export default class AddPhoneForm extends React.Component<AddProps,{}> {
   render():React.ReactNode {
        return <div><h3 className={"header-addPhone"}>Добавить телефон</h3>
        <div className={"dialog-addPhone-wrp-form"}>
                      <input
                          onChange={ this.props.handleChangeAdd }
                          value={ this.props.inputAddItem.name }
                          onKeyUp={ (event) => this.props.handleKeyUpAddOrder(event, this.props.inputAddItem,this.props.handleClose) }
                          autoFocus={true}
                          placeholder="Имя"
                          name="name"
                          
                      />
                      <input
                          onChange={ this.props.handleChangeAdd }
                          value={ this.props.inputAddItem.phone }
                          onKeyUp={ (event) => this.props.handleKeyUpAddOrder(event, this.props.inputAddItem,this.props.handleClose) }
                          placeholder="Телефон"
                          name="phone"
                      />
                      <input
                          onChange={ this.props.handleChangeAdd }
                          value={ this.props.inputAddItem.comments }
                          onKeyUp={ (event) => this.props.handleKeyUpAddOrder(event, this.props.inputAddItem,this.props.handleClose) }
                          placeholder="Комментарий"
                          name="comments"
                      />
                        <button
                          onClick={ () => {
                              this.props.handleClickAddItem(this.props.inputAddItem)
                              this.props.handleClose();
                                }
                            }
                        >
                        
                          Добавить телефон
                      </button>
                       
                  </div> 
                </div>        
                
   }
}


