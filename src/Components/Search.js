import classes from "./ComponentsStyles/navbar.module.css";
import React, {useState} from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faMagnifyingGlass} from "@fortawesome/free-solid-svg-icons";
import axios from "../api/axios";
import {useAuth} from "../hooks/useAuth";
export function Search(){
    const URL='getBook/'
    const {value,setValue} = useAuth()
    const [errmsg,setErrmsg] = useState('');
    const [data,setData] = useState([])

    const handleSubmit = async (e) => {
        try {
            const response = await axios.get(URL+value)
            setData(response.data.books)


        } catch (err){
            setErrmsg('No Server Response')
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