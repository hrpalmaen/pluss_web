import React, { Component } from "react";
import TextField from '@material-ui/core/TextField';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Button from '@material-ui/core/Button';
import FormHelperText from '@material-ui/core/FormHelperText';
import Snackbar from '@material-ui/core/Snackbar';
import Alert from '@material-ui/lab/Alert';

import InputAdornment from '@material-ui/core/InputAdornment';
import IconButton from '@material-ui/core/IconButton';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';

import conf from '../../config'

export class Create extends Component {
  constructor(props) {
    console.log('props create: ', props);
    super(props)
    this.data = {}
    this.state = {
      alert: {
        open: false,
        message: '',
        type: '',
      },
      errors: {},
      showPassword: false,
      showConfirmPassword: false,
      showForm: true,
      idUser: props.selectUpdate.user ? props.selectUpdate.id : '',
      code: props.selectUpdate.user ? props.selectUpdate.code : '',
      first_name: props.selectUpdate.user ? props.selectUpdate.user.first_name : '',
      identification_number: props.selectUpdate.identification_number? props.selectUpdate.identification_number : '',
      username: props.selectUpdate.user ? props.selectUpdate.user.username : '',
      phone_number: props.selectUpdate ? props.selectUpdate.phone_number : '',
      password: '',
      passwordConfirm: '',
      groups: props.selectUpdate.user ? [`${props.selectUpdate.user.groups}`] : []
    }
  }
  
  addUser = (e) => {
    let data = this.generateData()
    // data.groups = data.groups.split(',')
    console.log('this.data adduser: ', this.data);

    this.validator(data) && (
      this.state.idUser ? this.props.updateUser(data) : this.props.saveUser(data)
    )
  }

  generateData = () => {
    let elements = document.getElementById('userForm').elements;
    let data = {};
    for (let item of elements) {
      data[item.name] = item.value;
    }
    data.user = this.props.selectUpdate.user ? this.props.selectUpdate.user.id : ''
    data.type_identification = 'CC'
    return data
  }

