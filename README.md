# CLI CRUD + Auth App

A simple Node.js command-line tool for performing **file-based CRUD operations** and **user authentication** — built with only Node.js built-in modules.

---

## 📦 Features

- Read, list, create, update, delete records from a text file.
- User registration and login (stored in `users.txt`).
- No database — just plain text storage.

---

## 🧭 Usage

```bash
node index.js read data.txt
node index.js list data.txt
node index.js create data.txt "Buy groceries"
node index.js update data.txt 2 "Book hotel in Pune"
node index.js delete data.txt 1

node index.js register alice@gmail.com alice123
node index.js login alice@gmail.com alice123
