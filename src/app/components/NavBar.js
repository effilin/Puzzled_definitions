'use client'
import Link from "next/link";

import '../globals.css';
import { useContext } from "react";
import { ThemeContext } from "../context";

export default function NavBar() {

    const {theme, changeTheme} = useContext(ThemeContext);


    return (
        <div className="d-flex justify-content-center">
            <div className="navbar justify-content-center">
                <div className="dropdown position-absolute top-0 start-0">
                    <button className="btn dropdown-toggle menu" type="button" data-bs-toggle="dropdown" aria-expanded="false">Menu</button>
                        <ul className="dropdown-menu">
                            <li><Link className="dropdown-item" href="/">Home</Link></li>
                            <li><Link className="dropdown-item" href="/dashboard">Dashboard</Link></li>
                            <li><Link className="dropdown-item" href="/puzzle">Puzzle</Link></li>
                        </ul>
                </div>
                    <h1>Puzzled</h1>
            </div>
        </div>
    )
}

