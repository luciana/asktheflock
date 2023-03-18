import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { createMemoryHistory } from 'history';
import { Router } from 'react-router-dom';
import { AppContext } from './Contexts';
import { TYPES } from './Constants';
import App from './App';

const renderWithContextAndRouter = (ui, { route = '/', history = createMemoryHistory({ initialEntries: [route] }), contextValue } = {}) => {
  const defaultContextValue = {
    state: {
      lang: 'en',
    },
    dispatch: jest.fn(),
  };

  const value = contextValue || defaultContextValue;

  return {
    ...render(<AppContext.Provider value={value}><Router history={history}>{ui}</Router></AppContext.Provider>),
    history,
  };
};


describe('App', () => {
  it('renders the Home component when navigating to the HOME route', async () => {
    const contextValue = {
      state: {
        lang: 'en',
      },
      dispatch: jest.fn(),
    };
    const { findByText } = renderWithContextAndRouter(<App />, { contextValue });

    // Replace 'Home' with an element that uniquely identifies the Home component.
    const homeElement = await screen.findByText('Home');
    expect(homeElement).toBeInTheDocument();
  });

  // Add more tests for different routes and components
});
