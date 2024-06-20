import { render, screen } from '@testing-library/react';
import Signup from '../sign up/Signup.js';

test('render Signup link', () => {
    render(<Signup />);
    const linkElement = screen.getByText(/signUp/i);
    expect(linkElement).toBeInTheDocument();
});

