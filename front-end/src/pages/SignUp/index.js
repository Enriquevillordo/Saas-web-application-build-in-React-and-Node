import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Box, Typography, OutlinedInput } from '@mui/material';
import { Visibility, VisibilityOff} from '@mui/icons-material'
import { userActions } from '../../store/actions';

function SignUp() {
    const [user, setUser] = useState({
        username: '',
        password: '',
        email: '',
    });
    const [submitted, setSubmitted] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const registering = useSelector(state => state.registration.registering);
    const dispatch = useDispatch();

    function handleChange(e) {
        const { name, value } = e.target;
        setUser(user => ({ ...user, [name]: value }));
    }

    const handleClickShowPassword = () => setShowPassword(!showPassword);
    const handleMouseDownPassword = () => setShowPassword(!showPassword);

    function handleSubmit(e) {
        e.preventDefault();

        setSubmitted(true);
        if (user.username && user.password && user.email) {
            dispatch(userActions.register(user));
        }
    }

    return (
        <Box className="px-3 pb-3 mt-1" px={15} py={8}>
            <form name="form" onSubmit={handleSubmit}>
                <Box className="row justify-content-around">
                    <Box className="col-md-5 col-sm-12 text-center">
                        <Typography variant='h4' mb={4}>
                            Get started for free
                        </Typography>
                        <Box className="col-md-12 col-sm-12 mb-4">
                            <OutlinedInput type="text" name="username" placeholder='Name' value={user.username} onChange={handleChange} className={'form-control' + (submitted && !user.username ? ' is-invalid' : '')} sx={{ '& input': { px: 0 }}} />
                            {submitted && !user.username &&
                                <Box className="invalid-feedback text-left">Username is required</Box>
                            }
                        </Box>
                        <Box className="col-md-12 col-sm-12 mb-4" textAlign="left">
                            <Typography variant='caption' display="inline-block" sx={{ ml: 1.5, color: 'text.secondary', position: 'relative', bottom: -8, background: 'white', p: 0, px: .5, zIndex: 1 }}>Email</Typography>
                            <OutlinedInput type="email" name="email" value={user.email} onChange={handleChange} className={'form-control' + (submitted && !user.email ? ' is-invalid' : '')} sx={{ '& input': { px: 0 }}} />
                            {submitted && !user.email &&
                                <Box className="invalid-feedback">Email is required</Box>
                            }
                        </Box>
                        <Box className="col-md-12 col-sm-12 mb-4" textAlign="left">
                            <Typography variant='caption' display="inline-block" sx={{ ml: 1.5, color: 'text.secondary', position: 'relative', bottom: -8, background: 'white', p: 0, px: .5, zIndex: 1 }}>Password</Typography>
                            <OutlinedInput type={showPassword ? "text" : "password"} name="password" value={user.password} onChange={handleChange} className={'form-control' + (submitted && !user.password ? ' is-invalid' : '')} sx={{ '& input': { px: 0 }}} 
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
                            }/>
                            {submitted && !user.password &&
                                <Box className="invalid-feedback">Password is required</Box>
                            }
                        </Box>
                        <Button type='submit' variant='contained' sx={{mb: 4, background:'#8828ff'}}>
                            {registering && <span className="spinner-border spinner-border-sm mr-1"></span>}
                            Register
                        </Button>
                        <Typography className='mb-4' sx={{color: 'text.secondary'}}>
                            By signing up you accept our
                            <Typography variant='span' sx={{color:"#8828ff"}}><a href='#' style={{color: "#8828ff"}}> terms and conditions</a></Typography>
                        </Typography>
                        <Typography sx={{color: 'text.secondary'}}>
                            Already a user?
                            <Typography variant='span'><a href='/login' style={{color: "#8828ff"}}> Login</a></Typography>
                        </Typography><hr></hr>
                        <Button variant='outlined' sx={{my: 3, color:'text.secondary', borderColor: "text.secondary"}}>
                            <Box component="img" width={"20px"} mr={2} src="/assets/img/google-icon.png" /> Sign Up with Google
                        </Button>
                    </Box>
                    <Box className="col-md-5 col-sm-12 text-center" pt={17}>
                        <Box component="img" width={"40px"} mb={1} src="/assets/img/sign_up_double_dot.png" />
                        <Typography variant='h5' mb={1}>
                            ...how easy the process is...
                        </Typography>
                        <Typography mb={1} sx={{color: 'text.secondary'}}>
                            Content creation has always been and exhausting process for me, from researching to editing and exporting. I've picked up many video creation tools...nothing is close to how easy the process is now with Pictory.
                        </Typography>
                        <Box component="img" width={"100%"} src="/assets/img/login-banner.png" />
                    </Box>
                </Box>
                {/* <h2 className="py-3">Signup</h2>
                <div className="row justify-content-md-center">
                    <div className="form-group col-md-6 col-sm-12">
                        <label>Username</label>
                        <input type="text" name="username" value={user.username} onChange={handleChange} className={'form-control' + (submitted && !user.username ? ' is-invalid' : '')} />
                        {submitted && !user.username &&
                            <div className="invalid-feedback">Username is required</div>
                        }
                    </div>
                    <div className="form-group col-md-6 col-sm-12">
                        <label>Password</label>
                        <input type="password" name="password" value={user.password} onChange={handleChange} className={'form-control' + (submitted && !user.password ? ' is-invalid' : '')} />
                        {submitted && !user.password &&
                            <div className="invalid-feedback">Password is required</div>
                        }
                    </div>
                </div> <div className="row justify-content-md-center">
                    <div className="form-group col-md-6 col-sm-12">
                        <label>Email</label>
                        <input type="email" name="email" value={user.email} onChange={handleChange} className={'form-control' + (submitted && !user.email ? ' is-invalid' : '')} />
                        {submitted && !user.email &&
                            <div className="invalid-feedback">Email is required</div>
                        }
                    </div>
                    <div className="form-group col-md-6 col-sm-12">
                        <label>First Name</label>
                        <input type="text" name="firstName" value={user.firstName} onChange={handleChange} className={'form-control' + (submitted && !user.firstName ? ' is-invalid' : '')} />
                        {submitted && !user.firstName &&
                            <div className="invalid-feedback">First Name is required</div>
                        }
                    </div>
                </div> <div className="row justify-content-md-center">
                    <div className="form-group col-md-6 col-sm-12">
                        <label>Last Name</label>
                        <input type="text" name="lastName" value={user.lastName} onChange={handleChange} className={'form-control' + (submitted && !user.lastName ? ' is-invalid' : '')} />
                        {submitted && !user.lastName &&
                            <div className="invalid-feedback">Last Name is required</div>
                        }
                    </div>
                    <div className="form-group col-md-6 col-sm-12">
                        <label>Gender</label>
                        <div className={'' + (submitted && !user.gender ? 'form-control is-invalid' : 'form-control')}>
                            <span className="mr-2">
                                <input type="radio" id="male" name="gender" value='1' onChange={handleChange} />
                                <label className="ml-1" htmlFor="male">Male</label>
                            </span>
                            <span className="mr-2">
                                <input type="radio" id="female" name="gender" value='2' onChange={handleChange} />
                                <label className="ml-1" htmlFor="female">Female</label>
                            </span>
                            <span className="mr-2">
                                <input type="radio" id="other" name="gender" value='3' onChange={handleChange} />
                                <label className="ml-1" htmlFor="other">Others</label>
                            </span>
                        </div>
                        {submitted && !user.lastName &&
                            <div className="invalid-feedback">Gender is required</div>
                        }
                    </div>
                </div> <div className="row">
                    <div className="form-group col-md-6 col-sm-12">
                        <label>Country</label>
                        <div className={'' + (submitted && !user.country ? 'form-control is-invalid' : 'form-control')}>
                            <select name="country" onChange={handleChange} className="form-select w-100" value={user.country}>
                                <option>Select Country</option>
                                {
                                    countries.map(country =>
                                        <option value={country.id} key={country.id}>{country.text}</option>
                                    )
                                }
                            </select>
                        </div>
                        {submitted && !user.country &&
                            <div className="invalid-feedback">Country is required</div>
                        }
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-12 col-sm-12 d-flex justify-content-md-end">
                        <button className="btn btn-primary">
                            {registering && <span className="spinner-border spinner-border-sm mr-1"></span>}
                            Register
                        </button>
                    </div>
                </div> */}
            </form>
        </Box>
    )
}

export { SignUp };