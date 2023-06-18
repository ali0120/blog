import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { editPost } from '../../../state/Posts/postsSlice';

const EditForm = () => {
    const dispatch = useDispatch()
    const { record, loading } = useSelector((state) => state.posts);

    const schema = Yup.object().shape({
        title: Yup.string().required('Title is required'),
        body: Yup.string().required('Content is required'),
    });

    const { register, handleSubmit, formState: { errors }, setValue } = useForm({
        resolver: yupResolver(schema),
    });

    // Set Default Value To My Form
    useEffect(() => {
        if (record) {
            Object.keys(record).forEach((key) => {
                setValue(key, record[key]);
            });
        }
    }, [record, setValue]);

    const onSubmit = (data) => {
        dispatch(editPost({ id: record.id, formData:data }));
    };
    if (loading) {
        return <h2>Loading...</h2>;
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="w-[100%] md:w-[30%] mx-auto">
            <div className="mb-4">
                <label htmlFor="title" className="block text-gray-700 font-semibold mb-1">Title</label>
                <input type="text" id="title" {...register('title')} className="border border-gray-300 rounded-md px-4 py-2 w-full" />
                {errors.title && <p className="text-red-500">{errors.title.message}</p>}
            </div>

            <div className="mb-4">
                <label htmlFor="content" className="block text-gray-700 font-semibold mb-1">Body</label>
                <textarea id="content" {...register('body')} className="border border-gray-300 rounded-md px-4 py-2 w-full" />
                {errors.body && <p className="text-red-500">{errors.body.message}</p>}
            </div>

            <button type="submit" className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md">Save</button>
        </form>
    );
};

export default EditForm;
