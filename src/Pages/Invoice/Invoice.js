import React, {Component, Fragment}  from 'react';
import 'materialize-css/dist/css/materialize.min.css';
import './Invoice.css';

import Header from '../../Components/Header/Header';
import Table from '../../Components/Table/Table';
import Form from '../../Components/Form/InvoiceForm';
import PopUp from '../../Utils/PopUp';
import DateUtils from '../../Utils/DateUtils';
import InvoiceService from '../../Services/InvoiceService';

class Invoice extends Component{

  constructor(props){
    super(props);

    this.state = {
      invoices:  [],
    };
  }

  async componentDidMount(){
    this.listAllInvoices();
  }

  listAllInvoices = () => {
    InvoiceService.ListAllInvoices()
      .then(res => {
        this.setState({invoices: res})
      })
      .catch(erro => PopUp.showMessage("error", "Falha na comunicacao com a Store API"));
  }
  

  removeInvoice = (id) => {

    console.log("Remove "+ id);

      InvoiceService.RemoveInvoice(id)
        .then(res => {
            PopUp.showMessage("success", "Fatura removida com sucesso!");
            this.listAllInvoices();
        })
        .catch(erro => PopUp.showMessage("error", "Falha na comunicação com a Store API"));
      
  }

  saveInvoice = data => {

      const invoice = {
        competencyDate: DateUtils.convertStringToDate(data.competencyDate), 
        //customerId: data.customerId,
        customerId: 1,
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
        console.log(erro);
        PopUp.showMessage("error", "Falha na comunicação com a API")
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
          {<Form saveInvoice = {this.saveInvoice}/>}
          <Table data= {this.state.invoices} removeData = {this.removeInvoice} fields={fields}/>
        </div>
      </Fragment>
    );
  }
}

export default Invoice;
