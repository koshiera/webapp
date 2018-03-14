import { Row, Col } from 'react-flexbox-grid'
import Paper from 'material-ui/Paper';
import PropTypes from 'prop-types';
import React, { Component } from 'react'
import styles from './pageNetworkConfig.module.css'
import ElementBoxHeadTitle from '../Elements/elementBoxHeadTitle'
import RaisedButton from 'material-ui/RaisedButton';
import { 
  LOCAL,
  UPDATE_INTERFACE,
  KOVAN,
  ROPSTEN,
  MAINNET,
  INFURA,
  RIGOBLOCK,
  ENDPOINTS,
  NETWORKS
 } from '../_utils/const';
import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';
import { connect } from 'react-redux';

function mapStateToProps(state) {
  return state
}

class PageNetworkConfig extends Component {

  constructor(props) {
    super(props);
    var selectedEndpoint = INFURA
    var selectedNetwork = KOVAN
    var disabledRemote = false
    var disabledLocal = true
    switch (this.props.endpoint.endpointInfo.name) {
      case INFURA:
        selectedEndpoint = 0
        break
      case RIGOBLOCK:
        selectedEndpoint = 1
        break
      case LOCAL:
        selectedEndpoint = 2
        break
    }
    switch (this.props.endpoint.networkInfo.name) {
      case KOVAN:
        selectedNetwork = 0
        break
      case ROPSTEN:
        selectedNetwork = 1
        break
      case MAINNET:
        selectedNetwork = 2
        break
    }
    // Checking if app is running inside Parity UI. If positive, disable remote endpoint selection
    if (typeof window.parity !== 'undefined') {
      disabledRemote = !disabledRemote
      disabledLocal = !disabledLocal
    }
    this.state = {
      disabledRemote,
      disabledLocal,
      selectedEndpoint: selectedEndpoint,
      selectedNetwork: selectedNetwork,
      save: true,
    }
  }

  // Checking the type of the context variable that we receive by the parent
  static contextTypes = {
    api: PropTypes.object.isRequired,
  };

  static propTypes = {
      location: PropTypes.object.isRequired,
      dispatch: PropTypes.func.isRequired,
      endpoint: PropTypes.object.isRequired,
    };

    updateInterfaceAction = (endpoint) => {
      return {
        type: UPDATE_INTERFACE,
        payload: endpoint
      }
    };

    onChangeEndpoint = (event, key) => {
      var endpoint = {}
      switch (key) {
        case 0:
          endpoint.endpointInfo = ENDPOINTS.infura
          break
        case 1:
          endpoint.endpointInfo = ENDPOINTS.rigoblock
          break
        case 2:
          endpoint.endpointInfo = ENDPOINTS.local
          break
      }
      console.log(endpoint.endpointInfo)
      this.setState({
        selectedEndpoint: key,
        save: false
      })
      this.props.dispatch(this.updateInterfaceAction(endpoint))
    }

    onChangeNetwork = (event, key) => {
      var endpoint = {}
      switch (key) {
        case 0:
          endpoint.networkInfo = NETWORKS.kovan
          break
        case 1:
          endpoint.networkInfo = NETWORKS.ropsten
          break
        case 2:
          endpoint.networkInfo = NETWORKS.mainnet
          break
      }
      console.log(endpoint.networkInfo)
      this.setState({
        selectedNetwork: key,
        save: false
      })
      this.props.dispatch(this.updateInterfaceAction(endpoint))
    }

    handleRefresh = () =>{
      window.location.reload(false)
    }

    render() {
      const { disabledRemote, disabledLocal } = this.state 
      // const endPoint = localStorage.getItem('endpoint')
      // var remoteEndPointDisabled = endPoint === LOCAL ? true : false

      return (
        <div className={styles.boxContainer}>
          <Row>
            <Col xs={12}>
              <ElementBoxHeadTitle primaryText="Blockchain" />
            </Col>
            <Col xs={12}>
              <Paper className={styles.paperContainer} zDepth={1}>
                <p>Please select a blockchain.</p>
                <p>RigoBlock protocol is currently deployed on <b>Kovan</b> and <b>Ropsten</b> networks only.</p>
                  <DropDownMenu value={this.state.selectedNetwork} onChange={this.onChangeNetwork}>
                    <MenuItem value={0} primaryText="Ethereum Kovan" />
                    <MenuItem value={1} primaryText="Ethereum Ropsten" />
                    <MenuItem value={2} disabled={true} primaryText="Ethereum Mainnet" />
                  </DropDownMenu>
                <Row>
                  <Col xs={12}>
                    <p>You need to refresh you browser to save and make this setting active. Please proceed:</p>
                  </Col>
                  <Col xs={12}>
                    <RaisedButton label="Refresh"
                      primary={true}
                      disabled={this.state.save}
                      onClick={this.handleRefresh} />
                  </Col>
                </Row>
              </Paper>
            </Col>
          </Row>
          <Row>
            <Col xs={12}>
              <ElementBoxHeadTitle primaryText="Endpoint" />
            </Col>
            <Col xs={12}>
              <Paper className={styles.paperContainer} zDepth={1}>
                <p>Please select your preferred access point to the blockchain.</p>
                <p>RigoBlock and Infura provide secure, reliable, and scalable access to Ethereum.</p>
                <div>
                  <DropDownMenu value={this.state.selectedEndpoint} onChange={this.onChangeEndpoint}>
                    <MenuItem value={0} disabled={disabledRemote} primaryText="Infura" />
                    <MenuItem value={1} disabled={disabledRemote} primaryText="RigoBlock" />
                    <MenuItem value={2} disabled={disabledLocal} primaryText="Local" />
                  </DropDownMenu>
                </div>
                <Row>
                  <Col xs={12}>
                    <p>You need to refresh you browser to save and make this setting active. Please proceed:</p>
                  </Col>
                  <Col xs={12}>
                    <RaisedButton label="Refresh"
                      primary={true}
                      disabled={this.state.save}
                      onClick={this.handleRefresh} />
                  </Col>
                </Row>
              </Paper>
            </Col>
          </Row>
        </div> 
      )
    }
  }

  export default connect(mapStateToProps)(PageNetworkConfig)