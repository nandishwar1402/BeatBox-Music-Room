# BeatBox Music Room

**Backend Development Fundamentals – Group Project**

## 1. Project Overview

BeatBox Music Room is a backend project developed using Node.js, Express.js and SQLite.

The main idea of this project is to manage musical instruments, musicians and instrument borrowing details. Users can view instruments, add new instruments, update existing details and delete records through APIs.

We also created a loans feature to show which musician borrowed which instrument. For this, we used SQL JOIN operations to get information from different database tables.

Apart from CRUD operations, we added input validation and a smart search feature. The search works with both uppercase and lowercase letters and also handles cases where no matching instrument is found.

Through this project, we got practical experience in backend development, database operations, API testing and GitHub collaboration.

## 2. Problem Statement

Managing musical instruments and their borrowing details manually can become difficult when there are many instruments and musicians.

A music room needs a system to:

- Store musician details.
- Maintain instrument information.
- Track borrowed instruments.
- View instrument details whenever needed.
- Update or delete instrument records.
- Search instruments by name or family.
- Prevent incomplete information from being saved.
- Display loan details with musician and instrument names.

To solve these problems, we developed BeatBox Music Room using Node.js, Express.js and an SQLite database.

## 3. Project Objectives

The main objectives of our project are:

- To develop a backend application using Node.js and Express.js.
- To create an SQLite database with related tables.
- To manage musicians, instruments and loans.
- To implement CRUD operations for instruments.
- To retrieve loan details using SQL JOIN.
- To add validation for instrument information.
- To implement case-insensitive smart search.
- To handle invalid requests and missing records.
- To test the APIs using Postman.
- To maintain project code using Git and GitHub.

## 4. Technologies Used

| Technology | Purpose |
|---|---|
| Node.js | Running JavaScript on the server |
| Express.js | Creating backend APIs |
| SQLite | Storing project data |
| JavaScript | Writing application logic |
| SQL | Performing database operations |
| Postman | Testing API requests |
| Git | Tracking code changes |
| GitHub | Sharing and managing team code |

## 5. System Architecture

Our application works in the following order:

**Client / Postman → Express Server → API Routes → Database Operations → SQLite Database**

### How it works

1. The client sends a request to the server.
2. Express receives the request.
3. The required API route handles it.
4. Validation or search logic is applied when needed.
5. The application communicates with SQLite.
6. SQLite returns the required data or operation result.
7. The server sends the response in JSON format.

We divided the application into different parts to make the code easier to manage and understand.

## 6. Database Design

We used SQLite and created three main tables for our project.

### 6.1 Musicians Table

This table stores musician details.

- `id` – Unique ID of the musician.
- `name` – Name of the musician.

### 6.2 Instruments Table

This table stores musical instrument details.

- `id` – Unique ID of the instrument.
- `name` – Name of the instrument.
- `family` – Category of the instrument.

### 6.3 Loans Table

This table stores the borrowing details.

- `id` – Unique ID of the loan.
- `musician_id` – ID of the musician.
- `instrument_id` – ID of the borrowed instrument.
- `loan_date` – Date when the instrument was borrowed.
- `return_date` – Expected return date.

### 6.4 Relationship Between Tables

The three tables are connected using foreign keys.

- One musician can have multiple loan records.
- One instrument can appear in multiple loan records over time.
- Each loan connects a musician with an instrument.

We used `musician_id` and `instrument_id` in the loans table to connect the related records.

## 7. API Development

We developed REST APIs using Express.js.

**Base URL:**

`http://localhost:3000/api`

### 7.1 Instrument APIs

| Method | Endpoint | Description |
|---|---|---|
| GET | `/instruments` | Get all instruments |
| GET | `/instruments/:id` | Get an instrument by ID |
| POST | `/instruments` | Add a new instrument |
| PUT | `/instruments/:id` | Update an instrument |
| DELETE | `/instruments/:id` | Delete an instrument |

### 7.2 Retrieve All Instruments

**Request:**

`GET /api/instruments`

This API displays all the instruments available in the database.

**Example response:**

```json
{
  "success": true,
  "message": "Instruments retrieved successfully",
  "data": [
    {
      "id": 1,
      "name": "Guitar",
      "family": "Strings"
    },
    {
      "id": 2,
      "name": "Piano",
      "family": "Keyboard"
    }
  ]
}
```

### 7.3 Retrieve an Instrument by ID

**Request:**

`GET /api/instruments/1`

This API is used to get the details of a particular instrument using its ID.

### 7.4 Add a New Instrument

**Request:**

`POST /api/instruments`

**Request body:**

