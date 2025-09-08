const Blog = require('../models/travel_blogs'); // adjust path

// Create a new blog
exports.createBlog = async (req, res) => {
  try {
    const blogData = req.body;

    // If you're uploading image as file with multer, handle here
    // For example: blogData.image = req.file ? req.file.path : null;
    // Assuming image URL or object is sent in JSON for now

    const newBlog = new Blog(blogData);
    const savedBlog = await newBlog.save();
    res.status(201).json(savedBlog);
  } catch (err) {
    console.error("Create Blog Error:", err);
    res.status(500).json({ message: "Failed to create blog", error: err });
  }
};

// Get all blogs (optionally filter by hide)
exports.getAllBlogs = async (req, res) => {
  try {
    // Optionally filter hide=0 (not hidden)
    const filter = req.query.hide ? { hide: Number(req.query.hide) } : {};
    const blogs = await Blog.find(filter).sort({ createdAt: -1 });
    res.status(200).json(blogs);
  } catch (err) {
    console.error("Get All Blogs Error:", err);
    res.status(500).json({ message: "Failed to get blogs", error: err });
  }
};

// Get one blog by ID
exports.getBlogById = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);
    if (!blog) return res.status(404).json({ message: "Blog not found" });
    res.status(200).json(blog);
  } catch (err) {
    console.error("Get Blog By ID Error:", err);
    res.status(500).json({ message: "Failed to get blog", error: err });
  }
};

// Update blog by ID
exports.updateBlog = async (req, res) => {
  try {
    const updatedBlog = await Blog.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!updatedBlog) return res.status(404).json({ message: "Blog not found" });
    res.status(200).json(updatedBlog);
  } catch (err) {
    console.error("Update Blog Error:", err);
    res.status(500).json({ message: "Failed to update blog", error: err });
  }
};

// Delete blog by ID
exports.deleteBlog = async (req, res) => {
  try {
    const deletedBlog = await Blog.findByIdAndDelete(req.params.id);
    if (!deletedBlog) return res.status(404).json({ message: "Blog not found" });
    res.status(200).json({ message: "Blog deleted successfully" });
  } catch (err) {
    console.error("Delete Blog Error:", err);
    res.status(500).json({ message: "Failed to delete blog", error: err });
  }
};
