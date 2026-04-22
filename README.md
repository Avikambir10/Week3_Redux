# Redux In This Project

This project is a React + Vite shopping cart app that uses **Redux Toolkit** and **React Redux** for cart state management.

The Redux flow in this app is simple and interview-friendly:

1. The **store** is created in `src/store/store.js`.
2. The app is connected to Redux with `<Provider store={store}>` in `src/main.jsx`.
3. Cart logic lives in `src/store/cartSlice.js`.
4. Components read data with `useSelector()` and update data with `useDispatch()`.

## Project Redux Structure

```text
src/
  main.jsx
  store/
    store.js
    cartSlice.js
  components/
    pages/
      Cart.jsx
    reusable/
      Header.jsx
      Productcard.jsx
      CartCard.jsx
```

## How Redux Is Used Here

### 1. Store setup

The Redux store is created in `src/store/store.js` using `configureStore()`:

```js
import { configureStore } from '@reduxjs/toolkit';
import cartSlice from './cartSlice';

export let store = configureStore({
    reducer: {
        cartStore: cartSlice,
    },
});
```

What this means:

- `configureStore()` creates the central Redux store.
- `cartStore` is the key used to access cart state.
- So components read cart data like: `state.cartStore.cart`.

### 2. Provider setup

In `src/main.jsx`, the app is wrapped with `Provider`:

```jsx
<Provider store={store}>
    <App />
</Provider>
```

Why this matters:

- `Provider` makes the Redux store available to the whole component tree.
- Without it, `useSelector()` and `useDispatch()` would not work.

### 3. Slice setup

Cart state and cart-related reducers are defined in `src/store/cartSlice.js` using `createSlice()`.

This slice handles:

- `addToCart`
- `removeFromCart`
- `changeQty`

It also initializes cart data from `localStorage`, so cart items remain after refresh.

## Interview Topics

## 1. Store, Action, Reducer

### Store

The **store** is the central place where the app state is stored.

In this project:

- The store is created in `src/store/store.js`
- It contains one reducer: `cartStore`
- The cart data is available inside the store

Interview answer:

> The store is the single source of truth in Redux. It holds the application state and allows components to access and update that state in a predictable way.

### Action

An **action** describes **what happened**.

In this project, actions are generated automatically by `createSlice()`:

- `addToCart(...)`
- `removeFromCart(...)`
- `changeQty(...)`

Examples from this project:

```js
dispatch(addToCart({ cartObj }));
dispatch(removeFromCart(id));
dispatch(changeQty({ id, type }));
```

Interview answer:

> An action is a plain object that tells Redux what change should happen. With Redux Toolkit, action creators are generated automatically from reducers.

### Reducer

A **reducer** is a function that decides **how state should change** based on the action.

In this project:

- `addToCart` adds a new item
- `removeFromCart` removes an item by `id`
- `changeQty` increases or decreases quantity

Example idea:

```js
addToCart: (state, req) => {
    let { cartObj } = req.payload;
    state.cart = [cartObj, ...state.cart];
}
```

Interview answer:

> A reducer takes the current state and an action, then returns the next state. Redux Toolkit lets us write reducer logic in a mutable style, but internally it still keeps state updates immutable using Immer.

## 2. `connect()`, `mapStateToProps`, `mapDispatchToProps`

These are the **older React Redux patterns**, mainly used in class components or older codebases.

This project does **not** use `connect()`. It uses hooks instead.

### `connect()`

`connect()` connects a React component to the Redux store.

Basic idea:

```js
export default connect(mapStateToProps, mapDispatchToProps)(MyComponent);
```

### `mapStateToProps`

This function selects data from the Redux store and passes it as props.

Example:

```js
const mapStateToProps = (state) => ({
  cart: state.cartStore.cart,
});
```

Meaning:

- It reads store data
- Then sends it to the component as props

### `mapDispatchToProps`

This function sends action dispatchers to the component as props.

Example:

```js
const mapDispatchToProps = (dispatch) => ({
  addItem: (cartObj) => dispatch(addToCart({ cartObj })),
});
```

Meaning:

- It lets the component trigger Redux actions through props

Interview answer:

