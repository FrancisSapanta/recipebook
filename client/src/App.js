import React from "react";
import { Container } from '@material-ui/core';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from "./components/Navbar/Navbar";
import Home from "./components/Home/Home";
import Auth from "./components/Auth/Auth";
import RecipeExpanded from "./components/RecipeExpanded/RecipeExpanded";

const App = () => {
    //get user to see if logged in, 
    //if logged in, redirect user from auth page to main page
    const user = JSON.parse(localStorage.getItem('profile'));
    return (
            <BrowserRouter>
            <Container maxWidth = 'xl'>
                <Navbar/>
                <Routes>
                    <Route path="/" exact element={<Navigate to="/posts"/>}/>
                    <Route path="/posts" exact element={<Home/>}/>
                    <Route path="/posts/search" exact element={<Home/>}/>
                    <Route path="/posts/:id" element={<RecipeExpanded/>}/>
                    <Route path="/auth"  element={!user? <Auth/>: <Navigate to="/posts"/>}/>
                </Routes>

            </Container>
        </BrowserRouter>
        

    );
}

export default App;