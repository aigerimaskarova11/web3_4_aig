# Assignment 4 – REST API with MVC, JWT & RBAC

## Project Overview

In this project, I extended my Assignment 3 by refactoring the application into a professional **MVC (Model-View-Controller)** architecture and adding **security features** such as authentication, password hashing, JWT, and Role-Based Access Control (RBAC).

The project is a **REST API** built with **Node.js, Express, and MongoDB**.
It manages two related objects: **Artists** and **Songs**.

---

## Objects Description

### 1. Artist (Primary Object)

The Artist object represents a music artist.

**Fields:**

* `name` (String) – artist name
* `genre` (String) – music genre
* `debutYear` (Number) – year of debut

Each artist can have multiple songs.

---

### 2. Song (Secondary Object)

The Song object represents a song created by an artist.

**Fields:**

* `title` (String) – song title
* `duration` (Number) – song duration in seconds
* `artist` (ObjectId) – reference to an Artist

Songs are **linked to Artists** using MongoDB ObjectId, and artist details are shown using `.populate()`.

---

## Project Architecture (MVC)

The project follows the MVC pattern:

* **Models** – Mongoose schemas for Artist, Song, and User
* **Controllers** – business logic and database operations
* **Routes** – API endpoints and HTTP methods
* **Middleware** – authentication, authorization, and role checking

This structure makes the project scalable, readable, and easy to maintain.

---

## Authentication & Security

### User System

The application includes a User model with:

* `email`
* `password`
* `role` (`user` or `admin`)

### Password Hashing

Passwords are hashed using **bcrypt** before being saved to the database.
Plain-text passwords are never stored.

### JWT Authentication

After login, the server generates a **JWT token**.
This token must be sent in the request headers to access protected routes.

---

## Role-Based Access Control (RBAC)

The application uses RBAC to restrict access:

* **Public Access**

  * `GET` requests (read data) are available to everyone

* **Protected Access**

  * `POST`, `PUT`, `DELETE` requests require authentication

* **Admin Only**

  * Only users with the role `admin` can create, update, or delete artists and songs

If a regular user tries to access admin-only routes, the server returns a `403 Forbidden` error.

---

## Setup Instructions

### 1. Install Dependencies

```bash
npm install
```

### 2. Configure MongoDB

* Create a MongoDB Atlas cluster
* Add a database user
* Allow network access (`0.0.0.0/0`)
* Paste the connection string into `config/db.js`

### 3. Run the Server

```bash
npm run dev
```

The server will start on:

```
http://localhost:3000
```

---

## API Testing

All API endpoints were tested using **Postman**:

* User registration and login
* JWT authorization
* Admin vs user access control
* CRUD operations for Artists and Songs

---

## Conclusion

This project demonstrates:

* MVC architecture
* RESTful API design
* MongoDB relationships
* Secure authentication with JWT
* Role-Based Access Control
