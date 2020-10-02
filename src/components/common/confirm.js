import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

import { UnitsCost } from '../make-rates/create/unitsCost';

export default function AlertDialog(props) {
  const [content, setContent] = React.useState();
  let units = [];
  const UNITS_TEXT = 'units';

  const handleClose = () => {
    setContent(null)
    props.close(false)
  };

  const handleConfirm = () => {
    props.option == UNITS_TEXT  ? props.confirm(units) : props.confirm(true);
    handleClose();
  }

  const manageContent = (option) => {
    switch (option) {
      case 'delete':
        setContent({
          ...content,
          buttonText: 'Eliminar',
          textBody: '¿Esta seguro que desea eliminar el registro?',
          textTitle: 'Eliminar registro'
        });
        break;
      case 'clean':
        setContent({
          ...content,
          buttonText: 'Limpiar',
          textBody: '¿Esta seguro que desea limpiar los campos?',
          textTitle: 'Limpiar campos'
        });
        break;
      case 'units':
        setContent({
          ...content,
          buttonText: 'Agregar',
          textBody: 'Antes de continuar en crear una cotización, debe agregar las unidades base de los productos.',
          textTitle: 'Agregar unidades'
        });
        break;
      case 'logout':
        setContent({
          ...content,
          buttonText: 'Aceptar',
          textBody: '¿Esta seguro que desea cerrar sesión?',
          textTitle: 'Cerrar sesión'
        });
        break;
      default: break;
    }
  }

  const handleAddUnit = (_units) => {
    units = _units;
  }

  React.useEffect(() => {
    if (!content && props.option) {
      manageContent(props.option)
    }
  })

  return (
    <>
      { props.open && <Dialog
        open={props.open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        {content &&
          <div>
            <DialogTitle id="alert-dialog-title">
              {content.textTitle}
            </DialogTitle>
            <DialogContent>
              <DialogContentText id="alert-dialog-description">
                {content.textBody}
                {props.option === UNITS_TEXT && <UnitsCost fromDialog={true} handleAddUnit={handleAddUnit}/>}
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose} variant="contained">
                Cancelar
          </Button>
              <Button onClick={handleConfirm} color="secondary" variant="contained" autoFocus>
                {content.buttonText}
              </Button>
            </DialogActions>
          </div>
        }
      </Dialog>
}
    </>
  );
}