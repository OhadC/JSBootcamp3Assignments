import * as React from 'react'

// import Header from '../components/Header'
// import Footer from '../components/Footer'
import Tree from '../components/Tree/Tree'
import Board from './Board'

class App extends React.Component<{}, any> {

    state = {
        activeItem: null
    }

    setActiveItem = (activeItem: any) => {
        // this.setState({ activeItem })
        console.log(activeItem)
    }

    public render() {
        return (
            <div style={appStyle}>
                {/* <Header /> */}
                <div style={mainStyle}>
                    <Tree style={{ width: '25%' }} activeChanged={this.setActiveItem} />
                    <Board style={{ width: '75%' }}/>
                </div>
                {/* <Footer /> */}
            </div>
        )
    }
}

const appStyle: object = {
    height: '100%',
    background: '#F2F5F8',
    borderRadius: '5px',
    overflow: 'hidden',
    display: 'flex',
    flexDirection: 'column'
}

const mainStyle: object = {
    flex: '1',
    display: 'flex',
    flexDirection: 'row'
}

export default App
