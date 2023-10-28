// CreateBlog.js (Component to create a new blog post)

import React, { useEffect, useState } from 'react';
import 'react-quill/dist/quill.snow.css';
import ReactQuill from 'react-quill';
import axios from 'axios';
import { useAuth } from '../../context/authContext';

const CreateBlog = () => {
    const [auth, setAuth] = useAuth();

    const [title, setTitle] = useState('')
    const [content, setContent] = useState('')
    const [description, setDescription] = useState('')
    const [category, setCategory] = useState('')
    const [categories, setCategories] = useState([])
    const [photo, setPhoto] = useState('')


    const getAllCategories = async () => {
        try {
            const { data } = await axios.get(`${process.env.REACT_APP_API}/api/v1/category/get-categories`, {
                headers: {
                    Authorization: auth?.token
                }
            });
            if (data?.success) {
                setCategories(data?.categories);
            }
        } catch (error) {
            console.log(error)
        }
    };



    useEffect(() => {
        getAllCategories()
    }, [])
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const formData = new FormData();
            formData.append('title', title);
            formData.append('description', description); // Add description to the formData
            formData.append('content', content);
            formData.append('category', category);
            formData.append('photo', photo);

            // Make a POST request to your backend API to save the blog data with the image
            // eslint-disable-next-line
            const response = await axios.post(`${process.env.REACT_APP_API}/api/v1/blog/create-blog`,
                formData, {
                headers: {
                    'Authorization': auth?.token,
                    // 'Content-Type': 'multipart/form-data', // Set the content type for file upload
                },
            });
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <label>Title:</label>
            <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
            />
            <label>Description:</label>
            <input
                type="text"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
            />

            <label>Category:</label>
            <select
                placeholder="Select a category"
                onChange={(e) => {
                    setCategory(e.target.value);
                }}
            >
                {categories?.map((c) => (
                    <option key={c._id} value={c._id}>
                        {c.name}
                    </option>
                ))}
            </select>
            <label>Featured Image:</label>

            <input
                type="file"
                accept="image/*"
                onChange={(e) => setPhoto(e.target.files[0])}
            />


            <label>Content:</label>
            <ReactQuill
                key="quill-editor"
                value={content}
                onChange={(value) => setContent(value)}
                modules={{
                    toolbar: [
                        ['bold', 'italic', 'underline', 'strike'],
                        ['link'],
                        [{ header: 1 }, { header: 2 }],
                        [{ list: 'ordered' }, { list: 'bullet' }],
                        ['clean'],
                    ],
                }}

                formats={['bold', 'italic', 'underline', 'strike', 'link', 'header', 'list', 'bullet']}
                placeholder="Write your blog content here..."
            />

            <button type="submit">Submit Blog</button>
        </form>
    );
};

export default CreateBlog;
