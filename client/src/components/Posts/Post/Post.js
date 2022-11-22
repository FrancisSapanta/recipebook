import React from "react";
import {Card, CardActions, CardContent, CardMedia, Button, Typography, Tooltip, Dialog, DialogActions, DialogTitle} from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete'
import MoreHorizIcon from '@material-ui/icons/MoreHoriz'
import VisibilityIcon from '@material-ui/icons/Visibility';
import moment from 'moment';
import useStyles from "./styles.js";
import { useDispatch } from 'react-redux';

import { deletePost } from "../../../actions/posts";

//singular post
const Post = ( {post, setCurrentId} ) => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
      };
    
      const handleClose = () => {
        setOpen(false);
      };

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
                <Typography variant="body2" color="textSecondary">{post.tags.map((tag) => `${tag} `)}</Typography>

            </div>
            <CardContent>
            
            </CardContent>
            <CardActions className={classes.cardActions}> 
                <Button size="small" color="primary" onClick={() => handleClickOpen()}>
                    <DeleteIcon fontSize="small" />
                    Delete
                </Button>
                <Dialog open={open} onClose={handleClose} aria-labelledby="alert-dialog-title" aria-describedby="alert-dialog-description">
                    <DialogTitle id="alert-dialog-title">
                        {"Are you sure you want to delete the Recipe?"}
                    </DialogTitle>
                    <DialogActions> 
                        <Button onClick={handleClose}>Cancel</Button>
                        <Button onClick={() => dispatch(deletePost(post._id))}>Delete</Button>
                    </DialogActions>
                </Dialog>
                <Button color = 'primary' size="small" onClick={() => ({})}>
                    <VisibilityIcon fontSize="medium" />
                    View
                </Button>
            </CardActions>
       </Card>

    );
}

export default Post;