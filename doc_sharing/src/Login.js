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
        console.log("submit kiya");
        setSubmitted(true);
        socket.emit('verifyUser', username, password);
        console.log("his")
        socket.on('LoggedIn', (login) =>{
            setCorrectCredentials(login);
            console.log("submitted" + correctCredentials)
            if(login){
                setLoading(true);
                console.log(isLoading + " is Loading??");
                console.log(user);
                console.log("^ before dispatch");
                setTimeout(() => {
                    setLoading(false);
                    console.log(isLoading + " is Loading??");
                    dispatch(allActions.userActions.setUser(user));
                    navigate("/dashboard");
                }, 1500);
            }
        });
        console.log("whastup");
    }

    function handleChange(e) {
        const { name, value } = e.target;
        setInputs(inputs => ({ ...inputs, [name]: value }));
    }

    return (
        <Fragment>
        <div className={`login-container${isLoading ? " low-opacity" : ""}`}>
            <h2 className="title">Collab <span className="subtitle">Workspace</span></h2>
            <div id="container" className={`container${isContainerActive ? " right-panel-active" : ""}`}>
                <div className="form-container sign-up-container">
                    <form action="#">
                        <h1>Create Account</h1>
                        <input type="text" placeholder="Name" />
                        <input type="email" placeholder="Email" />
                        <input type="password" placeholder="Password" />
                        <button>Sign Up</button>
                    </form>
                </div>
                <div className="form-container sign-in-container">
                    <form>
                        <h1>Sign in</h1>
                        <input type="text" name= "username" value={username} onChange={handleChange} placeholder="username" />
                        <input type="password" name="password" value={password} onChange={handleChange} placeholder="Password" />
                        {/* <a href="#">Forgot your password?</a> */}
                        <button onClick={handleSubmit}>Sign In</button>
                    </form>
                </div>
                <div className="overlay-container">
                    <div className="overlay">
                        <div className="overlay-panel overlay-left">
                            <h1>Welcome Back!</h1>
                            <p>To keep connected with us please login with your personal info</p>
                            <button className="ghost" id="signIn" onClick={activateSignIn}>Sign In</button>
                        </div>
                        <div className="overlay-panel overlay-right">
                            <h1>Hello, Friend!</h1>
                            <p>Enter your personal details and start journey with us</p>
                            <button className="ghost" id="signUp" onClick={activateSignUp}>Sign Up</button>
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



        // <div className="px-3 pb-3 mt-1 bg-light">
        //             {/* <form name="form" onSubmit={handleSubmit}> */}
        //             <form name="form">
        //      <h2 className="py-3">Login</h2>
        //      <div className="row justify-content-md-center">
        //         <div className="col-md-6 col-sm-12 mb-4">
        //             <label>Username</label>
        //             <input type="text" name="username" value={inputs.username} onChange={handleChange} className={'form-control' + (submitted && !username && !correctCredentials ? ' is-invalid' : '')} />
        //             {submitted && !username && !correctCredentials &&
        //                 <div className="invalid-feedback">Username is required</div>
        //             }
        //             {/* <input type="text" name="username"/> */}
        //         </div>
        //         <div className="col-md-6 col-sm-12 mb-4">
        //             <label>Password</label>
        //             <input type="password" name="password" value={password} onChange={handleChange} className={'form-control' + (submitted && !password && !correctCredentials? ' is-invalid' : '')} />
        //             {submitted && !password && !correctCredentials &&
        //                 <div className="invalid-feedback">Password is required</div>
        //             }
        //         </div>
        //         {/* <div className="col-md-6 col-sm-12 mb-4">
        //             <label>Password</label>
        //             <input type="password" name="password"/>
        //         </div> */}
        //         </div>
        //         <div className="row">
        //         <div className="col-md-12 col-sm-12 d-flex justify-content-md-end">
        //             <button className="btn btn-primary" onClick={handleSubmit}>
        //                 {/* {loggingIn && <span className="spinner-border spinner-border-sm mr-1"></span>} */}
        //                 Login
        //             </button>
        //         </div>
        //     </div>
        //     </form>
        // </div>
    );
}

// export { LoginPage };