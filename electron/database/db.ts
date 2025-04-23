import sqlite3 from 'sqlite3';
import path from 'path';
import { app } from 'electron';
import { open, Database } from 'sqlite'; // usa l'interfaccia async di sqlite
import { Dish, WeeklyMenuType } from './interfaces';

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
      recipe TEXT,
      isSpecial BOOLEAN DEFAULT 0
    )
  `);

  await db.exec(`
    CREATE TABLE IF NOT EXISTS menu (
      id INTEGER PRIMARY KEY CHECK (id = 1),
      data TEXT NOT NULL
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
      'INSERT INTO dish (name, category, difficulty, prepTime, recipe, isSpecial) VALUES (?, ?, ?, ?, ?, ?)',
      newDish.name,
      newDish.category,
      newDish.difficulty,
      newDish.prepTime,
      newDish.recipe,
      newDish.isSpecial ? 1 : 0
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

export const updateDish = async (updatedDish: Dish) => {
  try {
    await db.run(
      `UPDATE dish 
       SET name = ?, category = ?, difficulty = ?, prepTime = ?, recipe = ?, isSpecial = ? 
       WHERE id = ?`,
      updatedDish.name,
      updatedDish.category,
      updatedDish.difficulty,
      updatedDish.prepTime,
      updatedDish.recipe,
      updatedDish.isSpecial ? 1 : 0,
      updatedDish.id
    );

    return;

  } catch (error) {
    console.error('Errore durante l\'update del piatto:', error);
    throw error;
  }
};

export const deleteDish = async (id: number) => {
  await db.run('DELETE FROM dish WHERE id = ?', [id]);
};

export const loadMenuFromDb = async (): Promise<WeeklyMenuType | null> => {
  const row = await db.get('SELECT data FROM menu WHERE id = 1');
  if (!row) return null;

  try {
    return JSON.parse(row.data);
  } catch (error) {
    console.error('Errore nel parsing del menu dal DB:', error);
    return null;
  }
};

export const saveMenuToDb = async (menu: WeeklyMenuType) => {
  const jsonData = JSON.stringify(menu);

  await db.run(`
    INSERT INTO menu (id, data) 
    VALUES (1, ?)
    ON CONFLICT(id) DO UPDATE SET data = excluded.data
  `, jsonData);
};

export const deleteMenuFromDb = async () => {
  await db.run('DELETE FROM menu WHERE id = 1');
};

export const getDb = () => db;
