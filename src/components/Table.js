import React, { Component } from 'react';
import '../style/table.css';
import { connect } from 'react-redux';
import propTypes from 'prop-types';
import { deleteExpense } from '../redux/actions';

class Table extends Component {
  deleteExpense(event) {
    const { id } = event.target;
    const { deleteExpenseDispatch } = this.props;
    deleteExpenseDispatch(id);
  }

  render() {
    const { expenses } = this.props;
    return (
      <table
        data-testid="table"
      >
        <thead>
          <tr>
            <th>Descrição</th>
            <th>Tag</th>
            <th>Método de pagamento</th>
            <th>Valor</th>
            <th>Moeda</th>
            <th>Câmbio utilizado</th>
            <th>Valor convertido</th>
            <th>Moeda de conversão</th>
            <th>Excluir</th>
          </tr>
        </thead>
        <tbody>
          {expenses.length === 0 ? ''
            : expenses.map((expense) => (
              <tr
                key={ expense.id }
              >
                <td>{expense.description}</td>
                <td>{expense.tag}</td>
                <td>{expense.method}</td>
                <td
                  data-testid="value-for-testing"
                >
                  {(+expense.value).toFixed(2)}

                </td>
                <td>{expense.exchangeRates[expense.currency].name}</td>
                <td>{(+expense.exchangeRates[expense.currency].ask).toFixed(2) }</td>
                <td>
                  { ((+expense.value)
                  * (+expense.exchangeRates[expense.currency].ask))
                    .toFixed(2) }
                </td>
                <td>Real</td>
                <td>
                  <button
                    type="button"
                    className="removeBtn"
                    data-testid="delete-btn"
                    id={ expense.id }
                    onClick={ (event) => this.deleteExpense(event) }
                  >
                    Remover
                  </button>
                </td>
              </tr>
            ))}
        </tbody>

      </table>

    );
  }
}

Table.propTypes = {
  expenses: propTypes.arrayOf().isRequired,
  deleteExpenseDispatch: propTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  currencies: state.wallet.currencies,
  expenses: state.wallet.expenses,
});

const mapDispatchToProps = (dispatch) => ({
  deleteExpenseDispatch: (expense) => dispatch(deleteExpense(expense)),
});
export default connect(mapStateToProps, mapDispatchToProps)(Table);
