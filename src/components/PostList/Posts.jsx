import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deletePost, fetchPost, fetchPostById, searchPosts } from '../../state/Posts/postsSlice';
import Pagination from '../Pagination/Pagination';

const Posts = () => {
    const dispatch = useDispatch();
    const { records, loading } = useSelector((state) => state.posts);
    const [currentPage, setCurrentPage] = useState(1);
    const [searchQuery, setSearchQuery] = useState('');
    const [debouncedSearchQuery, setDebouncedSearchQuery] = useState('');
    const [expandedPosts, setExpandedPosts] = useState([]);
    const postsPerPage = 10;

    useEffect(() => {
        dispatch(fetchPost());
    }, [dispatch]);

    useEffect(() => {
        // Set a timeout to debounce the search query
        const timeoutId = setTimeout(() => {
            setDebouncedSearchQuery(searchQuery);
        }, 500);

        // Clear the timeout if the search query changes before the timeout completes
        return () => {
            clearTimeout(timeoutId);
        };
    }, [searchQuery]);

    useEffect(() => {
        dispatch(searchPosts(debouncedSearchQuery));
    }, [dispatch, debouncedSearchQuery]);

    // Calculate pagination values
    const indexOfLastPost = currentPage * postsPerPage;
    const indexOfFirstPost = indexOfLastPost - postsPerPage;
    const currentPosts = records?.slice(indexOfFirstPost, indexOfLastPost);

    // Change page
    const paginate = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    const handleEdit = (postId) => {
        dispatch(fetchPostById(postId));
    };

    const handleDelete = (postId) => {
        dispatch(deletePost(postId));
    };

    const toggleExpanded = (postId) => {
        setExpandedPosts((prevExpandedPosts) => {
            if (prevExpandedPosts.includes(postId)) {
                return prevExpandedPosts.filter((id) => id !== postId);
            } else {
                return [...prevExpandedPosts, postId];
            }
        });
    };

    if (loading) {
        return <h2>loading...</h2>;
    }

    return (
        <section className='w-[100%] md:w-[65%]'>
            <div className="mb-4">
                <input
                    type="text"
                    placeholder="Search..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="px-4 py-2 border border-gray-300 rounded-md"
                />
            </div>
            {currentPosts?.map((item) => {
                const truncatedBody = item.body.length > 100 ? item.body.slice(0, 100) + '...' : item.body;
                const isExpanded = expandedPosts.includes(item.id);

                return (
                    <div key={item.id} className="mb-4 p-4 border border-gray-300 rounded-md flex justify-between">
                        <div>
                            <h3 className="text-lg font-bold mb-2">{item.title}</h3>
                            <p className="mb-2">{isExpanded ? item.body : truncatedBody}</p>
                            {item.body.length > 100 && (
                                <button
                                    className="text-blue-500 hover:text-blue-600"
                                    onClick={() => toggleExpanded(item.id)}
                                >
                                    {isExpanded ? 'Read Less' : 'Read More'}
                                </button>
                            )}
                        </div>
                        <div className="flex items-center justify-end">
                            <button
                                className="mr-2 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md"
                                onClick={() => handleEdit(item.id)} // Invoke handleEdit with the post ID
                            >
                                Edit
                            </button>
                            <button
                                className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md"
                                onClick={() => handleDelete(item.id)} // Invoke handleDelete with the post ID
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                );
            })}

            {!currentPosts.length ? <h2>No Data</h2> : null}
            <Pagination
                postsPerPage={postsPerPage}
                totalPosts={records?.length}
                currentPage={currentPage}
                paginate={paginate}
            />
        </section>
    );
};

export default Posts;
