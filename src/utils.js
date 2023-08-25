import { WithSeeMore } from 'react-insta-stories';

const image = {
	display: 'block',
	maxWidth: '100%',
	borderRadius: 4,
}

const contentStyle = {
	background: '#333',
	width: '100%',
	padding: 20,
	color: 'white',
	height: '100%'
}

const bgStyle = {
	maxWidth: '100%',
	height: '100%',
	padding: 40,
	background: '#ccd8e4'
}

const customSeeMore = {
	textAlign: 'center',
	fontSize: 14,
	bottom: 20,
	position: 'relative'
}

const CustomStory = ({ action, isPaused }) => {
	return <div style={{ ...contentStyle, background: 'Aquamarine', color: '#333' }}>
		<h1>Why do we use Lorem Ipsum?</h1>
		<p>It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English.</p>
		<h1>{isPaused ? 'Paused' : 'Playing'}</h1>
		<p>Thank you!</p>
	</div>
}

export const storyList = [
	{
		content: ({ action, isPaused }) => {
			return <div style={contentStyle}>
				<h1>What is Lorem Ipsum?</h1>
				<p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.</p>
				<img style={image} src="https://images.unsplash.com/photo-1565506737357-af89222625ad?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1650&q=80"></img>
				<h3>Perfect. But there's more! â†’</h3>
			</div>
		}
	},
	{
		content: ({ action, story }) => {
			return <WithSeeMore story={story} action={action}><div style={{ background: 'snow', padding: 20, height: '100%' }}>
				<h1 style={{ marginTop: '70%', marginBottom: 0 }}>ðŸŒ</h1>
				<h1 style={{ marginTop: 5 }}>We have our good old image and video stories, just the same.</h1>
			</div></WithSeeMore>
		},
		seeMoreCollapsed: ({ toggleMore, action }) => <p style={customSeeMore} onClick={() => toggleMore(true)}>A custom See More message â†’</p>,
		seeMore: ({ close }) => <div style={bgStyle}><h2>Just checking the see more feature.</h2><p style={{ textDecoration: 'underline' }} onClick={close}>Go on, close this popup.</p></div>,
		duration: 5000
	},
	{
		url: 'https://picsum.photos/1080/1920',
		seeMore: ({ close }) => <div style={bgStyle}><h2>Just checking the see more feature.</h2><p style={{ textDecoration: 'underline' }} onClick={close}>Go on, close this popup.</p></div>
	},
	{
		url: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4',
		type: 'video'
	},
	{
		content: CustomStory
	}
]