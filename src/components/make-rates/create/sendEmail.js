import React, { useState, useEffect } from "react";

// Material
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';


export const SendEmail = (props) => {
    const [errors, setErrors] = useState({})
    const endStatus = "Finalizado"

    const sendEmail = () => {
        let data = generateData()
        data.status = endStatus

        validate(data) && props.sendEmail(data)
    }

    const generateData = () => {
        let elements = document.getElementById('form-send-email').elements;
        let data = {};
        for (let item of elements) {
          data[item.name] = item.value;
        }
        return data
      }
    
    const validate = (data) => {
        console.log('data send email: ', data)
        let error = []
        !data.subject && error.push('subject')
        !data.message && error.push('message')    
    
        if (error.length > 0) {
          let errors = {}
          for (let item of error) {
            errors[item] = true
          }
          setErrors(errors)
          
          return false
        }
        else return true 
    }

    return (
        <div className="create-update">
            <div className="create-update-form">
                <div className="title-modal">
                    Enviar cotización
                </div>
                <form id="form-send-email">
                    <TextField required
                        id="subject"
                        name="subject"
                        label="Asunto"
                        margin="normal"
                        className="col-md-6 col-sm-12"
                        error={errors.subject}
                        helperText={errors.subject && 'Este campo es requerido.'}
                    />
                    <TextField
                        id="send_copy"
                        name="send_copy"
                        label="Enviar copia"
                        margin="normal"
                        className="col-md-6 col-sm-12"
                    />
                    <TextField
                        id='message'
                        name='message'
                        multiline
                        rowsMax="4"
                        label="Observaciones"
                        className="col-md-12 col-sm-12"
                        margin="normal"
                        error={errors.message}
                        helperText={errors.message && 'Este campo es requerido.'}
                    />
                    <div className="col-12 px-0 d-flex justify-content-end container-button">
                        <Button variant="contained" onClick={() => props.cancelEmail(false)}>
                            Cancelar
                        </Button>
                        <Button variant="contained" color="secondary" onClick={sendEmail} >
                            Enviar cotización
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    )
}