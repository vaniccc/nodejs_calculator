//Plugin Import
import Database from 'better-sqlite3';
import express from 'express';
const router = express.Router();

// Create Connection to Database
const db = new Database('./db/calculator_db.db');

// ################################################

db.exec(`
    CREATE TABLE IF NOT EXISTS users (
        user_id INTEGER PRIMARY KEY AUTOINCREMENT,
        username TEXT UNIQUE NOT NULL,
        password_hash TEXT NOT NULL
    )
`);

export function createUser(username, hashedPassword) {
    const result = db.prepare('INSERT INTO users(username, password_hash) VALUES (?, ?)').run(username, hashedPassword);
    return result.lastInsertRowid;
}

export function getUserByUsername(username) {
    return db.prepare('SELECT * FROM users WHERE username = ?').get(username);
}

export function getAllUserRows() {
    const rows = db.prepare('SELECT * FROM users').all();
    console.log(rows);
}

export default router;

