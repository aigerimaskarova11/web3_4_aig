# Music Premium App

## Project Description

Music Premium is a full-stack web application where users can view artists and their songs.

* Users can register and log in.
* Admins can add and delete artists and songs.
* Regular users can only view artists and songs.
* Frontend is responsive with pink artist and song cards.

---

## API Documentation POSTMAN

### Auth

<img width="1400" height="645" alt="image" src="https://github.com/user-attachments/assets/1c30e221-81af-404c-abfe-2be4761c68b1" />
<img width="1215" height="527" alt="image" src="https://github.com/user-attachments/assets/95876a91-371f-46af-b582-de92184db4e4" />

### Artists

<img width="764" height="817" alt="image" src="https://github.com/user-attachments/assets/eaa8f7f1-6d9e-4087-8432-52a0371a567e" />

---

### Songs
<img width="766" height="750" alt="image" src="https://github.com/user-attachments/assets/3ff4ff9c-cfa1-4edd-abf3-e9b092382b3a" />
---

## Running Project Locally

1. Clone the repository:

```bash
git clone https://github.com/aigerimaskarova11/web3_4_aig.git
cd web3_4_aig
```

2. Install dependencies:

```bash
npm install
```

3. Create a `.env` file in the root folder with:

```
PORT=3000
MONGO_URI=your_mongodb_url
JWT_SECRET=your_jwt_secret
```

4. Run the server:

```bash
npm run dev
```

5. Open your browser:

```
http://localhost:3000
```

* Visit **Home** to see artists and songs.
* Visit **Log In** to authenticate as a user or admin.

---

## Admin Features

* Add / delete artists
* Add / delete songs

---

## Tech Stack

* Node.js & Express.js (Backend)
* MongoDB & Mongoose (Database)
* Vanilla HTML, CSS, JS (Frontend)
