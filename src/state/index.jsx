import { configureStore } from '@reduxjs/toolkit'
import postSlice from './Posts/postsSlice'

const store = configureStore({ reducer: { posts: postSlice } })
export default store
