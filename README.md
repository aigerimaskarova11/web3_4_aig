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

POSTMAN:

<img width="1400" height="645" alt="image" src="https://github.com/user-attachments/assets/fd6c1487-10f0-404e-b847-3846afd03107" />

<img width="1215" height="527" alt="image" src="https://github.com/user-attachments/assets/e296f409-e861-4d44-9f7d-d7a9413e1c5b" />

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
frontend: 
<img width="1918" height="972" alt="Снимок экрана 2026-02-04 171342" src="https://github.com/user-attachments/assets/adf7d0d2-2a79-4d80-8fd8-16ed86f1c5b6" />

<img width="1919" height="895" alt="Снимок экрана 2026-02-04 171409" src="https://github.com/user-attachments/assets/152c20d6-8195-47fe-966c-8a13266a90c8" />

<img width="1919" height="968" alt="Снимок экрана 2026-02-04 171422" src="https://github.com/user-attachments/assets/8da1abf3-4be5-4c42-a356-17cd6c2699a7" />

## Conclusion

This project demonstrates:

* MVC architecture
* RESTful API design
* MongoDB relationships
* Secure authentication with JWT
* Role-Based Access Control
