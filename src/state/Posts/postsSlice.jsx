import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import AxiosInstance from './../../Requests/AxiosInstance';
// React Toastify
import { toast } from 'react-toastify';

const initialState = { records: [], copiedRecords: [], loading: false, error: null }

export const fetchPost = createAsyncThunk(
    "post/fetchpost",
    async (_, thunkAPI) => {
        const { rejectWithValue } = thunkAPI;
        try {
            const result = AxiosInstance.get("posts").then((res) => {
                return res.data
            })
            return result
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

export const fetchPostById = createAsyncThunk(
    "posts/fetchpostById",
    async (id, thunkAPI) => {
        const { rejectWithValue } = thunkAPI;
        try {
            const response = await AxiosInstance.get(`posts/${id}`);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

export const editPost = createAsyncThunk(
    "posts/editPost",
    async ({ id, formData }, thunkAPI) => {
        const { rejectWithValue } = thunkAPI;
        try {
            await AxiosInstance.put(`posts/${id}`, formData);
            return { id, formData }
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);


export const deletePost = createAsyncThunk(
    "posts/deletePost",
    async (postId, thunkAPI) => {
        const { rejectWithValue } = thunkAPI;
        try {
            const response = await AxiosInstance.delete(`posts/${postId}`);
            return { postId, message: response.data.message };
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

export const searchPosts = createAsyncThunk(
    "post/searchPosts",
    async (search, thunkAPI) => {
        const { getState, rejectWithValue } = thunkAPI;
        try {
            // Get all posts from the state
            const { records, copiedRecords } = getState().posts;
            console.log({ copiedRecords })

            // If search query is empty, return all records
            if (search === "") {
                return copiedRecords;
            }

            // Filter the copied records based on the search query
            const filteredPosts = records.filter((post) =>
                post.title.includes(search)
            );

            return filteredPosts;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);


const postSlice = createSlice({
    name: 'post',
    initialState,
    reducers: {},
    extraReducers: {
        // fetch data
        [fetchPost.pending]: (state) => { state.loading = true; },

        [fetchPost.fulfilled]: (state, action) => {
            state.loading = false;
            state.records = action.payload;
            state.copiedRecords = action.payload;
        },
        [fetchPost.rejected]: (state, action) => {
            state.loading = false;
            state.error = action.payload
        },

        //fetchpostById
        [fetchPostById.pending]: (state) => {
            state.loading = true;
            state.error = null;
            state.record = null;
        },
        [fetchPostById.fulfilled]: (state, action) => {
            state.loading = false;
            state.record = action.payload;
        },
        [fetchPostById.rejected]: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },

        //Edit post
        [editPost.pending]: (state) => {
            state.loading = true;
            state.error = null;
        },
        [editPost.fulfilled]: (state, action) => {
            state.loading = false;
            const { id, formData } = action.payload;

            state.records = state.records.map(post => {
                if (post.id === id) {
                    // Replace the post with the updated formData
                    return { ...post, ...formData };
                }
                return post;
            });

            toast.success('Update Successfully', {
                position: toast.POSITION.TOP_RIGHT,
                toastId: 'editpost',
            });
        },
        [editPost.rejected]: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },

        // Delete post
        [deletePost.pending]: (state) => {
            state.loading = true;
        },
        [deletePost.fulfilled]: (state, action) => {
            console.log(action.payload)
            state.loading = false;
            state.records = state.records.filter(post => post.id !== action.payload.postId);
            toast.success('Delete Successfully', {
                position: toast.POSITION.TOP_RIGHT
            });
        },
        [deletePost.rejected]: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },

        // Search posts
        [searchPosts.pending]: (state) => {
            state.error = null;
        },
        [searchPosts.fulfilled]: (state, action) => {
            state.records = action.payload;
        },
        [searchPosts.rejected]: (state, action) => {
            state.error = action.payload;
        },
    }
})

export default postSlice.reducer
