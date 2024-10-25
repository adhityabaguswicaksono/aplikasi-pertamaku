# Nama: Adhitya Bagus Wicaksono
# NIM: 00000048211

# Gunakan image Node.js versi LTS
FROM node:18 AS base

# Setel working directory di dalam container
WORKDIR /app

# Salin package.json dan package-lock.json (jika ada)
COPY package*.json ./

# Instal dependencies dari source
RUN npm install sqlite3 --build-from-source

# Salin seluruh kode backend
COPY . .

# Jalankan perintah rebuild sqlite3 untuk memastikan kompatibilitas
RUN npm rebuild sqlite3

# Expose port backend (misalnya 3000)
EXPOSE 3000

# Jalankan aplikasi Express.js
CMD ["node", "server.js"]
