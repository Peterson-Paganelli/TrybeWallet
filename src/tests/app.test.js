import React from "react";
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event'
import { renderWithRedux, renderWithRouterAndRedux } from './helpers/renderWith';
import App from '../App';
// import userEvent from '@testing-library/user-event'

describe('Testa o App', () => {
  it('testa se o componente header está dentro de App', () => {
    renderWithRouterAndRedux(<App />);
    const emailInput = screen.getByTestId('email-input');
    expect(emailInput).toBeInTheDocument();
  })
});