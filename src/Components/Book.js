import {useParams} from "react-router-dom";
import React from "react";

export function Book(){
    const {id} = useParams()
    return(
        <>
            <h1>Book {id}</h1>
        </>
    )
}