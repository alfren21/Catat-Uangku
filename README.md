<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Catatan Keuangan Saya</title>
    <link rel="stylesheet" href="style.css">
    <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;700&family=Roboto:wght@400;500&family=Lora:wght@400;700&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css">
</head>
<body>

    <h1>CATATAN KEUANGAN SAYA</h1>
    <p class="subtitle">Semangat atur keuangannya yaaa!</p>

    <div class="summary">
        <div>Pemasukan: Rp <span id="totalIncome">0</span></div>
        <div>Pengeluaran: Rp <span id="totalExpense">0</span></div>
        <div>Saldo Akhir: Rp <span id="totalBalance">0</span></div>
    </div>

    <h2>Tambah Transaksi</h2>
    <div class="form">
        <label for="date">Tanggal:</label>
        <input type="date" id="date">

        <label for="description">Keterangan:</label>
        <input type="text" id="description" placeholder="Masukkan keterangan transaksi">

        <label for="type">Tipe Transaksi:</label>
        <select id="type">
            <option value="Pemasukan">Pemasukan</option>
            <option value="Pengeluaran">Pengeluaran</option>
        </select>

        <label for="amount">Jumlah (Rp):</label>
        <input type="number" id="amount" value="0">

        <button onclick="addTransaction()">Tambah Transaksi</button>
        <button onclick="clearTransactions()">Hapus Semua Data</button>
        <button onclick="savePDF()">Simpan PDF</button>
        <button onclick="logout()">Logout</button>
    </div>

    <h2>Data Keuangan</h2>
    <table>
        <thead>
            <tr>
                <th>Tanggal</th>
                <th>Keterangan</th>
                <th>Pemasukan (Rp)</th>
                <th>Pengeluaran (Rp)</th>
                <th>Saldo (Rp)</th>
                <th>Hapus</th>
            </tr>
        </thead>
        <tbody id="transactionTable"></tbody>
    </table>

    <!-- Firebase dan library lainnya -->
    <script type="module">
        // Import Firebase functions
        import { initializeApp } from "https://www.gstatic.com/firebasejs/11.4.0/firebase-app.js";
        import { getAuth, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/11.4.0/firebase-auth.js";

        // Firebase configuration
        const firebaseConfig = {
            apiKey: "AIzaSyDKwn3bdXVipfr-Hl1V0qOYspYHXXZyVHc",
            authDomain: "catat-uangku20.firebaseapp.com",
            projectId: "catat-uangku20",
            storageBucket: "catat-uangku20.firebasestorage.app",
            messagingSenderId: "103739019301",
            appId: "1:103739019301:web:4b324c12c5d853218e6fcc",
            measurementId: "G-LZNYY0D2NJ"
        };

        // Initialize Firebase
        const app = initializeApp(firebaseConfig);
        const auth = getAuth(app);

        // Check auth state
        onAuthStateChanged(auth, (user) => {
            if (!user) {
                // Jika pengguna belum login, arahkan ke halaman login
                window.location.href = "login.html";
            }
        });

        // Logout function
        window.logout = () => {
            signOut(auth).then(() => {
                window.location.href = "login.html";
            }).catch((error) => {
                alert("Logout gagal: " + error.message);
            });
        };
    </script>

    <!-- Script lainnya -->
    <script src="script.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/html2canvas/1.4.1/html2canvas.min.js"></script>
</body>
</html>
