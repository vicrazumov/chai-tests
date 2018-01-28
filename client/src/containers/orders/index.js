import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import {
  getOrders,
  deleteOrder,
  addOrder,
  editOrder,
} from '../../modules/orders'

import Table, { TableBody, TableCell, TableHead, TableRow } from 'material-ui/Table';
import Paper from 'material-ui/Paper';
import Button from 'material-ui/Button';

import Modal from './modal';

class Home extends Component {
  state = {
    modalOpen: false,
    editMode: false,
  }

  componentDidMount() {
    const { orders, getOrders } = this.props;
    if (orders.length === 0) getOrders();
  }

  handleCompanyClick = companyName => {
    this.props.getOrders({ companyName });
  }

  handleAddressClick = customerAddress => {
    this.props.getOrders({ customerAddress });
  }

  handleReset = () => {
    this.props.getOrders();
  }

  handleAddClick = () => {
    this.setState({ modalOpen: true, editMode: false });
  }

  handleDeleteClick = orderId => {
    this.props.deleteOrder(orderId)
      .then(() => this.props.getOrders());
  }

  handleEditClick = orderId => {
    this.setState({ modalOpen: true, editMode: true, orderId });
  }

  handleClose = () => {
    this.setState({ modalOpen: false, orderId: null });
  }

  handleOkClick = order => {
    const promise = this.state.editMode ? this.props.editOrder(this.state.orderId, order) : this.props.addOrder(order);

    promise.then(() => this.props.getOrders());
  }

  render() {
    return (
      <div>
        <h1>Orders</h1>
        <Paper>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Id</TableCell>
                <TableCell>Company Name</TableCell>
                <TableCell>Customer Address</TableCell>
                <TableCell>Ordered Item</TableCell>
                <TableCell></TableCell>
                <TableCell></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {this.props.orders.map(order => {
                return (
                  <TableRow key={order.orderId}>
                    <TableCell>{order.orderId}</TableCell>
                    <TableCell style={{ cursor: 'pointer' }} onClick={() => this.handleCompanyClick(order.companyName)}>{order.companyName}</TableCell>
                    <TableCell style={{ cursor: 'pointer' }} onClick={() => this.handleAddressClick(order.customerAddress)}>{order.customerAddress}</TableCell>
                    <TableCell>{order.orderedItem}</TableCell>
                    <TableCell onClick={() => this.handleEditClick(order.orderId)}><Button color="primary">Edit</Button></TableCell>
                    <TableCell onClick={() => this.handleDeleteClick(order.orderId)}><Button color="secondary">Delete</Button></TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </Paper>
        <div style={{ margin: 12 }}>
          <Button raised color="primary" style={{ marginRight: 8 }} onClick={this.handleAddClick}>Add order</Button>
          <Button raised color="secondary" onClick={this.handleReset}>Reset filters</Button>
        </div>
        <Modal
          open={this.state.modalOpen}
          editMode={this.state.editMode}
          onClose={this.handleClose}
          onOkClick={this.handleOkClick}
          order={this.state.orderId && this.props.orders.find(order => order.orderId === this.state.orderId)}
        />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  orders: state.orders.orders,
  status: state.orders.status,
  error: state.orders.error,
})

const mapDispatchToProps = dispatch => bindActionCreators({
  getOrders,
  deleteOrder,
  addOrder,
  editOrder,
}, dispatch)

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home)
