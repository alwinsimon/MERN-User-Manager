# MERN-User-Manager

![Node.js](https://img.shields.io/badge/Node.js-v14.17.0-green)
![Express](https://img.shields.io/badge/Express-v4.17.1-blue)
![JWT](https://img.shields.io/badge/JSON%20Web%20Token-v8.5.1-orange)

 This repository contains a production-ready the backend server and frontend application for a basic MERN Stack user management application.  
 
 Back-end is built with Node.js and Express and MongoDB for Database.

 Front-end is built with Reactjs using Vitejs. 
 
 It leverages two custom npm modules, [base-auth-handler](https://www.npmjs.com/package/base-auth-handler) for authentication handling and [base-error-handler](https://www.npmjs.com/package/base-error-handler) for error management.

## Features

- **Authentication Handling:** Uses [base-auth-handler](https://www.npmjs.com/package/base-auth-handler) for robust authentication with JWT sent in cookies.
- **Error Management:** Utilizes [base-error-handler](https://www.npmjs.com/package/base-error-handler) for effective error handling.
- **Logger:** Implements a production-level logger created with Winston and Morgan, saving logs into a remote MongoDB instance.


## API Documentation

**Note:** The detailed Backend API documentation is available on Postman. 
Please refer to [API Documentation on Postman](https://documenter.getpostman.com/view/27773540/2s9YeG4qvf).

Additionally, Swagger is integrated for convenient exploration of the API:

- Swagger UI: [http://localhost:5000/api-docs](http://localhost:5000/api-docs)

You can also access the API documentation in JSON format:

- API Docs JSON: [http://localhost:5000/api-docs.json](http://localhost:5000/api-docs.json)

### Backend Server
- Base URL: [http://localhost:5000](http://localhost:5000)

### Frontend Server
- Base URL: [http://localhost:3000](http://localhost:3000)

## Prerequisites

- Node.js
- Express
- React.js
- JSON Web Token (JWT)
- MongoDB

## Environment Variables

```bash
APPLICATION_NAME = MERN-User-Manager  
PORT = 5000  
NODE_ENV = development  
(Use development for dev environment and production for prod environment)  
JWT_KEY = your_jwt_key_here  
JWT_TOKEN_DURATION = 30d  
MONGO_DB_URI = your_mongodburi_here  
ADMIN_REGISTRATION_KEY = your_adminSecret  
```

## Getting Started

1. **Clone the repository:**

   ```bash
   git clone https://github.com/alwinsimon/MERN-User-Manager.git
   ```

2. **Install dependencies:**

   ```bash
   cd MERN-User-Manager
   ```
   ```bash
   npm install
   ```

   Install Front-end dependencies.
   ```bash
   cd frontend
   ```

   ```bash
   npm install
   ```

3. **Set up environment variables:**

   Create a `.env` file in the root of the project and add the environment variables listed above.

4. **Run the server:**

    Execute following command in the root directory of the project.  

   ```bash
   npm run app
   ```

   The back-end server will be running at [http://localhost:5000](http://localhost:5000) or the specified port in your `.env` file.

   The front-end server will be running at [http://localhost:3000](http://localhost:3000).


## Dependencies

- See back-end [package.json](https://github.com/alwinsimon/MERN-User-Manager/blob/v1/package.json) for a detailed list of dependencies.

## Contributing

Feel free to contribute and provide feedback!  

Create issues for bug reports or feature requests.

## License

This project is licensed under the MIT License - see the [LICENSE](https://github.com/alwinsimon/MERN-User-Manager/blob/main/LICENSE) file for details.