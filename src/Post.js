import React,{useState,useEffect} from 'react';
import "./Post.css"
import Avatar from '@material-ui/core/Avatar';
import firebase from 'firebase/compat/app';
import {db} from "./firebase";
function Post({username,postId,caption,user,imageurl}) {
  const [comments,setComments]=useState([]);
  const [comment,setComment]=useState('');
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

  const PostComment=(e)=>{
       e.preventDefault();
       db.collection("posts").doc(postId).collection("comments").add({
       text:comment,
       username:user.displayName,//signed user only
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
  
      {/* header-avatar-username-un */}

    <img className='post_image' src={imageurl}  alt="it's a server error" />
      {/* image */}

    <h4  className='post_handle' ><strong>{username}</strong> {caption}</h4>
      {/* username+caption */}
      <div className='Input_comments'  >
      {comments.map(comment=>(
        <p>
        <strong>  {comment.username} </strong>{comment.text}
       </p>
      )

      )}
     
      </div>
      
    {user && (         //if user logged in then he cna post a comment otherwise not
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
