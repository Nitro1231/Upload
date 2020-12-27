import React from 'react'
import { connect } from 'react-redux'
import { compose } from 'redux'
import * as actions from '../reducers/actions'

import Tab from '../components/Tab'
import Upload from '../pages/tabs/Upload'

class Main extends React.Component {
    render() {
        var page
        switch (this.props.tab) {
            case 0:
                page = <Upload />
                break
            case 1:
                //page = <Experience />
                break
            case 2:
                //page = <Projects />
                break
            default:
                page = <Upload />
        }
        return (
            <>
                <div className='main'>
                    <Tab />
                    {page}
                </div>
            </>
        )
    }
}

const mapStateToProps = (state) => ({
    tab: state.tab
})
export default compose(connect(mapStateToProps, actions))(Main)