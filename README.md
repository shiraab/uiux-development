# Welcome to the Happy Accident Paint Shop!

## Organization of Components

This project is organized into four components: \
- `App` (App.js): includes all data for rendering (paints and filtering categories),
as well as sorting and filtering functionality.
- `FilterList` (FilterList.jsx): a purely structural component, which is "in charge"
of rendering the list of `ListItem`s for the main shop.
- `Cart` (Cart.jsx): a component which is "in charge" of rendering all items in the cart,
as well as calculating price and managing the pseudo-checkout (i.e. sending the user an alert).
- `ListItem` (ListItem.jsx): the ListItem, whose appearance and functionality changes
slightly based on whether or not it is in the `Cart`.

## How data is passed down

As stated above, most of the functionality and all of the data is in `App`. This includes
management of filtering and sorting, as well as adding or removing items from the `Cart`.

### Data

`App` includes the list of paints that can be rendered into `ListItem`s, which are then filtered and sorted (see below)
before being passed down to `FilterList`, which renders the paints as a list of `ListItem`s. `App` also manages
the cart in its component state, which is then passed down to `Cart` to be rendered there into `ListItem`s. \

`App` also includes the list of possible filters, which it renders into Bootstrap `ToggleButton`s and
tracks in its component state.

### Management of filtering and sorting

`App` manages all filtering and sorting. Based on which `ToggleButton` the user selects,
`App` updates its state to reflect the current filters selected. This then triggers a call to
the `checkAll` function, which updates the list of paints that is passed down into `FilterList`.
`checkAll` calls two helpers, `checkLevel` and `checkWarmth`, which compare each paint's
level (e.g. primary, secondary, tertiary) and warmth (e.g. warm, cool) to the currently
selected filters (tracked via App state).

Similar functionality exists for sorting. The selected sort type is tracked via App, and is initially set
to 'none', simply so that a user (or TA) can check that the sort functions actually work :). I have created
two sorting helpers, `sortAscending` and `sortDescending`, which I then pass into the Array.prototype.sort()
function so that the `FilterList` renders a sorted list of elements.

### User interaction

Users can interact with the application in a number of ways, all of them different types
of `Button`s.

#### `ToggleButton`s

These buttons are in charge of filtering and sorting. I've added different backgrounds to the
filter buttons based on their meaning, which is a fun piece of user interaction – the warmth buttons
have different background colors, while the level buttons have a gradient displaying some of the colors
they display.

#### `Add to cart`, `Add a squeeze`, `Remove one squeeze`, `Remove from Cart`

These buttons allow a user to manage which elements are in their cart, as well as
to manage the quantity of the elements in the cart.

#### `Checkout`

This button allows a user to go to "checkout," which here means sending an alert
to the user via the browser that tells them how much paint (in dollars) is in their
cart.

# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `yarn test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `yarn build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `yarn eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `yarn build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)
