import React, {Component, Fragment}  from 'react';
import 'materialize-css/dist/css/materialize.min.css';
import './Customer.css';

import Header from '../../Components/Header/Header';
import Table from '../../Components/Table/Table';
import Form from '../../Components/Form/Form';
import PopUp from '../../Utils/PopUp';
import ApiService from '../../Utils/ApiService';

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
    ApiService.ListAllCustomers()
      .then(res => {
        this.setState({customers: res})
      })
      .catch(erro => PopUp.showMessage("error", "Falha na comunicacao com a Store API"));
  }
  

  removeCustomer = (id) => {

    console.log("Remove "+ id);

      ApiService.RemoveCustomer(id)
        .then(res => {
            PopUp.showMessage("success", "CLiente removido com sucesso!");
            this.listAllCustomers();
        })
        .catch(erro => PopUp.showMessage("error", "Falha na comunicação com a Store API"));
      
  }

  saveCustomer = data => {

      const parts = data.birthDate.split("-")

      const customer = {
        name: data.name, 
        birthDate: parts[2]+"-"+parts[1]+"-"+parts[0],
        gender: data.gender,
        telephoneNumber: data.telephoneNumber,
        mobileNumber: data.mobileNumber,
      }
      
      ApiService.SaveCustomer(JSON.stringify(customer))
        .then(res => {
            PopUp.showMessage("success", "Cliente adicionado com sucesso!");
            this.listAllCustomers();
      })
      .catch(erro => {
        console.log(erro);
        PopUp.showMessage("error", "Falha na comunicação com a API")
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

    console.log(fields);

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
