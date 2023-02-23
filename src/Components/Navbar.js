import {NavLink, Outlet} from "react-router-dom";
import classes from "./ComponentsStyles/navbar.module.css"
import React,{useState} from "react";
import {Search} from "./Search";


export function Navbar(){
    const [Shown, setIsShown] = useState(false)
    return(
        <>
            <nav className={classes.navBar}>
                <div className={classes.firstPart}>
                    <div className={classes.logoContainer}>
                        <img src="https://cdn-icons-png.flaticon.com/512/3227/3227053.png" alt="logo"/>
                    </div>
                    <div >
                        <Search/>
                    </div>
                </div>

                <div className={classes.secondPart}>
                    <div className={classes.authContainer}>
                        <p>
                            <span className={classes.btn}>
                                <NavLink to="/signin" className={classes.link}>Sign in</NavLink>
                            </span>
                        </p>
                        <p>
                            <span>
                                <NavLink to="/signup" className={classes.link}
                                 onMouseEnter={() => setIsShown(true)}
                                 onMouseLeave={() => setIsShown(false)}
                                 style={()=>{return Shown? {color:"black"} : {color: "gray"}}}>Sign up</NavLink>
                            </span>
                        </p>
                    </div>
                </div>
            </nav>
            <Outlet/>
        </>
    )
}

