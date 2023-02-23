import React, {useEffect, useState} from "react";
import classes from "../ComponentsStyles/BooksPreview.module.css";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import axios from "../../api/axios";
import {faHeart} from "@fortawesome/free-regular-svg-icons";
import {faHeart as fullHeart}  from "@fortawesome/free-solid-svg-icons";

import {useContext} from "react";
import {AuthContext} from "../../context/AuthProvider";
import style from "../ComponentsStyles/auth.module.css"




export function BookPreview (props)  {
    const ADD_FAV_URL='/userAddToFav'
    const REMOVE_FAV_URL='/userRemFromFav'
    const {auth, setAuth} = useContext(AuthContext)
    const [errMsg, setErrMsg] = useState('')
    const [isFav, setIsFav] = useState(false)
    const toCheck = () =>{
        setIsFav(auth.fav.includes(props.obj._id))
    }


    useEffect(()=>{
        toCheck()
    },[])
    const addToFavorite = async () =>{
        try {
                console.log(auth.id)
                const response = await axios.post(ADD_FAV_URL,
                JSON.stringify({userId: auth.id, bookId: props.obj._id}))
                setAuth({user:response.data.updated_user.user, email:response.data.updated_user.email, id:response.data.updated_user._id, fav:response.data.updated_user.favoriteBooks}) //ADD id and username
                setIsFav(true)
        } catch (err){
            setErrMsg('Error')
        }

    }

    const remFromFavorite = async () =>{
        try {
            console.log(auth.id)
            const response = await axios.post(REMOVE_FAV_URL,
                JSON.stringify({userId: auth.id, bookId: props.obj._id}))
                setAuth({user:response.data.updated_user.user, email:response.data.updated_user.email, id:response.data.updated_user._id, fav:response.data.updated_user.favoriteBooks}) //ADD id and username
                setIsFav(false)
        } catch (err){
            console.log(err)
            setErrMsg('Error')
        }

    }

    return(
        <div>
            {errMsg? <div className={style.errmsg}>{errMsg}</div> : <>
                <div className={[classes.bookContainer, classes.listItem].join(" ")}>
                    <div className={classes.imgBookContainer}>
                        <img src={props.obj.url} alt="Book"/>
                        <div className={classes.heartContainer}>
                            {
                                isFav ?
                                    <button onClick={remFromFavorite} className={classes.heart}>
                            <span>
                                <FontAwesomeIcon icon={fullHeart}/>
                            </span>
                                    </button>

                                    :

                                    <button onClick={addToFavorite} className={classes.heart}>
                            <span>

                                <FontAwesomeIcon icon={faHeart}/>
                            </span>
                                    </button>
                            }
                        </div>
                    </div>

                    <div className={classes.infoBookContainer}>
                        <h3>{props.obj.title}</h3>
                        <h5>{props.obj.author}</h5>
                        <p>{props.obj.description}</p>
                        <p>{props.obj.created}</p>
                    </div>


                </div>
            </>}
        </div>
    );

}

