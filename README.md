# BeatBox Music Room
## Backend Development Fundamentals – Group Project

---

## 1. Project Overview

**BeatBox Music Room** is a backend-based music instrument management system developed using Node.js, Express.js, and SQLite.

The main purpose of this project is to manage musical instruments, musicians, and instrument loans through RESTful APIs. The application allows users to view available instruments, retrieve individual instrument details, add new instruments, update existing instrument information, and delete instruments.

It also provides a loan management feature that connects musicians with the instruments they borrow. The system retrieves related information from multiple database tables using SQL JOIN operations.

In addition to basic CRUD operations, the project includes input validation and a smart search feature. Users can search for instruments using their names or instrument families. The search works regardless of uppercase or lowercase letters and returns an appropriate response when no matching records are found.

The project demonstrates how a backend application can communicate with a relational database and provide structured data through REST APIs.

## 2. Problem Statement

Managing musical instruments and their borrowing records manually can become difficult when the number of instruments and musicians increases.

A music room needs a simple system to:

- Maintain details of different musical instruments.
- Store information about musicians.
- Track which instruments are borrowed by musicians.
- Retrieve instrument information whenever required.
- Update instrument records when details change.
- Remove unnecessary instrument records.
- Search instruments quickly using their names or categories.
- Prevent incomplete or invalid information from entering the database.
- Display loan details along with the related musician and instrument names.

To address these requirements, BeatBox Music Room provides a backend API system supported by an SQLite relational database.

## 3. Project Objectives

The main objectives are:

1. Develop a backend application using Node.js and Express.js.
2. Create and manage an SQLite database.
3. Maintain three related database tables.
4. Implement RESTful APIs for instrument management.
5. Perform Create, Read, Update, and Delete operations.
6. Retrieve loan details using SQL JOIN operations.
7. Implement input validation for instrument data.
8. Provide case-insensitive smart search.
9. Handle missing records and invalid requests with meaningful responses.
10. Test API functionality using Postman.
11. Document the project, API endpoints, and testing results.

## 4. Technologies Used

| Technology | Purpose |
|---|---|
| Node.js | JavaScript runtime for backend development |
| Express.js | Framework for creating REST APIs |
| SQLite | Relational database management |
| JavaScript | Application logic and API implementation |
| SQL | Database operations and JOIN queries |
| Postman | API testing and documentation |
| Git | Version control |
| GitHub | Source code hosting and team collaboration |

## 5. System Architecture

The application follows a simple backend architecture.

**Client / Postman → Express Server → API Routes → Database Operations → SQLite Database**

### Architecture Explanation

1. The client sends an HTTP request to the application.
2. The Express server receives the request.
3. The appropriate route handles the requested operation.
4. Validation and search logic are applied where required.
5. The application communicates with the SQLite database.
6. The database returns the requested records or operation result.
7. The server sends a JSON response to the client.

This structure separates the responsibilities of the server, routes, database, and validation logic.

## 6. Database Design

The project uses an SQLite database with three related tables.

### 6.1 Musicians Table

Stores information about musicians.

Main field:

- `id` – Unique identifier for each musician.
- `name` – Name of the musician.

### 6.2 Instruments Table

Stores information about musical instruments.

Main fields:

- `id` – Unique identifier for each instrument.
- `name` – Name of the instrument.
- `family` – Instrument category or family.

### 6.3 Loans Table

Stores information about instruments borrowed by musicians.

Main fields:

- `id` – Unique identifier for each loan.
- `musician_id` – References a musician.
- `instrument_id` – References an instrument.
- `loan_date` – Date when the instrument was borrowed.
- `return_date` – Expected return date.

### 6.4 Relationship Between Tables

The database uses relationships between the three tables:

- One musician can have multiple loan records.
- One instrument can appear in multiple loan records over time.
- Each loan connects a musician with an instrument.

The `musician_id` and `instrument_id` fields in the loans table connect the records using foreign-key relationships.

## 7. API Development

The application provides RESTful endpoints under the following base URL:

`http://localhost:3000/api`

### 7.1 Instrument APIs

| HTTP Method | Endpoint | Description |
|---|---|---|
| GET | `/instruments` | Retrieve all instruments |
| GET | `/instruments/:id` | Retrieve an instrument by ID |
| POST | `/instruments` | Add a new instrument |
| PUT | `/instruments/:id` | Update an existing instrument |
| DELETE | `/instruments/:id` | Delete an instrument |

### 7.2 Retrieve All Instruments

**Request:**

`GET /api/instruments`

This endpoint retrieves the available instrument records from the database.

