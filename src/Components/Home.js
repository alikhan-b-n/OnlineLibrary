import React, {useEffect, useState} from "react";
import {BooksPreviewTable} from "./BooksPreviewTable/BooksPreviewTable";
import axios from "../api/axios";
import classes from "./ComponentsStyles/auth.module.css";
import {useAuth} from "../hooks/useAuth";

export function Home(){
    const BOOKS_PREVIEW_URL = '/getBook'
    const [data,setData] = useState([])
    const [errmsg,setErrmsg] = useState('');
    const {value} = useAuth()

    useEffect(()=>{
         const FetchBooks = async () =>{
            try {
                const res = await axios.get(BOOKS_PREVIEW_URL+value);
                setData(res.data.books)
                console.log(data)
            } catch (err){
                setErrmsg('No Server Response')
            }
        };

        FetchBooks()

    },[])
    return(
        <>
            {errmsg ? <div className={classes.errmsg}>{errmsg}</div> : <BooksPreviewTable data={data}/>}
        </>
    )
}