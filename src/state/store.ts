import { createStore, applyMiddleware  } from "redux";
import thunk from 'redux-thunk'
import { persistMiddleware } from "./middleware/persist-middleware";

import reducers from './reducers'

export const store = createStore(reducers, {}, applyMiddleware(persistMiddleware, thunk))

/** Testing */
// store.dispatch({
//   type: ActionType.INSERT_CELL_AFTER,
//   payload: {
//     id: null,
//     type: 'code'
//   }
// })

// store.dispatch({
//   type: ActionType.INSERT_CELL_AFTER,
//   payload: {
//     id: null,
//     type: 'text'
//   }
// })

// console.log('store', store.getState())