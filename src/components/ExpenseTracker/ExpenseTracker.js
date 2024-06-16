import React, { useState, useEffect } from 'react';
import './ExpenseTracker.css';

const ExpenseTracker = () => {
    const [amount, setAmount] = useState('');
    const [description, setDescription] = useState('');
    const [category, setCategory] = useState('');
    const [expenses, setExpenses] = useState([]);
    const [loading, setLoading] = useState(true);
    const [editMode, setEditMode] = useState(false);
    const [editExpenseId, setEditExpenseId] = useState(null);
    const apiKey = 'https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=AIzaSyDiAUHJpFYnvmGAFZidGl8jkts7fj57xiI';
    const databaseURL = 'https://expenseuser-acd49-default-rtdb.firebaseio.com/'
    const idToken = localStorage.getItem('firebaseAuthToken');

    useEffect(() => {
        fetchExpenses();
    }, []);

    const fetchExpenses = async () => {
        try {
            const response = await fetch(`${databaseURL}/expenses.json?auth=${idToken}`);
            const data = await response.json();
            if (data) {
                const loadedExpenses = Object.keys(data).map(key => ({
                    id: key,
                    ...data[key]
                }));
                setExpenses(loadedExpenses);
            }
            setLoading(false);
        } catch (error) {
            console.error('Error fetching expenses:', error);
            setLoading(false);
        }
    };

    const handleAddExpense = async (e) => {
        e.preventDefault();
        const newExpense = { amount, description, category };
        try {
            const response = await fetch(`${databaseURL}/expenses.json?auth=${idToken}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newExpense),
            });
            if (response.ok) {
                const responseData = await response.json();
                const addedExpense = { id: responseData.name, ...newExpense };
                setExpenses([...expenses, addedExpense]);
                setAmount('');
                setDescription('');
                setCategory('');
            } else {
                console.error('Failed to add expense');
            }
        } catch (error) {
            console.error('Error adding expense:', error);
        }
    };

    const handleDeleteExpense = async (expenseId) => {
        try {
            const response = await fetch(`${databaseURL}/expenses/${expenseId}.json?auth=${idToken}`, {
                method: 'DELETE',
            });
            if (response.ok) {
                setExpenses(expenses.filter(expense => expense.id !== expenseId));
                console.log('Expense successfully deleted');
            } else {
                console.error('Failed to delete expense');
            }
        } catch (error) {
            console.error('Error deleting expense:', error);
        }
    };

    const handleEditExpense = (expense) => {
        setEditMode(true);
        setEditExpenseId(expense.id);
        setAmount(expense.amount);
        setDescription(expense.description);
        setCategory(expense.category);
    };

    const handleUpdateExpense = async (e) => {
        e.preventDefault();
        const updatedExpense = { amount, description, category };
        try {
            const response = await fetch(`${databaseURL}/expenses/${editExpenseId}.json?auth=${idToken}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(updatedExpense),
            });
            if (response.ok) {
                setExpenses(expenses.map(expense => 
                    expense.id === editExpenseId ? { id: editExpenseId, ...updatedExpense } : expense
                ));
                setEditMode(false);
                setEditExpenseId(null);
                setAmount('');
                setDescription('');
                setCategory('');
                console.log('Expense successfully updated');
            } else {
                console.error('Failed to update expense');
            }
        } catch (error) {
            console.error('Error updating expense:', error);
        }
    };

    if (loading) {
        return <div>Loading...</div>;
    }

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
                    {expenses.map((expense) => (
                        <li key={expense.id}>
                            <span>{expense.amount} - {expense.description} - {expense.category}</span>
                            <button onClick={() => handleEditExpense(expense)}>Edit</button>
                            <button onClick={() => handleDeleteExpense(expense.id)}>Delete</button>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default ExpenseTracker;
