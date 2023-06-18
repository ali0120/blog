import React from 'react';

const Pagination = ({ postsPerPage, totalPosts, currentPage, paginate }) => {
    const pageNumbers = [];

    // Calculate the total number of pages
    const totalPages = Math.ceil(totalPosts / postsPerPage);

    // Populate the pageNumbers array with page numbers
    for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i);
    }

    return (
        <nav className="container flex justify-center mt-4 flex-wrap">
            <ul className="flex gap-2">
                {pageNumbers.map(number => (
                    <li key={number} className={`px-3 py-1 rounded-full cursor-pointer ${currentPage === number
                        ? 'bg-indigo-500 text-white'
                        : 'bg-gray-200 hover:bg-gray-300 text-gray-800 hover:text-gray-900'
                        }`}
                        onClick={() => paginate(number)}
                    >
                        {number}
                    </li>
                ))}
            </ul>
        </nav>
    );
};

export default Pagination;
