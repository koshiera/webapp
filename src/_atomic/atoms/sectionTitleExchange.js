import Divider from 'material-ui/Divider'
import HelpIcon from './helpIcon'
import PropTypes from 'prop-types'
import React, { Component } from 'react'
import styles from './sectionTitleExchange.module.css'

export default class SectionTitleExchange extends Component {
  static propTypes = {
    titleText: PropTypes.string.isRequired,
    textStyle: PropTypes.object.isRequired,
    help: PropTypes.bool,
    helpText: PropTypes.string,
    helpReadMoreLink: PropTypes.string
  }

  static defaultProps = {
    textStyle: { fontSize: '14px', fontWeight: '700' },
    help: false,
    helpText: '',
    helpReadMoreLink: ''
  }

  render() {
    const helpIconStyle = {
      height: '20px',
      width: '20px'
    }

    const renderHelp = () => {
      return (
        <div className={styles.help}>
          <HelpIcon style={helpIconStyle} />
        </div>
      )
    }
    return (
      <div className={styles.titleContainer}>
        <div className={styles.title} style={this.props.textStyle}>
          {this.props.help ? renderHelp() : null}
          {this.props.titleText}
        </div>
        <Divider style={{ backgroundColor: '#9E9E9E' }} />
      </div>
    )
  }
}
