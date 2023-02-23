import React, {useState} from "react";
import classes from "./ComponentsStyles/auth.module.css"
import {useAuth} from "../hooks/useAuth";
import axios from "../api/axios";
export function Profile(){
    const {auth} = useAuth()
    const {bookTitle, setBookTitle} = useState('')
    const {bookAuthor, setBookAuthor} = useState('')
    const {bookDesc, setBookDesk} = useState('')
    const {bookText, setBookText} = useState('')

    const {success, setSuccess} = useState('')
    const URL = '/bookInsert'


    const {errMsg, setErrMsg} = useState('')

    const handleSubmit = async (e) =>{
        e.preventDefault();
        try {
            // eslint-disable-next-line
            const response = await axios.post(URL,
                JSON.stringify({title:bookTitle, author:bookAuthor, description:bookDesc, textArea:bookText},{}))
            setSuccess(true)
            setBookTitle('')
            setBookAuthor('')
        }catch (err) {
            if (!err.response){
                setErrMsg('No Server Response')
            } else if(err.response.status === 404){
                setErrMsg("User not found")
            } else if(err.response.status === 500){
                setErrMsg("Internal error")
            }
        }
    }

    return(
        <div>
            {
                auth.isAuthor ?
                        <div>
                            <h1>{auth.user}</h1>
                            <h2>{auth.id}</h2>
                            <h3>{auth.fav}</h3>
                            {
                                success ? <h1>form succesfuly completed</h1>
                                :
                                <section onSubmit={handleSubmit} className={classes.formContainer}>
                                <p className={errMsg? classes.errmsg  :
                                    "offscreen"} aria-live={"assertive"}>{errMsg}</p>
                                <h1>Add a book.</h1>
                                <form>
                                    <label htmlFor="Author">Author</label>
                                    <div className={classes.formInputContainer}>
                                        <input type="text"
                                               id="Author"
                                               autoComplete="off"
                                               onChange={(e)=>{setBookAuthor(e.target.value)}}
                                               value={bookAuthor}
                                               required
                                        />
                                    </div>
                                    <label htmlFor="Title">Title</label>
                                    <div className={classes.formInputContainer}>
                                        <input type="text"
                                               id="Title"
                                               autoComplete="off"
                                               onChange={(e)=>{setBookTitle(e.target.value)}}
                                               value={bookTitle}
                                               required
                                        />
                                    </div>
                                    <label htmlFor="desk">Description</label>
                                    <div className={classes.formInputContainer}>
                                        <input type="textarea"
                                               id="desk"
                                               autoComplete="off"
                                               onChange={(e)=>{setBookDesk(e.target.value)}}
                                               value={bookDesc}
                                               required
                                        />
                                    </div>
                                    <label htmlFor="Text">Text</label>
                                    <div className={classes.formInputContainer}>
                                        <input type="textarea"
                                               id="Text"
                                               autoComplete="off"
                                               onChange={(e)=>{setBookText(e.target.value)}}
                                               value={bookText}
                                               required
                                        />
                                    </div>
                                    <button className={classes.SubmitBtn}>Sign in</button>
                                </form>
                            </section>
                            }
                        </div>
                    :
                        <div>
                            <h1>{auth.user}</h1>
                            <h2>{auth.id}</h2>
                            <h3>{auth.fav}</h3>
                        </div>
            }
        </div>

    )
}