#!/usr/bin/env node
// index.js — CLI CRUD + Auth app

const fs = require('fs');
const path = require('path');

const args = process.argv.slice(2);
const command = args[0];
const file = args[1];
const filePath = file ? path.join(__dirname, file) : null;

// Utility: safely read lines
function readLines(filePath) {
  if (!fs.existsSync(filePath)) return null;
  const content = fs.readFileSync(filePath, 'utf8');
  return content ? content.split('\n').filter(Boolean) : [];
}

// ===== CRUD COMMANDS =====

function readFileCommand() {
  if (!fs.existsSync(filePath)) {
    console.log(`No file found: ${file}`);
    return;
  }
  const lines = readLines(filePath);
  if (lines.length === 0) return console.log('File is empty.');
  lines.forEach((line, idx) => console.log(`${idx + 1}. ${line}`));
}

function listFileCommand() {
  if (!fs.existsSync(filePath)) {
    console.log(`No file found: ${file}`);
    return;
  }
  const lines = readLines(filePath);
  if (lines.length === 0) return console.log('No records found.');
  lines.forEach((line, idx) => console.log(`${idx + 1}. ${line}`));
  console.log(`\nTotal records: ${lines.length}`);
}

function createCommand() {
  const record = args[2];
  if (!record) return console.log('Error: Missing record text.');
  let lines = [];
  if (fs.existsSync(filePath)) lines = readLines(filePath);
  lines.push(record);
  fs.writeFileSync(filePath, lines.join('\n') + '\n', 'utf8');
  console.log(`Created record #${lines.length}`);
}

function updateCommand() {
  const lineNumber = parseInt(args[2]);
  const newText = args[3];
  if (!fs.existsSync(filePath)) return console.log(`No file found: ${file}`);
  if (isNaN(lineNumber) || !newText)
    return console.log('Usage: node index.js update <file> <lineNumber> "new text"');

  const lines = readLines(filePath);
  if (lineNumber < 1 || lineNumber > lines.length)
    return console.log(`No record found at line #${lineNumber}`);
  lines[lineNumber - 1] = newText;
  fs.writeFileSync(filePath, lines.join('\n') + '\n', 'utf8');
  console.log(`Updated record #${lineNumber}`);
}

function deleteCommand() {
  const lineNumber = parseInt(args[2]);
  if (!fs.existsSync(filePath)) return console.log(`No file found: ${file}`);
  const lines = readLines(filePath);
  if (isNaN(lineNumber) || lineNumber < 1 || lineNumber > lines.length)
    return console.log(`Invalid record number: ${lineNumber}`);
  lines.splice(lineNumber - 1, 1);
  fs.writeFileSync(filePath, lines.join('\n') + (lines.length ? '\n' : ''), 'utf8');
  console.log(`Deleted record #${lineNumber}`);
}

// ===== USER AUTH COMMANDS =====

const USERS_FILE = path.join(__dirname, 'users.txt');

function registerCommand() {
  const email = args[1];
  const password = args[2];
  if (!email || !password)
    return console.log('Usage: node index.js register <email> <password>');

  let users = [];
  if (fs.existsSync(USERS_FILE)) {
    users = readLines(USERS_FILE).map(line => JSON.parse(line));
    if (users.find(u => u.email === email)) {
      console.log('User already exists');
      process.exitCode = 1;
      return;
    }
  }

  const user = { email, password };
  fs.appendFileSync(USERS_FILE, JSON.stringify(user) + '\n', 'utf8');
  console.log(`Registered ${email}`);
}

function loginCommand() {
  const email = args[1];
  const password = args[2];
  if (!fs.existsSync(USERS_FILE))
    return console.log('No users registered yet.');

  const users = readLines(USERS_FILE).map(line => JSON.parse(line));
  const user = users.find(u => u.email === email && u.password === password);
  if (user) {
    console.log('Login successful');
    process.exitCode = 0;
  } else {
    console.log('Invalid credentials');
    process.exitCode = 1;
  }
}

// ===== COMMAND DISPATCHER =====

switch (command) {
  case 'read':
    readFileCommand();
    break;
  case 'list':
    listFileCommand();
    break;
  case 'create':
    createCommand();
    break;
  case 'update':
    updateCommand();
    break;
  case 'delete':
    deleteCommand();
    break;
  case 'register':
    registerCommand();
    break;
  case 'login':
    loginCommand();
    break;
  default:
    console.log(`
Usage:
  node index.js read <file>
  node index.js list <file>
  node index.js create <file> "text"
  node index.js update <file> <lineNumber> "new text"
  node index.js delete <file> <lineNumber>
  node index.js register <email> <password>
  node index.js login <email> <password>
`);
}
