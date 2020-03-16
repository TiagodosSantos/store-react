const urlBase = 'http://localhost:8080/store/invoices';

const InvoiceService = {

    ListAllInvoices: () =>{
        return fetch(`${urlBase}`, {
            headers: {'content-type': 'application/json'}
        })
        .then(res => InvoiceService.HandleError(res))
        .then(res =>  res.json());
    },

    RemoveInvoice: id => {

        return fetch(`${urlBase}/${id}`, {
            method: 'DELETE',
            headers: {'content-type': 'application/json'},
        });
    },

    SaveInvoice: invoice => {

        return fetch(`${urlBase}`, {
            method: 'POST',
            headers: {'content-type': 'application/json'},
            body : invoice
        })
        .then(res => InvoiceService.HandleError(res))
    },

    HandleError: res=>{
        
        console.log(res);
        if(!res.ok)
            throw Error(res.responseText);

      console.log(res.json);
      return res;      
    }

}

export default InvoiceService;