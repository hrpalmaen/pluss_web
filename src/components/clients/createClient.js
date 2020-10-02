import React from "react";
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';

import conf from '../../config'

export class CreateClient extends React.Component {

  constructor(props) {
    console.log('props: ', props);
    super(props)
    this.state = {
      idClient: props.clientUpdate ? props.clientUpdate.id : null,
      name: props.clientUpdate ? props.clientUpdate.name : null,
      nit: props.clientUpdate ? props.clientUpdate.nit : null,
      phone: props.clientUpdate ? props.clientUpdate.phone : null,
      agent: props.clientUpdate.agent ? props.clientUpdate.agent : null,
      dependece: props.clientUpdate.dependece ? props.clientUpdate.dependece : null,
      city: props.clientUpdate ? props.clientUpdate.city : null,
      address: props.clientUpdate ? props.clientUpdate.address : null,
      email: props.clientUpdate ? props.clientUpdate.email : null,
      phone_two: props.clientUpdate ? props.clientUpdate.phone_two : null,

      errors: {}
    }
  }

  addClient = (event) => {
    event.preventDefault()

    let data = this.generateData()
    console.log('data: ', data);
    const validate = this.validator(data)

    this.validator(data) && (
      this.state.idClient ? this.props.updateClient(data) : this.props.saveClient(data)
    )
  }

  generateData() {
    let elements = document.getElementById('clientForm').elements;
    let obj = {};
    
    for (let item of elements) {
      if (item.name) {
        obj[item.name] = item.value;
      }
    }

    return obj
  }

  validator(data){
    console.log('data nvalidatror: ', data);
    let error = []
    !data.name && error.push('name')
    !data.nit && error.push('nit')
    !data.agent && error.push('agent')
    !data.dependece && error.push('dependece')
    !data.email && error.push('email')
    !data.phone && error.push('phone')
    !data.city && error.push('city')

    if (error.length > 0) {
      let errors = {}
      for (let item of error) {
        errors[item] = true
      }
      this.setState({errors: errors})

      return false
    }
    else return true 
     
  }

  clearForm = () => {
    this.client = {}
    this.errors = {}
    document.getElementById("clientForm").reset()
    this.setState({
      idClient: null,
      name: null,
      nit: null,
      city: null,
      address: null,
      agent: null,
      dependece: null,
      email: null,
      phone: null,
      phone_two: null
    })
    this.props.cancelForm(false)
  };

  handleChange = e => {
    switch (e.target.name) {
      case "name":
        this.setState({ name: e.target.value })
        break
      case "nit":
        this.setState({ nit: e.target.value })
        break
      case "city":
        this.setState({ city: e.target.value })
        break
      case "address":
        this.setState({ address: e.target.value })
        break
      case "agent":
        this.setState({ agent: e.target.value })
        break
      case "dependece":
        this.setState({ dependece: e.target.value })
        break
      case "email":
        this.setState({ email: e.target.value })
        break
      case "phone":
        this.setState({ phone: e.target.value })
        break
      case "phone_two":
        this.setState({ phone_two: e.target.value })
        break
    }
  };

  render() {
    return (
      <div className="create-update">
        <div className="create-update-form">
          <div className="title-modal">
              {this.state.idClient ? 'Editar' : 'Crear' } Cliente
          </div>
          <form noValidate id="clientForm">
            <TextField 
              id="name" 
              name="name" 
              label="Nombre empresa" 
              value={this.state.name} 
              onChange={this.handleChange} 
              className="col-md-4 col-sm-12" 
              margin="normal"
              required 
              error={this.state.errors.name} 
              helperText={this.state.errors.name && 'Este campo es requerido.'} 
            />
            <TextField 
              id="nit" 
              name="nit" 
              label="Nit" 
              value={this.state.nit} 
              onChange={this.handleChange} 
              className="col-md-4 col-sm-12" 
              margin="normal"
              required 
              error={this.state.errors.nit} 
              helperText={this.state.errors.nit && 'Este campo es requerido.'} 
            />
            <TextField 
              id="agent" 
              name="agent" 
              label="Nombre responsable" 
              value={this.state.agent} 
              onChange={this.handleChange} 
              className="col-md-4 col-sm-12" 
              margin="normal"
              required 
              error={this.state.errors.agent} 
              helperText={this.state.errors.agent && 'Este campo es requerido.'} 
            />
            <TextField 
              id="dependece" 
              name="dependece" 
              label="Area responsable" 
              value={this.state.dependece} 
              onChange={this.handleChange} 
              className="col-md-4 col-sm-12" 
              margin="normal"
              required 
              error={this.state.errors.dependece} 
              helperText={this.state.errors.dependece && 'Este campo es requerido.'} 
              />
            <TextField  
              id="email" 
              name="email" 
              label="Correo electrónico" 
              value={this.state.email} 
              onChange={this.handleChange} 
              className="col-md-4 col-sm-12" 
              margin="normal"
              required 
              error={this.state.errors.email} 
              helperText={this.state.errors.email && 'Este campo es requerido.'}
            />
            <TextField 
              id="phone" 
              name="phone" 
              label="Teléfono" 
              value={this.state.phone} 
              onChange={this.handleChange} 
              className="col-md-4 col-sm-12" 
              margin="normal"
              required 
              error={this.state.errors.phone} 
              helperText={this.state.errors.phone && 'Este campo es requerido.'} 
            />
            <TextField 
              id="phone_two" 
              name="phone_two" 
              label="Teléfono alternativo" 
              value={this.state.phone_two} 
              onChange={this.handleChange} 
              className="col-md-4 col-sm-12" 
              margin="normal"
            />
            <TextField 
              id="city" 
              name="city" 
              label="Ciudad" 
              value={this.state.city} 
              onChange={this.handleChange} 
              className="col-md-4 col-sm-12" 
              margin="normal"
              required 
              error={this.state.errors.city} 
              helperText={this.state.errors.city && 'Este campo es requerido.'} 
            />
            <TextField 
              id="address" 
              name="address" 
              label="Dirección" 
              value={this.state.address} 
              onChange={this.handleChange} 
              className="col-md-4 col-sm-12" 
              margin="normal"
            />

            <div className="text-center container-button">
              <Button variant="contained" onClick={this.clearForm}>
                Cancelar
              </Button>
              <Button variant="contained" color="secondary" onClick={this.addClient}>
                Guardar
              </Button>
            </div>
          </form>
        </div>
      </div>
    )
  }
}
