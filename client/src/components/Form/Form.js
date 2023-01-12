import React, { useState, useEffect } from "react";
import { TextField, Button, Typography, Paper } from "@material-ui/core";
import useStyles from "./styles.js";
import FileBase from 'react-file-base64';
import { useDispatch, useSelector } from "react-redux";
import { createPost, updatePost } from '../../actions/posts'
import { useNavigate } from "react-router-dom";




const Form = ({currentId, setCurrentId}) => {
    const [postData, setPostData] = useState({
        title: '',
        ingredients: '',
        instructions: '',
        tags: '',
        selectedFile: ''
    });
    const post = useSelector((state) => currentId ? state.posts.posts.find((p) => p._id === currentId) : null);
    const navigate = useNavigate();
    const classes = useStyles();
    const dispatch = useDispatch();
    const user = JSON.parse(localStorage.getItem('profile'));
    useEffect(() => {
        if(post) setPostData(post);
    }, [post]);

        //clears form 
    const clear = () => {
        setCurrentId(0);
        setPostData({
                title: '',
                ingredients: '',
                instructions: '',
                tags: '',
                selectedFile: ''
            })
    
        };

        const handleSubmit = (e) => {
            e.preventDefault();
            //no refresh
    
            if(currentId) {
                dispatch(updatePost( currentId,{ ...postData, name: user?.result?.name }));
                
            } else{
                dispatch(createPost({ ...postData, name: user?.result?.name }, navigate));
                
            }
            clear();
            
    
        }

    if(!user?.result?.name) {
        console.log("not signed in");
        return (
            
            <Paper className={classes.paper}>
                <Typography variant="h6" align="center">
                    Sign in to access all functions on the Recipe App.
                </Typography>
            </Paper>
        );
    }

    return (
        <Paper className= {classes.paper} elevation={3}>
            
            <form autoComplete="off" onSubmit={handleSubmit} noValidate className={`${classes.root} ${classes.form}`}>
            
            <Typography variant="h6">{currentId ? 'Editing': 'Creating'} a Recipe</Typography>

            <TextField name="title" variant="outlined" label="Title" fullWidth value={postData.title}onChange={(e) => setPostData({...postData, title: e.target.value })}
            />

            <TextField name="ingredients" variant="outlined" label="Ingredients List" multiline fullWidth value={postData.ingredients}onChange={(e) => setPostData({...postData, ingredients: e.target.value })}
            />
            
            <TextField name="instructions" variant="outlined" label="Instructions" multiline fullWidth value={postData.instructions}onChange={(e) => setPostData({...postData, instructions: e.target.value })}
            />

            <TextField name="tags" variant="outlined" label="Tags" fullWidth value={postData.tags}onChange={(e) => setPostData({...postData, tags: e.target.value.split(',') })}
            />

            <div className={classes.fileInput}>
                <FileBase type="file" multiple={false} onDone={({base64}) => setPostData({ ...postData, selectedFile:base64})}></FileBase>
            </div>

            <Button className={classes.buttonSubmit} variant ="contained" color="primary" size="large" type="submit" fullWidth>Submit</Button>
            <Button variant ="contained" color="secondary" size="small" onClick={clear} fullWidth>Clear</Button>


            </form>

        </Paper>
        
    );
};

export default Form;