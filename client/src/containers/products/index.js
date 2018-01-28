import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import {
  getProducts,
} from '../../modules/products'

import Table, { TableBody, TableCell, TableHead, TableRow } from 'material-ui/Table';
import Paper from 'material-ui/Paper';

class Home extends Component {
  componentDidMount() {
    this.props.getProducts();
  }

  render() {
    return (
      <div>
        <h1>Products</h1>
        <Paper>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Product Name</TableCell>
                <TableCell numeric>Purchased (pcs.)</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {this.props.products.map((product, index) => {
                return (
                  <TableRow key={index}>
                    <TableCell>{product.orderedItem}</TableCell>
                    <TableCell numeric>{product.count}</TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </Paper>


      </div>
    );
  }
}

const mapStateToProps = state => ({
  products: state.products.products,
})

const mapDispatchToProps = dispatch => bindActionCreators({
  getProducts,
}, dispatch)

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home)
