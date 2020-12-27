import React from 'react'
import { connect } from 'react-redux'
import { compose } from 'redux'
import * as actions from '../reducers/actions.js'

class Tab extends React.Component {
    render() {
        const btn = this.props.tab
        return (
            <div className='tab'>
                <div className='tabBox left'>
                    <div
                        className={`tabItem ${btn === 0 ? 'enable' : 'disable'}`}
                        onClick={() => { this.props.setTab(0); }}>
                        Upload
                        </div>
                </div>
                <div className='tabBox right'>
                    <div
                        className={`tabItem ${btn === 1 ? 'enable' : 'disable'}`}
                        onClick={() => { this.props.setTab(1); }}>
                        Status
                        </div>
                    <div
                        className={`tabItem ${btn === 2 ? 'enable' : 'disable'}`}
                        onClick={() => { this.props.setTab(2); }}>
                        Terms
                        </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    tab: state.tab
})
export default compose(connect(mapStateToProps, actions))(Tab)