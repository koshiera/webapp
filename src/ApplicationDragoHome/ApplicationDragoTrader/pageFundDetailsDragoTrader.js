import  * as Colors from 'material-ui/styles/colors'
import { Grid, Row, Col } from 'react-flexbox-grid'
import { Link, withRouter } from 'react-router-dom'
import {CopyToClipboard} from 'react-copy-to-clipboard'
import {Tabs, Tab} from 'material-ui/Tabs'
import {Toolbar, ToolbarGroup } from 'material-ui/Toolbar'
import ActionAssessment from 'material-ui/svg-icons/action/assessment'
import ActionList from 'material-ui/svg-icons/action/list'
import CopyContent from 'material-ui/svg-icons/content/content-copy'
import Paper from 'material-ui/Paper'
import PropTypes from 'prop-types'
import React, { Component } from 'react'
import Search from 'material-ui/svg-icons/action/search'
import Snackbar from 'material-ui/Snackbar'
import ElementListWrapper from '../../Elements/elementListWrapper'
import BigNumber from 'bignumber.js';
import { formatCoins, formatEth, } from '../../_utils/format'
import ElementFundActions from '../Elements/elementFundActions'
import IdentityIcon from '../../_atomic/atoms/identityIcon'
import InfoTable from '../../Elements/elementInfoTable'
import Loading from '../../_atomic/atoms/loading'
import PoolApi from '../../PoolsApi/src'
import AppBar from 'material-ui/AppBar';
import ElementListTransactions from '../Elements/elementListTransactions'
import styles from './pageFundDetailsDragoTrader.module.css';
import ElementPriceBox from '../Elements/elementPricesBox'
import utils from '../../_utils/utils'
import ElementFundNotFound from '../../Elements/elementFundNotFound'
import { connect } from 'react-redux';

function mapStateToProps(state) {
  return state
}

class PageFundDetailsDragoTrader extends Component {

  // Checking the type of the context variable that we receive by the parent
  static contextTypes = {
    api: PropTypes.object.isRequired,
  };

  static propTypes = {
      location: PropTypes.object.isRequired,
      endpoint: PropTypes.object.isRequired,
      accounts: PropTypes.array.isRequired,
      isManager: PropTypes.bool.isRequired,
      match: PropTypes.object.isRequired,
    };

    state = {
      dragoDetails: {
        address: null,
        name: null,
        symbol: null,
        dragoId: null,
        addresssOwner: null,
        addressGroup: null,
      },
      dragoTransactionsLogs: [],
      loading: true,
      snackBar: false,
      snackBarMsg: '',
      openBuySellDialog: {
        open: false,
        action: 'buy'
      },
      balanceETH: new BigNumber(0).toFormat(4),
      balanceDRG: new BigNumber(0).toFormat(4),
    }



    subTitle = (account) => {
      return (
        account.address
      )     
    }

    componentWillMount () {
      // Getting dragoid from the url parameters passed by router and then
      // the list of last transactions
      const dragoId = this.props.match.params.dragoid
      this.getDragoDetails(dragoId)
    }

    componentWillReceiveProps(nextProps) {
      // Updating the lists on each new block if the accounts balances have changed
      // Doing this this to improve performances by avoiding useless re-rendering
      const dragoId = this.props.match.params.dragoid
      const sourceLogClass = this.constructor.name
      const currentBalance = new BigNumber(this.props.endpoint.ethBalance)
      const nextBalance = new BigNumber(nextProps.endpoint.ethBalance)
      if (!currentBalance.eq(nextBalance)) {
        this.getDragoDetails(dragoId)
        console.log(`${sourceLogClass} -> componentWillReceiveProps -> Accounts have changed.`);
      } else {
        null
      }
    }

    shouldComponentUpdate(nextProps, nextState){
      const  sourceLogClass = this.constructor.name
      var stateUpdate = true
      var propsUpdate = true
      const currentBalance = new BigNumber(this.props.endpoint.ethBalance)
      const nextBalance = new BigNumber(nextProps.endpoint.ethBalance)
      stateUpdate = !utils.shallowEqual(this.state, nextState)
      propsUpdate = !currentBalance.eq(nextBalance)
      if (stateUpdate || propsUpdate) {
        console.log(`${sourceLogClass} -> shouldComponentUpdate -> Proceedding with rendering.`);
      }
      return stateUpdate || propsUpdate
    }

    componentDidUpdate() {
    }

