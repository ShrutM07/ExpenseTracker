import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import ForgotPassword from './ForgotPassword';

const component = (
  <BrowserRouter>
    <ForgotPassword />
  </BrowserRouter>
);

describe('Testing ForgotPassword Component', () => {
  test('Should render "Forgot Password"', () => {
    render(component);

    expect(
      screen.getByText('Forgot Password', { exact: true })
    ).toBeInTheDocument();
  });

  test('Should render email input field', () => {
    render(component);

    expect(screen.getByPlaceholderText('Enter your registered email')).toBeInTheDocument();
  });

  test('Should render "Send Link" button', () => {
    render(component);

    expect(screen.getByRole('button', { name: 'Send Link' })).toBeInTheDocument();
  });

  test('Should show loading state on button click', () => {
    render(component);

    const button = screen.getByRole('button', { name: 'Send Link' });
    fireEvent.click(button);

    expect(screen.getByText('Sending...')).toBeInTheDocument();
  });

  test('Should disable button and input during loading state', () => {
    render(component);

    const emailInput = screen.getByPlaceholderText('Enter your registered email');
    const button = screen.getByRole('button', { name: 'Send Link' });

    fireEvent.click(button);

    expect(button).toBeDisabled();
    expect(emailInput).toBeDisabled();
  });
});
