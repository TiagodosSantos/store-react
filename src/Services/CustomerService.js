const urlBase = 'http://localhost:8080/store/customers';

const CustomerService = {

    ListAllCustomers: () =>{
        return fetch(`${urlBase}`, {
            headers: {'content-type': 'application/json'}
        })
        .then(res => CustomerService.HandleError(res))
        .then(res =>  res.json());
    },

    RemoveCustomer: id => {

        return fetch(`${urlBase}/${id}`, {
            method: 'DELETE',
            headers: {'content-type': 'application/json'},
        });
    },

    SaveCustomer: customer => {

        return fetch(`${urlBase}`, {
            method: 'POST',
            headers: {'content-type': 'application/json'},
            body : customer
        })
        .then(res => CustomerService.HandleError(res))
    },

    HandleError: res=>{
        
        if(!res.ok)
            throw Error(res.responseText);

      console.log(res.json);
      return res;      
    }

}

export default CustomerService;