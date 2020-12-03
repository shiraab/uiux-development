import React, { Component } from 'react';
import ListItem from './ListItem.jsx';

import Button from 'react-bootstrap/Button';

export default class Cart extends React.Component {

  constructor(props) {
    super(props);
  }

// Calculates price based on current items in cart. The cart is a JS Map, so
// the function takes in a map and uses map.values to iterate over the items in
// the cart.
  calculatePrice = (map) => {
    let sum = 0;
    for (let value of map.values()) {
      sum += (value[1].price*value[0]);
    }
    console.log(sum)
    return sum;
  }

// Function to perform "checkout", that is send an alert to the user.
  checkout = (price) => {
    alert('You\'ve got $' + price.toString() + ' worth of paint on your palette. Happy painting!');
  }

  render() {
    // cast cart contents from JS Map to array for easier mapping/rendering
    const contents = Array.from(this.props.items)
    // calculate price
    const price = this.calculatePrice(this.props.items);
    return (
      <div className="cart">
        <h2>Your Palette</h2>
        <h3>Current Subtotal: ${price}</h3>
        <div className="list">
          { contents.map((item) => <ListItem cart price={item[1][1].price} amount={item[1][0]} data={item[1][1]} key={item[1][1].hex} hex={item[1][1].hex} name={item[1][1].name} addItem={this.props.addItem} incrementItem={this.props.incrementItem}
          removeItem={this.props.removeItem} decrementItem={this.props.decrementItem}/>)}
        </div>
        <Button variant='secondary' name={price} onClick={(e) => this.checkout(e.currentTarget.name)}>Checkout</Button>
      </div>
    );
  }

}
