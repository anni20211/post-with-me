import React,{useState,useEffect} from 'react';
import "./Post.css"
import Avatar from '@material-ui/core/Avatar';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import firebase from 'firebase/compat/app';
import {db} from "./firebase";

function Post({username,postId,caption,user,imageurl}) {
  const [comments,setComments]=useState([]);
  const [comment,setComment]=useState('');
  const [increment,setIncrement]=useState(0);
  useEffect(() => {
    let unsubscribe;
    if(postId){
      unsubscribe=db.collection("posts").doc(postId).collection("comments").orderBy('timestamp','desc')
      .onSnapshot((snapshot)=>{
        setComments(snapshot.docs.map((doc)=>doc.data()))
      })
    }
    return ()=>{
      unsubscribe(); 
    }
  }, [postId]);
  const handleClick=(e)=>{
    e.preventDefault();
    setIncrement(increment+1);
  }
  const PostComment=(e)=>{
       e.preventDefault();
       db.collection("posts").doc(postId).collection("comments").add({
       text:comment,
       username:user.displayName,
       timestamp:firebase.firestore.FieldValue.serverTimestamp()      
      })
      setComments('');

  } 

  return (
    <div className='post'  > 
    <div className='post_header' >
    <Avatar  className='post_avatar' alt="Ankit kumar" src="/static/images/avatar/1.jpg" />
    <h2>{username}</h2>
    </div>
    <img className='post_image' src={imageurl}  alt="it's a server error" />
    <h4  className='post_handle' ><strong>{username}</strong> {caption}</h4>
      <div className='Input_comments'  >
      {comments.map(comment=>(
        <p>
        <strong>  {comment.username} </strong>{comment.text}
       </p>
      )

      )}
      <div className='Like_share'>
      <div>
      <FavoriteBorderIcon onClick={handleClick}/>
      <div className='like_para'>
      <p>{username} and {increment>0?increment-1:increment} liked this post</p>
      </div>
      </div>
      <div>
      </div>
      <div>
      </div>
      
    </div>
     
      </div>
      
    {user && (  
      <form className='post_form' >
    <input className='post_comment'
     type="text"
     placeholder='Place a comment here.....'
     value={comment}
     onChange={(e)=>setComment(e.target.value)}
     />
     <button className='post_button' 
     disabled={!comment}
     type="submit"
     onClick={PostComment}
     >
       Post
     </button>

    </form> 
    )}
    
    </div>
  );
}

export default Post;
