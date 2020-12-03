import React, { Component } from 'react';
import classnames from 'classnames';
import paint from './1x/paint.png';

import Button from 'react-bootstrap/Button';

export default class ListItem extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      added: false,
    }
  }

  // Adds a color: resets state to added, which adds a class to the component.
  addColor = () => {
    this.props.addItem(this.props.data)
    if (!this.state.added) {
      this.setState({added: true});
    }
  }

// function calling decrementItem (wrapper function for the one passed down through props)
  decrement = () => {
    this.props.decrementItem(this.props.data)
  }

  // function calling incrementItem (wrapper function for the one passed down through props)
  // note that incrementItem calls the adding to cart function if item isn't already in cart!
  increment = () => {
    this.props.incrementItem(this.props.data)
  }

  // function calling removeItem (wrapper function for the one passed down through props)
  remove = () => {
    this.props.removeItem(this.props.data)
  }

  render() {
    const item = this.props.data.toString();
    return (
      <div className={ classnames('listitem', { 'border': this.state.added })} style={{backgroundColor: this.props.hex}}>
        <img className="paint-icon" src={paint} alt="paint icon"/>
        <div className='info-panel'>
          <p className='name'>{this.props.name}</p>
          <p>${this.props.price}</p>
          <Button variant='dark' onClick={this.props.cart ? this.increment : this.addColor}>
            {this.props.cart ? ' + Add squeeze to palette' : '+ Add to palette'}
          </Button>
          {this.props.cart &&
            <p className='cart'>Amount: {this.props.amount}</p>
          }
          {this.props.cart &&
            <Button variant='dark' onClick={this.decrement}>– Remove squeeze from palette</Button>
          }
          {this.props.cart &&
            <Button variant='dark' onClick={this.remove}>X Remove color from palette</Button>
          }
        </div>
      </div>
    );
  }

}