Example response:

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

This endpoint retrieves the details of a particular instrument using its unique ID.

### 7.4 Add a New Instrument

**Request:**

`POST /api/instruments`

Example request body:

```json
{
  "name": "Violin",
  "family": "Strings"
}
```

This endpoint inserts a new instrument record into the database.

### 7.5 Update an Instrument

**Request:**

`PUT /api/instruments/1`

Example request body:

```json
{
  "name": "Electric Guitar",
  "family": "Strings"
}
```

This endpoint updates the existing instrument information using its ID.

### 7.6 Delete an Instrument

**Request:**

`DELETE /api/instruments/1`

This endpoint deletes an instrument record using its ID.

## 8. Smart Search Functionality

One of the important features of the project is smart instrument search.

Users can search for instruments by their name or family using the `q` query parameter.

**Search by lowercase text:**

`GET /api/instruments?q=guitar`

**Search by uppercase text:**

`GET /api/instruments?q=GUITAR`

The search is case-insensitive. It can match the search text against both instrument names and instrument families.

### Search Behaviour

| Search Query | Expected Behaviour |
|---|---|
| `guitar` | Returns matching instrument records |
| `GUITAR` | Returns the same matching records |
| `zzz` | Returns an empty data array |

When no matching instrument is found, the API returns HTTP 200 with a meaningful message.

Example response:

```json
{
  "success": true,
  "message": "Nothing found",
  "data": []
}
```

This allows the client to handle unsuccessful searches without treating them as server errors.

## 9. Input Validation

Input validation helps maintain correct and meaningful information in the database.

The application checks the instrument details before adding or updating records.

For example, an instrument name is required.

Example invalid request:

```json
{
  "name": "",
  "family": "Strings"
}
```

Example response:

```json
{
  "success": false,
  "message": "Instrument name is required"
}
```

This prevents an instrument from being added with a missing name and provides a clear message to the user.

## 10. Loans API and SQL JOIN

**Request:**

`GET /api/loans`

The loans endpoint retrieves borrowing information along with the related musician and instrument names.

Instead of returning only the foreign-key IDs, the API uses SQL JOIN operations to combine information from the musicians, instruments, and loans tables.

The response includes information such as:

- Musician name
- Instrument name
- Loan date
- Return date

Example response structure:

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

This makes loan information easier to understand because users can see the actual musician and instrument names instead of only database IDs.

## 11. Postman API Testing

Postman was used to test the API endpoints and verify that the application behaves as expected.

A Postman collection containing the project API requests was exported and included in the repository.

### Testing Performed

| No. | Test Case | Expected Result |
|---|---|---|
| 1 | Retrieve all instruments | Instrument list returned |
| 2 | Retrieve instrument by ID | Correct instrument returned |
| 3 | Add a new instrument | New record created |
| 4 | Update an instrument | Record updated |
| 5 | Delete an instrument | Record deleted |
| 6 | Search using lowercase text | Matching records returned |
| 7 | Search using uppercase text | Same matching records returned |
| 8 | Search using unmatched text | Empty data with `Nothing found` |
| 9 | Submit an empty instrument name | Validation error returned |
| 10 | Retrieve loan records | Musician and instrument details returned |

### Smart Search Twist Testing

The special search requirements were tested separately:

- `?q=guitar` – Successfully returned the matching instrument.
- `?q=GUITAR` – Successfully returned the same matching instrument.
- `?q=zzz` – Successfully returned an empty result with the message `Nothing found`.

These tests confirmed that the search functionality handles uppercase and lowercase input and provides a meaningful response when there are no matches.

### Postman Collection

The exported collection is available at:

`postman/BeatBox Music Room – Neha Testing.postman_collection.json`

To use it:

1. Open Postman.
2. Select Import.
3. Choose the collection JSON file from the `postman` folder.
4. Start the BeatBox Music Room server.
5. Execute the available requests.
6. Verify the response status, message, and returned data.

## 12. Screenshots and Testing Evidence

The `screenshots` folder contains screenshots captured during API development and testing.

These screenshots provide evidence of the API requests and their responses.

The screenshots cover the testing work, including:

- Retrieving all instruments.
- Retrieving an individual instrument.
- Adding an instrument.
- Updating an instrument.
- Deleting an instrument.
- Testing lowercase smart search.
- Testing uppercase smart search.
- Testing the no-match search condition.
- Checking input validation.
- Retrieving loan information.

Folder:

`screenshots/`

The screenshots and exported Postman collection are included in the repository to make the testing process easier to review.

## 13. How to Run the Project

