import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import './ExpenseTracker.css';
import { addExpense, deleteExpense, updateExpense, setExpenses } from '../sign up/expenseActions';
import { activatePremium } from '../sign up/premimumActions';

const ExpenseTracker = () => {
    const [amount, setAmount] = useState('');
    const [description, setDescription] = useState('');
    const [category, setCategory] = useState('');
    const [editMode, setEditMode] = useState(false);
    const [editExpenseId, setEditExpenseId] = useState(null);
    const { expenses: reduxExpenses } = useSelector(state => state.expenses);
    const { isPremiumActivated } = useSelector(state => state.premium);
    const dispatch = useDispatch();

    useEffect(() => {
        fetchExpenses();
    }, []);

    const fetchExpenses = async () => {
        const databaseURL = 'YOUR_FIREBASE_DATABASE_URL';
        const idToken = localStorage.getItem('firebaseAuthToken');

        try {
            const response = await fetch(`${databaseURL}/expenses.json?auth=${idToken}`);
            const data = await response.json();
            if (data) {
                const loadedExpenses = Object.keys(data).map(key => ({
                    id: key,
                    ...data[key]
                }));
                dispatch(setExpenses(loadedExpenses));
            }
        } catch (error) {
            console.error('Error fetching expenses:', error);
        }
    };

    const handleAddExpense = (e) => {
        e.preventDefault();
        const newExpense = { amount, description, category };
        dispatch(addExpense(newExpense));
        setAmount('');
        setDescription('');
        setCategory('');
    };

    const handleDeleteExpense = (expenseId) => {
        dispatch(deleteExpense(expenseId));
    };

    const handleEditExpense = (expense) => {
        setEditMode(true);
        setEditExpenseId(expense.id);
        setAmount(expense.amount);
        setDescription(expense.description);
        setCategory(expense.category);
    };

    const handleUpdateExpense = (e) => {
        e.preventDefault();
        const updatedExpense = { amount, description, category };
        dispatch(updateExpense(editExpenseId, updatedExpense));
        setEditMode(false);
        setEditExpenseId(null);
        setAmount('');
        setDescription('');
        setCategory('');
    };

    const totalExpenses = reduxExpenses.reduce((total, expense) => total + parseFloat(expense.amount), 0);

    return (
        <div className="expense-tracker-container">
            <form className="expense-form" onSubmit={editMode ? handleUpdateExpense : handleAddExpense}>
                <h2>{editMode ? 'Edit Expense' : 'Add Expense'}</h2>
                <div className="form-group">
                    <label>Amount:</label>
                    <input 
                        type="number" 
                        value={amount} 
                        onChange={(e) => setAmount(e.target.value)} 
                        required 
                    />
                </div>
                <div className="form-group">
                    <label>Description:</label>
                    <input 
                        type="text" 
                        value={description} 
                        onChange={(e) => setDescription(e.target.value)} 
                        required 
                    />
                </div>
                <div className="form-group">
                    <label>Category:</label>
                    <select 
                        value={category} 
                        onChange={(e) => setCategory(e.target.value)} 
                        required
                    >
                        <option value="">Select a category</option>
                        <option value="Food">Food</option>
                        <option value="Petrol">Petrol</option>
                        <option value="Salary">Salary</option>
                        <option value="Entertainment">Entertainment</option>
                        <option value="Other">Other</option>
                    </select>
                </div>
                <button type="submit">{editMode ? 'Update Expense' : 'Add Expense'}</button>
            </form>
            <div className="expenses-list">
                <h2>Expenses</h2>
                <ul>
                    {reduxExpenses.map((expense) => (
                        <li key={expense.id}>
                            <span>{expense.amount} - {expense.description} - {expense.category}</span>
                            <button onClick={() => handleEditExpense(expense)}>Edit</button>
                            <button onClick={() => handleDeleteExpense(expense.id)}>Delete</button>
                        </li>
                    ))}
                </ul>
            </div>
            {totalExpenses > 10000 && !isPremiumActivated && (
                <div className="premium-button">
                    <button onClick={() => dispatch(activatePremium())}>Activate Premium</button>
                </div>
            )}
        </div>
    );
};

export default ExpenseTracker;
