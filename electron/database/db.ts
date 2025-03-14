import sqlite3 from 'sqlite3';
import path from 'path';
import { app } from 'electron';
import { open, Database } from 'sqlite'; // usa l'interfaccia async di sqlite
import { Dish } from './interfaces';

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
    CREATE TABLE IF NOT EXISTS dish (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      category VARCHAR(45),
      difficulty VARCHAR(45),
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
    const dishes = await db.all('SELECT * FROM dish');
    return dishes;
  } catch (error) {
    console.error('Errore durante il recupero dei piatti:', error);
    throw error;
  }
};

export const addDish = async (newDish: Dish) => {
  try {
    const result = await db.run(
      'INSERT INTO dish (name, category, difficulty, prepTime, recipe) VALUES (?, ?, ?, ?, ?)',
      newDish.name,
      newDish.category,
      newDish.difficulty,
      newDish.prepTime,
      newDish.recipe
    );
    return {
      ...newDish,
      id: result.lastID || 0
    };

  } catch (error) {
    console.error('Errore durante la creazione del piatto:', error);
    throw error;
  }
};

export const deleteDish = async (id: number) => {
  await db.run('DELETE FROM dish WHERE id = ?', [id]);
};

export const getDb = () => db;
