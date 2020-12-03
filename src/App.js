import React, { Component } from 'react';
import './App.css';
import classnames from 'classnames';

import FilterList from './FilterList.jsx';
import Cart from './Cart.jsx';

import ToggleButton from 'react-bootstrap/Button';
import ToggleButtonGroup from 'react-bootstrap/ToggleButtonGroup';
import ButtonGroup from 'react-bootstrap/ButtonGroup';

import 'bootstrap/dist/css/bootstrap.min.css';

export default class App extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      cart: new Map(),
      warmth: 'all',
      level: 'all',
      sort: 'none',
    }
  }

  // Add an item to user's cart
  // Note that cart is a map, so we use map's set and has methods to perform this
  // functionality. We use each paint's hex color as the key, as we assume that the
  // hex is unique.
  addItem = (item) => {
    const cart = this.state.cart;
    if (!cart.has(item.hex)) {
      cart.set(item.hex, [1, item])
      this.setState({cart: cart})
    } else {
      this.incrementItem(item)
    }
    console.log(cart)
  }

// Increment number of a certain item in user's cart
  incrementItem = (item) => {
    const cart = this.state.cart;
    console.log(item);
    if (!cart.has(item.hex)) {
      console.log("Oh no! This item is not in your cart.");
    } else {
      let currNum = cart.get(item.hex)[0];
      currNum++;
      cart.set(item.hex, [currNum, item]);
      this.setState({cart: cart});
    }
    console.log(this.state.cart);
  }

// Remove item from user's cart
  removeItem = (item) => {
    const cart = this.state.cart;
    if (!cart.has(item.hex)) {
      console.log("Oh no! This item is not in your cart.");
    } else {
      cart.delete(item.hex);
      this.setState({cart: cart});
    }
  }

// Decrement number of a certain item from user's cart
  decrementItem = (item) => {
    const cart = this.state.cart;
    if (!cart.has(item.hex)) {
      console.log("Oh no! This item is not in your cart.");
    } else {
      let currNum = cart.get(item.hex)[0];
      if (currNum === 1){
        console.log(currNum, item.hex);
        this.removeItem(item);
      } else {
        currNum--;
        cart.set(item.hex, [currNum, item]);
        this.setState({cart: cart});
      }
    }
  }

// Handle changes in the Warmth filter: reset the state to selected warmth
  onToggleWarmth = (value) => {
    this.setState({ warmth: value });
  }

// Handle changes to Level filter: reset state to selected level
  onToggleLevel = (value) => {
    this.setState({ level: value });
  }

// Handle changes to sort type: reset state to selected sort (ascending/descending)
  onToggleSort = (value) => {
    console.log(value);
    this.setState( { sort: value });
  }

// Comparator function checking whether the item fits the currently-selected warmth filter.
// Returns a boolean.
  checkWarmth = (item) => {
    if (this.state.warmth !== 'all') {
      return (item.warmth === this.state.warmth);
    }
    return (item.warmth === 'warm' || item.warmth === 'cool');
  }

  // Comparator function checking whether the item fits the currently-selected level filter.
  // Returns a boolean.
  checkLevel = (item) => {
    if (this.state.level !== 'all') {
      return (item.level === this.state.level);
    }
    return (true);
  }

  // Comparator function that calls the above 2 helpers,
  // i.e. validates an item based on currently-selected filters.
  // Returns a boolean.
  checkAll = (item) => {
    return (this.checkWarmth(item) && this.checkLevel(item));
  }

// Sort function based on JS Array.prototype.sort helper, which calls one of two helpers below
// based on currently-selected sort order.
  sortAny = (firstEl, secondEl) => {
    if (this.state.sort === 'none') {
      return 0;
    }
    if (this.state.sort === 'ascending') {
      return this.sortAscending(firstEl, secondEl);
    }
    return this.sortDescending(firstEl, secondEl);
  }

