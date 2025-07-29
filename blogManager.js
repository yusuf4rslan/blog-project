const EventEmitter = require("events");
const fs = require("fs/promises");
const path = require("path");
const { json } = require("stream/consumers");

class BlogManager extends EventEmitter {
  constructor() {
    super();
    this.blogsPath = path.join(__dirname, "blogs");
    this.logsPath = path.join(__dirname, "logs");
  }

  async createBlog(title, content) {
    const files = await fs.readdir(this.blogsPath);
    const ids = files
      .filter((file) => {
        return file.startsWith("blog-") && file.endsWith(".json");
      })
      .map((file) =>
        parseInt(file.replace("blog-", "").replace(".json", ""), 10)
      );
    const newId = (ids.length > 0 ? Math.max(...ids) : 0) + 1;
    const newBlog = {
      id: newId.toString(),
      title,
      content,
      date: new Date().toISOString().split("T")[0],
      readCount: 0,
    };

    const filePath = path.join(this.blogsPath, `blog-${newId}.json`);
    await fs.writeFile(filePath, JSON.stringify(newBlog, null, 2));
    this.emit("blogCreated", newBlog);
    return newBlog;
  }

  async readBlog(id) {
    const filePath = path.join(this.blogsPath, `blog-${id}.json`);

    try {
      const data = await fs.readFile(filePath, "utf-8");
      const blog = JSON.parse(data);
      this.emit("blogRead", blog);
      return blog;
    } catch (error) {
      if (error.code === "ENOENT") {
        return null;
      }
      throw error;
    }
  }

  async getAllBlogs() {
    const files = await fs.readdir(this.blogsPath);

    const jsonFiles = files.filter(
      (file) => file.startsWith("blog-") && file.endsWith(".json")
    );

    const blogs = await Promise.all(
      jsonFiles.map(async (file) => {
        const filePath = path.join(this.blogsPath, file);
        const data = await fs.readFile(filePath, "utf-8");
        return JSON.parse(data);
      })
    );
    return blogs;
  }
  async deletedBlog(id) {
    const filePath = path.join(this.blogsPath, `blog-${id}.json`);
    const blogContent = await fs.readFile(filePath, 'utf-8');
    const blog = JSON.parse(blogContent);

    await fs.unlink(filePath);
    this.emit("blogDeleted", blog);
    return { message: `"${blog.title}" başlıklı blog başarıyla silindi.` };
  }

  async logActivity(message) {
    await fs.mkdir(this.logsPath, { recursive: true });

    const logMessage = `[${new Date().toISOString()}] ${message}\n`;
    await fs.appendFile(path.join(this.logsPath, "activity.log"), logMessage);
  }
}

module.exports = BlogManager;
