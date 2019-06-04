import React, { Component } from "react";
import AppBar from "material-ui/AppBar";
import FlatButton from "material-ui/FlatButton";
import {Redirect} from 'react-router-dom';

class AppBarView extends Component {
  handleLogout = () => {
    localStorage.removeItem("token");
    this.setState();
  };
  isAuthenticate() {
    const token = localStorage.getItem("token");
    return token && token.length > 10;
  }
  render() {
    const isAlreadyAuthenticate = this.isAuthenticate();
    return (
      <div>
        {!isAlreadyAuthenticate ? (
          <Redirect to={{ pathname: "/" }} />
        ) : (
          <AppBar
            title="Cartoons Directory"
            iconElementRight={<FlatButton label="Logout" onClick={this.handleLogout} />}
          />
        )}
      </div>
    );
  }
}

export default AppBarView;