// Sort function based on JS Array.prototype.sort needs – returns -1 if the first
// element comes before the second, 1 if the second comes before the first, and 0
// if they are equal. This function will sort based on price, ascending.
  sortAscending = (firstEl, secondEl) => {
    if (firstEl.price < secondEl.price) {
      return -1;
    }
    if (firstEl.price > secondEl.price) {
      return 1;
    }
    return 0;
  }

  // Sort function based on JS Array.prototype.sort needs – returns -1 if the first
  // element comes before the second, 1 if the second comes before the first, and 0
  // if they are equal. This function will sort based on price, descending.
  sortDescending = (firstEl, secondEl) => {
    if (firstEl.price > secondEl.price) {
      return -1;
    }
    if (firstEl.price < secondEl.price) {
      return 1;
    }
    return 0;
  }

  render() {

// data for rendering ToggleButtons that allow warmth filtering
    const warmthRadios = [
      { name: 'All', value: 'all' },
      { name: 'Warm', value: 'warm'},
      { name: 'Cool', value: 'cool'}
    ];

// data for rendering ToggleButtons that allow level filtering
    const levelRadios = [
      { name: 'All', value: 'all' },
      { name: 'Primary', value: 'primary' },
      { name: 'Secondary', value: 'secondary' },
      { name: 'Tertiary', value: 'tertiary' },
    ]

// paint data: each paint has a name, hex, price, warmth, and level.
    const paints = [
      {
        name:'Pthalo Blue',
        hex: '#000f89',
        price: 3.99,
        warmth: 'cool',
        level: 'primary'
      },
      {
        name:'Cobalt Blue',
        hex: '#0047ab',
        price: 4.99,
        warmth: 'cool',
        level: 'primary'
      },
      {
        name:'Ultramarine Blue',
        hex: '#120A8F',
        price: 4.99,
        warmth: 'cool',
        level: 'primary'
      },
      {
        name:'Cerulean Blue',
        hex: '#007BA7',
        price: 5.99,
        warmth: 'cool',
        level: 'primary'
      },
      {
        name:'Cadmium Red',
        hex: '#E30022',
        price: 3.99,
        warmth: 'warm',
        level: 'primary'
      },
      {
        name:'Alizarin Crimson',
        hex: '#E32636',
        price: 3.99,
        warmth: 'warm',
        level: 'primary'
      },
      {
        name:'Red Oxide',
        hex: '#5d1f1e',
        price: 4.99,
        warmth: 'warm',
        level: 'primary'
      },
      {
        name:'Cadmium Orange',
        hex: '#ED872D',
        price: 4.99,
        warmth: 'warm',
        level: 'secondary'
      },
      {
        name:'Cadmium Yellow',
        hex: '#fff600',
        price: 3.99,
        warmth: 'warm',
        level: 'primary'
      },
      {
        name:'Primary Yellow',
        hex: '#FFFF00',
        price: 4.99,
        warmth: 'warm',
        level: 'primary'
      },
      {
        name:'Yellow Ochre',
        hex: '#c79b00',
        price: 3.99,
        warmth: 'warm',
        level: 'primary'
      },
      {
        name:'Titanium White',
        hex: '#ffffff',
        price: 3.99,
        warmth: 'neutral',
        level: 'primary'
      },
      {
        name:'Van Dyke Brown',
        hex:'#221b15',
        price: 3.99,
        warmth: 'warm',
        level: 'tertiary',
      },
      {
        name: 'Burnt Sienna',
        price: 4.99,
        hex: '#5f2e1f',
        warmth: 'warm',
        level: 'tertiary',
      },
      {
        name: 'Dioxazine Purple',
        hex: '#1F1327',
        price: 6.99,
        warmth: 'cool',
        level: 'secondary',
      },
      {
        name: 'Permanent Green',
        hex: '#009669',
        price: 5.99,
        warmth: 'cool',
        level: 'secondary',
      },
      {
        name: 'Sap Green',
        hex: '#0a3410',
        price: 3.99,
        warmth: 'cool',
        level: 'secondary',
      },
      {
        name: 'Phthalo Green',
        hex: '#102e3c',
        price: 4.99,
        warmth: 'cool',
        level: 'secondary',
      },
      {
        name: 'Quinacridone Magenta',
        hex: '#9A114F',
        price: 6.99,
        warmth: 'warm',
        level: 'primary'
      },
      {
        name: 'Midnight Black',
        hex: '#000000',
        price: 4.99,
        warmth: 'neutral',
        level: 'primary',
      }
    ];

    // render app! Note that functions that add/remove items are passed down,
    // to enable user interaction on the component level.
    return (
      <div className="App">
        <div className='block'>
          <h1>Happy Accident Paint Shop</h1>
          <h2>Aren't you ready to destress?</h2>
        </div>
          <div id='splash-img-div'>
            <img className='splash' src="https://media1.tenor.com/images/d82a95c242473c781c66d1f992e155ac/tenor.gif?itemid=4514528" alt='Bob says, We do not make mistakes, just happy little accidents'/>
          </div>
          <p>Hi there, friend. It's a stressful time. Let's just take a moment to think about happy little trees as we shop for some paint!</p>
        <div className="main-split">
        <div className='filter-group'>
          <h4>Filters</h4>
          <p>Warmth</p>
            <ButtonGroup name='Warmth' toggle>
            {warmthRadios.map((radio, idx) => (
              <ToggleButton
                className={ classnames(`${radio.value}`, { 'checked': radio.value === this.state.warmth })}
                key={idx}
                type="radio"
                variant="secondary"
                name="radio"
                value={radio.value}
                checked={radio.value === this.state.warmth}
                onClick={(e) => this.onToggleWarmth(e.currentTarget.value)}
              >
                {radio.name}
              </ToggleButton>
            ))}
          </ButtonGroup>
          <p>Level</p>
          <ButtonGroup toggle name='Level'>
          {levelRadios.map((radio, idx) => (
            <ToggleButton
              className={ classnames(`${radio.value}`, { 'checked': radio.value === this.state.level })}
              key={idx}
              type="radio"
              variant="secondary"
              name="radio"
              value={radio.value}
              onClick={(e) => this.onToggleLevel(e.currentTarget.value)}
              checked={radio.value === this.state.level}
              selected={radio.value === this.state.level}
            >
              {radio.name}
            </ToggleButton>
          ))}
        </ButtonGroup>
        </div>
        <div className='sort-group'>
        <h4>Sort by Price</h4>
        <ButtonGroup name='Sort By Price' toggle>

          <ToggleButton
            className={ classnames({ 'checked': 'ascending' === this.state.sort })}
            key='0'
            type="radio"
            variant="secondary"
            name="radio"
            value='ascending'
            checked={'ascending' === this.state.sort}
            onClick={(e) => this.onToggleSort(e.currentTarget.value)}
          >
            Ascending
          </ToggleButton>
          <ToggleButton
            className={ classnames({ 'checked': 'descending' === this.state.sort })}
            key='1'
            type="radio"
            variant="secondary"
            name="radio"
            value='descending'
            checked={'descending' === this.state.sort}
            onClick={(e) => this.onToggleSort(e.currentTarget.value)}
          >
            Descending
          </ToggleButton>
      </ButtonGroup>
        </div>
          <FilterList items={paints.filter(this.checkAll).sort(this.sortAny)} addItem={this.addItem} incrementItem={this.incrementItem}
          removeItem={this.removeItem} decrementItem={this.decrementItem}/>
          <Cart items={this.state.cart} addItem={this.addItem} incrementItem={this.incrementItem}
          removeItem={this.removeItem} decrementItem={this.decrementItem}/>
        </div>
      </div>
    );
  }
}
