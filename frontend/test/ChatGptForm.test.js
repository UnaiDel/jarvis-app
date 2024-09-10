import { render, screen, fireEvent } from '@testing-library/react';
import ChatGptForm from '../components/ChatGptForm';

test('renders the ChatGptForm component', () => {
  render(<ChatGptForm />);
  const inputElement = screen.getByPlaceholderText(/Escribe un prompt.../i);
  expect(inputElement).toBeInTheDocument();
});

test('submits the form and clears the input', () => {
  render(<ChatGptForm />);
  const inputElement = screen.getByPlaceholderText(/Escribe un prompt.../i);
  fireEvent.change(inputElement, { target: { value: 'Create a Node.js app' } });

  const buttonElement = screen.getByText(/Enviar/i);
  fireEvent.click(buttonElement);

  expect(inputElement.value).toBe('');
});
