// For these tests, we're utilizing 'tape'.
import test from 'tape';

import { put, call } from 'redux-saga/effects'
import { delay } from 'redux-saga'
import { incrementAsync } from './sagas'

test('incrementAsync Saga test', (assert) => {
    // gen below is short for 'generator' as it is a generator function
    // which will return an iterator object which has a next method
    // which returns an object as 'gen.next()'
    const gen = incrementAsync() 

    assert.deepEqual(
        gen.next().value,
        call(delay, 1000),
        'incrementAsync Saga must call delay(10000)'
    )

    assert.deepEqual(
        gen.next().value,
        put({ type: 'INCREMENT'}),
        'incrementAsync Saga must dispatch an INCREMENT action'
    )

    assert.deepEqual(
        gen.next(),
        // The value is undefined because after it has completed the iterations, 
        // if there is nothing left, the default return value is 'undefined'
        //  with the 'done' boolean as being true.
        { done: true, value: undefined }, 
        'incrementAsync Saga must be done'
    )

    assert.end()
})
