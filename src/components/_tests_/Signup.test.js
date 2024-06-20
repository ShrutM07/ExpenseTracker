import React from 'react';
import { render, screen, fireEvent, act } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Signup from '../sign up/Signup';

const component = (
  <BrowserRouter>
    <Signup />
  </BrowserRouter>
);

describe('Signup Component Tests', () => {
  test('Should render Signup component', () => {
    act(() => {
      render(component);
    });
    

    expect(screen.getByText('Signup')).toBeInTheDocument();
  });

  test('Should render email input field', () => {
    act(() => {
      render(component);
    });

    expect(screen.getByLabelText('Email:')).toBeInTheDocument();
  });

  test('Should render password input field', () => {
    act(() => {
      render(component);
    });

    expect(screen.getByLabelText('Password:')).toBeInTheDocument();
  });

  test('Should render confirm password input field', () => {
    act(() => {
      render(component);
    });

    expect(screen.getByLabelText('Confirm Password:')).toBeInTheDocument();
  });

  test('Should render submit button', () => {
    act(() => {
      render(component);
    });

    expect(screen.getByRole('button', { name: 'Submit' })).toBeInTheDocument();
  });

  test('Should render login link', () => {
    act(() => {
      render(component);
    });

    expect(screen.getByText(/Already have an account\?/i)).toBeInTheDocument();
  });
});
