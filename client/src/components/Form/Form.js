import React, { useState, useEffect } from "react";
import { TextField, Button, Typography, Paper } from "@material-ui/core";
import useStyles from "./styles.js";
import FileBase from 'react-file-base64';
import { useDispatch, useSelector } from "react-redux";
import { createPost, updatePost } from '../../actions/posts'




const Form = ({currentId, setCurrentId}) => {
    const [postData, setPostData] = useState({
        creator: '',
        title: '',
        ingredients: '',
        instructions: '',
        tags: '',
        selectedFile: ''
    });

    const post = useSelector((state) => currentId ? state.posts.find((p) => p._id === currentId) : null);

    const classes = useStyles();

    const dispatch = useDispatch();

    useEffect(() => {
        if(post) setPostData(post);
    }, [post])

    const handleSubmit = (e) => {
        e.preventDefault();
        //no refresh

        if(currentId) {
            dispatch(updatePost( currentId, postData ));
            
        } else{
            dispatch(createPost( postData ));
            
        }
        clear();
        

    }

    const clear = () => {
        setCurrentId(null);
        setPostData({
            creator: '',
            title: '',
            ingredients: '',
            instructions: '',
            tags: '',
            selectedFile: ''
        })

    }


    return (
        <Paper className= {classes.paper} elevation={3}>
            
            <form autoComplete="off" onSubmit={handleSubmit} noValidate className={`${classes.root} ${classes.form}`}>
            
            <Typography variant="h6">{currentId ? 'Editing': 'Creating'} a Recipe</Typography>

            {/* comment */}
            <TextField name="creator" variant="outlined" label="Creator" fullWidth value={postData.creator}
            //spread data to set state using object
            onChange={(e) => setPostData({...postData, creator: e.target.value })}
            />
            
            <TextField name="title" variant="outlined" label="Title" fullWidth value={postData.title}onChange={(e) => setPostData({...postData, title: e.target.value })}
            />

            <TextField name="ingredients" variant="outlined" label="Ingredients List" multiline fullWidth value={postData.ingredients}onChange={(e) => setPostData({...postData, ingredients: e.target.value })}
            />
            
            <TextField name="instructions" variant="outlined" label="Instructions" multiline fullWidth value={postData.instructions}onChange={(e) => setPostData({...postData, instructions: e.target.value })}
            />

            <TextField name="tags" variant="outlined" label="Tags" fullWidth value={postData.tags}onChange={(e) => setPostData({...postData, tags: e.target.value })}
            />

            <div className={classes.fileInput}>
                <FileBase type="file" multiple={false} onDone={({base64}) => setPostData({ ...postData, selectedFile:base64})}></FileBase>
            </div>

            <Button className={classes.buttonSubmit} variant ="contained" color="primary" size="large" type="submit" fullWidth>Submit</Button>
            <Button variant ="contained" color="secondary" size="small" onClick={clear} fullWidth>Clear</Button>


            </form>

        </Paper>
        
    );
}

export default Form;