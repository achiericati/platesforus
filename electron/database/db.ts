import sqlite3 from 'sqlite3';
import path from 'path';
import { app } from 'electron';
import { open, Database } from 'sqlite'; // usa l'interfaccia async di sqlite

sqlite3.verbose();

let db: Database<sqlite3.Database, sqlite3.Statement>;

export const setupDatabase = async () => {
  const dbPath = path.join(app.getPath('userData'), 'plates-for-us.db');
  console.log('Database path:', dbPath);

  db = await open({
    filename: dbPath,
    driver: sqlite3.Database
  });

  await db.exec(`
    CREATE TABLE IF NOT EXISTS dishes (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      category TEXT,
      prepTime INTEGER,
      notes TEXT
    )
  `);

  console.log('Database pronto (sqlite3 async)');
};

export const insertMockDish = async () => {
  
  // Dati del piatto mock
  const name = 'Pizza Margherita';
  const category = 'Primo';
  const prepTime = 30;
  const notes = 'Una pizza semplice con pomodoro e mozzarella.';
  
  await db.run('INSERT INTO dishes (name, category, prepTime, notes) VALUES (?, ?, ?, ?)', [name, category, prepTime, notes]);
  console.log('Piatto mock inserito!');
};


export const getDb = () => db;
