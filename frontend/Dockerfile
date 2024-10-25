# Nama: Adhitya Bagus Wicaksono
# NIM: 00000048211

# Gunakan image Node.js versi LTS
FROM node:20 AS base

# Setel working directory di dalam container
WORKDIR /app

# Salin package.json dan package-lock.json
COPY package*.json ./

# Instal dependencies
RUN npm install

# Salin seluruh kode frontend ke dalam container
COPY . .

# Expose port yang digunakan oleh Vite (default 5173)
EXPOSE 443

# Jalankan server development Vite pada port 5173
CMD ["npm", "run", "dev", "--", "--port", "443", "--host"]