  validator(data) {
    let error = []
    !data.code && error.push('code')
    !data.first_name && error.push('first_name')
    !data.identification_number && error.push('identification_number')
    !data.username && error.push('username')
    !data.phone_number && error.push('phone_number')
    !data.groups && error.push('groups')
    !this.state.idUser && !data.password1 && error.push('password1')

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

  clear = () => {
    this.data = {}
    this.errors = {}
    document.getElementById("userForm").reset()
    this.setState({
      idUser: null,
      code: null,
      first_name: null,
      identification_number: null,
      username: null,
      phone_number: null,
      password: null,
      passwordConfirm: null,
      groups: []
    })
    this.props.cancelForm(false)
  }

  handleChange = e => {
    this.render()
    switch (e.target.name) {
      case "code":
        this.setState({ code: e.target.value })
        break
      case "first_name":
        this.setState({ first_name: e.target.value })
        break
      case "identification_number":
        this.setState({ identification_number: e.target.value })
        break
      case "username":
        this.setState({ username: e.target.value })
        break
      case "phone_number":
        this.setState({ phone_number: e.target.value })
        break
      case "groups":
        this.setState({ groups: e.target.value })
        break
      case "password1":
        this.setState({ passwordConfirm: e.target.value })
        break
      case "password":
        if (this.state.passwordConfirm !== e.target.value) {
          this.setState({ passDiff: true, password: e.target.value })
        } else {
          this.setState({ passDiff: false, password: e.target.value })
        }
        break;
        default: break;
    }
  }

  render() {
    return (
      <div id="userForm-cu" className="create-update">
        <div className="create-update-form">

          <div className="title-modal">
              {this.state.idUser ? 'Editar' : 'Crear'} usuario
          </div>
            
          <form id="userForm" >
            <TextField required
              name="code"
              onChange={this.handleChange}
              value={this.state.code}
              label="Código"
              margin="normal"
              className="col-md-4 col-sm-4"
              error={this.state.errors.code} 
              helperText={this.state.errors.code && 'Este campo es requerido.'}
            />
            <TextField required
              name="first_name"
              label="Nombre"
              margin="normal"
              onChange={this.handleChange}
              value={this.state.first_name}
              className="col-md-4 col-sm-8"
              error={this.state.errors.first_name} 
              helperText={this.state.errors.first_name && 'Este campo es requerido.'}
            />
            <TextField required
              name="identification_number"
              label="Documento"
              margin="normal"
              onChange={this.handleChange}
              value={this.state.identification_number}
              className="col-md-4 col-sm-4"
              error={this.state.errors.identification_number} 
              helperText={this.state.errors.identification_number && 'Este campo es requerido.'}
            />
            <TextField required
              name="username"
              label="Correo electrónico"
              margin="normal"
              onChange={this.handleChange}
              value={this.state.username}
              className="col-md-4 col-sm-8"
              error={this.state.errors.username} 
              helperText={this.state.errors.username && 'Este campo es requerido.'}
            />
            <TextField required
              name="phone_number"
              label="Teléfono"
              margin="normal"
              onChange={this.handleChange}
              value={this.state.phone_number}
              className="col-md-4 col-sm-6"
              error={this.state.errors.phone_number} 
              helperText={this.state.errors.phone_number && 'Este campo es requerido.'}
            />
            <TextField required
              select
              label="Tipo usuario"
              name="groups"
              onChange={this.handleChange}
              defaultValue={this.state.groups}
              margin="normal"
              className="col-md-4 col-sm-6"
              error={this.state.errors.groups}
              helperText={this.state.errors.groups && 'Este campo es requerido.'}
              >
              {this.props.dataGroups.map(groups => (
                <MenuItem value={groups.id} key={groups.id} >
                  {groups.name}
                </MenuItem>
              ))}
            </TextField>
            <TextField required
              type={this.state.showPassword ? "text" : "password"}
              name="password1"
              label="Contraseña"
              margin="normal"
              onChange={this.handleChange}
              value={this.state.passwordConfirm}
              className="col-md-6 col-sm-6"
              error={this.state.errors.password1} 
              helperText={this.state.errors.password1 && 'Este campo es requerido.'}
              InputProps={{
                endAdornment:(
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={() => this.setState({showPassword:!this.state.showPassword})}
                    >
                      {this.state.showPassword ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                )
              }}
            />
            <FormControl className="col-md-6 col-sm-6">
              <TextField
                required
                type={this.state.showConfirmPassword ? "text" : "password"}
                name="password"
                label="Confirme contraseña"
                margin="normal"
                onChange={this.handleChange}
                value={this.state.password}
                InputProps={{
                  endAdornment:(
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={() => this.setState({showConfirmPassword:!this.state.showConfirmPassword})}
                      >
                        {this.state.showConfirmPassword ? <Visibility /> : <VisibilityOff />}
                      </IconButton>
                    </InputAdornment>
                  )
                }}
              />
              {this.state.passDiff ? <FormHelperText error >La contraseña no coincide.</FormHelperText> : ''}
            </FormControl>
            <div className="text-center container-button">
              <Button variant="contained" onClick={this.clear}>
                Cancelar
              </Button>
              <Button variant="contained" color="secondary" onClick={this.addUser}>
                Guardar
              </Button>
            </div>
          </form>

          <Snackbar
            open={this.state.alert.open}
            autoHideDuration={4000}
            onClose={() => 
              this.setState({alert: {open: false}})
            }
            ContentProps={{
              'aria-describedby': 'message-id',
            }}
            anchorOrigin= {{ 
              vertical: 'bottom',
              horizontal: 'left'
            }}
          >
            <Alert variant="filled" severity={this.state.alert.type}>{this.state.alert.message}</Alert>
          </Snackbar>
        </div>
        
      </div>
    );
  }
}
