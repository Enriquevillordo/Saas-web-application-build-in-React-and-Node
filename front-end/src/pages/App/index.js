import React, { useEffect, useRef } from 'react';
import { Button, Box } from '@mui/material';
import { Router, Route, Switch, Redirect, Link, NavLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { history } from '../../shared/helpers/history';
import { alertActions } from '../../store/actions';
import { PrivateRoute } from '../../shared/components/PrivateRoute';
import { Dashboard } from '../Dashboard';
import { LoginPage } from '../LoginPage';
import { SignUp } from '../SignUp';
import { ForgotPassword } from '../ForgotPassword';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const App = () => {
    const alert = useSelector(state => state.alert);
    const user = useSelector(state => state.authentication.user);
    const alertBox = useRef();
    const dispatch = useDispatch();
    const [open, setOpen] = React.useState(false);

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpen(false);
    };

    useEffect(() => {
        
        history.listen((location, action) => {
            dispatch(alertActions.clear());
        });
        if(alert.message) {
            setOpen(true);
        }
      
    }, [alert]);

    return (
        <Box minHeight={'100vh'}>
            <Router history={history}>
                <Switch>
                    <PrivateRoute exact path="/" component={Dashboard} />
                    <Route  
                        path="/forgotPassword"
                        component={ ForgotPassword}
                    />
                    <Route path="/login" component={LoginPage} />
                    <Route path="/register" component={SignUp} />
                    {/* <Redirect from="*" to="/" /> */}
                    
                </Switch>
            </Router>
            <Snackbar open={open} autoHideDuration={3000} onClose={handleClose}>
                <Alert onClose={handleClose} severity={alert.type == 'alert-success'? 'success':"warning"} sx={{ position: "fixed", top: "20px", right: "20px" }}>
                { alert.message }
                </Alert>
            </Snackbar>
        </Box>
    );
}

export { App };