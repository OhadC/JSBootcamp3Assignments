import * as React from "react"
import { Link } from "react-router-dom"

import { IClientUser } from "../models"
import './SideHeader.css'

interface IProps {
    user: IClientUser | null
    onLogout: any
}

const SideHeader: React.SFC<IProps> = props => {
    const userName = props.user ? props.user.name : "guest"
    const menu = () => {
        if (props.user) {
            return (
                <ul className="inline-list">
                    <li>
                        <Link to="/chat">Chat</Link>
                    </li>
                    <li>
                        <Link to="/admin">Admin</Link>
                    </li>
                    <li>
                        <button onClick={props.onLogout}>Logout</button>
                    </li>
                </ul>
            )
        } else {
            return (
                <ul>
                    <li className="list-item">
                        <Link to="/login">Login</Link>
                    </li>
                </ul>
            )
        }
    }

    return (
        <div className="side-header">
            <h2>
                Hello, {userName}
            </h2>
            <nav>
                {menu()}
            </nav>
        </div>
    )
}

export default SideHeader
