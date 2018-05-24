import * as React from "react"

// import Header from '../components/Header'
// import Footer from '../components/Footer'
import Tree from "./components/Tree"
import Board from "../Board/Board"
// import Modal from "../components/Modal"

class Chat extends React.Component<{}, any> {
    state = {
        activeItem: null
    }

    setActiveItem = (activeItem: any) => {
        // this.setState({ activeItem })
        console.log(activeItem)
    }

    public render() {
        return (
            <div style={chatStyle}>
                {/* <Modal /> */}
                {/* <Header /> */}
                <main style={mainStyle}>
                    <Tree style={{ width: "25%" }} activeChanged={this.setActiveItem} />
                    <Board style={{ width: "75%" }} />
                </main>
                {/* <Footer /> */}
            </div>
        )
    }
}

const chatStyle: React.CSSProperties = {
    height: "100%",
    background: "#F2F5F8",
    borderRadius: "5px",
    overflow: "hidden",
    display: "flex",
    flexDirection: "column"
}

const mainStyle: React.CSSProperties = {
    flex: "1",
    display: "flex",
    flexDirection: "row"
}

export default Chat
