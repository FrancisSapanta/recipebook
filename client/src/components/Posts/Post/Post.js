import React from "react";
import {Card, CardActions, CardContent, CardMedia, Button, Typography, Tooltip, Dialog, DialogActions, DialogTitle, DialogContent, Paper  } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete'
import MoreHorizIcon from '@material-ui/icons/MoreHoriz'
import VisibilityIcon from '@material-ui/icons/Visibility';
import CloseIcon from '@material-ui/icons/Close';
import moment from 'moment';
import useStyles from "./styles.js";
import { useDispatch } from 'react-redux';

import { deletePost } from "../../../actions/posts";

//singular post
const Post = ( {post, setCurrentId} ) => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const [openDelete, setOpenDelete] = React.useState(false);
    const [openView, setOpenView] = React.useState(false);

    const handleClickOpenDelete = () => {setOpenDelete(true)};
    const handleCloseDelete = () => {setOpenDelete(false)};
    
    const handleOpenView = () => setOpenView(true);
    const handleCloseView = () => setOpenView(false);

    return (
       <Card className={classes.card}>
            <CardMedia className={classes.media} image={post.selectedFile} title={post.title}/>
            <div className={classes.overlay}>
                <Typography variant="h5">{post.title}</Typography>
                <Typography variant="body2">{moment(post.createdAt).fromNow()}</Typography>
                <Typography variant="body2" gutterBottom>{post.creator}</Typography>
            </div>

            {/* edit button */}
            <div className={classes.overlay2}>
                <Tooltip title="Edit" arrow>
                    <Button style={{color: 'white'}} size="small" onClick={() => setCurrentId(post._id)}>
                        <MoreHorizIcon fontSize="medium" />
                    </Button>
                </Tooltip>
            </div>


            <div className={classes.details}>
                <Typography variant="body2" color="textSecondary">{post.tags.map((tag) => `#${tag} `)}</Typography>

            </div>
            <CardContent>
            
            </CardContent>
            <CardActions className={classes.cardActions}> 
            {/* Delete */}
                <Button size="small" color="primary" onClick={() => (handleClickOpenDelete())}>
                    <DeleteIcon fontSize="small" />
                    Delete
                </Button>
                <Dialog open={openDelete} onClose={handleCloseDelete} aria-labelledby="alert-dialog-title" aria-describedby="alert-dialog-description">
                    <DialogTitle id="alert-dialog-title">
                        {"Are you sure you want to delete the recipe?"}
                    </DialogTitle>
                    <DialogActions> 
                        <Button onClick={handleCloseDelete}>Cancel</Button>
                        <Button onClick={() => dispatch(deletePost(post._id))}>Delete</Button>
                    </DialogActions >
                </Dialog>

                 {/* View Recipe */}
                <Button color = 'primary' size="small" onClick={() => (handleOpenView())}>
                    <VisibilityIcon fontSize="medium" />
                    View
                </Button>
               
                <Dialog PaperComponent={Paper} maxWidth={'sm'} fullWidth ={true} open={openView} onClose={handleCloseView} aria-labelledby="alert-dialog-title" aria-describedby="alert-dialog-description">
                    <DialogTitle id="alert-dialog-title">
                        {post.title}
                    </DialogTitle>
                    <DialogContent dividers>
            <Typography gutterBottom>By: {post.creator}</Typography>
            <Paper variant="outlined">
            <img src={post.selectedFile} />
            </Paper>
          <Typography variant="h5">Ingredients</Typography>
          <Typography  style={{whiteSpace: 'pre-line'}} gutterBottom variant="body2">{post.ingredients}</Typography>
          <Typography variant="h5">Instructions</Typography>
          <Typography  style={{whiteSpace: 'pre-line'}} gutterBottom variant="body2">{post.instructions}</Typography>
          
        </DialogContent>
                    <DialogActions> 
                        <Button onClick={handleCloseView}>
                            <CloseIcon/>
                        </Button>
                    </DialogActions>
                </Dialog>
                
                

            </CardActions>
       </Card>

    );
}

export default Post;