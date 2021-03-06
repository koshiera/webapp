import * as Colors from 'material-ui/styles/colors'
import { Toolbar, ToolbarGroup, ToolbarSeparator } from 'material-ui/Toolbar'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import AccountIcon from 'material-ui/svg-icons/action/account-circle'
import ArrowDropDown from 'material-ui/svg-icons/navigation/arrow-drop-down'
import FlatButton from 'material-ui/FlatButton'
// import Help from 'material-ui/svg-icons/action/help'
import { Actions } from '../_redux/actions'
import Badge from 'material-ui/Badge'
import IconButton from 'material-ui/IconButton'
import Menu from 'material-ui/Menu'
import MenuItem from 'material-ui/MenuItem'
import Popover from 'material-ui/Popover'
import PropTypes from 'prop-types'
import React, { Component } from 'react'
import styles from './elements.module.css'
import utils from '../_utils/utils'

function mapStateToProps(state) {
  return {
    user: state.user,
    transactions: state.transactions,
    endpoint: state.endpoint,
    app: state.app
  }
}

let menuStyles = {
  dropDown: {
    color: '#ffffff'
  },
  separator: {
    backgroundColor: '#ffffff',
    opacity: 0.5
  },
  profileIcon: {
    open: {
      color: '#054186'
    },
    closed: {
      color: '#ffffff'
    }
  }
}

let disabledUserType = {
  dropDown: {}
}

let enabledUserType = {
  dropDown: {
    color: '#ffffff'
  }
}

class NavLinks extends Component {
  static propTypes = {
    location: PropTypes.object.isRequired,
    dispatch: PropTypes.func.isRequired,
    user: PropTypes.object.isRequired,
    transactions: PropTypes.object.isRequired,
    endpoint: PropTypes.object.isRequired,
    app: PropTypes.object.isRequired
  }

  static contextTypes = {
    api: PropTypes.object.isRequired
  }

  state = {
    allEvents: null,
    minedEvents: null,
    pendingEvents: null,
    subscriptionIDDrago: null,
    transactionsDrawerNetworkButtonStyle: this.props.app.transactionsDrawerOpen
      ? styles.networkIconOpen
      : styles.networkIconClosed,
    transactionsDrawerNetworkButtonIconStyle: this.props.app
      .transactionsDrawerOpen
      ? menuStyles.profileIcon.open
      : menuStyles.profileIcon.closed
  }

  shouldComponentUpdate(nextProps, nextState) {
    let stateUpdate = true
    let propsUpdate = true
    propsUpdate = !utils.shallowEqual(this.props, nextProps)
    stateUpdate = !utils.shallowEqual(this.state, nextState)
    if (stateUpdate || propsUpdate) {
    }
    return stateUpdate || propsUpdate
  }

  // value = 1 = Trader
  // value = 2 = Manager
  handleTopBarSelectAccountType = (event, value) => {
    this.props.dispatch(Actions.users.isManagerAction(value))
  }

  componentDidMount() {
    this.activeSectionPath()
  }

  activeSectionPath = () => {
    const { match } = this.props
    let path = match.path.split('/')
    return path[3]
  }

  buildUrlPath = location => {
    let path = location.pathname.split('/')
    // path.splice(-1,1);
    // var url = path.join('/');
    return path[2]
  }

  handleClick = event => {
    // This prevents ghost click.
    event.preventDefault()
    this.setState({
      open: true,
      anchorEl: event.currentTarget
    })
  }

  handleRequestClose = () => {
    this.setState({
      open: false
    })
  }

  handleToggleNotifications = () => {
    const { transactionsDrawerOpen } = this.props.app
    let transactionsDrawerNetworkButtonStyle,
      transactionsDrawerNetworkButtonIconStyle
    !transactionsDrawerOpen
      ? (transactionsDrawerNetworkButtonStyle = styles.networkIconOpen)
      : (transactionsDrawerNetworkButtonStyle = styles.networkIconClosed)
    !transactionsDrawerOpen
      ? (transactionsDrawerNetworkButtonIconStyle = menuStyles.profileIcon.open)
      : (transactionsDrawerNetworkButtonIconStyle =
          menuStyles.profileIcon.closed)
    this.setState({
      transactionsDrawerNetworkButtonStyle,
      transactionsDrawerNetworkButtonIconStyle
    })
    this.props.dispatch(
      Actions.app.updateAppStatus({
        transactionsDrawerOpen: !this.props.app.transactionsDrawerOpen
      })
    )
  }

