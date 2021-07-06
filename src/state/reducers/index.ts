import { combineReducers } from "redux";
import cellsReducer from './cellsReducer'
import bundlesReducer from './bundleReducer'

export const reducers = combineReducers({
  cells: cellsReducer,
  bundles: bundlesReducer
})

export default reducers

export type RootState =  ReturnType<typeof reducers>