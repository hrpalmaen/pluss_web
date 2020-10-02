import React, { useState } from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import Chip from '@material-ui/core/Chip';

export const UnitsCost = (props) => {

    const [units, setUnits] = useState(() => props.preUnits || [])
    const [errors, setErrors] = useState(false)

    const handleAddUnits = () => {
        const $unit = document.querySelector(`#unit`)

        setErrors(false)

        if (validate($unit)) {
            const unit = $unit.value
            const _units = [...units, unit]
            setUnits(units => [...units, unit]);
            props.handleAddUnit(_units)
            document.querySelector(`#unit`).value = ''
        }else {
            // setOblUnit(true)
        }
    }

    const handleDelete = unitToDelete => () => {
        if (props.products && !props.products.length) {
            let del = units.indexOf(unitToDelete)
            if (del !== -1) {
              units.splice(del, 1)
              props.handleAddUnit(units)
            }
        }else {
            setErrors({cant: true})
        }
    };

    const validate = (e) => {
        if (props.products && props.products.length) {
            setErrors({cant: true})
            return false
        }
        else if (!e.value) {
            setErrors({obl: true})
            return false
        }

        return true
    }

    // const clearAlert = () => {
    //     setOblUnit(false)
    // }

    return (
        <div className="row form-units">  
            <div className="col-md-3 col-sm-12 input-unit">
                <TextField
                    id={'unit'}
                    name={'unit'}
                    label="Unidades"
										className="col-12"
										onKeyPress={(event) => {
											(event.key === "Enter") && handleAddUnits()
										}}
                />
                {errors.obl &&
                    <div class="lbl-error" >
                        Debe ingresar una unidad válida.
                    </div>
                }
                {errors.cant &&
                    <div class="lbl-error" >
                        No puede modificar las unidades porque hay productos agregados.
                    </div>
                }
            </div>
            <Button className="col-md-1 col-sm-2 button-more-units" onClick={handleAddUnits}>
                <AddCircleIcon />
            </Button>
            {/* Mostrar unidades */}
            <div className="col-md-8 col-sm-12 margin-component">
                {units.map(unit => (
                    <Chip
                        key={unit}
                        label={unit}
                        onDelete={handleDelete(unit)}
                        color="primary"
                        variant="outlined"
                    />
                ))}
            </div>
        </div>
    )
}
