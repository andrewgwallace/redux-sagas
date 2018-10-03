import "babel-polyfill"

import React from 'react'
import ReactDOM from 'react-dom'
import { createStore, applyMiddleware } from 'redux'
import createSagaMiddleware from 'redux-saga' // create the Saga middleware required to run the sagas

import Counter from './Counter'
import reducer from './reducers'
// import { helloSaga } from './sagas' // import the helloSaga function you created destructured.
import rootSaga from  './sagas' // import the rootSaga Generator function that runs all other Sagas. Notice that it is not destructured.

//Set the imported createSagaMiddleware into a variable
const sagaMiddleware = createSagaMiddleware()

// Introduce the saga middleware into the store
// const store = createStore(reducer) // original
const store = createStore(
  reducer,
  applyMiddleware(sagaMiddleware)
)
// Run the imported sagas (in this case, just helloSaga)
// sagaMiddleware.run(helloSaga)

// Run the rootSaga which runs all the other Sagas
sagaMiddleware.run(rootSaga)

const action = type => store.dispatch({type})

function render() {
  ReactDOM.render(
    <Counter
      value={store.getState()}
      onIncrement={() => action('INCREMENT')}
      onDecrement={() => action('DECREMENT')} 
      // Add the connection for the onIncrementAsync call. Note that a plain object action is dispatched.
      onIncrementAsync={() => action('INCREMENT_ASYNC')} />,
    document.getElementById('root')
  )
}

render()
store.subscribe(render)
