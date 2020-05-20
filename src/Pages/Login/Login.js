import React from 'react';
import { Grid, TextField, Button, FormControlLabel, Checkbox } from '@material-ui/core';
import { Face, Fingerprint } from '@material-ui/icons';
import './Login.css';

import { withRouter } from 'react-router-dom';
import queryString from 'query-string';

import LoginService from '../../Services/LoginService';



class Login extends React.Component {

    constructor(props){
        super(props);

        this.state = {
            msg: this.props.msg, //msg
            query: queryString.parse(this.props.location.search)
          };

          console.log(this.state.query.redirect);
        //this.registrarUsuario = this.registrarUsuario.bind(this);
    }

    sendForm(event){
        event.preventDefault();
        
        const {email, password} = this.state;
        LoginService.SendForm(JSON.stringify({email,password}))
          .then(auth => {
            const {token, type} = auth;
            localStorage.setItem('auth-token', type+" "+token);
            
            if(this.state.query.redirect)
                this.props.history.push("/"+this.state.query.redirect);
            else
                this.props.history.push("/");
        })
        .catch(erro => {
            this.setState({msg: 'Não foi possível fazer o login ' + erro.status});
        });
        

    }

    setInput = event => {
        const {name, value} = event.target;
  
        this.setState({
            [name]: value
        });
  
    }

    render() {
        return (
                <div className="login-box">
                    <h1 className="header-logo">Store</h1>
                    <span>{this.state.msg}</span>
                        <form onSubmit={this.sendForm.bind(this)} method="post">
                            <Grid container spacing={8} alignItems="flex-end">
                                <Grid item>
                                    <Face />
                                </Grid>
                                <Grid item md={true} sm={true} xs={true}>
                                    <TextField id="username" label="Username" name="email" type="email" fullWidth autoFocus required onChange={this.setInput}/>
                                </Grid>
                            </Grid>
                            <Grid container spacing={8} alignItems="flex-end">
                                <Grid item>
                                    <Fingerprint />
                                </Grid>
                                <Grid item md={true} sm={true} xs={true}>
                                    <TextField id="password" label="Password" name="password" type="password" fullWidth required onChange={this.setInput}/>
                                </Grid>
                            </Grid>
                            <Grid container alignItems="center" justify="space-between">
                                <Grid item>
                                    <FormControlLabel checked control={
                                        <Checkbox
                                            color="primary"
                                        />
                                    } label="Remember me" />
                                </Grid>
                                <Grid item>
                                    <Button disabled disableFocusRipple disableRipple style={{ textTransform: "none" }} variant="text" color="primary">Forgot password ?</Button>
                                </Grid>
                            </Grid>
                            <Grid container justify="center" style={{ marginTop: '10px' }}>
                                <Button type="submit" variant="outlined" color="primary" style={{ textTransform: "none" }}>Login</Button>
                            </Grid>
                        </form>  
                </div>
        );
    }
}

export default withRouter(Login);