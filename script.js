let transactions = JSON.parse(localStorage.getItem("transactions")) || [];
let balance = transactions.length ? transactions[transactions.length - 1].balance : 0;

document.addEventListener("DOMContentLoaded", function () {
    updateTable(); // Memuat data dari Local Storage saat halaman dibuka
});

function addTransaction() {
    let date = document.getElementById("date").value;
    let description = document.getElementById("description").value;
    let type = document.getElementById("type").value;
    let amount = parseInt(document.getElementById("amount").value);

    if (!date || !description || amount <= 0) {
        alert("Harap isi semua data dengan benar!");
        return;
    }

    let income = type === "Pemasukan" ? amount : 0;
    let expense = type === "Pengeluaran" ? amount : 0;
    balance += income - expense;

    let transaction = { date, description, income, expense, balance };
    transactions.push(transaction);

    saveToLocalStorage();
    updateTable();
}

function updateTable() {
    let table = document.getElementById("transactionTable");
    table.innerHTML = "";
    let totalIncome = 0, totalExpense = 0;

    transactions.forEach((trx, index) => {
        totalIncome += trx.income;
        totalExpense += trx.expense;

        let row = document.createElement("tr");
        row.innerHTML = `
            <td>${trx.date}</td>
            <td>${trx.description}</td>
            <td>${trx.income.toLocaleString()}</td>
            <td>${trx.expense.toLocaleString()}</td>
            <td>${trx.balance.toLocaleString()}</td>
            <td>
                <button class="delete-btn" onclick="deleteTransaction(${index})">
                    <i class="fas fa-trash"></i> <!-- Ikon tempat sampah -->
                </button>
            </td>
        `;
        table.appendChild(row);
    });

    document.getElementById("totalIncome").innerText = totalIncome.toLocaleString();
    document.getElementById("totalExpense").innerText = totalExpense.toLocaleString();
    document.getElementById("totalBalance").innerText = balance.toLocaleString();
}

function deleteTransaction(index) {
    if (confirm("Apakah Anda yakin ingin menghapus transaksi ini?")) {
        let deletedTransaction = transactions.splice(index, 1)[0];
        balance -= deletedTransaction.income - deletedTransaction.expense;
        saveToLocalStorage();
        updateTable();
    }
}

function clearTransactions() {
    if (confirm("Apakah Anda yakin ingin menghapus semua data?")) {
        transactions = [];
        balance = 0;
        saveToLocalStorage();
        updateTable();
    }
}

function saveToLocalStorage() {
    localStorage.setItem("transactions", JSON.stringify(transactions));
}

function savePDF() {
    const { jsPDF } = window.jspdf;
    let doc = new jsPDF();

    // Buat tabel baru tanpa tombol Hapus
    let tableContent = `
        <table border="1" style="border-collapse: collapse; width: 100%;">
            <thead>
                <tr>
                    <th>Tanggal</th>
                    <th>Keterangan</th>
                    <th>Pemasukan (Rp)</th>
                    <th>Pengeluaran (Rp)</th>
                    <th>Saldo (Rp)</th>
                </tr>
            </thead>
            <tbody>
                ${transactions.map(trx => `
                    <tr>
                        <td>${trx.date}</td>
                        <td>${trx.description}</td>
                        <td>${trx.income.toLocaleString()}</td>
                        <td>${trx.expense.toLocaleString()}</td>
                        <td>${trx.balance.toLocaleString()}</td>
                    </tr>
                `).join("")}
            </tbody>
        </table>
    `;

    // Konversi HTML ke canvas untuk PDF
    let tempDiv = document.createElement("div");
    tempDiv.innerHTML = tableContent;
    document.body.appendChild(tempDiv);

    html2canvas(tempDiv).then(canvas => {
        let imgData = canvas.toDataURL("image/png");
        let imgWidth = 190;
        let imgHeight = (canvas.height * imgWidth) / canvas.width;

        doc.setFont("helvetica", "bold");
        doc.setFontSize(16);
        doc.text("Catatan Keuangan Saya", 105, 15, null, null, "center");
        doc.addImage(imgData, "PNG", 10, 30, imgWidth, imgHeight);
        doc.save("Catatan_Keuangan.pdf");

        // Hapus elemen sementara setelah digunakan
        document.body.removeChild(tempDiv);
    });
}
function logout() {
    auth.signOut().then(() => {
        window.location.href = "login.html";
    });
}