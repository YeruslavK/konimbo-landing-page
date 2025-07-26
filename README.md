# 🧪 Landing Page with Form Integration (Next.js + Airtable)

A simple, responsive landing page built with Next.js. Includes a registration form that submits user data (Full Name, Email, Message) to an Airtable table using a secure API route.

---

## 🚀 Features

- Built with **Next.js (App Router)**
- Responsive layout with clean UI
- Simple **form with validation**
- Submits form data to **Airtable API** via `/api/submit-form` route
- Shows success or error message based on response
- Ready for deployment or local development

---

## 📁 Tech Stack

- [Next.js](https://nextjs.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- Airtable REST API

---

## 📸 Demo

- For a live demo visit:
- To see the result in Airtable visit:

<img src="public/demo-screenshot.png" alt="Landing page preview" width="100%" />

---

## 🛠️ Installation & Setup

### 1. Clone the Repository

```bash
git clone https://github.com/YeruslavK/konimbo-landing-page.git
cd landing-form
```

### 2. Install Dependencies

```bash
# Using npm
npm install

# Using yarn
yarn install
```

### 3. Create .env.local

```bash
Create a file named .env.local in the root of the project and add your Airtable credentials:

AIRTABLE_API_KEY=your_airtable_api_key
AIRTABLE_BASE_ID=your_base_id
AIRTABLE_TABLE_NAME=your_table_name

You can find these values in your Airtable API docs.
```

### 4. Run the App Locally

```bash
npm run dev

open http://localhost:3000 in your browser.
```

---

## 📬 Form Details

The form includes 3 fields:

    - Full Name

    - Email

    - Message

On submit:

    - Sends data to app/api/send/route.ts

    - That API route formats the data and sends it to Airtable using your API key

    - A success or error message is shown to the user

## ✅ Example Airtable Schema

Make sure your Airtable table includes the following column names (case-sensitive):

    - Name (text)

    - Email (email)

    - Message (long text)
