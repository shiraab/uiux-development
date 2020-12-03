import React, { Component } from 'react';
import ListItem from './ListItem.jsx';

export default class FilterList extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="list">
        {this.props.items.map(item => <ListItem data={item} price={item.price} hex={item.hex} name={item.name} key={item.hex} addItem={this.props.addItem} incrementItem={this.props.incrementItem}
        removeItem={this.props.removeItem} decrementItem={this.props.decrementItem}/>)}
      </div>
    );
  }

}
