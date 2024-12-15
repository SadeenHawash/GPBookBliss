import React, {useState} from 'react'
import ListAllPosts from '../Profile/MyPostsBody/Posts/ListAllPosts';

const BlogBody = () => {
    const [feedType, setFeedType] = useState("forYou");
    return (
        <div className='flex max-w-6xl mx-auto absolute left-0 z-1 mt-12'>
            {/* <Sidebar/> */}
            <>
			<div className='flex-[4_4_0] mr-auto border-r border-divider-color min-h-screen'>
				{/* Header */}
				<div className='flex w-full border-b border-divider-color'>
					<div
						className={
							"flex justify-center flex-1 p-3 hover:bg-secondary transition duration-300 cursor-pointer relative"
						}
						onClick={() => setFeedType("forYou")}
					>
						For you
						{feedType === "forYou" && (
							<div className='absolute bottom-0 w-10  h-1 rounded-full bg-primary'></div>
						)}
					</div>
					<div
						className='flex justify-center flex-1 p-3 hover:bg-secondary transition duration-300 cursor-pointer relative'
						onClick={() => setFeedType("following")}
					>
						Following
						{feedType === "following" && (
							<div className='absolute bottom-0 w-10  h-1 rounded-full bg-primary'></div>
						)}
					</div>
				</div>

				{/*  CREATE POST INPUT */}
				{/* <CreatePost /> */}

				{/* POSTS */}
				<ListAllPosts feedType={feedType} />
			</div>
		</>
        </div>
    )
}

export default BlogBody