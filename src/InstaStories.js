import React from 'react';
import ReactInstaStories from 'react-insta-stories';
import "./Stories.css";

function SeeMore() {
  return <div>see more</div>;
}

 function InstaStories() {
  return (
    <ReactInstaStories className="story"
      stories={stories}
      defaultInterval={1500}
      width={432}
      height={768}
    />
  );
}
  const stories=[
    {// for custom story 
        content: (props) => (
          <div style={{ background: 'orange', padding: 20 }}>
            <h1 style={{ marginTop: '100%', marginBottom: 0 }}>🌝</h1>
            <h1 style={{ marginTop: 5 }}>hello ayush ka haal ba bsdk bhut maza karat bade.</h1>
          </div>
          
        ),
    },
    {
      
      url: 'https://www.nasa.gov/sites/default/files/thumbnails/image/main_image_deep_field_smacs0723-5mb.jpg',
      duration: 2000,
      seeMore: <SeeMore />,
      header: {//for creating logo , name and time
        heading: 'dev_algo_ankit',
        subheading: 'posted 20min ago',
        profileImage: 'https://blogs.nasa.gov/webb/wp-content/uploads/sites/326/2022/08/JWST_2022-07-27_Jupiter.png',
      },
    },
    {
      url:"https://blogs.nasa.gov/webb/wp-content/uploads/sites/326/2022/08/JWST_2022-07-27_Jupiter.png",
      duration:2000,
      header: {//for creating logo , name and time
        heading: 'dev_algo_ankit',
        subheading: 'posted 20min ago',
        profileImage: 'https://blogs.nasa.gov/webb/wp-content/uploads/sites/326/2022/08/JWST_2022-07-27_Jupiter.png',
      },
    },{
      url:"https://images.pexels.com/photos/816608/pexels-photo-816608.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      duration:2000,
      header: {//for creating logo , name and time
        heading: 'dev_algo_ankit',
        subheading: 'posted 20min ago',
        profileImage: 'https://blogs.nasa.gov/webb/wp-content/uploads/sites/326/2022/08/JWST_2022-07-27_Jupiter.png',
      },
    },
    {
      url:"https://www.nasa.gov/sites/default/files/thumbnails/image/main_image_deep_field_smacs0723-5mb.jpg",
      duration: 2000,
      header: {//for creating logo , name and time
        heading: 'dev_algo_ankit',
        subheading: 'posted 20min ago',
        profileImage: 'https://blogs.nasa.gov/webb/wp-content/uploads/sites/326/2022/08/JWST_2022-07-27_Jupiter.png',
      },
    }
   
  ]
 
   
  
export default InstaStories;