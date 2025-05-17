# Blogging Application Backend

A robust RESTful API backend for a blogging platform built with Node.js, Express, and MongoDB.

## Features

### Authentication & Authorization
- JWT-based authentication system
- Secure password hashing using SHA-256 with salt
- Token refresh mechanism with automatic renewal
- Role-based access control (USER, ADMIN roles)
- Custom token validation with specific error handling

### User Management
- User registration with email and password
- Secure login system
- Profile management
  - Update profile picture
  - View user profile
  - Custom avatar support
- Token-based session management

### Blog Management
- Create, read, update, and delete blog posts
- Support for blog cover images
- Blog categorization and organization
- Author attribution and tracking

### Comment System
- Add comments to blog posts
- View all comments for a specific blog
- Comment management

### Security Features
- JWT token expiration handling
- Secure password storage
- Input validation
- Error handling middleware
- CORS support
- Environment variable configuration

### File Handling
- Image upload support for blog covers
- Profile picture management
- Static file serving

## API Endpoints

### Authentication
- `POST /api/users` - Register new user
- `POST /api/users/login` - User login
- `GET /api/users/refresh-token` - Refresh expired tokens

### User Management
- `GET /api/users` - Get user profile (authenticated)
- `POST /api/users/profile-pic` - Update profile picture (authenticated)

### Blog Management
- `GET /api/blogs` - Get all blogs
- `POST /api/blogs` - Create new blog (authenticated)
- `GET /api/blogs/:id` - Get specific blog

### Comments
- `GET /api/comments/:id` - Get all comments for a blog
- `POST /api/comments` - Add new comment (authenticated)

## Technical Stack

- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB with Mongoose
- **Authentication**: JWT (JSON Web Tokens)
- **File Upload**: Multer
- **Security**: 
  - SHA-256 password hashing
  - JWT token-based authentication
  - Environment variable configuration

## Setup and Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file with the following variables:
   ```
   SECRET_KEY=your_jwt_secret_key
   MONGODB_URI=your_mongodb_connection_string
   ```
4. Start the development server:
   ```bash
   npm run start-dev
   ```

## Security Highlights

- **Token Management**:
  - Automatic token refresh for expired tokens
  - Custom status code (498) for invalid tokens
  - Secure token verification and validation

- **Password Security**:
  - Salt-based password hashing
  - Secure password storage
  - Password validation

- **Error Handling**:
  - Custom error responses
  - Proper HTTP status codes
  - Detailed error messages

## Development

The application uses nodemon for development, providing automatic server restart on file changes.

```bash
npm run start-dev
```

## Production

For production deployment:

```bash
npm start
```

## Environment Variables

Required environment variables:
- `SECRET_KEY`: JWT secret key for token generation
- `MONGODB_URI`: MongoDB connection string

## Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Create a new Pull Request
