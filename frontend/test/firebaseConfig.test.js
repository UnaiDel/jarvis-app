import { initializeApp } from 'firebase/app';
import firebaseConfig from './firebaseConfig';

describe('Firebase Initialization', () => {
  it('should initialize Firebase without errors', () => {
    const app = initializeApp(firebaseConfig);
    expect(app).toBeDefined();
  });
});