> `connect()` is the older higher-order component approach in React Redux. `mapStateToProps` is used to read state and pass it as props, while `mapDispatchToProps` is used to pass dispatching functions as props. In modern React, hooks like `useSelector` and `useDispatch` are usually preferred because they are simpler and cleaner.

## 3. `useSelector()` and `useDispatch()`

This project uses the modern React Redux hooks API.

### `useSelector()`

`useSelector()` is used to read data from the Redux store.

Examples in this project:

```js
const cart = useSelector((store) => store.cartStore.cart);
```

Used in:

- `Header.jsx`
- `Cart.jsx`
- `Productcard.jsx`

Why it is used:

- To get cart items
- To get cart count
- To check whether an item already exists in cart

Interview answer:

> `useSelector()` allows a functional component to subscribe to Redux store data. Whenever the selected state changes, the component re-renders.

### `useDispatch()`

`useDispatch()` returns the `dispatch` function so a component can send actions to Redux.

Examples in this project:

```js
const dispatch = useDispatch();

dispatch(addToCart({ cartObj }));
dispatch(removeFromCart(id));
dispatch(changeQty({ id, type }));
```

Used in:

- `Productcard.jsx`
- `CartCard.jsx`

Interview answer:

> `useDispatch()` is used to dispatch Redux actions from functional components. It is the hook-based replacement for `mapDispatchToProps`.

## 4. Difference Between Context API and Redux

This is a very common interview question.

### Context API

React Context is built into React and is mainly used for passing data through the component tree without prop drilling.

Good use cases:

- Theme
- Logged-in user info
- Language / locale
- Small global state

### Redux

Redux is a separate state management library designed for predictable and scalable global state management.

Good use cases:

- Complex shared state
- Large applications
- Many updates from different components
- Debugging state flow clearly

### Key differences

| Context API | Redux |
|---|---|
| Built into React | External library |
| Good for simple global data | Better for complex app state |
| No built-in reducer pattern required | Strong structured flow using actions and reducers |
| Can cause broad re-renders if not organized well | Better optimized patterns for large-scale state usage |
| Simpler to start | Better for maintainability in bigger apps |

### Interview answer

> Context API is useful for sharing simple global state like theme or authentication data. Redux is better when state becomes complex, changes frequently, or needs a predictable structure. Redux also gives a clearer architecture with store, actions, and reducers, which helps in larger applications.

## Why Redux Fits This Project

Redux is a good fit here because:

- Cart data is needed in multiple components
- `Header` needs cart count
- `Productcard` needs to know whether an item is already in cart
- `Cart` needs the full cart list
- `CartCard` needs to update quantity and remove items
- `localStorage` persistence is easier to centralize around cart logic

Without Redux, this state would likely be lifted up and passed through many components.

## Project-Specific Redux Flow

Here is the exact flow used in this app:

### Add to cart flow

1. User clicks the button in `Productcard.jsx`
2. `dispatch(addToCart({ cartObj }))` is called
3. `addToCart` reducer updates `state.cart`
4. `localStorage` is updated
5. Components using `useSelector()` re-render automatically

### Remove item flow

1. User clicks remove in `Productcard.jsx` or `CartCard.jsx`
2. `dispatch(removeFromCart(id))` is called
3. Reducer filters out that item
4. UI updates automatically

### Change quantity flow

1. User clicks plus or minus in `CartCard.jsx`
2. `dispatch(changeQty({ id, type }))` is called
3. Reducer updates `qty`
4. Totals are recalculated in `Cart.jsx`

## Quick Interview Summary

If you need a short answer in an interview, you can say:

> In this project I used Redux Toolkit to manage cart state. I created a store with `configureStore`, wrapped the app with `Provider`, and used a cart slice with reducers like `addToCart`, `removeFromCart`, and `changeQty`. Components read state with `useSelector` and update state with `useDispatch`. I also understand the older `connect`, `mapStateToProps`, and `mapDispatchToProps` approach, but in modern React hooks are preferred. Compared to Context API, Redux is more suitable for complex shared state because it gives a predictable and scalable structure.

## Final Notes

- This project uses **Redux Toolkit**, which is the recommended modern Redux approach.
- It uses **hooks**, not `connect()`.
- The Redux state is currently focused on the shopping cart only.
- Cart data is persisted with `localStorage`.

