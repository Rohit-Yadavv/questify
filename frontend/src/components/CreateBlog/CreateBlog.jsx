// CreateBlog.js (Component to create a new blog post)

import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import { useAuth } from "../../context/authContext";
import { Editor } from "@tinymce/tinymce-react"; 

const CreateBlog = () => {
  const [auth, setAuth] = useAuth();

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [categories, setCategories] = useState([]);
  const [photo, setPhoto] = useState("");

  const editorRef = useRef(null);

  const getAllCategories = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/category/get-categories`,
        {
          headers: {
            Authorization: auth?.token,
          },
        }
      );
      if (data?.success) {
        setCategories(data?.categories);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllCategories();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("title", title);
      formData.append("description", description); // Add description to the formData
      formData.append("content", content);
      formData.append("category", category);
      formData.append("photo", photo);

      // Make a POST request to your backend API to save the blog data with the image
      const response = await axios.post(
        `${process.env.REACT_APP_API}/api/v1/blog/create-blog`,
        formData,
        {
          headers: {
            Authorization: auth?.token,
            // 'Content-Type': 'multipart/form-data', // Set the content type for file upload
          },
        }
      );
      if (response.data.success) {
        alert("Blog created successfully");
      } else {
        alert("Failed to create blog");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Error creating blog");
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
      <Editor
        apiKey={process.env.REACT_APP_TINY_EDITOR_API_KEY}
        onInit={(_evt, editor) => (editorRef.current = editor)}
        onEditorChange={(content) => setContent(content)}
        initialValue={content}
        init={{
          height: 500,
          menubar: true,
          plugins: [
            "advlist",
            "autolink",
            "lists",
            "link",
            "image",
            "charmap",
            "preview",
            "anchor",
            "searchreplace",
            "visualblocks",
            "codesample",
            "fullscreen",
            "insertdatetime",
            "media",
            "table",
            "wordcount",
            "emoticons",
            "autosave",
            "code",
            "imagetools",
            "paste",
          ],
          toolbar:
            "undo redo | formatselect | " +
            "bold italic underline forecolor backcolor | " +
            "bullist numlist outdent indent | " +
            "link image media codesample | " +
            "preview fullscreen | " +
            "removeformat",
          content_style: "body { font-family:Inter; font-size:16px }",
          skin: "oxide",
          content_css: "light",
          toolbar_mode: "sliding",
          autosave_interval: "30s",
          paste_data_images: true,
        }}
      />

      <button type="submit">Submit Blog</button>
    </form>
  );
};

export default CreateBlog;
