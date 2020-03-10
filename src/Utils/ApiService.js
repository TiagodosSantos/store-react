const urlBase = 'http://localhost:8080/store/';

const ApiService = {

    ListAllCustomers: () =>{
        return fetch(`${urlBase}customer`, {
            headers: {'content-type': 'application/json'}
        })
        .then(res => ApiService.CheckErrors(res))
        .then(res =>  res.json());
    },

    RemoveCustomer: id => {
        const path = `customer/${id}`;

        return fetch(`${urlBase}${path}`, {
            method: 'DELETE',
            headers: {'content-type': 'application/json'},
        });
    },

    SaveCustomer: customer => {
        const param = 'customer';

        return fetch(`${urlBase}${param}`, {
            method: 'POST',
            headers: {'content-type': 'application/json'},
            body : customer
        })
        .then(res => ApiService.CheckErrors(res))
    },

    CheckErrors: res=>{
        
        if(!res.ok)
            throw Error(res.responseText);

      console.log(res.json);
      return res;      
    }

}

export default ApiService;