```json
{
  "name": "Violin",
  "family": "Strings"
}
```

This API adds a new instrument to the database.

### 7.5 Update an Instrument

**Request:**

`PUT /api/instruments/1`

**Request body:**

```json
{
  "name": "Electric Guitar",
  "family": "Strings"
}
```

This API updates the details of an existing instrument.

### 7.6 Delete an Instrument

**Request:**

`DELETE /api/instruments/1`

This API deletes the instrument record using its ID.

## 8. Smart Search Functionality

We added a smart search feature to make finding instruments easier.

Users can search using the instrument name or family by passing the `q` parameter.

**Search using lowercase:**

`GET /api/instruments?q=guitar`

**Search using uppercase:**

`GET /api/instruments?q=GUITAR`

Both searches return the matching instrument because our search is case-insensitive.

### Search Behaviour

| Search Query | Result |
|---|---|
| `guitar` | Returns matching instruments |
| `GUITAR` | Returns the same matching instruments |
| `zzz` | Returns an empty result |

When there is no matching instrument, the API returns a message instead of treating it as a server error.

**Example response:**

```json
{
  "success": true,
  "message": "Nothing found",
  "data": []
}
```

This was one of the special search requirements we checked during the project.

## 9. Input Validation

We added input validation to make sure that required instrument details are provided before saving or updating records.

For example, the instrument name should not be empty.

**Example invalid request:**

```json
{
  "name": "",
  "family": "Strings"
}
```

**Response:**

```json
{
  "success": false,
  "message": "Instrument name is required"
}
```

This helps prevent incomplete instrument details from being stored in the database.

## 10. Loans API and SQL JOIN

**Request:**

`GET /api/loans`

We created a loans API to display which musician borrowed which instrument.

The loans table contains musician and instrument IDs. Instead of showing only these IDs, we used SQL JOIN to retrieve the actual musician and instrument names from their respective tables.

The response includes:

- Musician name
- Instrument name
- Loan date
- Return date

**Example response:**

```json
{
  "success": true,
  "message": "Loans retrieved successfully",
  "data": [
    {
      "musician_name": "Rahul",
      "instrument_name": "Guitar",
      "loan_date": "2026-11-10",
      "return_date": "2026-11-20"
    }
  ]
}
```

This makes the loan information easier to read and understand.

## 11. Postman API Testing

Postman is used to send API requests and check the responses from our backend.

We prepared API testing cases for the main features of the project.

### Testing Cases

| No. | Test Case | Expected Result |
|---|---|---|
| 1 | Get all instruments | Instrument list returned |
| 2 | Get instrument by ID | Correct instrument returned |
| 3 | Add a new instrument | New record created |
| 4 | Update an instrument | Record updated |
| 5 | Delete an instrument | Record deleted |
| 6 | Lowercase search | Matching records returned |
| 7 | Uppercase search | Same matching records returned |
| 8 | Search with `zzz` | Empty result returned |
| 9 | Submit empty instrument name | Validation error returned |
| 10 | Get all loans | Musician and instrument details returned |

### Smart Search Twist Testing

We also checked the three special search conditions:

- `?q=guitar` – Returns the matching instrument.
- `?q=GUITAR` – Returns the same matching instrument.
- `?q=zzz` – Returns an empty result with the message `Nothing found`.

### Postman Collection

The collection file is kept in the following location:

`postman/BeatBox Music Room – Neha Testing.postman_collection.json`

To test the APIs using Postman:

1. Open Postman.
2. Import the collection JSON file.
3. Start the BeatBox Music Room server.
4. Send the required API requests.
5. Check the response status and returned data.

**Note:** The current exported collection still needs the actual API requests to be added and verified.

## 12. Screenshots and Testing Evidence

We have a `screenshots` folder in the repository to keep the project testing evidence.

The planned testing screenshots cover:

- Getting all instruments.
- Getting an instrument by ID.
- Adding an instrument.
- Updating an instrument.
- Deleting an instrument.
- Lowercase search.
- Uppercase search.
- No-match search.
- Input validation.
- Retrieving loan information.

**Folder name:** `screenshots/`

These screenshots help show how the APIs work and what responses they return. The final submission should contain the actual testing screenshots.

## 13. How to Run the Project

Follow these steps to run BeatBox Music Room on your system.

### Requirements

- Node.js
- npm
- Git
- Postman (for API testing)

### Step 1: Clone the Repository

```bash
git clone https://github.com/nandishwar1402/BeatBox-Music-Room.git
```

### Step 2: Open the Project Folder

```bash
cd BeatBox-Music-Room
```

### Step 3: Install Dependencies

