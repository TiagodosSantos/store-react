import React, { Component } from 'react';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';

import FormValidator from '../../Utils/FormValidator';
import Toast from '../Toast/Toast';


class Form extends Component {

  constructor(props) {
    super(props);

    this.validator = new FormValidator([
      {
        field:'name', 
        method:'isEmpty', 
        validWhen: false,
        message: 'Insira um nome'
      },
      {
        field:'birthDate', 
        method:'isEmpty', 
        validWhen: false,
        message: 'Insira a data de aniversário'
      },
      {
        field:'gender', 
        method:'isEmpty', 
        validWhen: false,
        message: 'Insira o sexo'
      },
      {
        field:'telephoneNumber', 
        method:'isEmpty', 
        validWhen: false,
        message: 'Insira o número de telefone'
      },
      {
        field:'mobileNumber', 
        method:'isEmpty', 
        validWhen: false,
        message: 'Insira o número de celular'
      },
    ]);

    this.initialState = {
      name: "",
      birthDate: "",
      gender: "",
      telephoneNumber: "",
      mobileNumber: "",
      validation: this.validator.valid(),
      message: {
        open: false,
        text: '',
        type: 'success'
      },

    };

    this.state = this.initialState;
  }

  setInput = event => {
      const {name, value} = event.target;

      this.setState({
          [name]: value
      });

  }

  submitForm = () => {

    const validation = this.validator.validate(this.state);

    if(validation.isValid){
      this.props.saveCustomer(this.state);
      this.setState(this.initialState);
    }else{
      const {name, birthDate, gender, telephoneNumber, mobileNumber} = validation;
      const fields = [name, birthDate, gender, telephoneNumber, mobileNumber];

      const fieldsInvalidos = fields.filter(elem => {
          return elem.isInvalid;
      });

      const erros = fieldsInvalidos.reduce(
          (text, field) => text + field.message + ". ", 
          ''
        );

      this.setState({
        message: { 
          open: true, 
          text: erros,
          type: 'error',
        }
      });
    }
  }


  render() {
    const { name, birthDate, gender, telephoneNumber, mobileNumber } = this.state;

    return (
      <>

        <Toast 
          open={this.state.message.open} 
          handleClose={() => this.setState({ message: { open: false }})}
          severity={this.state.message.type}>
            {this.state.message.text}
        </Toast>

        <form>
          <Grid container spacing={1} alignItems="center">

              <Grid item xs={3}>
                <TextField id="name" name="name" label="Nome" variant="outlined"
                    value={name} onChange={this.setInput}/>
              </Grid>    

              <Grid item xs={3}>
                <TextField id="birthDate" type="date" format={'DD/MM/YYYY'} name="birthDate" label="Data de nascimento" variant="outlined"
                    value={birthDate} onChange={this.setInput} InputLabelProps={{ shrink: true,}}/>
              </Grid>

              <Grid item xs={2}>
                <TextField id="gender" name="gender" label="Sexo" variant="outlined"
                    value={gender} onChange={this.setInput}/>
              </Grid>

              <Grid item xs={2}>
                <TextField id="telephoneNumber" name="telephoneNumber" label="Telefone" variant="outlined"
                    value={telephoneNumber} onChange={this.setInput}/>
              </Grid>

              <Grid item xs={2}>
                <TextField id="mobileNumber" name="mobileNumber" label="Celular" variant="outlined"
                    value={mobileNumber} onChange={this.setInput}/>
              </Grid>

              <Grid item xs={12}>
                <Button type="button" onClick={this.submitForm} variant="contained" color="primary">
                    Salvar
                </Button>
              </Grid>
          </Grid>    
        </form>
      </>
    );
  }
}

export default Form;
