import { Button } from '@material-ui/core';
import React,{useState} from 'react';
import {db,storage} from "./firebase";
import firebase from 'firebase/compat/app';
import "./ImageUpload.css";

function ImageUpload({username}) {
    const [image,setImage]=useState(null);
    const [caption,setCaption]=useState('');
    const [progress,setProgress]=useState(0);
    

   const  handleChange = e => {
        if (e.target.files[0]) {
           setImage(e.target.files[0]);
        }
      };
    const handleUpload=()=>{
     const UploadTask=storage.ref(`/images/${image.name}`).put(image);
     
     UploadTask.on(
        "state_changed",
     (snapshot)=>{
            //progress function
            const progress=Math.round(
                (snapshot.bytesTransferred/snapshot.totalBytes) * 100
            );
            setProgress(progress);
        },
        (error)=>{
            //error function  for showing all is going good or not
            console.log(error);
            alert(error.message);
        },
        ()=>{
            //complete the function 
            storage
            .ref("images")
            .child(image.name)
            .getDownloadURL()// give the download url
            .then(url=>{
              // post image inside db
              db.collection("posts").add({
                timestamp: firebase.firestore.FieldValue.serverTimestamp(),
                caption:caption,
                imageurl:url,
                username:username
              });
            setProgress(0);  
              setCaption('');
              setImage(null);
            })  
        }
     )
    }
  return (
    <div className='ImageUpload' >
    <progress className='progress'  value={progress} max="100" />
      <input type="text" placeholder='Enter the caption......' onChange={event=>setCaption(event.target.value) } value={caption}/>
      <input type="file" onChange={handleChange} />
      <Button onClick={handleUpload} > Upload </Button>
    </div>
  );
}
export default ImageUpload;
