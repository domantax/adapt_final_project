import React, { Component } from 'react';
import Select from 'react-select';
import {
  otherCryptoArray,
  popularCryptoArray,
} from '../../constants/Dashboard1Constants/data';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';

import { getData, setCurrency } from '../../actions/pricePageActions';

class Dashboard1Form extends Component {
  state = {
    timeInterval: '3hour',
    cryptoCurrency: 'BTC',
    currency: 'EUR',
  };

  onSubmit = e => {
    e.preventDefault();
    const { timeInterval, cryptoCurrency, currency } = this.state;
    const aggregate = timeInterval.match(/\d+/g)[0];

    const interval = timeInterval.match(/[a-zA-Z]+/g)[0];
    console.log(interval);
    this.props.actions.getData(interval, cryptoCurrency, currency, aggregate);
    this.props.actions.setCurrency(this.state.currency);
  };

  onChange = (e, name) => {
    this.setState({
      [name]: e.target.value,
    });
  };

  render() {
    return (
      <form onSubmit={ this.onSubmit }>
        <label>
          Time interval:
          <select
            value={ this.state.timeInterval }
            onChange={ e => this.onChange(e, 'timeInterval') }
          >
            <option value="10minute">10minutes</option>
            <option value="3hour">3hours</option>
            <option value="1day">1day</option>
          </select>
        </label>
        <label>
          CryptoCurrency:
          <select
            value={ this.state.cryptoCurrency }
            onChange={ e => this.onChange(e, 'cryptoCurrency') }
          >
            <optgroup label="Popular coins">
              { popularCryptoArray.map((name, key) => (
                <option key={ key } value={ name }>
                  { name }
                </option>
              )) }
            </optgroup>
            <optgroup label="Other coins">
              { otherCryptoArray.map((name, key) => (
                <option key={ key } value={ name }>
                  { name }
                </option>
              )) }
            </optgroup>
          </select>
        </label>
        <label>
          Currency:
          <select
            value={ this.state.currency }
            onChange={ e => this.onChange(e, 'currency') }
          >
            <option value="EUR">EUR</option>
            <option value="USD">USD</option>
            <option value="GBP">GBP</option>
          </select>
        </label>
        <button type="submit">See price</button>
      </form>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(
    {
      getData,
      setCurrency,
    },
    dispatch,
  ),
});

Dashboard1Form.propTypes = {
  actions: PropTypes.object.isRequired,
};

export default connect(
  null,
  mapDispatchToProps,
)(Dashboard1Form);
