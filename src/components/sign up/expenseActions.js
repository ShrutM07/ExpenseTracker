import { ADD_EXPENSE, DELETE_EXPENSE, UPDATE_EXPENSE, SET_EXPENSES } from "./actions";

// Action to set initial expenses
export const setExpenses = (expenses) => ({
    type: SET_EXPENSES,
    payload: expenses,
});

export const addExpense = (expense) => async (dispatch, getState) => {
    const databaseURL = 'https://expenseuser-acd49-default-rtdb.firebaseio.com/';
    const idToken = localStorage.getItem('firebaseAuthToken');

    try {
        const response = await fetch(`${databaseURL}/expenses.json?auth=${idToken}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(expense),
        });

        if (response.ok) {
            const responseData = await response.json();
            const addedExpense = { id: responseData.name, ...expense };
            dispatch({
                type: ADD_EXPENSE,
                payload: addedExpense,
            });
            console.log('Expense successfully added');
        } else {
            console.error('Failed to add expense');
        }
    } catch (error) {
        console.error('Error adding expense:', error);
    }
};

export const deleteExpense = (expenseId) => async (dispatch, getState) => {
    const databaseURL = 'https://expenseuser-acd49-default-rtdb.firebaseio.com/';
    const idToken = localStorage.getItem('firebaseAuthToken');

    try {
        const response = await fetch(`${databaseURL}/expenses/${expenseId}.json?auth=${idToken}`, {
            method: 'DELETE',
        });

        if (response.ok) {
            dispatch({
                type: DELETE_EXPENSE,
                payload: expenseId,
            });
            console.log('Expense successfully deleted');
        } else {
            console.error('Failed to delete expense');
        }
    } catch (error) {
        console.error('Error deleting expense:', error);
    }
};

export const updateExpense = (expenseId, updatedExpense) => async (dispatch, getState) => {
    const databaseURL = 'https://expenseuser-acd49-default-rtdb.firebaseio.com/';
    const idToken = localStorage.getItem('firebaseAuthToken');

    try {
        const response = await fetch(`${databaseURL}/expenses/${expenseId}.json?auth=${idToken}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(updatedExpense),
        });

        if (response.ok) {
            dispatch({
                type: UPDATE_EXPENSE,
                payload: { id: expenseId, ...updatedExpense },
            });
            console.log('Expense successfully updated');
        } else {
            console.error('Failed to update expense');
        }
    } catch (error) {
        console.error('Error updating expense:', error);
    }
};
