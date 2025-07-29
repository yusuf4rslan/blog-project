const express = require("express");
const path = require("path");
// Express'i çalıştırarak 'app' adında bir ana uygulama nesnesi oluşturuyoruz.
// Bütün sunucu mantığımız, rotalarımız ve ayarlarımız bu 'app' nesnesi üzerinden yönetilecek.
// Kısacası bu, bizim sunucumuzun ta kendisi. Binamızın temelini attık.
const app = express();
const BlogManager = require("./blogManager");

const blogManager = new BlogManager();
const errorPagePath = path.join(__dirname, "public", "404.html");
app.use(express.json());

blogManager.on("blogCreated", (blog) => {
  blogManager.logActivity(`Blog created: ${blog.title} (ID: ${blog.id})`);
});
blogManager.on("blogRead", (blog) => {
  blogManager.logActivity(`Blog read: ${blog.title} (ID: ${blog.id})`);
});
blogManager.on("blogDeleted", (blog) => {
  blogManager.logActivity(`Blog silindi: "${blog.title}" (ID: ${blog.id})`);
});
app.get("/", (req, res) => {
  res.send(`<h1>Welcome to My Express App</h1>`);
});
app.get("/blogs", async (req, res) => {
  try {
    const blogs = await blogManager.getAllBlogs();
    res.json(blogs);
  } catch (error) {
    res.status(404).sendFile(errorPagePath);
  }
});
app.get("/blog/:id", async (req, res) => {
  try {
    const blog = await blogManager.readBlog(req.params.id);
    if (blog) {
      res.json(blog);
    } else {
      res.status(404).sendFile(errorPagePath);
    }
  } catch (error) {
    res.status(404).sendFile(errorPagePath);
  }
});
app.post("/create", async (req, res) => {
  try {
    const { title, content } = req.body;

    if (!title || !content) {
      return res
        .status(400)
        .json({ message: "Başlık ve içerik alanları zorunludur." });
    }

    const newBlog = await blogManager.createBlog(title, content);
    res.json(newBlog);
  } catch (error) {
    res.status(500).json({ message: "Blog oluşturulurken bir hata oluştu." });
  }
});
app.delete("/blog/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const result = await blogManager.deletedBlog(id);
    res.json(result);
  } catch (error) {
    res.status(404).json({ message: "Silinecek blog bulunamadı." });
  }
});
app.use((req, res, next) => {
  res.status(404).sendFile(errorPagePath);
});
app.listen(3000, () => {
  console.log("Server is running on http://localhost:3000");
});
