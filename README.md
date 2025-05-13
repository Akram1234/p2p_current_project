## By Akram Mohammad


## CPay App

This is the starter template from the Next.js App Router Course. It contains the starting code for the dashboard application modified for our take home exercise purposes.

## Overview

The P2P payment market is booming, with projections estimating it will surpass $5.2 trillion by 2028. As more consumers and businesses adopt these technologies, being a part of this space positions you at the forefront of financial innovation and growth. This is your chance to contribute to a sector that is reshaping how money is transferred and managed.

The goal of this assessment is to generate sample data and persist it in memory. Then create functionality using that data to query and mutate.

## Schema

See the schemas in `./lib/definitions.ts` as well as the data in `lib/data.ts`. Part of the exercise is to define a schema that encompasses p2p transactions in a concise and scalable way.

A majority of the UI has already been implemented, but there is room for addition depending on the models you implement.

```
interface Contact {
  id: number;
  name: string
  email: string
  image_url: string;
}

interface Pay {
  id: string;
  amount: number;
  // TODO: fill in 
}
```

# Required operations

1. Pays have been partially defined. Add fields you would feel relevant for querying purposes. Think of pays similar to any p2p you are familiar with. 
2. Generate random pays to and from the pre-populated contacts for the months of a single year. 
3. Incorporate into routes and pre-made UIs by building out the queries in memory.
4. Set up create and edit/action pay. (Remember, the UI will need updating per your `pay` model)
5. Commit and share! Feel free to leave notes in your thought process.

## Bonus operations

- Filtering UI
- Group pay UI

### Hints

Boot up the app. Navigate to the dashboard. Most of these cards will show empty data. 
After you generate your data, fill these in. Replace `Recent Activity` with your data.

Click to the other routes. 

`Pays` will have a table that should have more columns. `Create Pay` will probably require more fields.

`Contacts` will use the contacts we've provided but the aggregation of data you've created. 

There are `TODO`s. Try to get to them all.

## Requirements

- Node version - v18.18.0 or higher for this version of Next.js

# Candidate README
## Bootstrap instructions
To run this project locally, follow these steps:

1. **Clone the Repository**:
   ```bash
   git clone https://github.com/your-username/p2p-payment-app.git
   cd p2p-payment-app
2. **Install Dependencies: Make sure you have Node.js (v18.18.0 or higher) installed. Then, run**:
npm install

4. **To Build :**
npm run build

5. **To Run :**
npm start

6. **Access the Application: Open your browser and<vscode_annotation details='%5B%7B%22title%22%3A%22hardcoded-credentials%22%2C%22description%22%3A%22Embedding%20credentials%20in%20source%20code%20risks%20unauthorized%20access%22%7D%5D'> navigate</vscode_annotation> to:** 
http://localhost:3000


## CPay App

CPay is a Peer-to-Peer (P2P) payment application that allows users to manage payments, create group payments, and filter transactions by date. It provides a responsive and user-friendly interface for seamless financial transactions.


## Features

### 1. **Payment Management**
- **Create Payment**: Users can create a new payment by providing details such as sender, receiver, amount, date, status, and description.
  - Automatically replaces `T00:00:00.000Z` dates with the current timestamp.
- **Update Payment**: Modify existing payment details such as receiver, amount, date, status, and description.
- **Delete Payment**: Remove a payment from the system by specifying its ID.

### 2. **Group Payments**
- **Create Group Payment**: Users can create a group payment by:
  - Selecting multiple recipients.
  - Specifying the total amount.
  - Splitting the amount equally or unequally among recipients.
- **Flexible Splitting Options**:
  - Split equally among all recipients.
  - Assign custom amounts to each recipient.

### 3. **Date Filtering**
- **Filter Payments by Date**: Users can filter payments displayed in the UI by specifying a start and end date.
  - Payments are displayed in descending order of their date.
  - Supports dynamic filtering based on user input.

### 4. **Responsive UI**
- **Mobile View**: A compact, card-based layout for mobile devices.
- **Desktop View**: A table-based layout for larger screens.

### 5. **Server-Side API**
- **Group Payment API**: A dedicated API endpoint to handle group payment submissions.
  - Processes payments and stores them in the system.
- **Payment Data Fetching**: Server-side logic to fetch and filter payment data based on user queries and date ranges.

---

## Author

**Akram Mohammad**
