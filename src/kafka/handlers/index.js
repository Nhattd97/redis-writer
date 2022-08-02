import {noop} from 'lodash'
import {debug} from '@kobiton/core-util'

export function deviceStateMessageHandler(ns, message, done = noop) {
    try {
        done()
    } catch (e) {
        debug.log(ns, `Fail to handle device connector message: ${e.message}`)
        done(e)
    }
}