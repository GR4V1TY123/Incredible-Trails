# Incredible-Trails
---



## Table of Contents

- [Installation](#installation)
- [Environment Variables](#environment-variables)
- [Running the Server](#running-the-server)
- [API Documentation](#api-documentation)
- [Project Structure](#project-structure)
- [Contributing](#contributing)
- [License](#license)

## Installation

### Prerequisites

Make sure you have the following installed:

- **Node.js** (>= 14.x)  
- **MongoDB** (either locally or via a cloud service like MongoDB Atlas)

### Clone the Repository

```bash
git clone https://github.com/yourusername/incredible-trails.git
cd incredible-trails
```

### Install Dependencies

```bash
npm install
```

This will install all the required dependencies listed in the `package.json` file.

## Environment Variables

To run the server, you'll need to configure the environment variables. Create a `.env` file in the root directory with the following variables:

```bash
# RapidAPI credentials (for API calls)
RAPIDAPI_KEY=your-rapidapi-key-here
RAPIDAPI_HOST=apidojo-booking-v1.p.rapidapi.com

# Server port
PORT=3000
```

Make sure to replace placeholders with actual credentials.

### MongoDB Setup

You need a MongoDB database running. You can either:

- Run MongoDB locally, or
- Use a cloud MongoDB service like **MongoDB Atlas**.

Update the `MONGO_URI` in your `.env` file to point to your MongoDB instance.

## Running the Server

1. **Start MongoDB**: Ensure your MongoDB service is running.

2. **Run the server**:

You can start the server in development mode using Nodemon (which automatically restarts the server on file changes):

```bash
nodemon incredibleTrails/main.js
```

Alternatively, you can run it with the standard `node` command:

```bash
node incredibleTrails/main.js
```

Once the server is running, you'll see the following output in the terminal:

```bash
Server Running...........
MONGO CONNECTION OPEN!!!
```

The server will be running at `http://localhost:3000` (or the port defined in your `.env` file).

### API Endpoints

The API will be accessible via `http://localhost:3000/api/`. For example, you can fetch properties using:

```bash
http://localhost:3000/api/properties/list-by-map?room_qty=1&guest_qty=1...
```

## API Documentation

This project includes various API endpoints for fetching and managing travel-related data. A full API documentation will be added soon.


- **main.js**: Entry point for the application. Starts the Express server.
- **controller/trail.js**: Contains logic for handling the API requests.
- **routes/api.js**: Defines the routes for API endpoints.
- **views/**: EJS templates for rendering data (if using EJS in the project).



INCOMPLETE YET
