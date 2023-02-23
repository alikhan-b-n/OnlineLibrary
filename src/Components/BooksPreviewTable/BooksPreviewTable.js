import {BookPreview} from "./BookPreview";
import React from "react";
import classes from "../ComponentsStyles/BooksPreview.module.css";


export function BooksPreviewTable({data}){
    return(
        <div className={classes.list}>
            {data.map((item)=>(
                <BookPreview
                obj={item}
                key={item._id}/>
            ))}
        </div>
    )
}

