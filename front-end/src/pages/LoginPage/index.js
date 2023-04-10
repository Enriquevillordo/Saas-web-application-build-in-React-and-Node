import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Box, Typography, OutlinedInput } from '@mui/material';
import { Visibility, VisibilityOff} from '@mui/icons-material'
import axios from 'axios'

import { userActions } from '../../store/actions';
import { GoogleLogin, googleLogout, useGoogleLogin } from '@react-oauth/google';
import { history } from '../../shared/helpers';

const LoginPage = () => {
    const [inputs, setInputs] = useState({
        username: '',
        password: ''
    });
    const [user, setUser] = useState([])
    const [submitted, setSubmitted] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const { username, password } = inputs;
    const loggingIn = useSelector(state => state.authentication.loggingIn);
    const dispatch = useDispatch();
    const location = useLocation();

    // reset login status
    // useEffect(() => { 
    //     dispatch(userActions.logout()); 
    // }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setInputs(inputs => ({ ...inputs, [name]: value }));
    }

    const handleClickShowPassword = () => setShowPassword(!showPassword);
    const handleMouseDownPassword = () => setShowPassword(!showPassword);

    const handleSubmit = (e) => {
        e.preventDefault();

        setSubmitted(true);
        if (username && password) {
            const { from } = location.state || { from: { pathname: "/" } };
            dispatch(userActions.login(username, password, from));
        }
    }

    const login = useGoogleLogin({
        onSuccess: (codeResponse) => setUser(codeResponse),
        onError: (error) => console.log('Login Failed', error)
    })

    useEffect(() => {
        if (user) {
            console.log(user)
            axios
            .get(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${user.access_token}`, {
                headers: {
                    Authorization: `Bearer ${user.access_token}`,
                    Accept: 'application/json'
                }
            })
            .then((res) => {
                localStorage.setItem("user", JSON.stringify(res.data))
                history.push('/')
            })
            .catch((err) => console.log(err));
        }
    }, [user?.access_token])

    return (
            <Box className="px-3 pb-3 mt-1" px={15} py={8}>
                <form name="form" onSubmit={handleSubmit} >
                    <Box className="col-md-6 col-sm-4 text-center" sx={{margin: "auto"}}>
                        <Typography variant='h4' mb={4}>
                            Welcome to SubtitleO!
                        </Typography>
                        <Box className="col-md-12 col-sm-12 mb-4" textAlign="left">
                            <Typography variant='caption' display="inline-block" sx={{ ml: 1.5, color: 'text.secondary', position: 'relative', bottom: -8, background: 'white', p: 0, px: .5, zIndex: 1 }}>Email</Typography>
                            <OutlinedInput type="email" name="username" value={username} onChange={handleChange} className={'form-control' + (submitted && !username ? ' is-invalid' : '')} sx={{ '& input': { p: 0 }}} />
                            {submitted && !username &&
                                <Box className="invalid-feedback">Username is required</Box>
                            }
                        </Box>
                        <Box className="col-md-12 col-sm-12 mb-4" textAlign="left">
                            <Typography variant='caption' display="inline-block" sx={{ ml: 1.5, color: 'text.secondary', position: 'relative', bottom: -8, background: 'white', p: 0, px: .5, zIndex: 1 }}>Password</Typography>
                            <OutlinedInput type={showPassword ? "text" : "password"} name="password" value={password} onChange={handleChange} className={'form-control' + (submitted && !password ? ' is-invalid' : '')} sx={{ '& input': { p: 0 }}} 
                            endAdornment={
                                <Box
                                    onClick={handleClickShowPassword}
                                    onMouseDown={handleMouseDownPassword}
                                    sx={{
                                        cursor: 'pointer',
                                        color: 'text.secondary'
                                    }}
                                    >
                                    {showPassword ? <Visibility /> : <VisibilityOff />}
                                </Box>
                            } />
                            {submitted && !password &&
                                <Box className="invalid-feedback">Password is required</Box>
                            }
                        </Box>
                        <Typography textAlign="right" sx={{color: 'text.secondary', mb: 3, paddingRight: "15px"}}><a href="/forgotPassword">Forgot password?</a></Typography>
                        <Button type='submit' variant='contained' color='primary' sx={{mb: 4, background:'#8828ff'}}>Login</Button>
                        <Typography sx={{color:'text.secondary', mb: 3}}>
                            By signing in you accept our
                            <Typography variant='span' sx={{color:"#8828ff"}}><a href='#' style={{color: "#8828ff"}}> terms and conditions</a></Typography>
                        </Typography>
                        <Typography sx={{display: 'inline-block', px: 1 , color:'text.secondary', position: 'relative', bottom: -20, background: 'white', zIndex: 1}}>Or</Typography>
                        <hr></hr>
                        {/* <GoogleLogin onSuccess={responseMessage} onError={errorMessage} /> */}
                            <Button variant='outlined' sx={{my: 3, color:'text.secondary', borderColor: "text.secondary"}} onClick={login}>
                                <Box component="img" width={"20px"} mr={2} src="/assets/img/google-icon.png" /> Sign in with Google
                            </Button>
                        
                            {/* <button onClick={logOut}>Log out</button> */}
                        <Typography sx={{color: "text.secondary"}}>
                            <strong>New to SubtitleO?</strong>
                            <Typography variant='span'><a href='/register' style={{color: "#8828ff"}}> Sign up</a></Typography>
                        </Typography>
                    </Box>
                </form>
            </Box>
    );
}

export { LoginPage };