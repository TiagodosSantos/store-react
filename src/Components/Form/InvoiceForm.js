import React, { Component } from 'react';

import {
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Grid,
  Button,
} from "@material-ui/core";

import FormValidator from '../../Utils/FormValidator';
import Toast from '../Toast/Toast';


class Form extends Component {

  constructor(props) {
    super(props);

    this.validator = new FormValidator([
      {
        field:'competencyDate', 
        method:'isEmpty', 
        validWhen: false,
        message: 'Insira a data de competência'
      },
      {
        field:'dueDate', 
        method:'isEmpty', 
        validWhen: false,
        message: 'Insira a data de vencimento'
      },
      {
        field:'payDate', 
        method:'isEmpty', 
        validWhen: false,
        message: 'Insira a data de pagamento'
      },
    ]);

    this.initialState = {
      competencyDate: "",
      dueDate: "",
      payDate: "",
      customerId: '',
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
      this.props.saveInvoice(this.state);
      this.setState(this.initialState);
    }else{
      const {competencyDate, dueDate, payDate} = validation;
      const fields = [competencyDate, dueDate, payDate];

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
    const {competencyDate, dueDate, payDate, customerId} = this.state;

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
              <FormControl required>
                <InputLabel id="customer-label">Selecione o cliente</InputLabel>
                  <Select id="customerId" labelId="customer-label" name="customerId" value={customerId} onChange={this.setInput} >
                    { this.props.customers.map((customer) => (
                        <MenuItem key={customer.id} value={customer.id}>
                          {customer.name}
                        </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid> 

              <Grid item xs={3}>
                <TextField id="competencyDate" type="date" format={'DD/MM/YYYY'} name="competencyDate" label="Data de competência" variant="outlined"
                    value={competencyDate} onChange={this.setInput} InputLabelProps={{ shrink: true,}}/>
              </Grid>

              <Grid item xs={3}>
                <TextField id="dueDate" type="date" format={'DD/MM/YYYY'} name="dueDate" label="Data de vencimento" variant="outlined"
                    value={dueDate} onChange={this.setInput} InputLabelProps={{ shrink: true,}}/>
              </Grid>

              <Grid item xs={3}>
                <TextField id="payDate" type="date" format={'DD/MM/YYYY'} name="payDate" label="Data de pagamento" variant="outlined"
                    value={payDate} onChange={this.setInput} InputLabelProps={{ shrink: true,}}/>
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
