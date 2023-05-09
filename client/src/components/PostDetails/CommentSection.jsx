import React , {useState,useRef}from 'react';
import { Typography,TextField,Button } from '@material-ui/core';
import { useDispatch } from 'react-redux';

import useStyles from './styles';
import { commentPost } from '../../actions/posts';

const CommentSection  = ({post}) =>{
    
    const classes = useStyles();
    const dispatch = useDispatch();
    const user = JSON.parse(localStorage.getItem('profile'));
    const [comments,setComments] = useState(post?.comments);
    const [comment,setComment] = useState('');
    const commentRef = useRef();

    const handleClick = async () =>{
        try {
            const finalComment = `${user.result.name}: ${comment}`;

        const newComments = await dispatch(commentPost(finalComment,post._id));

        setComments(newComments);
        setComment('');


        commentRef.current.scrollIntoView({behaviour: 'smooth'});
        
        } catch (error) {
            console.log(error);
        }
        
    };


    return(
       <div>
        <div classes = {classes.CommentSection}>
            <div className={classes.CommentInnerContainer}>
                <Typography gutterBottom variant="h6" >Comments</Typography>
                {comments.map((c,i)=>(
                    <Typography key = {i} gutterBottom variant = "subtitle1">
                    {c}
                    </Typography>
                ))}
                <div ref = {commentRef}/>
            </div>
           {user?.result?.name && (
            <div style = {{width: '70'}}>
                <Typography gutterBottom variant = "h6"> Write a Comments</Typography>
                <TextField
                fullWidth
                minRows = {4}
                variant = "outlined"
                label = "comments"
                multiline
                value = {comment}
                onChange = {(e)=>setComment(e.target.value)}
                 />
                 <Button style = {{marginTop: '10px'}} 
                    fullWidth disabled = {!comment}
                    variant = "contained"
                    color = "primary"
                    onClick = {handleClick}>
                        Submit
                 </Button>
            </div>
           )}
        </div>
       </div>
    );
};

export default CommentSection;