import React from "react";
import Table from "../components/Table";
import Wallet from "../pages/Wallet";
import { screen, waitFor } from '@testing-library/react';
import { renderWithRouterAndRedux } from './helpers/renderWith';
import userEvent from '@testing-library/user-event';
import mockData from './helpers/mockData';


function delExpense() {
  console.log('test passing')
}

describe('Testa o componente Table', () => {
  it('Testa se aparece a tabela ', () => {
    renderWithRouterAndRedux(<Table />)
    const table = screen.getByTestId('table')
    expect(table).toBeInTheDocument();
  })

  it('Testa se ao clicar no botão de "Adicionar despesa" aparece a despesa na Table', async () => {
    renderWithRouterAndRedux(<Wallet />);

    fetch = jest.fn(async () => ({
      json: async () => mockData
    }));

    const priceInput = screen.getByTestId('value-input');
    const descriptionInput = screen.getByTestId('description-input');
    // const methodInput = screen.getByTestId('method-input');
    const button = screen.getByRole('button', { name: 'Adicionar despesa' });

    userEvent.type(priceInput, '100');
    userEvent.type(descriptionInput, 'teste');
    userEvent.click(button);
    await waitFor(() => expect(fetch).toHaveBeenCalled());

    const value = screen.getByTestId('value-for-testing');
    const delBtn = screen.getByText('Excluir');
    expect(value.innerHTML).toBe('100.00');
    userEvent.click(delBtn);
    delExpense = jest.fn();
    delExpense()
    expect(delExpense).toHaveBeenCalled()
  })
})
  