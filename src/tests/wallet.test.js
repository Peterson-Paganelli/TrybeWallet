import React from "react";
import { screen, waitFor } from '@testing-library/react';
import { renderWithRedux, renderWithRouterAndRedux } from './helpers/renderWith';
import Wallet from "../pages/Wallet";
import WalletForm from "../components/WalletForm";
import Header from "../components/Header";
import userEvent from '@testing-library/user-event';
import mockData from './helpers/mockData';

describe('Testa o componente Wallet', () =>{
  it('Testa se é renderizado o componente wallet com todos os subComponentes', () =>{
    renderWithRedux(<Wallet />);
    const wallet = screen.getByTestId('wallet-page');
    expect(wallet).toBeInTheDocument();
  })

  it('testa se o botão de "adicionar despesa" está funcionando corretamente', async () => {
    renderWithRouterAndRedux(<Wallet />);

    fetch = jest.fn(async () => ({
      json: async () => mockData
    }));

    const priceInput = screen.getByTestId('value-input');
    expect(priceInput).toBeInTheDocument();
    const descriptionInput = screen.getByTestId('description-input');
    expect(descriptionInput).toBeInTheDocument();
    const methodInput = screen.getByTestId('method-input');
    expect(methodInput).toBeInTheDocument();
    const button = screen.getByRole('button', { name: 'Adicionar despesa' });
    expect(button).toBeInTheDocument();
    userEvent.type(priceInput, '100');
    expect(priceInput).toHaveValue('100');
    userEvent.type(descriptionInput, 'teste');
    expect(descriptionInput).toHaveValue('teste');
    userEvent.click(button);

    await waitFor(() => expect(fetch).toHaveBeenCalled());

    const value = screen.getByTestId('total-field');
    expect(value.innerHTML).toBe('475.31');
  })
})

describe('Testa o componente WalletForm', () => {
  it('Deve aparecer um input com o placeholder "despesa" e outro com "descrição"', () => {
    renderWithRedux(<WalletForm />);
    const priceInput = screen.getByTestId('value-input');
    const descriptionInput = screen.getByTestId('description-input');
    expect(priceInput).toBeInTheDocument();
    expect(descriptionInput).toBeInTheDocument();
  })

  it('Testa se há um select com o testId "currency-input" e outro com "method-input"', () => {
    renderWithRedux(<WalletForm />);
    const priceInput = screen.getByTestId('currency-input');
    expect(priceInput).toBeInTheDocument();
    const methodInput = screen.getByTestId('method-input');
    expect(methodInput).toBeInTheDocument();
  })

  it('Testa se há uma tag com o id "tag-input"', () => {
    renderWithRedux(<WalletForm />);
    const tagInput = screen.getByTestId('tag-input');
    expect(tagInput).toBeInTheDocument();
  })

  it('Testa a existência do botão "Adicionar despesa"', () => {
    renderWithRedux(<WalletForm />);
    const button = screen.getByText('Adicionar despesa');
    expect(button).toBeInTheDocument();
  })

  it('Se os campos de input estão presentes na tela', () => {
    renderWithRouterAndRedux(<WalletForm />);
    const priceInput = screen.getByTestId('value-input');
    expect(priceInput).toBeInTheDocument();
    const descriptionInput = screen.getByTestId('description-input');
    expect(descriptionInput).toBeInTheDocument();
    const methodInput = screen.getByTestId('method-input');
    expect(methodInput).toBeInTheDocument();
    const button = screen.getByRole('button', { name: 'Adicionar despesa' });
    expect(button).toBeInTheDocument();

    userEvent.type(priceInput, '100');
    expect(priceInput).toHaveValue('100');
    userEvent.type(descriptionInput, 'teste');
    expect(descriptionInput).toHaveValue('teste');
  })

})

describe('Testa o componente Header', () => {
  it('Testa se aparece o email no header', () => {
    renderWithRouterAndRedux(<Header />);
    const email = screen.getByTestId('email-field');
    expect(email).toBeInTheDocument();
  })

  it('Testa se aparece o campo total no header', () => {
    renderWithRouterAndRedux(<Header />);
    const total = screen.getByTestId('total-field');
    expect(total).toBeInTheDocument();
  })
})
