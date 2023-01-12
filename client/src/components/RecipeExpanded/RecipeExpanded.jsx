import React, { useEffect} from 'react';
import { Paper, Typography, CircularProgress, Divider } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';
import { useParams, useNavigate } from 'react-router-dom';
import useStyles from './styles';
import { getPost } from '../../actions/posts';

const RecipeExpanded = () => {
  const {post, posts} = useSelector((state) => state.posts);
  const dispatch = useDispatch();
  const classes = useStyles();
  const navigate = useNavigate();
  const { id} = useParams();

  useEffect(() => {
    dispatch(getPost(id))
  }, [id])

  if(!post) return null;

  return (
    <Paper style={{padding: '20px', borderRadius: '15px'}} elevation={3}>
      <div className={classes.card}>
        <div className={classes.section}>
          <Typography variant="h3" component="h2">{post.title}</Typography>
          <Typography gutterBottom variant="h6" color="textSecondary" component="h2">{post.tags.map((tag) => `#${tag} `)}</Typography>
          <Typography variant="h5">Ingredients</Typography>
          <Typography  style={{whiteSpace: 'pre-line'}} gutterBottom variant="body2">{post.ingredients}</Typography>
          <Typography variant="h5">Instructions</Typography>
          <Typography  style={{whiteSpace: 'pre-line'}} gutterBottom variant="body2">{post.instructions}</Typography>
          <Typography variant="h6">Created by: {post.name}</Typography>
          <Typography variant="body1">{moment(post.createdAt).fromNow()}</Typography>
        </div>
        <div className={classes.imageSection}>
          <img className={classes.media} src={post.selectedFile} alt={post.title} />
        </div>
      </div>
    </Paper>
  )
}

export default RecipeExpanded