```bash
npm install
```

### Step 4: Set Up the Database

Run the database test script:

```bash
node database/test-db.js
```

To insert the sample records into a fresh database, run:

```bash
node database/seed.js
```

Run the seed script only when setting up fresh sample data. Do not run it repeatedly if the records already exist.

### Step 5: Start the Server

```bash
npm start
```

Expected output:

```text
BeatBox Music Room running at http://localhost:3000
```

### Step 6: Test the APIs

Open Postman and use this base URL:

`http://localhost:3000/api`

You can now test the instrument and loans APIs.

## 14. Team Contributions

We divided the project into different tasks so that each team member could work on a separate part.

### Member 1 – H. Nandishwar Reddy

**Responsibility: Server Setup and Main Route Integration**

- Set up the Express.js server.
- Configured the application entry point.
- Organized the main API routes.
- Connected the server with the database and API modules.
- Integrated the work submitted by other team members.

### Member 2 – K. Sai Nihal

**Responsibility: SQLite Database Development**

- Created the SQLite database setup.
- Created the musicians table.
- Created the instruments table.
- Created the loans table.
- Added sample records.
- Created database testing and data-viewing scripts.
- Checked database connectivity and table creation.

### Member 3 – G. Rishitha

**Responsibility: Instrument CRUD and Loans API**

- Implemented instrument retrieval.
- Developed the API to get an instrument by ID.
- Added new instrument functionality.
- Implemented instrument update and delete operations.
- Developed the loans API.
- Used SQL JOIN to retrieve musician and instrument details.

### Member 4 – G. Yuvatej

**Responsibility: Input Validation and Search**

- Added validation for instrument details.
- Checked required input fields.
- Added validation error responses.
- Developed the instrument search feature.
- Supported searching by instrument name and family.
- Implemented case-insensitive search behaviour.

### Member 5 – G. Neha

**Responsibility: Postman Testing and Documentation**

- Worked on the Postman API collection.
- Prepared API testing cases.
- Worked on testing the instrument CRUD operations.
- Checked lowercase and uppercase search.
- Tested the no-match search condition.
- Checked input validation.
- Tested the loans JOIN API.
- Worked on testing screenshots and project documentation.

### Member 6 – Team Contribution

**Responsibility: Smart Search Twist Verification and Integration**

- Worked together to check the special search requirements.
- Verified lowercase and uppercase search results.
- Checked the no-match response.
- Reviewed the integrated project functionality.

## 15. GitHub Collaboration and Version Control

We used Git and GitHub to work together on this project.

Each member worked on a separate feature branch for their assigned task. After completing the work, the changes were shared through commits and pull requests.

We used:

- Git branches to work on separate features.
- Commits to save our changes.
- Pull requests to merge completed work.
- GitHub to maintain the project repository.

After completing the individual tasks, we merged the contributions into the main branch and checked the integrated application.

This helped us understand how multiple developers can work on the same project.

## 16. Learning Outcomes

While developing this project, we learned many things about backend development.

Some of the things we learned are:

- How to use Node.js for backend development.
- How to create REST APIs using Express.js.
- How to connect an application with SQLite.
- How to create and manage database tables.
- How to perform CRUD operations.
- How primary keys and foreign keys work.
- How to retrieve related records using SQL JOIN.
- How to validate user input.
- How to implement case-insensitive search.
- How to test APIs.
- How to use Git and GitHub.
- How to work together on a group project.

## 17. Conclusion

BeatBox Music Room helped us understand how a backend application is developed and connected to a database.

We created APIs to manage musical instruments and retrieve loan information. We also implemented CRUD operations, input validation, SQL JOIN and smart search.

During the project, we worked with Node.js, Express.js, SQLite, SQL, Git and GitHub. We also got experience in dividing tasks, sharing code and integrating different contributions.

Overall, this project gave us practical experience in backend development and teamwork.

## 18. Repository Structure

The main folders and files in our project are:

```text
BeatBox-Music-Room/
│
├── database/
│   ├── db.js
│   ├── seed.js
│   ├── test-db.js
│   └── view-data.js
│
├── middleware/
│
├── routes/
│
├── postman/
│   └── BeatBox Music Room – Neha Testing.postman_collection.json
│
├── screenshots/
│
├── src/
│
├── README.md
├── package.json
└── .gitignore
```

This shows the main parts of our project. The exact files and folders are available in the GitHub repository.

---

**Project:** BeatBox Music Room  
**Subject:** Backend Development Fundamentals  
**Repository:** https://github.com/nandishwar1402/BeatBox-Music-Room  
**Team:** 5 members + team collaboration