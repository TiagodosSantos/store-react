import React, {Component, Fragment}  from 'react';
import 'materialize-css/dist/css/materialize.min.css';
import './Customer.css';

import Header from '../../Components/Header/Header';
import Table from '../../Components/Table/Table';
import Form from '../../Components/Form/CustomerForm';
import PopUp from '../../Utils/PopUp';
import DateUtils from '../../Utils/DateUtils';
import CustomerService from '../../Services/CustomerService';

class Customer extends Component{

  constructor(props){
    super(props);

    this.state = {
      customers:  [],
    };
  }

  async componentDidMount(){
    this.listAllCustomers();
  }

  listAllCustomers = () => {
    CustomerService.ListAllCustomers()
      .then(res => {
        this.setState({customers: res})
      })
      .catch(erro => PopUp.showMessage("error", "Falha na comunicacao com a Store API"));
  }
  

  removeCustomer = (id) => {

    console.log("Remove "+ id);

      CustomerService.RemoveCustomer(id)
        .then(res => {
            PopUp.showMessage("success", "CLiente removido com sucesso!");
            this.listAllCustomers();
        })
        .catch(erro => {
          if(erro.message === "403"){
            PopUp.showMessage("error", "Você precisa estar logado para remover este cliente");
            this.props.history.push({
              pathname: '/login',
              //search: '?redirect=customers',
            });
          }else{
            PopUp.showMessage("error", "Falha na comunicação com a Store API");
          }
        });
      
  }

  saveCustomer = data => {

      const customer = {
        name: data.name, 
        birthDate: DateUtils.convertStringToDate(data.birthDate),
        gender: data.gender,
        telephoneNumber: data.telephoneNumber,
        mobileNumber: data.mobileNumber,
      }
      
      CustomerService.SaveCustomer(JSON.stringify(customer))
        .then(res => {
            PopUp.showMessage("success", "Cliente adicionado com sucesso!");
            this.listAllCustomers();
      })
      .catch(erro => {
        if(erro.message === "403"){
          PopUp.showMessage("error", "Você precisa estar logado para adicionar um cliente");
          this.props.history.push({
            pathname: '/login',
            //search: '?redirect=customers',
          });
        }else{
          PopUp.showMessage("error", "Falha na comunicação com a Store API");
        }
      });
         
  }

  render(){

    const fields = [
      {title: "Id", data: 'id'},
      {title: "Nome", data: 'name'},
      {title: "Data de Nascimento", data: 'birthDate'},
      {title: "Sexo", data: 'gender'},
      {title: "Telefone", data: 'telephoneNumber'},
      {title: "Celular", data: 'mobileNumber'},
    ];


    return (
      <Fragment>
        <Header />
        <div className="container center mb-10">
          <h3>Customers</h3>
          <Form saveCustomer = {this.saveCustomer}/>
          <Table data= {this.state.customers} removeData = {this.removeCustomer} fields={fields}/>
        </div>
      </Fragment>
    );
  }
}

export default Customer;
