import classes from "./ComponentsStyles/navbar.module.css";
import React from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faMagnifyingGlass} from "@fortawesome/free-solid-svg-icons";
import axios from "../api/axios";
import {useAuth} from "../hooks/useAuth";
export function Search(){
    const URL='getBook/'
    const {value,setValue} = useAuth()


    const handleSubmit = async (e) => {

        try {
            // eslint-disable-next-line
            const response = await axios.get(URL+value)


        } catch (err){
        }
    }
        return(
        <div className={classes.searchContainer}>
            <input
                type="text"
                placeholder="Search..."
                className={classes.search}
                onChange={(e) => setValue(e.target.value) }

            />
            <button onClick={handleSubmit} className={classes.noBtn}>
                <FontAwesomeIcon icon={faMagnifyingGlass}/>
            </button>
        </div>
    )

}