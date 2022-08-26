import React, { Component } from 'react';
import { connect } from 'react-redux';
import propTypes from 'prop-types';
import '../style/walletForm.css';
import { getCurrencies, setExpense } from '../redux/actions';

class WalletForm extends Component {
  constructor() {
    super();

    this.state = {
      value: '',
      description: '',
      currency: 'USD',
      method: 'Dinheiro',
      tag: 'Alimentação',
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  componentDidMount() {
    const { updateCurrencies } = this.props;
    updateCurrencies();
  }

  handleChange(event) {
    const { target } = event;
    this.setState({ [target.name]: target.type === 'checkbox'
      ? target.checked : target.value,
    });
  }

  handleClick() {
    const { updateExpenses } = this.props;

    const {
      value,
      description,
      currency,
      method,
      tag,
    } = this.state;

    updateExpenses({
      value,
      description,
      currency,
      method,
      tag,
    });

    this.setState({ value: '', description: '' });
  }

  render() {
    const {
      value,
      description,
      currency,
      method,
      tag,
    } = this.state;

    const { currencies } = this.props;

    return (
      <div
        className="wallet_form"
      >
        <input
          className="input_wallet"
          placeholder="valor da despesa"
          data-testid="value-input"
          name="value"
          value={ value }
          onChange={ this.handleChange }
        />
        <input
          className="input_wallet"
          placeholder="descrição"
          data-testid="description-input"
          name="description"
          value={ description }
          onChange={ this.handleChange }
        />
        <select
          className="input_wallet"
          aria-label="label"
          data-testid="currency-input"
          name="currency"
          value={ currency }
          onChange={ this.handleChange }
        >
          { currencies.map((currencyName) => (
            <option
              key={ currencyName }
            >
              {currencyName}
            </option>
          )) }
        </select>

        <select
          className="input_wallet"
          aria-label="metodo"
          data-testid="method-input"
          name="method"
          value={ method }
          onChange={ this.handleChange }
        >
          <option>Dinheiro</option>
          <option>Cartão de crédito</option>
          <option>Cartão de débito</option>
        </select>

        <select
          className="input_wallet"
          aria-label="categoria"
          data-testid="tag-input"
          name="tag"
          value={ tag }
          onChange={ this.handleChange }
        >
          <option>Alimentação</option>
          <option>Lazer</option>
          <option>Trabalho</option>
          <option>Transporte</option>
          <option>Saúde</option>
        </select>

        <button
          className="wallet_btn"
          type="button"
          onClick={ this.handleClick }
        >
          Adicionar despesa

        </button>
      </div>
    );
  }
}

WalletForm.propTypes = {
  updateCurrencies: propTypes.func.isRequired,
  updateExpenses: propTypes.func.isRequired,
  currencies: propTypes.arrayOf().isRequired,
};

const mapStateToProps = (state) => ({
  currencies: state.wallet.currencies,
});

const mapDispatchToProps = (dispatch) => ({
  updateCurrencies: () => dispatch(getCurrencies()),
  updateExpenses: (expense) => dispatch(setExpense(expense)),
});

export default connect(mapStateToProps, mapDispatchToProps)(WalletForm);
