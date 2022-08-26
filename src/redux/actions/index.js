import fetchCurrenciesAPI from '../../services/currenciesAPI';

export const USER_CALL = 'USER_CALL';
export const loginAction = (value) => ({ type: USER_CALL, payload: value });

export const SET_CURRENCIES = 'SET_CURRENCIES';
export const setCurrencies = (payload) => ({ type: SET_CURRENCIES, payload });

export const getCurrencies = () => async (dispatch) => {
  const data = await fetchCurrenciesAPI();

  const currencies = Object.keys(data)
    .filter((currencyName) => currencyName !== 'USDT');

  dispatch(setCurrencies(currencies));
};

export const UPDATE_EXPENSES = 'UPDATE_EXPENSES';
export const updateExpenses = (payload) => ({ type: UPDATE_EXPENSES, payload });

export const UPDATE_TOTAL = 'UPDATE_TOTAL';
export const updateTotal = (payload) => ({ type: UPDATE_TOTAL, payload });

export const DELETE_EXPENSE = 'DELETE_EXPENSE';
export const deleteExpense = (payload) => ({ type: DELETE_EXPENSE, payload });

export const setExpense = (expense) => async (dispatch) => {
  const currencies = await fetchCurrenciesAPI();
  dispatch(updateExpenses({ ...expense, exchangeRates: currencies }));

  const expenseValue = Number(expense.value);
  const currency = expense.currency !== '' ? expense.currency : 'USD';
  const { ask } = Object.values(currencies)
    .find(({ code }) => code === currency);

  dispatch(updateTotal(expenseValue * Number(ask)));
};
