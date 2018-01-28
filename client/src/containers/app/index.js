import React from 'react';
import { Route, Link } from 'react-router-dom'
import Orders from '../orders'
import Products from '../products'

import Button from 'material-ui/Button'
import { withStyles } from 'material-ui/styles';

const styles = theme => ({
  button: {
    margin: theme.spacing.unit,
  },
})

const App = props => (
  <div>
    <header>
      <Link to="/">
        <Button className={props.classes.button} color="primary">Orders</Button>
      </Link>
      <Link to="/products">
        <Button className={props.classes.button} color="secondary">Products</Button>
      </Link>
    </header>

    <main>
      <Route exact path="/" component={Orders} />
      <Route exact path="/products" component={Products} />
    </main>
  </div>
)

export default withStyles(styles)(App)
