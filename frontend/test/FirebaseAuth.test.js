import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import FirebaseAuth from './FirebaseAuth';
import firebase from 'firebase/app';
import 'firebase/auth';

// Mock de las funciones de Firebase
jest.mock('firebase/app', () => ({
  initializeApp: jest.fn(),
  auth: jest.fn(() => ({
    signInWithPopup: jest.fn(),
    signOut: jest.fn(),
    onAuthStateChanged: jest.fn(),
  })),
}));

describe('FirebaseAuth Component', () => {
  it('renders login and logout buttons', () => {
    const { getByText } = render(<FirebaseAuth />);
    expect(getByText(/Iniciar sesión con Google/i)).toBeInTheDocument();
    expect(getByText(/Cerrar sesión/i)).toBeInTheDocument();
  });

  it('calls Firebase signInWithPopup on login button click', () => {
    const { getByText } = render(<FirebaseAuth />);
    fireEvent.click(getByText(/Iniciar sesión con Google/i));
    expect(firebase.auth().signInWithPopup).toHaveBeenCalled();
  });

  it('calls Firebase signOut on logout button click', () => {
    const { getByText } = render(<FirebaseAuth />);
    fireEvent.click(getByText(/Cerrar sesión/i));
    expect(firebase.auth().signOut).toHaveBeenCalled();
  });
});
