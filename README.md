# Portfolio 

## Project Description
This project is a web-based portfolio management system for showcasing and managing elements related to the city of Astana. The system supports user roles with different levels of access and functionality.

### Key Features:
- **User Registration and Login**:
  - Register as either an **Administrator** or an **Editor**.
  - Secure login with session-based authentication.

- **Role-Based Access Control**:
  - **Administrator**:
    - Add, update, and delete portfolio elements.
  - **Editor**:
    - Add new portfolio elements only.

- **Portfolio Management**:
  - Showcase a carousel of images and descriptions about Astana.
  - Intuitive interface for managing portfolio items.

## Technologies Used
- **Backend**: Node.js with Express.js framework.
- **Frontend**: EJS templates and CSS for styling.
- **Database**: MongoDB for storing user and portfolio data.
- **Authentication**: Session-based authentication using `express-session`.

## Installation and Setup
Follow these steps to run the project locally:

1. Clone the repository:
   ```bash
   git clone <repository-url>
   Navigate to the project directory:
2.Navigate to the project directory
cd <project-directory>
3.Install dependencies
npm install
4.Create a .env file in the root directory and configure the following variables
MONGO_URI=mongodb://localhost:27017/portfolio_db
SESSION_SECRET=mySuperSecretKey123!
5.Start the server
npm start
6.http://localhost:3000
Usage Instructions
Registration:
Visit the registration page (/register) to create an account as an Administrator or Editor.
Login:
Login with your registered credentials at /login.
Manage Portfolio:
As an Administrator, add, update, or delete portfolio items.
As an Editor, add new items to the portfolio.
Folder Structure
project-directory/

├── models/          # Mongoose models (User, Portfolio)
├── routes/          # Express route handlers
├── views/           # EJS templates
│   ├── partials/    # Reusable components (header, footer)
├── public/          # Static files (CSS, JS)
├── .env             # Environment variables
├── app.js           # Main application file
├── controllers
├── node_modules

