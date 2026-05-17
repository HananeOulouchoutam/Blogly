import React, { useEffect, useRef, useState } from "react";
import { assets, blogCategories } from "../../assets/assets";
import Quill from "quill";
import { useAppContext } from "../../../context/AppContext";
import toast from "react-hot-toast";
import { parse } from "marked";

const AddBlog = () => {
  const { axios } = useAppContext();
  const [isAdding, setIsAdding] = useState(false);
  const [loading, setLoading] = useState(false);

  const editorRef = useRef(null);
  const quillRef = useRef(null);

  const [image, setImage] = useState("");
  const [data, setData] = useState({
    title: "",
    subTitle: "",
    category: "Startup",
    isPublished: false,
  });

  const onChangeHandler = (e) => {
    const { name, value, checked } = e.target;
    if (name === "isPublished") {
      setData({ ...data, [name]: checked });
    } else {
      setData({ ...data, [name]: value });
    }
  };

  const onSubmitHandler = async (e) => {
    try {
      e.preventDefault();
      setIsAdding(true);
      const blog = {
        ...data,
        description: quillRef.current.root.innerHTML,
      };

      const formData = new FormData();
      formData.append("blog", JSON.stringify(blog));
      formData.append("image", image);

      const response = await axios.post("/api/blog/add", formData);
      if (response.data.success) {
        toast.success(response.data.message);
        setData({
          title: "",
          subTitle: "",
          category: "Startup",
          isPublished: false,
        });
        setImage("");
        quillRef.current.root.innerHTML = "";
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error(error.message);
    } finally {
      setIsAdding(false);
    }
  };

  const generateContent = async () => {
    if (!data.title) return toast.error("Please enter a title");
    try {
      setLoading(true);
      const response = await axios.post("/api/blog/generate", {
        prompt: data.title,
      });
      if (response.data.success) {
        quillRef.current.root.innerHTML = parse(response.data.content);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // Initiate Quill only once
    if (!quillRef.current && editorRef.current) {
      quillRef.current = new Quill(editorRef.current, { theme: "snow" });
    }
  }, []);

  return (
    <form
      onSubmit={onSubmitHandler}
      className="flex-1 bg-blue-50/50 text-gray-600 h-full overflow-scroll"
    >
      <div className="bg-white w-full max-w-3xl p-4 md:p-10 sm:m-10 shadow rounded">
        <p>Upload thumbnail</p>
        <label htmlFor="image">
          <img
            src={image ? URL.createObjectURL(image) : assets.upload_area}
            alt=""
            className="mt-2 h-16 rounded cursor-pointer"
          />
          <input
            type="file"
            id="image"
            name="image"
            onChange={(e) => setImage(e.target.files[0])}
            hidden
            required
          />
        </label>

        <label htmlFor="title">
          <p className="mt-4">Blog title</p>
          <input
            type="text"
            name="title"
            id="title"
            placeholder="Type here"
            className="w-full max-w-lg mt-2 p-2 border border-gray-300 outline-none rounded"
            value={data.title}
            onChange={onChangeHandler}
            required
          />
        </label>

        <label htmlFor="subTitle">
          <p className="mt-4">Sub title</p>
          <input
            type="text"
            name="subTitle"
            id="subTitle"
            placeholder="Type here"
            className="w-full max-w-lg mt-2 p-2 border border-gray-300 outline-none rounded"
            value={data.subTitle}
            onChange={onChangeHandler}
            required
          />
        </label>

        <p className="mt-4">Blog Description</p>
        <div className="max-w-lg h-74 pb-16 sm:pb-10 pt-2 relative">
          <div ref={editorRef}></div>
          {loading && (
            <div className='absolute right-0 top-0 bottom-0 left-0 flex items-center justify-center bg-black/10 mt-2' >
              <div className='w-8 h-8 rounded-full border-2 border-t-white animate-spin'>

              </div>

            </div>
          )}
          <button
            disabled={loading}
            type="button"
            onClick={generateContent}
            className="absolute bottom-1 right-2 ml-2 text-xs text-white bg-black/70 px-4 py-1.5 rounded hover:underline cursor-pointer"
          >
            Generate with IA
          </button>
        </div>

        <p className="mt-4">Blog category</p>
        <select
          onChange={onChangeHandler}
          name="category"
          value={data.category}
          className="mt-2 px-3 py-2 border text-gray-500 border-gray-300 outline-none rounded"
        >
          <option value="">Select category</option>
          {blogCategories.map((item, index) => {
            return (
              <option key={index} value={item}>
                {item}
              </option>
            );
          })}
        </select>

        <div className="flex gap-2 mt-4">
          <p>Publish Now</p>
          <input
            name="isPublished"
            type="checkbox"
            className="scale-125 cursor-pointer"
            checked={data.isPublished}
            onChange={onChangeHandler}
          />
        </div>

        <button
          disabled={isAdding}
          type="submit"
          className="mt-8 w-40 h-10 bg-primary text-white rounded cursor-pointer text-sm"
        >
          {isAdding ? "Adding..." : "Add Blog"}
        </button>
      </div>
    </form>
  );
};

export default AddBlog;
