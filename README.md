# Books REST API

A small Node.js and Express API for creating, listing, replacing, and deleting books. Books are stored in memory, so the list resets whenever the server restarts.

## Run

```sh
npm install
npm start
```

The server listens on port `3000` by default. Set the `PORT` environment variable to use another port.

## Endpoints

| Method | Path | Description | Success response |
| --- | --- | --- | --- |
| GET | `/books` | Return all books | `200` and a JSON array |
| POST | `/books` | Create a book | `201` and the created book |
| PUT | `/books/:id` | Replace a book | `200` and the updated book |
| DELETE | `/books/:id` | Delete a book | `204` with no response body |

Each book has the shape `{ "id": 1, "title": "Dune", "author": "Frank Herbert" }`. For POST and PUT, send a JSON object containing non-empty string values for both `title` and `author`. The API assigns IDs; a supplied ID is ignored. Missing books return `404`, and invalid input returns `400` with a JSON error.

## Try it with Postman

For POST, choose `POST http://localhost:3000/books`, select **Body > raw > JSON**, and send:

```json
{
  "title": "Dune",
  "author": "Frank Herbert"
}
```

Use the returned `id` in `PUT http://localhost:3000/books/1` or `DELETE http://localhost:3000/books/1`. All requests can also be sent to `http://localhost:3000/books` with their respective methods. GET returns an empty array before any books are added.

No external dataset or screenshots are needed for this in-memory API; the POST request above provides sample data.

## Concepts covered

- REST resources and HTTP methods: GET, POST, PUT, and DELETE.
- Express route handlers and URL parameters.
- JSON request parsing and response status codes.
- In-memory storage, which is temporary and is not shared across server restarts.

## Interview questions

1. What is the difference between PUT and POST?
2. Why should an API return different HTTP status codes for created, missing, and invalid resources?
3. What happens to this API's data when the Node.js process restarts?