import { pool } from "../db.js";

export const getBadWords = async (req, res) => {
  try {
    const [rows] = await pool.query("SELECT * FROM badwords");

    res.json(rows);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Something went wrong" });
  }
};

export const getBadWord = async (req, res) => {
  try {
    const { words } = req.params;
    const [rows] = await pool.query("SELECT * FROM badwords WHERE words = ?", [
      words,
    ]);

    if (rows.length > 0) {
      res.json(rows[0]);
    } else {
      res.status(404).json({ message: "Bad word not found" });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Something went wrong" });
  }
};

export const checkTextForBadWords = async (req, res) => {
  try {
    const { text } = req.body;

    // Dividir el texto en palabras
    const words = text.split(' ');

    // Consultar las palabras en la base de datos
    const query = "SELECT * FROM badwords WHERE words IN (?)";
    const [rows] = await pool.query(query, [words]);

    // Encontrar badwords
    const badWords = rows.map(row => row.words);

    res.json({ badWords });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Something went wrong" });
  }
};

export const addBadWord = async (req, res) => {
  try {
    const { words } = req.body;

    await pool.query("INSERT INTO badwords (words) VALUES (?)", [words]);

    res.json({ message: "Bad word added successfully" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Something went wrong" });
  }
};
