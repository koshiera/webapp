// Copyright 2016-2017 Gabriele Rigo

import styles from './actions.css';

import React, { Component, PropTypes } from 'react';

import { RaisedButton } from 'material-ui';
import ActionAddShoppingCart from 'material-ui/svg-icons/action/add-shopping-cart';
import AvReplay from 'material-ui/svg-icons/av/replay';
import ContentSend from 'material-ui/svg-icons/content/send';
//import ActionAndroid from 'material-ui/svg-icons/action/android';
import Add from 'material-ui/svg-icons/content/add';

export default class ActionsDragoFactory extends Component {
  static propTypes = {
    onAction: PropTypes.func.isRequired,
    gabBalance: PropTypes.object.isRequired
  }

  render () {
    const { gabBalance } = this.props;

    return (
        <RaisedButton
          className={ styles.button }
          icon={ <Add /> }
          label='new drago'
          primary
          onTouchTap={ this.onDeployDrago } />
    );
  }

/*
<div className={ styles.actions }>
</div>

 onBuyIn = () => {
    this.props.onAction('BuyIn');
  }

  onTransfer = () => {
    const { gabBalance } = this.props;

    if (gabBalance && gabBalance.gt(0)) {
      this.props.onAction('Transfer');
    }
  }

  onRefund = () => {
    this.props.onAction('Refund');
  }
*/
  onDeployDrago = () => {
    this.props.onAction('DeployDrago');
  }
}