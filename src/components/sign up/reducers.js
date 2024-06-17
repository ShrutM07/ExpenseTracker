import { combineReducers } from 'redux';
import expensesReducer from './expensesReducer';
import premiumReducer from './premiumReducer';
import authReducer from './authReducer'; // Ensure the path is correct

const rootReducer = combineReducers({
    expenses: expensesReducer,
    premium: premiumReducer,
    auth: authReducer,
});

export default rootReducer;