    renderAddress (dragoDetails) {
      if (!dragoDetails.address ) {
        return <p>empty</p>;
      }
  
      return (
        <Row className={styles.detailsToolbarGroup}>
          <Col xs={12} md={1} className={styles.dragoTitle}>
            <h2 ><IdentityIcon address={ dragoDetails.address } /></h2>
          </Col>
          <Col xs={12} md={11} className={styles.dragoTitle}>
          <p>{dragoDetails.symbol} | {dragoDetails.name} </p>
          <small>{dragoDetails.address}</small>
          </Col>
        </Row>
      );
    }

    snackBar = (msg) =>{
      this.setState({
        snackBar: true,
        snackBarMsg: msg
      })
    }

    renderCopyButton = (text) =>{
      if (!text ) {
        return null;
      }
      
      return (
        <CopyToClipboard text={text} key={"address"+text}
            onCopy={() => this.snackBar('Copied to clilpboard')}>
            <Link to={'#'} key={"addresslink"+text}><CopyContent className={styles.copyAddress}/></Link>
        </CopyToClipboard>
      );
    }

    renderEtherscanButton = (type, text) =>{
      if (!text ) {
        return null;
      }
      
      return (
      <a key={"addressether"+text} href={this.props.endpoint.networkInfo.etherscan+type+'/' + text} target='_blank'><Search className={styles.copyAddress}/></a>
      );
    }

    handlesnackBarRequestClose = () => {
      this.setState({
        snackBar: false,
        snackBarMsg: ''
      })
    }

    handleBuySellButtons = (action) =>{
      console.log(action)
      this.setState({
        openBuySellDialog: {
          open: !this.state.openBuySellDialog.open,
          action: action
        }
      })
    }

    onTransactionSent = () =>{
      this.setState({
        openBuySellDialog: {
          open: false,
        }
      })
    }

    render() {
      const { accounts, isManager } = this.props
      const { dragoDetails, loading } = this.state
      const tabButtons = {
        inkBarStyle: {
          margin: 'auto',
          width: 100,
          backgroundColor: 'white'
          },
        tabItemContainerStyle: {
          margin: 'auto',
          width: 200,
        }
      }
      const columnsStyle = [styles.detailsTableCell, styles.detailsTableCell2, styles.detailsTableCell3]
      const tableButtonsDragoAddress = [this.renderCopyButton(dragoDetails.address), this.renderEtherscanButton('address', dragoDetails.address)]
      const tableButtonsDragoOwner = [this.renderCopyButton(dragoDetails.addresssOwner), this.renderEtherscanButton('address', dragoDetails.addresssOwner)]
      const tableInfo = [['Symbol', dragoDetails.symbol, ''], 
        ['Name', dragoDetails.name, ''], 
        ['Address', dragoDetails.address, tableButtonsDragoAddress],
        ['Manager', dragoDetails.addresssOwner, tableButtonsDragoOwner]]        
      const paperStyle = {
        marginTop: "10px"
      };
      
      var dragoTransactionList = this.state.dragoTransactionsLogs
      // console.log(dragoTransactionList)
      // Waiting until getDragoDetails returns the drago details
      if (loading) {
        return (
          <Loading />
        );
      }
      if (dragoDetails.address === '0x0000000000000000000000000000000000000000') {
        return (
          <ElementFundNotFound />
        );
      }
      return (
        <Row>
          <Col xs={12}>
            <Paper className={styles.paperContainer} zDepth={1}>
              <Toolbar className={styles.detailsToolbar}>
                <ToolbarGroup className={styles.detailsToolbarGroup}>
                  {this.renderAddress(dragoDetails)}
                </ToolbarGroup>
              </Toolbar>
              <Tabs tabItemContainerStyle={tabButtons.tabItemContainerStyle} inkBarStyle={tabButtons.inkBarStyle} className={styles.test}>
                <Tab label="Info" className={styles.detailsTab}
                  icon={<ActionList color={Colors.blue500} />}>
                  <Grid fluid>
                    <Row>
                      <Col xs={6}>
                        <div>
                          <AppBar
                            title={"MY HOLDING IN " + dragoDetails.symbol}
                            showMenuIconButton={false}
                            titleStyle={{ fontSize: 20 }}
                          />
                          <div className={styles.holdings}>
                            <div>{this.state.balanceDRG} <small>UNITS</small><br /></div>
                          </div>
                        </div>
                      </Col>
                      <Col xs={6}>
                          <ElementPriceBox
                            dragoDetails={dragoDetails}
                            accounts={accounts}
                            handleBuySellButtons={this.handleBuySellButtons}
                            isManager={isManager}
                          />
                          <ElementFundActions
                            dragoDetails={dragoDetails}
                            accounts={accounts}
                            snackBar={this.snackBar}
                            actionSelected={this.state.openBuySellDialog}
                            onTransactionSent={this.onTransactionSent}
                          />
                      </Col>
                    </Row>
                    <br />
                    <Row>
                      <Col xs={12}>
                        <Paper zDepth={1}>
                          <AppBar
                            title="DETAILS"
                            showMenuIconButton={false}
                            titleStyle={{ fontSize: 20 }}
                          />
                          <div className={styles.detailsTabContent}>
                            <InfoTable rows={tableInfo} columnsStyle={columnsStyle} />
                          </div>
                        </Paper>
                      </Col>
                    </Row>
                    <Row>
                      <Col xs={12} className={styles.detailsTabContent}>
                        <Paper style={paperStyle} zDepth={1} >
                          <AppBar
                            title="TRANSACTIONS"
                            showMenuIconButton={false}
                            titleStyle={{ fontSize: 20 }}
                          />
                          <div className={styles.detailsTabContent}>
                            <p>Your last 20 transactions on this fund.</p>
                          </div>
                          <ElementListWrapper list={dragoTransactionList}
                            renderCopyButton={this.renderCopyButton}
                            renderEtherscanButton={this.renderEtherscanButton}
                            loading={loading}>

                            <ElementListTransactions />
                          </ElementListWrapper>
                        </Paper>
                      </Col>
                    </Row>
                  </Grid>
                </Tab>
                <Tab label="Stats" className={styles.detailsTab}
                  icon={<ActionAssessment color={Colors.blue500} />}>
                  <Grid fluid>
                    <Row>
                      <Col xs={12} className={styles.detailsTabContent}>
                        <p>
                          Coming soon
                      </p>
                      </Col>
                    </Row>
                  </Grid>
                </Tab>
              </Tabs>
            </Paper>
          </Col>
          <Snackbar
            open={this.state.snackBar}
            message={this.state.snackBarMsg}
            action="close"
            onActionTouchTap={this.handlesnackBarRequestClose}
            onRequestClose={this.handlesnackBarRequestClose}
          />
        </Row>
      )
    }

