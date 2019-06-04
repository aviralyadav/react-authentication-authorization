import React from 'react';
import Paper from 'material-ui/Paper';
import RaisedButton from 'material-ui/RaisedButton';
import LoginForm from './LoginForm';
import {Redirect} from 'react-router-dom';

const styles = {
  paper: {
    minHeight: '100px',
    padding: '40px'
  }
};

export default class Login extends React.Component {
  isAuthenticate() {
    const token = localStorage.getItem('token');
    return token && token.length > 10;
 }
 onLoginSuccessful = () => {
   this.setState();
 }
  render() {
    const isAlreadyAuthenticate = this.isAuthenticate();
    return (
      <Paper style={styles.paper}>
        {isAlreadyAuthenticate ? <Redirect to={{pathname:'/app/directory'}} /> : (
          <div>
            <h2>Login</h2>
            <LoginForm onLoginSuccessful={this.onLoginSuccessful} />
        </div>
        )}
      </Paper>
    );
  }
}
