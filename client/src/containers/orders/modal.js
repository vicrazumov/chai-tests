import React, { Component } from 'react';

import Modal from 'material-ui/Modal';
import TextField from 'material-ui/TextField';
import Button from 'material-ui/Button';

function getModalStyle() {
  const top = window.innerHeight / 2 - 300;
  const left = window.innerWidth / 2 - 200;

  return {
    position: 'absolute',
    width: 400,
    height: 400,
    top: top,
    left: left,
    border: '1px solid #e5e5e5',
    backgroundColor: '#fff',
    boxShadow: '0 5px 15px rgba(0, 0, 0, .5)',
    padding: 8 * 4,
  };
}

const initialState = {
  orderId: '',
  companyName: '',
  customerAddress: '',
  orderedItem: '',
};

class CustomModal extends Component {

  constructor(props) {
    super(props);

    this.state = initialState;
  }

  componentWillReceiveProps(nextProps) {
    this.setState(nextProps.order);
  }

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value,
    });
  };

  handleClose = () => {
    this.setState(initialState);
    this.props.onClose();
  }

  handleOkClick = () => {
    this.props.onOkClick(this.state);
    this.handleClose();
  }

  render() {
    return (
      <Modal
        open={this.props.open}
        onClose={this.handleClose}
      >
        <div style={getModalStyle()}>
          {!this.props.editMode &&
            <TextField
              id="orderId"
              label="Order Id"
              style={{ width: 200 }}
              value={this.state.orderId}
              onChange={this.handleChange('orderId')}
              margin="normal"
            />
          }
          <TextField
            id="companyName"
            label="Company Name"
            style={{ width: 200 }}
            value={this.state.companyName}
            onChange={this.handleChange('companyName')}
            margin="normal"
          />
          <TextField
            id="customerAddress"
            label="Customer Address"
            style={{ width: 200 }}
            value={this.state.customerAddress}
            onChange={this.handleChange('customerAddress')}
            margin="normal"
          />
          <TextField
            id="orderedItem"
            label="Ordered Item"
            style={{ width: 200 }}
            value={this.state.orderedItem}
            onChange={this.handleChange('orderedItem')}
            margin="normal"
          />
          <div style={{ margin: 12 }}>
            <Button raised color="primary" style={{ marginRight: 8 }} onClick={this.handleOkClick}>OK</Button>
            <Button raised color="secondary" onClick={this.handleClose}>Cancel</Button>
          </div>
        </div>
      </Modal>
    )
  }
}

export default CustomModal;
