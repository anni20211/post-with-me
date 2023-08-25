import './App.css';
import React ,{ useState,useEffect} from 'react';
import Post from "./Post";
import {db,auth} from './firebase';
import { makeStyles } from '@material-ui/core/styles';
import Modal from "@material-ui/core/Modal";
import  Button  from '@material-ui/core/Button';
import { Input } from '@material-ui/core';
import ImageUpload from './ImageUpload';
import InstaStory from './InstaStory';

function getModalStyle() {
  const top = 50;
  const left = 50;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}
const useStyles=makeStyles((theme)=>({
  paper:{
    position: 'absolute',
    width:400,
    backgroundColor:theme.palette.background.paper,
    border:'2px solid #000',
    boxShadow:theme.spacing(2,4,3),
  },
}));
function App() {
  const classes=useStyles();
  const [modelStyle]=useState(getModalStyle);
  const [posts,setPosts]=useState([])
  const [open, setOpen] = useState(false);
  const [username, setUsername] = useState('');
  const [openSignIn,setOpenSignIn]=useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [user,setUser]=useState(null);

  useEffect(()=>{
  const unsubscribe=auth.onAuthStateChanged((authUser)=>{
    if(authUser){ 
      setUser(authUser);
    }
    else{
    setUser(null);
    }
  })
  return ()=>{
   unsubscribe();
  }
  },[user,username]);
  useEffect(() => {
    db.collection("posts").orderBy('timestamp','desc').onSnapshot(snapshot=>{
      setPosts(snapshot.docs.map(doc=>({
        id:doc.id,
       post: doc.data()}))
      )
    })
  }, []);
 
  const signUp= (event)=>{
    event.preventDefault();
    auth.createUserWithEmailAndPassword(email,password)
    .then((authUser)=>{
      return authUser.user.updateProfile({
        displayName:username,
      })
    })
    .catch((error)=>alert("fill the field correctly"));
    setOpen(false);
  }
  const signIn=(event)=>{
   event.preventDefault();
   auth.signInWithEmailAndPassword(email,password)
   .catch((error)=>alert(error.message));
   setOpenSignIn(false);
  }

 
  return ( 
    <div className="app">
    
    <Modal
  open={open}
  onClose={()=>setOpen(false)}>
   <div  style={modelStyle} className={classes.paper} >
   <form className="sign_up">
   <center>
   <img
   className='header_image'
   src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRJncv6Pch8E0tYgRpYmqDRViUEVj-_yDazj1SeL_ZK&s"
   alt="error on loading"
   />
    </center>

    <Input
      type="text"
      placeholder="username"
      value={username}
      onChange={(e)=>setUsername(e.target.value)}
     />
     <Input
      type="text"
      placeholder="email"
      value={email}
      onChange={(e)=>setEmail(e.target.value)}
     />
     <Input
      type="password"
      placeholder="password"
      value={password}
      onChange={(e)=>setPassword(e.target.value)}
     />
     <Button  type="submit" onClick={signUp}  >
     sign   Up
     </Button>
   </form>
   </div>
  </Modal>
  <Modal
  open={openSignIn}
  onClose={()=>setOpenSignIn(false)}>
   <div  style={modelStyle} className={classes.paper} >
   <form className="sign_in">
   <center>
   <img
   className='header_image'
   src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRJncv6Pch8E0tYgRpYmqDRViUEVj-_yDazj1SeL_ZK&s"
   alt="error on loading"
   />
    </center>
     <Input
      type="text"
      placeholder="email"
      value={email}
      onChange={(e)=>setEmail(e.target.value)}
      className='input'
     />
     <Input
      type="password"
      placeholder="password"
      value={password}
      onChange={(e)=>setPassword(e.target.value)}
      className='input'
     />
     <Button  type="submit" onClick={signIn}  > sign In</Button>
   </form>
   </div>
  </Modal>
     <div>
     </div>
    <div className="app_header"  >
    <img className='app_headerLogo'
      src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRJncv6Pch8E0tYgRpYmqDRViUEVj-_yDazj1SeL_ZK&s"
      alt="it has a server error"
    />
    {user ? (
      <Button onClick={()=>auth.signOut()}>logout</Button>
    ):(
      <div className='app_loginContainer' >
      <Button onClick={()=>setOpenSignIn(true)}>Sign In</Button>
      <Button onClick={()=>setOpen(true)}>Sign Up</Button>
      </div>
    )}
    </div>
    <div className='posts' >
    <div className='left_part' >
    {
      posts.map(({id,post})=>(
      <Post key={id} postId={id} username={post.username} user={user} caption={post.caption} imageurl={post.imageurl}/>
      ))
      }
    </div>
    <div className='right_part'  >
    {user&&<InstaStory/>}
   <h1 >Welcome buddy!</h1>
    </div>
    
    </div>
      {user?.displayName ? (
      <ImageUpload username={user.displayName}/> 
    ):(
       <h3 style={{textAlign:"center",marginBottom:"10px" ,bottom:"10px"}}>Sorry! go to Sign In  first for up</h3>

      
    )}
    </div>
  );
}
export default App;







