import * as React from "react"

// import Header from '../../components/Header'
// import Footer from '../../components/Footer'
import Tree from "./components/Tree"
import Board from "../Board/Board"
import Login from "../Login"

class Main extends React.Component<{}, any> {
    state = {
        activeItem: null
    }

    setActiveItem = (activeItem: any) => {
        // this.setState({ activeItem })
        console.log(activeItem)
    }

    loginHandler = (username: string, password: string) => {
        console.log(username, password)
    }

    public render() {
        return (
            <main style={styles.main}>
                <Login submit={this.loginHandler} />
                {/* <Header /> */}
                <div style={styles.chat}>
                    <Tree style={{ width: "25%" }} activeChanged={this.setActiveItem} />
                    <Board style={{ width: "75%" }} />
                </div>
                {/* <Footer /> */}
            </main>
        )
    }
}

const styles: { [key: string]: React.CSSProperties } = {
    main: {
        height: "100%",
        background: "#F2F5F8",
        borderRadius: "5px",
        overflow: "hidden",
        display: "flex",
        flexDirection: "column"
    },
    chat: {
        flex: "1",
        display: "flex",
        flexDirection: "row"
    }
}

export default Main
