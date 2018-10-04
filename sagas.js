// A collection of sagas that will run. In order to do so a Saga middleware needs to be created and connected to the Redux store.
// The middleware is introduced into the main.js file.
// the imported delay is a utility function that returns a Promise that will resolve after a specified number of milliseconds. 
// This will be used to block the Generator.
// Sagas are Generator functions that yield objets to the redux-saga middleware. Learn more here: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/function*
import { delay } from 'redux-saga' 
import { put, takeEvery, all, call } from 'redux-saga/effects'

export function* helloSaga() {
    console.log('Hello Sagas!')
}

// Our worker Saga: will perform the async increment task. as it has the delay function, it will be suspended until the Promise is fulfilled.
// Once resolved, the middleware resumes the Saga until the next yield. In this case, is then put. "put" is referred to as an Effect; A simple JS object which contains instruction to be fulfilled by the middleware.
// The Saga is paused until the middleware fulfills the effect, in this case 'INCREMENT'
export function* incrementAsync() {
    // yield delay(1000) 
    // This above method is evaluated before it gets passed to the 'next' caller (which could be a test or our middleware) and will result in a Promise being returned, not good!
    // Instead we should use 'call' Effect which is passed to the 'next' caller. 'call' returns an Effect which instructs the middleware to call a givcen function with the provided arguments.
    // REMEMBER: effects such as 'put' and 'call' don't actually perform a dispatch or asynchronous call. They simply return plain JS objects
    yield call(delay, 1000)
    yield put({ type: 'INCREMENT' })
}

// Our watcher Saga: spawn a new incrementAsync task on each INCREMENT_ASYNC. 
// takeEvery is a "helper" function by redux-saga that listens for dispatched actions.
// In this case it's listening for the 'INCREMEMENT_ASYNC' action and when is hears it, 
// it runs the passed argument, the incrementAsync Generator function above.
export function* watchIncrementAsync() {
    yield takeEvery('INCREMENT_ASYNC', incrementAsync)
}

// Both sagas need to be started at once. To do this, a rootSaga will be created.
// a rootSaga is responsible for starting out other Sagas. For this, we must import the "all" effect.
// Note that "all" is passed an array of each Saga from within the file into an array being and being called "()".
// Now that they've been exported and called to run at the same time, we just have to invoke sagaMiddleware.run on "rootSaga" in main.js.

export default function* rootSaga() {
    yield all([
        helloSaga(),
        watchIncrementAsync()
    ])
}