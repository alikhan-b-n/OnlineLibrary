import React, {useEffect, useRef, useState} from "react";
import classes from "./ComponentsStyles/auth.module.css";
import {NavLink} from "react-router-dom";
import {faCheck, faTimes, faInfoCircle} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import axios from "../api/axios";

export function Register(){
    const userRef = useRef();
    const errRef = useRef();
    const USER_REGEX=/^[A-Za-z][A-Za-z0-9_]{7,29}$/;
    const PWD_REGEX=/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;
    const EMAIL_REGEX=/^[\w-]+@([\w-]+\.)+[\w-]{2,4}$/
    const REGISTER_URL='/usersRegister'

    const [user, setUser] = useState('');
    const [validName, setValidName] = useState(false);
    const [userFocus, setUserFocus] = useState(false);

    const [pwd, setPwd] = useState('');
    const [validPwd, setValidPwd] = useState(false);
    const [pwdFocus, setPwdFocus] = useState(false);

    const [matchPwd, setMatchPwd] = useState('');
    const [validMatch, setValidMatch] = useState(false);
    const [matchFocus, setMatchFocus] = useState(false);


    const [email, setEmail] = useState("");
    const [validEmail, setValidEmail] = useState(false);
    const [emailFocus, setEmailFocus] = useState(false);

    const [showPwd, setShowPwd] = useState(false);
    const [showMatchPwd, setShowMatchPwd] = useState(false);

    const [errMsg, setErrMsg] = useState("");
    const [success, setSuccess] = useState(false);

    useEffect(() =>{
        userRef.current.focus();
    }, [])

    useEffect(()=>{
        const result = USER_REGEX.test(user);
        setValidName(result);
    },[user])

    useEffect(()=>{
        const result = PWD_REGEX.test(pwd);
        setValidPwd(result);
        const match = pwd === matchPwd;
        setValidMatch(match)
    },[pwd, matchPwd])

    useEffect(()=>{
        const result = EMAIL_REGEX.test(email);
        console.log(result);
        setValidEmail(result);
    }, [email])

    useEffect(() =>{
        setErrMsg('');
    }, [user, pwd, matchPwd])

    const showPassport = () =>{
        setShowPwd(!showPwd)
    }

    const showMatchPassport = () =>{
        setShowMatchPwd(!showMatchPwd)
    }
    const handleSubmit = async (e) =>{
        e.preventDefault();
        const v1 = USER_REGEX.test(user)
        const v2 = PWD_REGEX.test(pwd)
        if(!v1 || !v2){
            setErrMsg("Invalid Entry");
            return;
        }
        try {
            const response = await axios.post(REGISTER_URL,
                JSON.stringify({name: user, email: email, password: pwd}),
                {
                    // headers: {
                    //     "Content-Type": "application/json",
                    //     "Access-Control-Allow-Origin": "*"
                    // },
                    // withCredentials:true,
                    // потом разобраться надо !!!
                });
            console.log(JSON.stringify(response))
            setSuccess(true)
            setUser('')
            setPwd('')
            setEmail('')
        }catch (err) {
            if (!err.response){
                setErrMsg('No Server Response/')
            } else if(err.response.status===409){
                setErrMsg("Email is already taken")
            } else{
                setErrMsg("Something is off")
            }
            errRef.current.focus();
        }


    }

    return(
        <>
            <>
                {
                    success? (
                        <section className={classes.formContainer}>
                            <h1>You are registered!</h1>
                            <br/>
                            <p>
                                <NavLink to="/" className={classes.link}>Go to Home</NavLink>
                            </p>
                        </section>
                    ) : (
                        <section onSubmit={handleSubmit} className={classes.formContainer}>
                            <p ref={errRef} className={errMsg? classes.errmsg  :
                                "offscreen"} aria-live={"assertive"}>{errMsg}</p>
                            <h1>Join Elibrary.</h1>
                            <form>
                                <label htmlFor="username" className={classes.label} >
                                    Username:
                                    <span className={validName ? classes.validCheck : classes.hide}>
                                        <FontAwesomeIcon icon={faCheck}/>
                                    </span>
                                    <span className={validName || !user ? classes.hide : classes.validCross}>
                                        <FontAwesomeIcon icon={faTimes}/>
                                    </span>
                                </label>
                                <div className={classes.formInputContainer}>
                                    <input type="text"
                                           id="username"
                                           ref={userRef}
                                           autoComplete="off"
                                           onChange={(e)=>{setUser(e.target.value)}}
                                           value={user}
                                           required
                                           aria-invalid={validName? "false" : "true"}
                                           aria-describedby="uidnote"
                                           onFocus={()=>{setUserFocus(true)}}
                                           onBlur={()=>{setUserFocus(false)}}
                                    />
                                </div>
                                <p id="uidnote" className={userFocus && user && !validName ? classes.instructions : classes.hide}>
                                    <FontAwesomeIcon icon={faInfoCircle} />
                                        8 to 28 characters. <br/>
                                        Must begin with a letter. <br/>
                                        Letter, number, underscores, <br/>
                                        hyphens allowed.
                                </p>

                                <label htmlFor="username" className={classes.label}>
                                    Email:
                                    <span className={validEmail ? classes.validCheck : classes.hide}>
                                        <FontAwesomeIcon icon={faCheck}/>
                                    </span>
                                    <span className={validEmail || !email ? classes.hide : classes.validCross}>
                                        <FontAwesomeIcon icon={faTimes}/>
                                    </span>
                                </label>
                                <div className={classes.formInputContainer}>
                                    <input type="email"
                                           id="email"
                                           autoComplete="off"
                                           onChange={(e)=>{setEmail(e.target.value)}}
                                           value={email}
                                           required
                                           aria-invalid={validEmail? "false" : "true"}
                                           aria-describedby="emailnote"
                                           onFocus={()=>{setEmailFocus(true)}}
                                           onBlur={()=>{setEmailFocus(false)}}
                                    />
                                </div>

                                <p id="emailnote" className={emailFocus && email && !validEmail ? classes.instructions : classes.hide}>
                                    <FontAwesomeIcon icon={faInfoCircle} />
                                    Must be real email<br/>
                                    Must not be already used in registration <br/>
                                </p>

                                <label htmlFor="password" className={classes.label}>
                                    Password:
                                    <span className={validPwd ? classes.validCheck : classes.hide}>
                                        <FontAwesomeIcon icon={faCheck}/>
                                    </span>
                                    <span className={validPwd || !pwd ? classes.hide : classes.validCross}>
                                        <FontAwesomeIcon icon={faTimes}/>
                                    </span>
                                </label>
                                <div className={classes.formInputContainer}>
                                    <input type={showPwd ? "text" : "password"}
                                           id="password"
                                           onChange={(e)=>{setPwd(e.target.value)}}
                                           required
                                           aria-invalid={validPwd? "false" : "true"}
                                           aria-describedby="pwdnote"
                                           onFocus={()=>{setPwdFocus(true)}}
                                           onBlur={()=>{setPwdFocus(false)}}
                                    />
                                    <button onClick={showPassport}>
                                        {showPwd ?
                                            <svg viewBox="64 64 896 896" focusable="false" className="" data-icon="eye" width="1em"
                                                 height="1em" fill="currentColor" aria-hidden="true"><path
                                                d="M942.2 486.2C847.4 286.5 704.1 186 512 186c-192.2 0-335.4 100.5-430.2 300.3a60.3 60.3 0 000 51.5C176.6 737.5 319.9 838 512 838c192.2 0 335.4-100.5 430.2-300.3 7.7-16.2 7.7-35 0-51.5zM512 766c-161.3 0-279.4-81.8-362.7-254C232.6 339.8 350.7 258 512 258c161.3 0 279.4 81.8 362.7 254C791.5 684.2 673.4 766 512 766zm-4-430c-97.2 0-176 78.8-176 176s78.8 176 176 176 176-78.8 176-176-78.8-176-176-176zm0 288c-61.9 0-112-50.1-112-112s50.1-112 112-112 112 50.1 112 112-50.1 112-112 112z"></path></svg>
                                            :
                                            <svg viewBox="64 64 896 896" focusable="false" className=""
                                                 data-icon="eye-invisible" width="1em" height="1em" fill="currentColor"
                                                 aria-hidden="true">
                                                <path
                                                    d="M942.2 486.2Q889.47 375.11 816.7 305l-50.88 50.88C807.31 395.53 843.45 447.4 874.7 512 791.5 684.2 673.4 766 512 766q-72.67 0-133.87-22.38L323 798.75Q408 838 512 838q288.3 0 430.2-300.3a60.29 60.29 0 000-51.5zm-63.57-320.64L836 122.88a8 8 0 00-11.32 0L715.31 232.2Q624.86 186 512 186q-288.3 0-430.2 300.3a60.3 60.3 0 000 51.5q56.69 119.4 136.5 191.41L112.48 835a8 8 0 000 11.31L155.17 889a8 8 0 0011.31 0l712.15-712.12a8 8 0 000-11.32zM149.3 512C232.6 339.8 350.7 258 512 258c54.54 0 104.13 9.36 149.12 28.39l-70.3 70.3a176 176 0 00-238.13 238.13l-83.42 83.42C223.1 637.49 183.3 582.28 149.3 512zm246.7 0a112.11 112.11 0 01146.2-106.69L401.31 546.2A112 112 0 01396 512z"></path>
                                                <path
                                                    d="M508 624c-3.46 0-6.87-.16-10.25-.47l-52.82 52.82a176.09 176.09 0 00227.42-227.42l-52.82 52.82c.31 3.38.47 6.79.47 10.25a111.94 111.94 0 01-112 112z"></path>
                                            </svg>
                                        }
                                    </button>
                                </div>

                                <p id="pwdnote" className={pwdFocus && !validPwd ? classes.instructions : classes.hide}>
                                    <FontAwesomeIcon icon={faInfoCircle} />
                                    Minimum eight characters.<br/>
                                    At least one uppercase letter,<br/>
                                    one lowercase letter and one number:<br/>
                                </p>

                                <label htmlFor="confirm_pwd" className={classes.label}>
                                    Confirm Password:
                                    <span className={validMatch && matchPwd ? classes.validCheck : classes.hide}>
                                        <FontAwesomeIcon icon={faCheck}/>
                                    </span>
                                    <span className={validMatch || !matchPwd ? classes.hide : classes.validCross}>
                                        <FontAwesomeIcon icon={faTimes}/>
                                    </span>
                                </label>
                                <div className={classes.formInputContainer}>
                                    <input type={showMatchPwd ? "text" : "password"}
                                           id="confirm_pwd"
                                           autoComplete="off"
                                           onChange={(e)=>{setMatchPwd(e.target.value)}}
                                           required
                                           aria-invalid={validPwd? "false" : "true"}
                                           aria-describedby="confirmnote"
                                           onFocus={()=>{setMatchFocus(true)}}
                                           onBlur={()=>{setMatchFocus(false)}}
                                    />
                                    <button onClick={showMatchPassport}>
                                        {showMatchPwd ?
                                            <svg viewBox="64 64 896 896" focusable="false" className="" data-icon="eye" width="1em"
                                                 height="1em" fill="currentColor" aria-hidden="true"><path
                                                d="M942.2 486.2C847.4 286.5 704.1 186 512 186c-192.2 0-335.4 100.5-430.2 300.3a60.3 60.3 0 000 51.5C176.6 737.5 319.9 838 512 838c192.2 0 335.4-100.5 430.2-300.3 7.7-16.2 7.7-35 0-51.5zM512 766c-161.3 0-279.4-81.8-362.7-254C232.6 339.8 350.7 258 512 258c161.3 0 279.4 81.8 362.7 254C791.5 684.2 673.4 766 512 766zm-4-430c-97.2 0-176 78.8-176 176s78.8 176 176 176 176-78.8 176-176-78.8-176-176-176zm0 288c-61.9 0-112-50.1-112-112s50.1-112 112-112 112 50.1 112 112-50.1 112-112 112z"></path></svg>
                                            :
                                            <svg viewBox="64 64 896 896" focusable="false" className=""
                                                 data-icon="eye-invisible" width="1em" height="1em" fill="currentColor"
                                                 aria-hidden="true">
                                                <path
                                                    d="M942.2 486.2Q889.47 375.11 816.7 305l-50.88 50.88C807.31 395.53 843.45 447.4 874.7 512 791.5 684.2 673.4 766 512 766q-72.67 0-133.87-22.38L323 798.75Q408 838 512 838q288.3 0 430.2-300.3a60.29 60.29 0 000-51.5zm-63.57-320.64L836 122.88a8 8 0 00-11.32 0L715.31 232.2Q624.86 186 512 186q-288.3 0-430.2 300.3a60.3 60.3 0 000 51.5q56.69 119.4 136.5 191.41L112.48 835a8 8 0 000 11.31L155.17 889a8 8 0 0011.31 0l712.15-712.12a8 8 0 000-11.32zM149.3 512C232.6 339.8 350.7 258 512 258c54.54 0 104.13 9.36 149.12 28.39l-70.3 70.3a176 176 0 00-238.13 238.13l-83.42 83.42C223.1 637.49 183.3 582.28 149.3 512zm246.7 0a112.11 112.11 0 01146.2-106.69L401.31 546.2A112 112 0 01396 512z"></path>
                                                <path
                                                    d="M508 624c-3.46 0-6.87-.16-10.25-.47l-52.82 52.82a176.09 176.09 0 00227.42-227.42l-52.82 52.82c.31 3.38.47 6.79.47 10.25a111.94 111.94 0 01-112 112z"></path>
                                            </svg>
                                        }
                                    </button>
                                </div>

                                <p id="confirmnote" className={matchFocus && !validMatch ? classes.instructions : classes.hide}>
                                    <FontAwesomeIcon icon={faInfoCircle} />
                                    Must match the first passport input field.
                                </p>

                                <div>
                                    <p className={classes.label}>Already have an account?</p>
                                    <NavLink to="/signin" className={classes.link}>Sign in</NavLink>
                                </div>

                                <button className={classes.SubmitBtn} disabled={!validName || !validMatch || !validPwd || !validEmail}>Create Account</button>
                            </form>
                        </section>
                    )}
            </>
        </>
    )
}