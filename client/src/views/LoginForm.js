import React, { Component } from "react";
import TextField from "material-ui/TextField";
import superagent from "superagent";
import RaisedButton from 'material-ui/RaisedButton';
import {Redirect} from 'react-router-dom';

class LoginForm extends Component {
  constructor() {
    super();
    this.state = {
      username: "",
      password: "",
      errorMessage: ""
    };
  }
  handleChanged = evt => {
    this.setState({
      [evt.target.name]: evt.target.value
    });
  };
  submitForm = event => {
    event.preventDefault();
    superagent
      .post("/auth/v1")
      .send({ username: this.state.username, password: this.state.password })
      .end((err, res) => {
        if (err){ this.setState({ errorMessage: "Authentication Failed" });}
        localStorage.setItem('token', res.body.token);
        this.props.onLoginSuccessful();
      });
  };
  
  render() {
    return (
        <div>
            <form onSubmit={this.submitForm}>
                <TextField
                    floatingLabelText="Username"
                    value={this.state.username}
                    name="username"
                    onChange={this.handleChanged}
                    />
                <TextField
                    floatingLabelText="Password"
                    value={this.state.password}
                    name="password"
                    onChange={this.handleChanged}
                    type="password"
                    />
                <RaisedButton type="submit" label="Submit" />
            </form>
         </div>
     
    );
  }
}

export default LoginForm;
