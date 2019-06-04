import React from "react";
import Paper from "material-ui/Paper";
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableRowColumn,
  TableHeaderColumn
} from "material-ui/Table";
import superagent from 'superagent';

const styles = {
  paper: {
    minHeight: "100px",
    padding: "40px"
  }
};

export default class CartoonsDirectory extends React.Component {
  constructor() {
    super();
    this.state = {
      cartoons: []
    };
  }
  getAuthenticationToke() {
    return localStorage.getItem("token");
  }
  componentDidMount() {
    superagent
      .get('/api/v1/cartoons')
      .set('Authorization', `Bearer ${this.getAuthenticationToke()}`)
      .end((err, res)=>{
        if(err){
          this.setState({errMessage: 'Cannot retrieve Cartoons!'});
          return;
        }
        this.setState({cartoons: res.body});
      })
  }
  render() {
    const tableRows = this.state.cartoons.map(cartoon => {
      return (
        <TableRow key={cartoon.id}>
          <TableRowColumn>{cartoon.id}</TableRowColumn>
          <TableRowColumn>{cartoon.name}</TableRowColumn>
          <TableRowColumn>{cartoon.creator}</TableRowColumn>
        </TableRow>
      );
    });
    return (
      <Paper style={styles.paper}>
        <h2>Cartoons directory</h2>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHeaderColumn>ID</TableHeaderColumn>
              <TableHeaderColumn>Name</TableHeaderColumn>
              <TableHeaderColumn>Creator</TableHeaderColumn>
            </TableRow>
          </TableHeader>
          <TableBody>{tableRows}</TableBody>
        </Table>
      </Paper>
    );
  }
}
