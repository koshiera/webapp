// Copyright 2016-2017 Rigo Investment Sagl.

import { Col, Row } from 'react-flexbox-grid'
import { MenuItem, SelectField } from 'material-ui'
import PropTypes from 'prop-types'
import React, { PureComponent } from 'react'
import SelectFundItem from './selectFundItem.js'
import styles from './fundSelector.module.css'

export default class FundSelector extends PureComponent {
  static propTypes = {
    funds: PropTypes.array.isRequired,
    onSelectFund: PropTypes.func.isRequired
  }

  state = {
    value: 0
  }

  onSelectFund = (event, key) => {
    const { funds } = this.props
    this.setState({
      value: key
    })
    this.props.onSelectFund(funds[key.toString()])
  }

  renderFunds = () => {
    const { funds } = this.props
    return funds.map((fund, key) => {
      return (
        <MenuItem
          key={key}
          value={key}
          primaryText={<SelectFundItem fund={fund} />}
        />
      )
    })
  }

  render() {
    console.log(this.props)
    return (
      <Row>
        <Col xs={12}>
          <div className={styles.sectionTitle}>Drago</div>
        </Col>
        <Col xs={12}>
          <SelectField
            fullWidth
            value={this.state.value}
            onChange={this.onSelectFund}
            // style={{height: 90}}
          >
            {this.renderFunds()}
          </SelectField>
        </Col>
      </Row>
    )
  }
}
