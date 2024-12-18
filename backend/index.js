const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const mysql = require("mysql");

const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(cors());

// Povezivanje na MySQL
const connection = mysql.createConnection({
  host: "ucka.veleri.hr",  // Povezivanje s vašom bazom
  user: "amioc",  // Korisničko ime
  password: "11",  // Lozinka
  database: "amioc",
  port: 3306
});

// Povezivanje na MySQL bazu
connection.connect((err) => {
  if (err) {
    console.error("Greška prilikom povezivanja na bazu:", err.message);
    return;
  }
  console.log("Uspješno povezano na MySQL bazu!");
});

// API za dohvat svih knjiga, s filtriranjem prema id-u ili naslovu
app.get("/api/knjiga", (req, res) => {
  const { id, naslov } = req.query;  // Uzima parametre iz URL query stringa

  let query;
  if (id) {
    // Ako je poslan id, filtriraj prema id-u
    query = "SELECT * FROM knjiga WHERE id = ?";
  } else if (naslov) {
    // Ako je poslan naslov, filtriraj prema naslovu
    query = "SELECT * FROM knjiga WHERE naslov = ?";
  } else {
    // Ako nisu poslana ni id ni naslov, vraća sve knjige
    query = "SELECT * FROM knjiga";
  }

  connection.query(query, [id || naslov], (error, results) => {
    if (error) {
      console.error('Greška pri dohvaćanju knjige:', error);
      return res.status(500).send(error);
    }
    res.json({ data: results });
  });
});

// API za dohvat svih rezervacija
app.get("/api/rezervirane_knjige", (req, res) => {
  const query = `
    SELECT knjiga.naslov, knjiga.autor, korisnici.ime, korisnici.prezime, rezervacije.datum_rezervacije
    FROM rezervacije
    JOIN knjiga ON rezervacije.knjiga_id = knjiga.id
    JOIN korisnici ON rezervacije.korisnik_id = korisnici.id;
  `;

  connection.query(query, (error, results) => {
    if (error) {
      res.status(500).send(error);
    } else {
      res.json({ data: results });
    }
  });
});

// API za dodavanje rezervacije
app.post("/api/rezervacije", (req, res) => {
  const { korisnik_id, knjiga_id } = req.body;

  if (!korisnik_id || !knjiga_id) {
    return res.status(400).json({ message: "Morate odabrati korisnika i knjigu." });
  }

  const query = "INSERT INTO rezervacije (korisnik_id, knjiga_id) VALUES (?, ?)";

  connection.query(query, [korisnik_id, knjiga_id], (error, results) => {
    if (error) {
      console.error("Greška pri unosu rezervacije:", error);
      return res.status(500).json({ message: "Greška pri rezervaciji knjige." });
    }
    res.status(201).json({ message: "Rezervacija uspješno dodana!" });
  });
});

// Pokreni server
app.listen(port, () => {
  console.log(`Backend server pokrenut na http://localhost:${port}`);
});
