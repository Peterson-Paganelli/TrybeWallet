import React, { Component } from 'react';
import { connect } from 'react-redux';
import propTypes from 'prop-types';
import '../style/header.css';

class Header extends Component {
  render() {
    const { email = 'teste@teste.com', total } = this.props;
    return (
      <div className="header">
        <div
          className="email_field"
        >
          <p data-testid="email-field">{email}</p>
        </div>
        <div
          className="total_field"
        >
          <p data-testid="total-field">{`R$${total}`}</p>
          <p data-testid="header-currency-field">BRL</p>
        </div>
      </div>
    );
  }
}

Header.propTypes = {
  email: propTypes.string.isRequired,
  total: propTypes.string.isRequired,
};

const mapStateToProps = (state) => ({
  email: state.user.email,
  total: state.wallet.total,
});

export default connect(mapStateToProps)(Header);
