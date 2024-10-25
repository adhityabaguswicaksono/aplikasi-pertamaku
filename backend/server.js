import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import sqlite3 from 'sqlite3';
import cors from 'cors';
import { body, param, query, validationResult } from 'express-validator';

const app = express();
app.use(express.json());
app.use(
	cors({
		origin: '*',
		optionsSuccessStatus: 200,
	})
);

const connection = new sqlite3.Database('./db/aplikasi.db');

// Middleware untuk memeriksa validasi input
const validateInput = (req, res, next) => {
	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		return res.status(400).json({ errors: errors.array() });
	}
	next();
};

// Rute GET dengan parameter id divalidasi sebagai angka
app.get(
	'/api/user/:id',
	param('id').isInt(), // Memastikan id adalah angka
	validateInput,
	(req, res) => {
		const query = `SELECT * FROM users WHERE id = ?`;
		connection.all(query, [req.params.id], (error, results) => {
			if (error) {
				console.error(error);
				return res.status(500).json({ error: 'Internal Server Error' });
			}
			res.json(results);
		});
	}
);

// Rute POST untuk mengubah email dengan validasi input
app.post(
	'/api/user/:id/change-email',
	[
		param('id').isInt(), // Memastikan id adalah angka
		body('email').isEmail(), // Memastikan email memiliki format yang benar
	],
	validateInput,
	(req, res) => {
		console.info(req.body);
		const newEmail = req.body.email;
		const query = `UPDATE users SET email = ? WHERE id = ?`;

		connection.run(query, [newEmail, req.params.id], function (err) {
			if (err) {
				console.error(err);
				return res.status(500).json({ error: 'Internal Server Error' });
			}
			if (this.changes === 0) return res.status(404).send('User not found');
			else res.status(200).send('Email updated successfully');
		});
	}
);

// Rute untuk mengirimkan file dengan validasi
app.get(
	'/api/file',
	query('name').isString().isLength({ min: 1 }), // Validasi nama file
	validateInput,
	(req, res) => {
		const __filename = fileURLToPath(import.meta.url);
		const __dirname = path.dirname(__filename);

		const sanitizedFileName = path.basename(req.query.name); // Mengambil nama file tanpa direktori
		const filePath = path.join(__dirname, 'files', sanitizedFileName);

		res.sendFile(filePath, (err) => {
			if (err) {
				console.error(err);
				res.status(404).send('File not found');
			}
		});
	}
);

app.listen(3000, () => {
	console.log('Server running on port 3000');
});
