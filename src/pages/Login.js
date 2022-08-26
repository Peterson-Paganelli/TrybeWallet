import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { loginAction } from '../redux/actions';
import '../style/login.css';

class Login extends React.Component {
  constructor() {
    super();

    this.state = {
      email: '',
      password: '',
      invalid: true,
    };
  }

  handleChange = (event) => {
    const { target } = event;
    this.setState({ [target.name]: target.value,
    }, () => {
      this.validateInputs();
    });
  };

  validEmail = (email) => {
    const userEmail = /\S+@\S+\.\S+/;
    return userEmail.test(email);
  };

  validateInputs = () => {
    const { email, password } = this.state;
    const min = 6;
    const checkValidation = this.validEmail(email);
    if (password.length >= min && checkValidation) {
      this.setState({
        invalid: false,
      });
    } else {
      this.setState({
        invalid: true,
      });
    }
  }

  onSubmit = () => {
    const { email } = this.state;
    const { userLogin, history } = this.props;

    userLogin(email);
    history.push('/carteira');
  }

  render() {
    const { email, password, invalid } = this.state;
    return (
      <div
        className="login_form_div"
      >
        <div
          className="trybeWallet_title"
        >
          <h1>TrybeWallet</h1>
        </div>
        <form
          className="login_form"
          onSubmit={ this.onSubmit }
        >
          <div
            className="inputs_form_div"
          >
            <label
              htmlFor="email"
            >
              <input
                className="input"
                data-testid="email-input"
                name="email"
                type="email"
                value={ email }
                onChange={ this.handleChange }
                placeholder="E-mail"
              />
            </label>
            <label htmlFor="password">
              <input
                className="input"
                data-testid="password-input"
                name="password"
                type="password"
                value={ password }
                onChange={ this.handleChange }
                placeholder="Senha"
              />
            </label>
          </div>

          <button
            className="login_btn"
            disabled={ invalid }
            type="submit"
          >
            Entrar
          </button>
        </form>
      </div>

    );
  }
}

Login.propTypes = {
  userLogin: PropTypes.func.isRequired,
  history: PropTypes.string.isRequired,
};
const mapDispatchToProps = (dispatch) => ({
  userLogin: (state) => dispatch(loginAction(state)),
});

export default connect(null, mapDispatchToProps)(Login);
