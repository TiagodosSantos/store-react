import React, {Component, Fragment}  from 'react';
import 'materialize-css/dist/css/materialize.min.css';
import './Invoice.css';

import Header from '../../Components/Header/Header';
import Table from '../../Components/Table/Table';
import Form from '../../Components/Form/InvoiceForm';
import PopUp from '../../Utils/PopUp';
import DateUtils from '../../Utils/DateUtils';
import InvoiceService from '../../Services/InvoiceService';
import CustomerService from '../../Services/CustomerService';
import { withRouter } from 'react-router-dom';

class Invoice extends Component{

  constructor(props){
    super(props);

    this.state = {
      invoices:  [],
      customers: [],
    };
  }

  async componentDidMount(){
    this.listAllCustomers();
    this.listAllInvoices();
    
  }

  listAllInvoices = () => {
    InvoiceService.ListAllInvoices()
      .then(res => {
        this.setState({invoices: res})
      })
      .catch(erro => PopUp.showMessage("error", "Falha na comunicacao com a Store API"));
  }

  listAllCustomers = () => {
    CustomerService.ListAllCustomers()
      .then(res => {
        this.setState({customers: res})
      })
      .catch(erro => PopUp.showMessage("error", "Falha na comunicacao com a Store API"));
  }
  

  removeInvoice = (id) => {

    console.log("Remove "+ id);

      InvoiceService.RemoveInvoice(id)
        .then(res => {
            PopUp.showMessage("success", "Fatura removida com sucesso! ");
            this.listAllInvoices();
        })
        .catch(erro => {
          if(erro.message === "403"){
            PopUp.showMessage("error", "Você precisa estar logado para remover esta fatura");
            this.props.history.push({
              pathname: '/login',
              search: '?redirect=invoices',
            });
          }else{
            PopUp.showMessage("error", "Falha na comunicação com a Store API");
          }
        });
      
  }

  saveInvoice = data => {

      const invoice = {
        competencyDate: DateUtils.convertStringToDate(data.competencyDate), 
        //customerId: data.customerId,
        customerId: data.customerId,
        dueDate: DateUtils.convertStringToDate(data.dueDate),
        payDate: DateUtils.convertStringToDate(data.payDate),
      }

      console.dir(invoice);
      
      InvoiceService.SaveInvoice(JSON.stringify(invoice))
        .then(res => {
            PopUp.showMessage("success", "Fatura adicionada com sucesso!");
            this.listAllInvoices();
      })
      .catch(erro => {
        if(erro.message === "403"){
          PopUp.showMessage("error", "Você precisa estar logado para adicionar uma fatura");
          this.props.history.push({
            pathname: '/login',
            search: '?redirect=invoices',
          });
        }else{
          PopUp.showMessage("error", "Falha na comunicação com a Store API");
        }
      });
         
  }

  render(){

    const fields = [
      {title: "Id", data: 'id'},
      {title: "Data de compensação", data: 'competencyDate'},
      {title: "Data de Vencimento", data: 'dueDate'},
      {title: "Data de pagamento", data: 'payDate'},
      //{title: "Cliente", data: 'customer'},
    ];

    return (
      <Fragment>
        <Header />
        <div className="container center mb-10">
          <h3>Faturas</h3>
          <Form saveInvoice = {this.saveInvoice} customers = {this.state.customers}/>
          <Table data= {this.state.invoices} removeData = {this.removeInvoice} fields={fields}/>
        </div>
      </Fragment>
    );
  }
}

export default withRouter(Invoice);
