import * as React from "react"

import { IUser } from "../../../models"
import { Link } from "react-router-dom"
import './SideHeader.css'

interface IProps {
    user: IUser | null
    onLogout: any
}

const SideHeader = (props: IProps) => {
    console.log(props.user)
    const userName = props.user ? props.user.name : "guest"
    const menu = () => {
        if (props.user) {
            return (
                <ul>
                    <li>
                        <Link to="/admin">Admin</Link>
                    </li>
                    |
                    <li>
                        <button onClick={props.onLogout}>Logout</button>
                    </li>
                </ul>
            )
        } else {
            return <Link to="/login">Login</Link>
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
