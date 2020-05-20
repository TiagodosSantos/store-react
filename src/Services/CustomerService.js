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

        console.log("Aqui  "+ localStorage.getItem('auth-token'));
        return fetch(`${urlBase}/${id}`, {
            method: 'DELETE',
            headers: {
                'content-type': 'application/json',
                'Authorization': localStorage.getItem('auth-token'),
            },
        }).then(res => CustomerService.HandleError(res));
    },

    SaveCustomer: customer => {

        return fetch(`${urlBase}`, {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
                'Authorization': localStorage.getItem('auth-token'),
            },
            body : customer
        })
        .then(res => CustomerService.HandleError(res));
    },

    HandleError: res=>{
        
        if(!res.ok)
            throw Error(res.status !== 403 ? res.responseText : res.status);

      console.log(res.json);
      return res;      
    }

}

export default CustomerService;