    // Getting the drago details from dragoId
  getDragoDetails = (dragoId) => {
    const { api } = this.context
    const { accounts } = this.props
    var balanceDRG = new BigNumber(0)
    //
    // Initializing Drago API
    // Passing Parity API
    //      
    const poolApi = new PoolApi(api)
    //
    // Initializing registry contract
    //
    poolApi.contract.dragoregistry
      .init()
      .then(() => {
        //
        // Looking for drago from dragoId
        //
        poolApi.contract.dragoregistry
          .fromId(dragoId)
          .then((dragoDetails) => {
            const dragoAddress = dragoDetails[0][0]

            //
            // Initializing drago contract
            //
            poolApi.contract.drago.init(dragoAddress)

            //
            // Calling getData method
            //
            poolApi.contract.drago.getData()
              .then((data) => {
                //
                // Gettin balance for each account
                //
                accounts.map(account => {
                  poolApi.contract.drago.balanceOf(account.address)
                    .then(balance => {
                      balanceDRG = balanceDRG.add(balance)
                      console.log(balance)
                      // console.log(api.util.fromWei(balance).toFormat(4))
                    })
                    .then(() => {
                      // console.log(api.util.fromWei(balanceDRG.toNumber(4)).toFormat(4))
                      // console.log(balanceDRG)
                      var balanceETH = balanceDRG.times(formatCoins(balanceDRG, 4, api))
                      // console.log(balanceETH)
                      this.setState({
                        balanceETH: formatEth(balanceETH, 4, api),
                        balanceDRG: formatCoins(balanceDRG, 4, api)
                      })
                    })
                })

                this.setState({
                  dragoDetails: {
                    address: dragoDetails[0][0],
                    name: dragoDetails[0][1].charAt(0).toUpperCase() + dragoDetails[0][1].slice(1),
                    symbol: dragoDetails[0][2],
                    dragoId: dragoDetails[0][3].c[0],
                    addresssOwner: dragoDetails[0][4],
                    addressGroup: dragoDetails[0][5],
                    sellPrice: api.util.fromWei(data[2].toNumber(4)).toFormat(4),
                    buyPrice: api.util.fromWei(data[3].toNumber(4)).toFormat(4),
                  },
                  loading: false
                })
              })
            poolApi.contract.dragoeventful.init()
              .then(() => {
                this.getTransactions(dragoDetails[0][0], poolApi.contract.dragoeventful, accounts)
              }
              )
          })
      })
  }  

