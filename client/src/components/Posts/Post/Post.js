import React, { useState } from "react";
import {Card, CardActions, CardContent, CardMedia, Button, Typography, Tooltip, Dialog, DialogActions, DialogTitle, DialogContent, Paper, ButtonBase, CardActionArea  } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete'
import MoreHorizIcon from '@material-ui/icons/MoreHoriz'
import EditIcon from '@material-ui/icons/Edit'
import VisibilityIcon from '@material-ui/icons/Visibility';
import CloseIcon from '@material-ui/icons/Close';
import moment from 'moment';
import useStyles from "./styles.js";
import { useDispatch } from 'react-redux';
import { useNavigate } from "react-router-dom";

import { deletePost } from "../../../actions/posts";

//singular post
const Post = ( {post, setCurrentId} ) => {
    const user = JSON.parse(localStorage.getItem('profile'));
    const classes = useStyles();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [openDelete, setOpenDelete] = useState(false);
    const [openView, setOpenView] = useState(false);

    const handleClickOpenDelete = () => {setOpenDelete(true)};
    const handleCloseDelete = () => {setOpenDelete(false)};
    
    const handleOpenView = () => setOpenView(true);
    const handleCloseView = () => setOpenView(false);
    const getPost = (e) => navigate(`/posts/${post._id}`);

    return (
       <Card className={classes.card} raised elevation ={3}>

                            
        <CardActionArea onClick={getPost} className={classes.cardAction}>

        <CardMedia  className={classes.media} image={post.selectedFile} title={post.title}/> 
            
            <div className={classes.overlay} >
                <Typography variant="h5">{post.title}</Typography>
                <Typography variant="body2">{moment(post.createdAt).fromNow()}</Typography>
                <Typography variant="body2" gutterBottom>{post.name}</Typography>
            </div>
            {/* edit button */}
            {(user?.result?.googleId === post?.creator || user?.result?._id === post?.creator ) && ( 
                <div className={classes.overlay2}>
                <Tooltip title="Edit" arrow>
                    <Button style={{color: 'white'}} size="small" onClick={() => setCurrentId(post._id)}>
                        <MoreHorizIcon fontSize="medium" />
                    </Button>
                </Tooltip>
            </div>
            )}
            
            <div className={classes.details}>
                <Typography variant="body2" color="textSecondary">{post.tags.map((tag) => `#${tag} `)}</Typography>

            </div>
        </CardActionArea>
           
            
            <CardContent>
            
            </CardContent>


            <CardActions className={classes.cardActions}> 
            {/* Delete */}
            {(user?.result?.googleId === post?.creator || user?.result?._id === post?.creator ) && (

                <Tooltip title="Delete" arrow>
                    <Button size="small" color="primary" disabled={!user?.result} onClick={() => (handleClickOpenDelete())}>
                    <DeleteIcon fontSize="small" />
                    </Button>
                </Tooltip>
            )}
            <Dialog open={openDelete} onClose={handleCloseDelete} aria-labelledby="alert-dialog-title" aria-describedby="alert-dialog-description">
                    <DialogTitle id="alert-dialog-title">
                        {"Are you sure you want to delete the recipe?"}
                    </DialogTitle>
                    <DialogActions> 
                        <Button onClick={handleCloseDelete}>Cancel</Button>
                        <Button onClick={() => dispatch(deletePost(post._id), setOpenDelete(false))}>Delete</Button>
                    </DialogActions >
            </Dialog>  

            {/* Edit */}
                {(user?.result?.googleId === post?.creator || user?.result?._id === post?.creator ) && ( 
                <Tooltip title="Edit" arrow>
                    <Button color = 'primary' size="small" onClick={() => setCurrentId(post._id)}>
                        <EditIcon fontSize="medium" />
                    </Button>
                </Tooltip>
               
                )}
            </CardActions>
       </Card>

    );
}

export default Post;