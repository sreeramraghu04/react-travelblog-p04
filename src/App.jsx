import { useState } from "react";
import Navbar from "./components/Navbar";
import Data from "./components/Data";
import AddBlogForm from "./components/AddBlogForm";
import BlogPost from "./components/BlogPost";
import EditForm from "./components/EditForm";

function App() {
  const [blogPost, setBlogPost] = useState(Data);
  const [showBlogForm, setShowBlogForm] = useState(false);

  //! add new blog post
  const addBlogs = (newBlogs) => {
    const newEntry = { id: Date.now(), ...newBlogs };
    const updatedBlogPost = [...blogPost, newEntry];
    setBlogPost(updatedBlogPost);
    localStorage.setItem("data", JSON.stringify(updatedBlogPost));
    setShowBlogForm(false);
    alert("Blog post added successfully.");
  };

  //! Delete a blog post
  const deleteBlog = (id) => {
    const updatedBlogPost = blogPost.filter((blog) => blog.id !== id);
    setBlogPost(updatedBlogPost);
    localStorage.setItem("data", JSON.stringify(updatedBlogPost));
    alert("Blog post deleted successfully!");
  };

  //! Edit blog post
  const editBlog = (id) => {
    setBlogPost((prevPosts) =>
      prevPosts.map((blog) =>
        blog.id === id ? { ...blog, isEditing: !blog.isEditing } : blog
      )
    );
  };

  //! Update blog post after editing
  const updateBlog = (modifiedBlog, id) => {
    const updatedBlogPost = blogPost.map((blog) =>
      blog.id === id ? { ...modifiedBlog, id, isEditing: false } : blog
    );
    setBlogPost(updatedBlogPost);
    localStorage.setItem("data", JSON.stringify(updatedBlogPost));
    alert("Blog post updated successfully!");
  };

  //! Show Add Blog Form
  const handleAddBlogClick = () => {
    setShowBlogForm(prev => !prev);
  };

  return (
    <div>
      <Navbar />
      <div className="container mx-auto px-4 pb-4 mt-20 relative">
        <div className="pt-40">
          <div className="text-white absolute top-0 left-1/2 transform -translate-x-1/2 text-center z-10 pt-2">
            <div className="flex flex-col text-3xl lg:text-5xl md:text-5xl font-extrabold mb-4 text-shadow-lg text-purple-600 font-mono">
              <span>To travel</span>
              <span>is To live</span>
            </div>
            <button
              className="bg-purple-500 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded font-mono hover:cursor-pointer"
              onClick={handleAddBlogClick}
            >
              Add Your Blog Here....!
            </button>
            {showBlogForm && <AddBlogForm addBlogs={addBlogs} />}
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {blogPost.map((blog) =>
            blog.isEditing ? (
              <EditForm
                key={blog.id}
                blog={blog}
                updateBlog={(updatedItem) => updateBlog(updatedItem, blog.id)}
              />
            ) : (
              <BlogPost
                key={blog.id}
                blog={blog}
                deleteBlog={deleteBlog}
                editBlog={editBlog}
              />
            )
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
