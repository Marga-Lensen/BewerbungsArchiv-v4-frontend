
# fileUpload-frontend - Job Application Manager | "BewerbungsArchiv"

This React frontend allows you to view and manage your job applications, including uploaded CVs and cover letters.

## Running the Frontend

1. Run `npm install` to install dependencies.
2. Start the frontend with `npm run dev`.
3. Ensure your backend server is running and accessible at the expected URL, i.e. "`http://localhost:3000`".

---

## Fetching Data and API URLs

The frontend fetches data from the backend "fileUpload-backend" using hardcoded URLs pointing to `localhost:3000`. Specifically:

- In `src/components/SubmissionsList.jsx`, the job application data is fetched from:

```js
fetch("http://localhost:3000/bewerbungen")
```


* Uploaded files (CVs and cover letters) are linked using URLs like:


```js
<a href={`http://localhost:3000/uploads/${item.cvFile}`} target="_blank" rel="noopener noreferrer">

```

#
## Changing the Backend Port or Base URL

If your backend server runs on a different port or host, update these URLs manually in `SubmissionsList.jsx`:

* Change the fetch URL for job applications.
* Change the `href` URLs for file downloads.

Example: If backend runs on port 4000, replace `localhost:3000` with `localhost:4000`.

---

## Quick Backend Checks

You can quickly test and verify the backend API with these methods:

* Open in your browser to see the list of uploaded files (GET):

  ```
  http://localhost:3000/files
  ```
* Use [Postman](https://www.postman.com/) or similar tool to test POST routes such as file upload and adding applications.

---

## API Routes Overview

| Method | Route                | Description                        |
| ------ | -------------------- | ---------------------------------- |
| GET    | `/bewerbungen`       | Fetch all job applications         |
| GET    | `/files`             | List all uploaded files            |
| POST   | `/upload`            | Upload a file (CV or cover letter) |
| POST   | `/bewerbung`         | Add a new job application          |
| GET    | `/uploads/:filename` | Serve uploaded files (static)      |

---