  // Getting last transactions
  getTransactions = (dragoAddress, contract, accounts) => {
    const { api } = this.context
    var sourceLogClass = this.constructor.name
    const logToEvent = (log) => {
      const key = api.util.sha3(JSON.stringify(log))
      const { blockNumber, logIndex, transactionHash, transactionIndex, params, type } = log
      var ethvalue = (log.event === 'BuyDrago') ? formatEth(params.amount.value, null, api) : formatEth(params.revenue.value, null, api);
      var drgvalue = (log.event === 'SellDrago') ? formatCoins(params.amount.value, null, api) : formatCoins(params.revenue.value, null, api);
      // let ethvalue = null
      // let drgvalue = null     
      // if ((log.event === 'BuyDrago')) {
      //   ethvalue = formatEth(params.amount.value,null,api)
      //   drgvalue = formatCoins(params.revenue.value,null,api)     
      // }
      // if ((log.event === 'SellDrago')) {
      //   ethvalue = formatEth(params.revenue.value,null,api)
      //   drgvalue = formatCoins(params.amount.value,null,api)     
      // }
      return {
        type: log.event,
        state: type,
        blockNumber,
        logIndex,
        transactionHash,
        transactionIndex,
        params,
        key,
        ethvalue,
        drgvalue
      }
    }

    // Getting all buyDrago and selDrago events since block 0.
    // dragoFactoryEventsSignatures accesses the contract ABI, gets all the events and for each creates a hex signature
    // to be passed to getAllLogs. Events are indexed and filtered by topics
    // more at: http://solidity.readthedocs.io/en/develop/contracts.html?highlight=event#events

    // The second param of the topics array is the drago address
    // The third param of the topics array is the from address
    // The third param of the topics array is the to address
    //
    //  https://github.com/RigoBlock/Books/blob/master/Solidity_01_Events.MD

    const hexDragoAddress = '0x' + dragoAddress.substr(2).padStart(64, '0')
    const hexAccounts = accounts.map((account) => {
      const hexAccount = '0x' + account.address.substr(2).padStart(64, '0')
      return hexAccount
    })
    // const options = {
    //   fromBlock: 0,
    //   toBlock: 'pending',
    // }
    const eventsFilterBuy = {
      topics: [
        [contract.hexSignature.BuyDrago],
        [hexDragoAddress],
        hexAccounts,
        null
      ]
    }
    const eventsFilterSell = {
      topics: [
        [contract.hexSignature.SellDrago],
        [hexDragoAddress],
        hexAccounts,
        null
      ]
    }
    const buyDragoEvents = contract
      .getAllLogs(eventsFilterBuy)
      .then((dragoTransactionsLog) => {
        const buyLogs = dragoTransactionsLog.map(logToEvent)
        return buyLogs
      }
      )
    const sellDragoEvents = contract
      .getAllLogs(eventsFilterSell)
      .then((dragoTransactionsLog) => {
        const sellLogs = dragoTransactionsLog.map(logToEvent)
        return sellLogs
      }
      )
    Promise.all([buyDragoEvents, sellDragoEvents])
      .then((logs) => {
        const allLogs = [...logs[0], ...logs[1]]
        return allLogs
      })
      .then((dragoTransactionsLog) => {
        // Creating an array of promises that will be executed to add timestamp to each entry
        // Doing so because for each entry we need to make an async call to the client
        // For additional refernce: https://stackoverflow.com/questions/39452083/using-promise-function-inside-javascript-array-map
        var promises = dragoTransactionsLog.map((log) => {
          return api.eth
            .getBlockByNumber(log.blockNumber.c[0])
            .then((block) => {
              log.timestamp = block.timestamp
              return log
            })
            .catch((error) => {
              // Sometimes Infura returns null for api.eth.getBlockByNumber, therefore we are assigning a fake timestamp to avoid
              // other issues in the app.
              console.warn(error)
              log.timestamp = new Date()
              return log
            })
        })
        Promise.all(promises).then((results) => {
          this.setState({
            dragoTransactionsLogs: results,
            loading: false,
          })
        })
          .then(() => {
            console.log(`${sourceLogClass} -> Transactions list loaded`);
            this.setState({
              loading: false,
            })
          })
      })
  }
    
  }
  export default withRouter(connect(mapStateToProps)(PageFundDetailsDragoTrader))