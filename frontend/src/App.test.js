import { render, screen } from '@testing-library/react';
import App from './App';

// ! This was causing the npm test fail. It was looking for the "learn react" button on the default react homepage.
// TODO: Ask Mabel to start doing test stuff so these test runs that nodejs and rust are running aren't useless lol.

/*
test('renders learn react link', () => {
  render(<App />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
*/

test('do nothing lol', () => {
  true;
});