import React from "react";
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event'
import { renderWithRedux, renderWithRouterAndRedux } from './helpers/renderWith';
import Login from "../pages/Login";
import App from '../App';

describe('testa a página de login', () => {
  it('verifica o input de E-mail na tela', () => {
    renderWithRedux(<Login />);
    const emailInput = screen.getByTestId('email-input');
    expect(emailInput).toBeInTheDocument();
  })

  it('Verifica o input de senha na tela', () => {
    renderWithRedux(<Login />);
    const passwordInput = screen.getByTestId('password-input');
    expect(passwordInput).toBeInTheDocument();
  })

  it('Verifica o botão de login', () => {
    renderWithRedux(<Login />);
    const button = screen.getByText('Entrar');
    expect(button).toBeInTheDocument();
  })

  it('o botão só habilita com um e-mail válido e senha de seis dígitos ou mais',
  () => {
      renderWithRouterAndRedux(<Login />);
      const emailTestId = screen.getByTestId('email-input')
      const button = screen.getByText('Entrar');
      const passwordTestId = screen.getByTestId('password-input');

      userEvent.type(emailTestId, 'email@teste.com');
      userEvent.type(passwordTestId, '123456');
      expect(button).toBeEnabled();
    });

  it('Testa se o click no botão muda de página', () => {
    const { history } = renderWithRouterAndRedux(<App />);
    const emailTestId = screen.getByTestId('email-input')
    const button = screen.getByRole('button', { name: /entrar/i });
    const passwordTestId = screen.getByTestId('password-input');

    userEvent.type(emailTestId, 'email@teste.com');
    userEvent.type(passwordTestId, '123456');
    userEvent.click(button);
    expect(button).not.toBeInTheDocument();
    // expect(history.location.pathname).toBe('/carteira');
  })
});