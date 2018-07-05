import * as React from "react"
import { connect } from 'react-redux'

import './Loading.css'
import { IAppState } from "../store/reducers"

interface IProps {
    isLoading: boolean
}

const Loading: React.SFC<IProps> = props => {
    return (
        <div className="loading-wrapper" style={{ display: props.isLoading ? 'block' : 'none' }}>
            <div className="loader" />
        </div>
    )
}

const mapStateToProps = (state: IAppState) => ({
    isLoading: state.global.loading > 0
})

export default connect(mapStateToProps)(Loading)