  render() {
    const { user } = this.props
    const { transactions } = this.props
    // let userTypeDisabled = false;
    let userTypeLabel = 'HOLDER'
    const buttonAccountType = {
      border: '1px solid',
      borderColor: '#FFFFFF'
      // width: "140px"
    }
    // Disabling user type if isManager not defined
    if (typeof user.isManager === 'undefined') {
      user.isManager = false
      // userTypeDisabled = true;
      menuStyles = { ...menuStyles, ...disabledUserType }
    } else {
      user.isManager ? (userTypeLabel = 'WIZARD') : (userTypeLabel = 'HOLDER')
      menuStyles = { ...menuStyles, ...enabledUserType }
    }
    return (
      <Toolbar style={{ background: '', padding: '0px' }}>
        <ToolbarGroup>
          <ToolbarSeparator style={menuStyles.separator} />
          <ToolbarGroup>
            <div className={'joyride-user-roles'}>
              <FlatButton
                onClick={this.handleClick}
                labelPosition="before"
                label={userTypeLabel}
                labelStyle={{ color: '#FFFFFF' }}
                style={buttonAccountType}
                icon={<ArrowDropDown color="#FFFFFF" />}
                hoverColor={Colors.blue300}
              />
            </div>
            <Popover
              open={this.state.open}
              anchorEl={this.state.anchorEl}
              anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
              targetOrigin={{ horizontal: 'right', vertical: 'top' }}
              onRequestClose={this.handleRequestClose}
              style={{ marginTop: '5px' }}
            >
              <Menu
                value={user.isManager}
                onChange={this.handleTopBarSelectAccountType}
                desktop={true}
                className={styles.menuAccountType}
              >
                <MenuItem
                  value={false}
                  primaryText={
                    <div>
                      <div className={styles.menuItemPrimaryText}>HOLDER</div>
                      <div>
                        <small>Look for a Drago</small>
                      </div>
                    </div>
                  }
                />
                <MenuItem
                  value={true}
                  primaryText={
                    <div>
                      <div className={styles.menuItemPrimaryText}>WIZARD</div>
                      <div>
                        <small>Manage your Dragos</small>
                      </div>
                    </div>
                  }
                />
              </Menu>
            </Popover>
            <div style={{ marginLeft: '6px' }}>
              {' '}
              {transactions.pending > 0 ? (
                <div
                  className={this.state.transactionsDrawerNetworkButtonStyle}
                >
                  <Badge
                    badgeContent={transactions.pending}
                    secondary={true}
                    style={{
                      padding: '0px !important'
                    }}
                    badgeStyle={{
                      top: 0,
                      right: 0,
                      fontSize: '10px',
                      width: '20px',
                      height: '20px',
                      backgroundColor: 'rgb(255, 174, 0)',
                      fontWeight: '700'
                    }}
                  >
                    <IconButton
                      tooltip="Account"
                      onClick={this.handleToggleNotifications}
                      iconStyle={
                        this.state.transactionsDrawerNetworkButtonIconStyle
                      }
                    >
                      <AccountIcon />
                    </IconButton>
                  </Badge>
                </div>
              ) : (
                <div
                  className={this.state.transactionsDrawerNetworkButtonStyle}
                >
                  <IconButton
                    tooltip="Account"
                    onClick={this.handleToggleNotifications}
                    iconStyle={
                      this.state.transactionsDrawerNetworkButtonIconStyle
                    }
                  >
                    <AccountIcon />
                  </IconButton>
                </div>
              )}
            </div>
          </ToolbarGroup>
        </ToolbarGroup>
      </Toolbar>
    )
  }
}

export default withRouter(connect(mapStateToProps)(NavLinks))
