# University Adoptions — Chapter 14 Project 2

A small React and Node.js application for browsing university adoption records stored in MongoDB. It implements the three required GET endpoints and uses native CSS, semantic markup and keyboard-accessible controls.

## Requirements

- Node.js 22.16 or later (Node.js 24 recommended) and npm.
- A running MongoDB server, accessible at `mongodb://127.0.0.1:27017` by default.
- Internet access for the first `npm install`.
- MongoDB Shell and Database Tools for the textbook's database exercises. Neither is required to run the application using the seed script.

## Quick start (Windows PowerShell)

Extract the ZIP and open its `Project2` folder in VS Code. Run these commands from the project root:

```powershell
cd backend
npm install
npm run seed
cd ../frontend
npm install
npm run build
cd ../backend
npm start
```

Open **http://127.0.0.1:3000**. The backend serves the built React application and API from the same origin. No CORS dependency or separate frontend server is needed for the presentation.

The seed script can be repeated without duplicating adoption IDs. It updates the supplied sample records rather than deleting existing data. Use a dedicated `project3` database for the exercise.

### Optional configuration

The defaults work without an `.env` file. To change the connection or port, copy `backend/.env.example` to `backend/.env` and edit the values. No personal file paths are used. The development proxy defaults to backend port 3000; if you change the backend port, adjust the proxy target as well.

### Development mode

Start the backend with `npm start` in `backend`. In another terminal, run `npm run dev` in `frontend` and open the URL printed by Vite. After editing React or CSS, run `npm run build` again before presenting the production build.

## Textbook database exercise

The supplied assignment did not include the original `adoptions.json`. The project therefore includes 10 synthetic records with the required fields and example IDs. The PDF names the database inconsistently; this project follows its import command (`project3` database and `adoptions` collection).

For the original import workflow, install MongoDB Database Tools and run from `backend` **before seeding**:

```powershell
mongoimport --uri "mongodb://127.0.0.1:27017/project3" --collection adoptions --file adoptions.json --jsonArray --mode upsert --upsertFields AdoptionID
npm run seed
```

The seed converts ISO date strings from the JSON into BSON dates and creates a unique index on `AdoptionID`. If using the script alone, document this alternative; do not claim `mongoimport` was executed unless it was.

In MongoDB Shell:

```javascript
use project3
db.adoptions.countDocuments()
db.adoptions.findOne({ AdoptionID: 14 })
db.adoptions.find({ UniversityID: 100724 })
db.adoptions.find().sort({ AdoptionDate: 1 })
```

## API

| Method and path | Expected result with the sample dataset |
|---|---|
| GET /api/adoptions | 10 records sorted oldest first |
| GET /api/adoptions/14 | One adoption object |
| GET /api/adoptions/university/100724 | Three matching records |
| GET /api/adoptions/abc | 400, invalid ID |
| GET /api/adoptions/999 | 404, record not found |
| GET /api/adoptions/university/999 | 200, empty array |

To run integration tests, keep the server running, open another terminal in `backend`, and run `npm test`. These tests assume a dedicated database containing only the supplied seed records.

## Validation and submission

Follow `documentation/VALIDATION-GUIDE.md` to validate the actual rendered HTML and CSS, record findings and take evidence screenshots. Complete `documentation/VALIDATION-REPORT.md` with real results before submission. The application uses native form controls, labels, visible focus, a skip link, a semantic table and responsive layout; test these features with the checklist.

Direct dependencies are pinned in the package manifests. `npm install` generates package-lock files on your computer. Include those files in the final ZIP so the evaluator can use `npm ci` for repeat installations. Do not include `node_modules`, `.env`, or generated `dist` directories; they are reproducible from the source. If your instructor prefers a ready-built version, `dist` may be supplied separately with the source.

The local MongoDB server is intended for a classroom environment. Do not expose an unauthenticated instance to other networks.
