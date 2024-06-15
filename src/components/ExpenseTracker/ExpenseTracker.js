import React, { useState } from 'react';
import './ExpenseTracker.css';

const ExpenseTracker = () => {
    const [amount, setAmount] = useState('');
    const [description, setDescription] = useState('');
    const [category, setCategory] = useState('');
    const [expenses, setExpenses] = useState([]);

    const handleAddExpense = (e) => {
        e.preventDefault();
        const newExpense = { amount, description, category };
        setExpenses([...expenses, newExpense]);
        setAmount('');
        setDescription('');
        setCategory('');
    };

    return (
        <div className="expense-tracker-container">
            <form className="expense-form" onSubmit={handleAddExpense}>
                <h2>Add Expense</h2>
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
                <button type="submit">Add Expense</button>
            </form>
            <div className="expenses-list">
                <h2>Expenses</h2>
                <ul>
                    {expenses.map((expense, index) => (
                        <li key={index}>
                            <span>{expense.amount} - {expense.description} - {expense.category}</span>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default ExpenseTracker;
