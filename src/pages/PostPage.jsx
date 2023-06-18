import React from 'react'
import Posts from '../components/PostList/Posts'
import EditForm from '../components/Form/EditForm.jsx/Editform'

const PostPage = () => {
    return (
        <section className='py-[30px] gap-[20px] md:flex-row md:gap-0 flex-col flex justify-between'>
            <Posts />
            <EditForm />
        </section>
    )
}

export default PostPage