import React, { useState, useEffect} from "react";
import { Container, Grow, Grid, Paper, AppBar, TextField, Button, Chip} from '@material-ui/core';
import { useNavigate, useLocation } from "react-router-dom";
import { useDispatch } from 'react-redux';
import { getPosts, getPostsBySearch } from "../../actions/posts";
import Pagination from "../Pagination";
import { MuiChipsInput } from 'mui-chips-input'

import useStyles from "./styles";

import Posts from "../Posts/Posts";
import Form from "../Form/Form";

function useQuery() {
    return new URLSearchParams(useLocation().search);
}

const Home = () => {
    const [currentId, setCurrentId] = useState(null);
    const dispatch = useDispatch();
    const query = useQuery()
    const navigate = useNavigate();
    const page = query.get('page') || 1;
    const searchQuery = query.get('searchQuery');
    const classes = useStyles();
    const [search, setSearch] = useState('');
    const [tags, setTags] = useState([]);
;

    const handleKeyPress = (e) =>{
        if(e.keyCode ===13 ){
            searchRecipe();
        }
    };

    const handleAdd = (tag) => setTags([...tags, tag]);

    const handleDelete = (tagToDelete) => setTags(tags.filter((tag) => tag !== tagToDelete));

    const searchRecipe = () => {
        if(search.trim() || tags) {
            dispatch(getPostsBySearch({search, tags: tags.join(',')}));
            navigate(`/posts/search?searchQuery=${search || 'none'}&tags=${tags.join(',')}`);

        } else {
            navigate('/');
        }
    }
    return(
    <Grow in>
                <Container maxWidth="xl">
                    <Grid container justify="space-between" alignItems="stretch" spacing={3} className={classes.gridContainer}>
                        <Grid item xs={12} sm={6} md={9}>
                            <Posts setCurrentId={setCurrentId}/>          
                        </Grid>
                      
                        <Grid item xs={12} sm={6} md={3}>
                        <AppBar className={classes.appBarSearch} position="static" color="inherit">
                            <TextField 
                            name="search"
                            variant="outlined"
                            label="Search Recipes"
                            fullWidth
                            value={search}
                            onKeyDown={handleKeyPress}
                            onChange={(e)=>setSearch(e.target.value)}/>
                            <MuiChipsInput
                            input
                            style={{ margin: '10px 0' }}
                            value={tags}
                            onAddChip={(chip) => handleAdd(chip)}
                            onDeleteChip={(chip) => handleDelete(chip)}
                            label="Search Tags"
                            variant="outlined"/>
                            <Button onClick={searchRecipe} className={classes.searchButton} color="primary" variant="contained">Search</Button>
                        </AppBar>
                            <Form currentId={currentId} setCurrentId={setCurrentId} />
                            {(!searchQuery && !tags.length) && (
                                <Paper className={classes.pagination} elevation={6}>
                                    <Pagination page={page} />
                                </Paper>
                             )}
                        </Grid>

                    </Grid>
                </Container>
            </Grow>
    );
};

export default Home;