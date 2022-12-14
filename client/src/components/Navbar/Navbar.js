import React, { useState, useEffect } from "react";
import { AppBar, Avatar, Button, Toolbar, Typography } from "@material-ui/core";
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useDispatch } from "react-redux";
import * as actionType from '../../constants/actionTypes';
import decode from 'jwt-decode';

import useStyles from './styles';
import recipebook from '../../images/recipeLogo.png';

const Navbar = () => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();

    const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));

    const logout = () => {
        dispatch({ type: actionType.LOGOUT});
        console.log("loggedout");
        navigate('/auth');
        setUser(null);
    };

    useEffect(() => {
        const token = user?.token;

        if (token) {
            const decodedToken = decode(token);
            if (decodedToken.exp * 1000 < new Date().getTime()) logout();
          }

        setUser(JSON.parse(localStorage.getItem('profile')));
    }, [location]);


    return (
        <AppBar className= {classes.appBar} position="static" color="inherit">
            <div className={classes.brandContainer}>
                <Typography className= {classes.heading} component={Link} to="/" variant="h2" align="center">Recipe Book</Typography>
                <img className= {classes.image} src={recipebook} alt="recipes" height="60"/>
            </div>
            <Toolbar className={classes.Toolbar}>
                {user ? ( 
                    <div className={classes.profile}>
                        <Avatar className={classes.purple} alt={user?.result.name} src={user?.result.imageUrl}>{user?.result.name.charAt[0]}</Avatar>
                        <Typography className={classes.userName} variant="h6">{user.result.name}</Typography>
                        <Button variant="contained" className={classes.logout} color="secondary" onClick={logout}>Logout</Button>
                    </div>

                ) : (
                    <Button component={Link} to="/auth" variant="contained" color="primary">Sign In</Button>

                )}
            </Toolbar>
        </AppBar>
);};

   

export default Navbar;