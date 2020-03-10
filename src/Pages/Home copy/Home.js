import React, {Component, Fragment}  from 'react';
import './node_modules/materialize-css/dist/css/materialize.min.css';
import './Home.css';

import Header from '../../Components/Header/Header';
import Tabela from '../../Components/Table/Table';
import Form from '../../Components/Form/Form';
import PopUp from '../../Utils/PopUp';
import ApiService from '../../Utils/ApiService';

class Home extends Component{

  constructor(props){
    super(props);

    this.state = {
      customers:  [],
    };
  }

  async componentDidMount(){
    this.listaAutores();
  }

  listaAutores = () => {
    ApiService.ListaAutores()
      .then(res => {
        console.log(res[0]);
        this.setState({customers: res})
      })
      .catch(erro => PopUp.showMessage("error", "Falha na comunicacao com a Store API"));
  }
  

  removeCustomer = (id) => {

    console.log("Remove "+ id);

      ApiService.RemoveAutor(id)
        .then(res => {
            PopUp.showMessage("success", "CLiente removido com sucesso!");
            this.listaAutores();
        })
        .catch(erro => PopUp.showMessage("error", "Falha na comunicação com a Store API"));
      
  }

  saveCustomer = data => {

      const autor = {
        name: data.name, 
        birthDate: data.birthDate,
        gender: data.gender,
        telephoneNumber: data.telephoneNumber,
        mobileNumber: data.mobileNumber,
      }
      
      ApiService.CriaAutor(JSON.stringify(autor))
        .then(res => {
            PopUp.showMessage("success", "Cliente adicionado com sucesso!");
            this.listaAutores();
      })
      .catch(erro => {
        console.log(erro);
        PopUp.showMessage("error", "Falha na comunicação com a API")
      });
         
  }

  render(){

    const fields = [
      {titulo: "Id", dado: 'id'},
      {titulo: "Nome", dado: 'name'},
      {titulo: "Data de Nascimento", dado: 'birthDate'},
      {titulo: "Sexo", dado: 'gender'},
      {titulo: "Telefone", dado: 'telephoneNumber'},
      {titulo: "Celular", dado: 'mobileNumber'},
    ];

    console.log(fields);

    return (
      <Fragment>
        <Header />
        <div className="container mb-10">
          <h1>Store</h1>
          <Form saveCustomer = {this.saveCustomer}/>
          <Tabela data= {this.state.customers} removeData = {this.removeCustomer} fields={fields}/>
        </div>
      </Fragment>
    );
  }
}

export default Home;
