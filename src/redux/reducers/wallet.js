import { SET_CURRENCIES, UPDATE_EXPENSES,
  UPDATE_TOTAL, DELETE_EXPENSE } from '../actions';

const INITIAL_STATE = {
  currencies: [],
  expenses: [],
  editor: false,
  idToEdit: 0,
  total: '0',
};

export default function wallet(state = INITIAL_STATE, action) {
  const removedElement = state.expenses.filter((expense) => expense.id
  === Number(action.payload));
  switch (action.type) {
  case SET_CURRENCIES:
    return { ...state, currencies: action.payload };
  case UPDATE_EXPENSES:
    return {
      ...state,
      expenses: [
        ...state.expenses,
        { id: state.expenses.length, ...action.payload },
      ],
    };
  case UPDATE_TOTAL:
    return {
      ...state,
      total: (Number(state.total) + action.payload).toFixed(2),
    };
  case DELETE_EXPENSE:
    return {
      ...state,
      expenses: state.expenses.filter((expense) => expense.id !== Number(action.payload)),
      total: (Number(state.total) - ((+removedElement[0].value)
      * (+removedElement[0].exchangeRates[removedElement[0].currency].ask))
        .toFixed(2)).toFixed(2),
    };
  default:
    return state;
  }
}
