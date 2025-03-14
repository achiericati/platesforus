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
      category VARCHAR(45),
      prepTime INTEGER,
      recipe TEXT
    )
  `);

  console.log('Database pronto (sqlite3 async)');
};

export const fetchAllDishesFromDb = async () => {
  if (!db) {
    throw new Error('Database non inizializzato. Chiama prima setupDatabase().');
  }

  try {
    const dishes = await db.all('SELECT * FROM dishes');
    return dishes;
  } catch (error) {
    console.error('Errore durante il recupero dei piatti:', error);
    throw error;
  }
};

export const deleteDish = async (id: number) => {
  await db.run('DELETE FROM dishes WHERE id = ?', [id]);
};

export const getDb = () => db;
