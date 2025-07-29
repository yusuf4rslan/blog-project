# Blog Management System

A simple yet powerful RESTful API for managing blog posts built with Node.js and Express.js. This system provides full CRUD operations for blog management with activity logging and event-driven architecture.

## Features

- ✨ **RESTful API Design** - Clean and intuitive endpoints
- 📝 **Full CRUD Operations** - Create, read, update, and delete blog posts
- 📊 **Activity Logging** - Automatic logging of all blog operations
- 🎯 **Event-Driven Architecture** - Uses EventEmitter for loose coupling
- 📁 **File-Based Storage** - JSON files for simple data persistence
- 🔍 **Error Handling** - Comprehensive error handling with custom 404 pages
- 🚀 **Auto-Reload** - Development server with nodemon for instant updates

## Tech Stack

- **Backend**: Node.js, Express.js
- **Storage**: File system (JSON files)
- **Development**: Nodemon for auto-reload
- **Architecture**: Event-driven with EventEmitter

## Installation

1. Clone the repository:

```bash
git clone <your-repo-url>
cd blog-management-system
```

2. Install dependencies:

```bash
npm install
```

3. Start the development server:

```bash
npm start
```

The server will start on `http://localhost:3000`

## API Endpoints

### Get All Blogs

```http
GET /blogs
```

Returns all blog posts in JSON format.

### Get Single Blog

```http
GET /blog/:id
```

Returns a specific blog post by ID.

### Create New Blog

```http
POST /create
Content-Type: application/json

{
  "title": "Your Blog Title",
  "content": "Your blog content here..."
}
```

### Delete Blog

```http
DELETE /blog/:id
```

Deletes a blog post by ID.

### Home Page

```http
GET /
```

Returns a welcome message.

## Project Structure

```
├── blogs/              # Blog storage directory
│   ├── blog-1.json    # Individual blog files
│   ├── blog-2.json
│   └── ...
├── logs/              # Activity logs
│   └── activity.log   # System activity log
├── public/            # Static files
│   └── 404.html      # Custom 404 error page
├── blogManager.js     # Core blog management logic
├── server.js          # Express server setup
└── package.json       # Project dependencies
```

## Blog Data Structure

Each blog post is stored as a JSON file with the following structure:

```json
{
  "id": "1",
  "title": "Blog Title",
  "content": "Blog content...",
  "date": "2025-07-29",
  "readCount": 0
}
```

## Event System

The system uses Node.js EventEmitter to handle blog operations:

- `blogCreated` - Triggered when a new blog is created
- `blogRead` - Triggered when a blog is accessed
- `blogDeleted` - Triggered when a blog is deleted

All events are automatically logged to `logs/activity.log`.

## Development

The project uses nodemon for development, which automatically restarts the server when files change:

```bash
npm start
```

## Error Handling

- **404 Errors**: Custom 404 page for missing resources
- **400 Errors**: Validation errors for missing required fields
- **500 Errors**: Server errors with appropriate error messages

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the ISC License.

## Author

**Yusuf Arslan**

---

_Built with ❤️ using Node.js and Express.js_
