import React, { useState, useEffect, Fragment } from 'react';
// import { Link, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { connect, io } from 'socket.io-client';
import allActions from './actions';
import routes from "./routes";
import { useNavigate } from 'react-router-dom';
import TextEditor from './TextEditor';
import './Login.css';

// import { userActions } from '../../store/actions';

export default function LoginPage() {
    const [socket, setSocket] = useState()
    const [inputs, setInputs] = useState({
        username: '',
        password: ''
    });
    const [isContainerActive, setIsContainerActive] = useState(false);
    const [isLoading, setLoading] = useState(false);
    
    const activateSignIn = () => {
        setIsContainerActive(false);
    }
    const activateSignUp = () => {
        setIsContainerActive(true);
    }
    const navigate = useNavigate();
    const [submitted, setSubmitted] = useState(false);
    const [correctCredentials, setCorrectCredentials] = useState(false);
    const { username, password } = inputs;
    const [email, setEmail]= useState();
    const currentUser = useSelector(state => state.currentUser)
    const dispatch = useDispatch()
    const user = {name: username}

    useEffect(() => {
        const socket_instance = io("http://localhost:3003")
        setSocket(socket_instance)

        return () => {
        }
      }, [])

      useEffect(() => {
          console.log("submit")
          if(submitted && socket!=null){
            socket.on('LoggedIn', (login) =>{
                setSubmitted(login);
                console.log(submitted)
            });
          }
    
        return () => {
          // socket_instance.disconnect()
          // socket.disconnect()
        }
      }, [submitted])


    function handleSubmit(e){
        e.preventDefault();
        setSubmitted(true);
        socket.emit('verifyUser', username, password);
        socket.on('LoggedIn', (login) =>{
            setCorrectCredentials(login);
            console.log("submitted" + correctCredentials)
            if(login){
                setLoading(true);
                setTimeout(() => {
                    setLoading(false);
                    dispatch(allActions.userActions.setUser(user));
                    navigate("/admin");
                }, 1500);
            }
        });
    }

    function handleChange(e) {
        const { name, value } = e.target;
        setInputs(inputs => ({ ...inputs, [name]: value }));
    }

    function handleChangeEmail(e) {
        setEmail(e.target.value);
        console.log(email)
    }

    function handleSignUp(e){
        e.preventDefault();
        socket.emit('createAccount', username, email, password);
        socket.on('created', (created)=>{
            if(created){
                dispatch(allActions.userActions.setUser(user));
                navigate('/dashboard');
            }
        });
    }

    return (
        <Fragment>
        <div className={`login-container${isLoading ? " low-opacity" : ""}`}>
            <h2 className="title">Collab <span className="subtitle">Workspace</span></h2>
            <div id="container" className={`containerForLogin${isContainerActive ? " right-panel-active" : ""}`}>
                <div className="form-container sign-up-container">
                    <form autocomplete="off">
                        <h1>Create Account</h1>
                        <input autocomplete="off" type="text" name = "username" value={username} onChange={handleChange} placeholder="username" />
                        <input type="email" name = "email" value={email} onChange={handleChangeEmail} placeholder="Email" />
                        <input type="password" name = "password" value={password} onChange={handleChange} placeholder="Password" />
                        <button className="login-btn" onClick={handleSignUp}>Sign Up</button>
                    </form>
                </div>
                <div className="form-container sign-in-container">
                    <form autocomplete="off">
                        <h1>Sign in</h1>
                        <input autocomplete="off" type="text" name= "username" value={username} onChange={handleChange} placeholder="username" />
                        <input type="password" name="password" value={password} onChange={handleChange} placeholder="Password" />
                        {/* <a href="#">Forgot your password?</a> */}
                        <button className="login-btn" onClick={handleSubmit}>Sign In</button>
                    </form>
                </div>
                <div className="overlay-container">
                    <div className="overlay">
                        <div className="overlay-panel overlay-left">
                            <h1>Welcome Back!</h1>
                            <p className="forP">To keep connected with us please login with your personal info</p>
                            <button className="login-btn ghost" id="signIn" onClick={activateSignIn}>Sign In</button>
                        </div>
                        <div className="overlay-panel overlay-right">
                            <h1>Hello, Friend!</h1>
                            <p className="forP">Enter your personal details and start journey with us</p>
                            <button className="login-btn ghost" id="signUp" onClick={activateSignUp}>Sign Up</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <span className={`spinner${isLoading ? "" : " spinner-inactive"}`}>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
        </span>
      </Fragment>
    );
}