Follow these steps to run the application locally after the complete project branches have been integrated.

### Prerequisites

Install the following:

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

### Step 4: Initialize and Seed the Database

Run the database setup and sample-data scripts as required:

```bash
node database/test-db.js
node database/seed.js
```

Run the seed script only when you need to insert the sample data into a fresh database.

### Step 5: Start the Server

```bash
npm start
```

Expected server message:

```text
BeatBox Music Room running at http://localhost:3000
```

### Step 6: Test the APIs

Open Postman and use the base URL:

`http://localhost:3000/api`

You can now test the instrument and loan endpoints.

## 14. Team Contributions

This project was completed through teamwork, with each member responsible for a specific part of the backend application.

### Member 1 – H. Nandishwar Reddy
**Responsibility: Server Setup and Main Route Integration**

- Set up the Express.js server.
- Configured the application entry point.
- Organized the main API route structure.
- Integrated the server with the database and API modules.
- Worked on combining the different team contributions into the application.

### Member 2 – K. Sai Nihal
**Responsibility: SQLite Database Development**

- Created the SQLite database setup.
- Designed the musicians table.
- Designed the instruments table.
- Designed the loans table.
- Added sample database records.
- Created database testing and data-viewing scripts.
- Verified database connectivity and table creation.

### Member 3 – G. Rishitha
**Responsibility: Instrument CRUD and Loans API**

- Implemented instrument retrieval functionality.
- Developed the API to retrieve an instrument by ID.
- Implemented adding new instruments.
- Implemented updating instrument details.
- Implemented deleting instruments.
- Developed the loans API.
- Used SQL JOIN operations to retrieve musician and instrument information.

### Member 4 – G. Yuvatej
**Responsibility: Input Validation and Search Functionality**

- Worked on instrument input validation.
- Added checks for required instrument information.
- Implemented validation responses.
- Developed the search functionality.
- Supported searching by instrument name and family.
- Worked on case-insensitive search behaviour.

### Member 5 – G. Neha
**Responsibility: Postman API Testing and Documentation**

- Created and exported the Postman API collection.
- Tested the instrument CRUD operations.
- Verified the lowercase smart search functionality.
- Verified the uppercase smart search functionality.
- Tested the no-match search condition.
- Verified the instrument input validation response.
- Tested the loans JOIN endpoint.
- Captured screenshots of API requests and responses.
- Organized the testing screenshots in the repository.
- Prepared API testing documentation and project README.

### Member 6 – Team Contribution
**Responsibility: Smart Search Twist Verification and Integration**

- Worked together to verify the special search requirements.
- Checked that uppercase and lowercase queries return the same matching records.
- Verified the no-match response.
- Reviewed the integrated behaviour of the application.

## 15. GitHub Collaboration and Version Control

GitHub was used to manage the project and coordinate the work of different team members.

Each member worked on a separate feature branch so that their changes could be developed independently.

The team used:

- Git branches for separate contributions.
- Commits to record completed work.
- Pull requests to submit contributions for review.
- GitHub to maintain the shared project repository.

This workflow helped the team organize development and integrate different parts of the application.

## 16. Learning Outcomes

Through this project, the team gained practical experience in backend development.

The major learning outcomes include:

1. Understanding how Node.js works in backend applications.
2. Creating RESTful APIs using Express.js.
3. Connecting an application to an SQLite database.
4. Designing relational database tables.
5. Performing SQL CRUD operations.
6. Understanding primary keys and foreign keys.
7. Using SQL JOIN operations to retrieve related information.
8. Implementing input validation.
9. Developing case-insensitive search functionality.
10. Testing APIs using Postman.
11. Understanding Git branches, commits, and pull requests.
12. Collaborating with team members on a shared software project.

## 17. Conclusion

BeatBox Music Room demonstrates the development of a backend application for managing musical instruments, musicians, and loan records.

The project combines Node.js, Express.js, and SQLite to provide RESTful APIs for instrument management and loan information. It also includes important backend features such as CRUD operations, database relationships, input validation, and smart search.

Postman was used to test the API functionality, while Git and GitHub supported team collaboration and version control.

Overall, this project provided practical experience in developing, testing, documenting, and integrating a backend application as a team.

---

## 18. Repository Structure

The main project folders include:

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

*Note: This is a high-level structure showing the main project areas. The exact files and folders may vary as the team integrates its branches.*

---

**Project:** BeatBox Music Room  
**Subject:** Backend Development Fundamentals  
**Repository:** https://github.com/nandishwar1402/BeatBox-Music-Room  
**Documentation and Postman Testing Contribution:** G. Neha