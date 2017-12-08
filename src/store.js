import { applyMiddleware, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { createLogger } from 'redux-logger';
import thunk from 'redux-thunk';
import promise from 'redux-promise-middleware';

import reducer from './reducers';

const middleware = applyMiddleware( promise(), thunk, createLogger({
  predicate: (getState, action) => action.type !== 'DECREMENT_TIME'
}) ); //Dev
// const middleware = applyMiddleware( promise(), thunk ) //Prod

// export default createStore(
//   reducer,
//   middleware
// );

export default createStore(
  reducer,
  composeWithDevTools(middleware)
);
