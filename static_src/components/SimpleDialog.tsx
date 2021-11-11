import * as React from "react"
import Item from "./Item"
import Dialog from '@mui/material/Dialog';
import Button from '@mui/material/Button';
import AddPhoneForm from './AddPhoneForm';

//Этот код взят с сайта MUI и практически не редактировался

const emails = ['username@gmail.com', 'user02@gmail.com'];

interface SimpleDialogProps {
  open: boolean;
  selectedValue: string;
  onClose: (value: string) => void;
  handleChangeAdd: (event:any)=>void,
  inputAddItem: Item,
  handleKeyUpAddItem:(event:any, Item:Item, handleClose:any)=>void,
  handleClickAddItem: (item:Item,handleClose:any)=>void,
}

interface SimpleDialogDemoProps {
  handleChangeAdd: (event:any)=>void,
  inputAddItem: Item,
  handleKeyUpAddItem:(event:any, Item:Item, handleClose:any)=>void,
  handleClickAddItem: (item:Item, handleClose:any)=>void,
}

function SimpleDialog(props: SimpleDialogProps) {
  const { onClose, selectedValue, open } = props;

  const handleClose = () => {
    onClose(selectedValue);
  };

  const handleListItemClick = (value: string) => {
    onClose(value);
  };

  return (
    <Dialog onClose={handleClose} open={open}>
      <AddPhoneForm
         handleChangeAdd={props.handleChangeAdd}
         inputAddItem={props.inputAddItem}
         handleKeyUpAddItem={props.handleKeyUpAddItem}
         handleClickAddItem={props.handleClickAddItem}
         handleClose={handleClose}
      >
        </AddPhoneForm>
    </Dialog>
  );
}

export default function SimpleDialogDemo(props: SimpleDialogDemoProps) {
  const [open, setOpen] = React.useState(false);
  const [selectedValue, setSelectedValue] = React.useState(emails[1]);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = (value: string) => {
    setOpen(false);
    setSelectedValue(value);
  };

  return (
    <div className={"wrp-buttton-addPhone"}>
      <Button className={"button-addPhone"} variant="outlined" onClick={handleClickOpen}>
        Добавить телефон
      </Button>
      <SimpleDialog
        selectedValue={selectedValue}
        open={open}
        onClose={handleClose}
        handleChangeAdd={props.handleChangeAdd}
        inputAddItem={props.inputAddItem}
        handleKeyUpAddItem={props.handleKeyUpAddItem}
        handleClickAddItem={props.handleClickAddItem}

      />
    </div>
  );
}
