import React from 'react';
import Stories from 'react-insta-stories';
import { storyList } from './utils';

function InstaStory() {
  return (
    <div className="InstaStory">
      <h4>Add your story</h4>
      <div className='pl-3'>
        <Stories
          loop
          keyboardNavigation
          defaultInterval={8000}
          stories={storyList}
          width={300}
          height={500}
          onStoryEnd={(s, st) => console.log('story ended', s, st)}
          onAllStoriesEnd={(s, st) => console.log('all stories ended', s, st)}
          onStoryStart={(s, st) => console.log('story started', s, st)}
          storyContainerStyles={{ borderRadius: 8, overflow: 'hidden' }}
        />
      </div>
    </div>
  );
}

export default InstaStory;