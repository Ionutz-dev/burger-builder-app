import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../../store/actions/index';

import classes from './Order.module.css';

class order extends Component {
  render() {
    const ingredients = [];

    for (let ingName in this.props.ingredients) {
      ingredients.push({
        name: ingName,
        amount: this.props.ingredients[ingName],
      });
    }

    const ingredientOutput = ingredients.map(ing => {
      return (
        <span
          key={ing.name}
          style={{
            textTransform: 'capitalize',
            display: 'inline-block',
            margin: '0 8px',
            border: '1px solid #ccc',
            padding: '5px ',
          }}
        >
          {ing.name} ({ing.amount})
        </span>
      );
    });

    return (
      <div className={classes.Order}>
        <p>Ingredients: {ingredientOutput}</p>
        <p>
          Price:{' '}
          <strong>{Number.parseFloat(this.props.price).toFixed(2)} $</strong>
        </p>
        <button
          className={classes.DeleteOrder}
          onClick={() =>
            this.props.onDeleteOrder(
              this.props.orderId,
              this.props.orders,
              this.props.token
            )
          }
        >
          Delete Order
        </button>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    loading: state.order.loading,
    orders: state.order.orders,
    token: state.auth.token,
  };
};

const mapDispatchActions = dispatch => {
  return {
    onDeleteOrder: (id, orders, token) =>
      dispatch(actions.deleteOrder(id, orders, token)),
  };
};

export default connect(mapStateToProps, mapDispatchActions)(order);
