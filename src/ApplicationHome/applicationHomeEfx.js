// Copyright 2016-2017 Rigo Investment Sagl.

import { Actions } from '../_redux/actions'
// import { Card, CardActions, CardText, CardTitle } from 'material-ui/Card'
import { Col, Row } from 'react-flexbox-grid'
import { Link, withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import Add from 'material-ui/svg-icons/content/add'
import Chat from 'material-ui/svg-icons/communication/chat'
import ElementBottomStatusBar from '../Elements/elementBottomStatusBar'
import ElementListFunds from '../Elements/elementListFunds'
import ElementListWrapper from '../Elements/elementListWrapper'
import FilterPoolsField from '../_atomic/atoms/filterPoolsField'
import FlatButton from 'material-ui/FlatButton'
import LinearProgress from 'material-ui/LinearProgress'
import Paper from 'material-ui/Paper'
import PropTypes from 'prop-types'
// import RaisedButton from 'material-ui/RaisedButton'
import React, { PureComponent } from 'react'
import SearchIcon from '../_atomic/atoms/searchIcon'
import WalletSetup from '../_atomic/organisms/walletSetup'
import _ from 'lodash'
import styles from './applicationHome.module.css'

function mapStateToProps(state) {
  return {
    transactionsDrago: state.transactionsDrago,
    endpoint: state.endpoint
  }
}

class ApplicationHomeEfx extends PureComponent {
  // We check the type of the context variable that we receive by the parent
  static contextTypes = {
    api: PropTypes.object.isRequired
  }

  static propTypes = {
    endpoint: PropTypes.object.isRequired,
    location: PropTypes.object.isRequired,
    transactionsDrago: PropTypes.object.isRequired,
    dispatch: PropTypes.func.isRequired,
    onClickTour: PropTypes.func
  }

  static defaultProps = {
    onClickTour: () => {}
  }

  state = {
    filter: '',
    prevLastFetchRange: {
      chunk: {
        key: 0,
        range: 0
      },
      startBlock: 0,
      lastBlock: 0
    },
    lastFetchRange: {
      chunk: {
        key: 0,
        range: 0
      },
      startBlock: 0,
      lastBlock: 0
    },
    listLoadingProgress: 0,
    showCommunityButtons: true
  }

  static getDerivedStateFromProps(props, state) {
    // Any time the current user changes,
    // Reset any parts of state that are tied to that user.
    // In this simple example, that's just the email.
    const { lastFetchRange } = props.transactionsDrago.dragosList
    if (!_.isEqual(lastFetchRange, state.prevLastFetchRange)) {
      const { chunk, lastBlock, startBlock } = lastFetchRange
      if (lastBlock === 0) return null
      if (lastBlock === startBlock)
        return {
          prevLastFetchRange: lastFetchRange,
          listLoadingProgress: 100
        }
      let newProgress =
        lastBlock !== state.prevLastFetchRange.lastBlock
          ? ((chunk.toBlock - chunk.fromBlock) / (lastBlock - startBlock)) * 100
          : state.listLoadingProgress +
            ((chunk.toBlock - chunk.fromBlock) / (lastBlock - startBlock)) * 100
      return {
        prevLastFetchRange: lastFetchRange,
        listLoadingProgress: newProgress
      }
    }
    return null
  }

  componentDidMount() {
    window.addEventListener('scroll', this.handleScroll)
    let options = {
      topics: [null, null, null, null],
      fromBlock: 0,
      toBlock: 'latest',
      poolType: 'drago'
    }
    this.props.dispatch(Actions.drago.getPoolsSearchList(options))
  }

  componentWillUnmount = () => {
    window.removeEventListener('scroll', this.handleScroll)
  }

  handleScroll = () => {
    if (window.scrollY > 50) {
      this.setState({
        showCommunityButtons: false
      })
    } else {
      this.setState({
        showCommunityButtons: true
      })
    }
  }

  filter = filter => {
    this.setState(
      {
        filter
      },
      this.filterFunds
    )
  }

  filterFunds = () => {
    const { transactionsDrago } = this.props
    const { filter } = this.state
    const list = transactionsDrago.dragosList.list
    const filterValue = filter.trim().toLowerCase()
    const filterLength = filterValue.length
    return filterLength === 0
      ? list
      : list.filter(
          item =>
            item.name.toLowerCase().slice(0, filterLength) === filterValue ||
            item.symbol.toLowerCase().slice(0, filterLength) === filterValue
        )
  }

  render() {
    const { endpoint } = this.props
    const buttonTelegram = {
      border: '2px solid',
      borderColor: '#054186',
      fontWeight: '600',
      height: '45px',
      backgroundColor: 'white'
      // width: "140px"
    }
    const buttonCreateDrago = {
      border: '2px solid',
      borderColor: '#054186',
      fontWeight: '600',
      height: '45px',
      backgroundColor: 'white',
      borderRadius: '4px',
      width: '210px',
      backgroundColor: '#054186'
    }
    const buttonExplore = {
      border: '2px solid',
      borderColor: '#054186',
      fontWeight: '600',
      height: '45px',
      backgroundColor: 'white',
      borderRadius: '4px',
      width: '210px'
    }
    const detailsBox = {
      padding: 20,
      width: '100%',
      marginRight: `20px`,
      marginLeft: `20px`
    }
    let { location } = this.props

    return (
      <div className={styles.body}>
        {/* <div className={styles.socialsContainer}>
          <a
            href="https://t.me/rigoblockprotocol"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img src="/img/social/telegram.svg" height="32px" alt="" />
          </a>
          <a
            href="https://discordapp.com/channels/rigoblock"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img src="/img/social/discord.svg" height="32px" alt="" />
          </a>
          <a
            href="https://www.facebook.com/RigoBlocks"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img src="/img/social/facebook.svg" height="32px" alt="" />
          </a>
          <a
            href="https://twitter.com/rigoblock"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img src="/img/social/twitter.svg" height="32px" alt="" />
          </a>
        </div> */}

        <Row>
          <Col xs={12}>
            <div>
              <Row>
                <Col xs={12}>
                  <div className={styles.mainLogoContainer}>
                    <div className={styles.mainlogoLandingRB}>
                      <div>
                        <img
                          style={{ height: '80px' }}
                          src="/img/Logo-RigoblockRGB-OUT-02.png"
                          alt="rigoblock-logo"
                        />
                        <div className={styles.logoTextRB}>RigoBlock</div>
                      </div>
                    </div>
                    <div className={styles.mainlogoLandingPlus}>
                      <div>
                        <Add
                          color={'#054186'}
                          style={{ width: '26px', height: '26px' }}
                        />
                      </div>
                    </div>
                    <div className={styles.mainlogoLandingEfx}>
                      <div>
                        <img
                          style={{ height: '80px' }}
                          src="/img/ethfinex.png"
                          alt="ethfinex-logo"
                        />
                        <div className={styles.logoTextEfx}>ETHFINEX</div>{' '}
                      </div>
                    </div>
                  </div>
                </Col>
              </Row>
              <Row>
                <Col xs={12}>
                  <h2 style={{ color: '#054186' }}>
                    The leading crypto platform for asset management.
                  </h2>
                  <p style={{ color: '#054186' }}>
                    In collaboration with <b>Ethfinex Trustless</b>.
                  </p>
                </Col>
              </Row>
              <div className={styles.buttonLogoContainer}>
                <Row>
                  <Col xs={6}>
                    <div style={{ textAlign: 'right', marginRight: '22px' }}>
                      <FlatButton
                        labelPosition="before"
                        label="Explore"
                        labelStyle={{
                          color: '#054186',
                          fontWeight: '600',
                          fontSize: '20px'
                        }}
                        onClick={this.props.onClickTour}
                        style={buttonExplore}
                        // icon={<Chat color="#ffca57" />}
                        // hoverColor={Colors.blue300}
                      />
                    </div>
                  </Col>
                  <Col xs={6}>
                    <div
                      style={{ textAlign: 'left', marginLeft: '22px' }}
                      className={'joyride-efx-create'}
                    >
                      <FlatButton
                        labelPosition="before"
                        label="Create a pool"
                        labelStyle={{
                          color: '#ffffff',
                          fontWeight: '600',
                          fontSize: '20px'
                        }}
                        id="joyride-efx-create-pool"
                        style={buttonCreateDrago}
                        // icon={<Chat color="#ffca57" />}
                        // hoverColor={Colors.blue300}
                      />
                    </div>
                  </Col>
                </Row>
              </div>
              <Row>
                <Col xs={12}>
                  <Row>
                    <Paper style={detailsBox} zDepth={1}>
                      <Col xs={12} className={'joyride-efx-search'}>
                        <div className={styles.filterBox}>
                          Search for pools
                          <FilterPoolsField
                            filter={this.filter}
                            hintText={<SearchIcon text={'Search...'} />}
                            floatingLabelText=""
                          />
                        </div>
                      </Col>
                      <Col xs={12}>
                        <div className={styles.progressBarContainer}>
                          <LinearProgress
                            mode="determinate"
                            value={this.state.listLoadingProgress}
                          />
                        </div>
                      </Col>
                      <Col xs={12}>
                        <ElementListWrapper
                          list={this.filterFunds()}
                          location={location}
                          pagination={{
                            display: 5,
                            number: 1
                          }}
                          autoLoading={false}
                          tableHeight={330}
                        >
                          <ElementListFunds />
                        </ElementListWrapper>
                      </Col>
                    </Paper>
                  </Row>
                </Col>
              </Row>
              <div className={styles.actionsContainer}>
                <Row className={styles.cards}>
                  <Col xs={6}>
                    {/* <Card className={styles.column}>
                      <CardTitle
                        title="VAULT"
                        className={styles.cardtitle}
                        titleColor="white"
                      />
                      <CardText>
                        <p className={styles.subHeadline}>
                          Pools of ether and proof-of-stake mining
                        </p>
                      </CardText>
                      <CardActions>
                        <Link to="/vault">
                          <RaisedButton
                            label="New Vault"
                            className={styles.exchangebutton}
                            labelColor="white"
                          />
                        </Link>
                      </CardActions>
                    </Card> */}
                  </Col>
                  <Col xs={6}>
                    {/* <Card className={styles.column}>
                      <CardTitle
                        title="DRAGO"
                        className={styles.cardtitle}
                        titleColor="white"
                      />
                      <CardText>
                        <p className={styles.subHeadline}>
                          Pools of ether and trading on decentralized exchanges
                        </p>
                      </CardText>
                      <CardActions>
                        <Link to="/drago">
                          <RaisedButton
                            label="New Drago"
                            className={styles.exchangebutton}
                            labelColor="white"
                          />
                        </Link>
                      </CardActions>
                    </Card> */}
                  </Col>
                </Row>
                <Row>
                  <Col xs={12}>
                    <p />
                  </Col>
                </Row>
              </div>
            </div>
          </Col>
        </Row>
        <ElementBottomStatusBar
          blockNumber={endpoint.prevBlockNumber}
          networkName={endpoint.networkInfo.name}
          networkError={endpoint.networkError}
          networkStatus={endpoint.networkStatus}
        />
        {this.state.showCommunityButtons && (
          <div className={styles.telegramButtonContainer}>
            <div>
              <a
                href="https://t.me/rigoblockprotocol"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.communityButton}
              >
                <FlatButton
                  labelPosition="before"
                  label="Join us on telegram!"
                  labelStyle={{
                    color: '#054186',
                    fontWeight: '600',
                    fontSize: '20px'
                  }}
                  style={buttonTelegram}
                  icon={
                    <img
                      src="/img/iconmonstr-telegram-1.svg"
                      // style={{ fill: '#ffca57' }}
                      height="24px"
                      className={styles.telegramIcon}
                      alt=""
                    />
                  }
                  // hoverColor={Colors.blue300}
                />
              </a>

              <a
                href="https://community.rigoblock.com"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.communityButton}
              >
                <FlatButton
                  labelPosition="before"
                  label="Join our Community"
                  labelStyle={{
                    color: '#054186',
                    fontWeight: '600',
                    fontSize: '20px'
                  }}
                  style={buttonTelegram}
                  icon={<Chat color="#ffca57" />}
                  // hoverColor={Colors.blue300}
                />
              </a>
            </div>
          </div>
        )}
        <WalletSetup />
      </div>
    )
  }
}

export default withRouter(connect(mapStateToProps)(ApplicationHomeEfx))
