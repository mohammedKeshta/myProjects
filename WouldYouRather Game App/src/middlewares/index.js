// works as the root middleware file

import thunk from 'redux-thunk'
import logger from './logger'
import { applyMiddleware } from 'redux'

export default applyMiddleware (
    thunk,
    logger
)
