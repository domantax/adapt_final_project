import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import { reducer as formReducer } from 'redux-form';
import pricePageReducer from './Dashboard1Reducers/pricePageReducer';

export default combineReducers({
  pricePage: pricePageReducer,
  routing: routerReducer,
  form: formReducer,
});
