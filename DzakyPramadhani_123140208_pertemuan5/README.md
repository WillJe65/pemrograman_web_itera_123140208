# 🎓 Sistem Manajemen Perpustakaan
Program Python untuk mengelola data Buku atau majalah dengan fitur lengkap.

✨ Fitur
- 📋 Tampilkan semua data buku dalam tabel
- 🏆 Cari buku berdasarkan nama
- ➕ Error Handling ketika user salah input
- 🔍 Menggunakan Python OOP class
- 💾 Data tersimpan dalam memori

## Elemen OOP didalam program

### Enkapsulasi
Program ini menyimpan data perpustakaan dengan tipe data  **List** yang dimana untuk Class abstracksinya yang akan di heritence memiliki variable berikut

```python
    class LibraryItem(ABC):
        def __init__(self, nama: str, id: str, rilis: int):
            self.nama = nama
            self.id = id
            self.rilis = rilis
            self._is_checked_out = False

```

### Inheritance
```python
class LibraryItem(ABC):
    def __init__(self, nama: str, id: str, rilis: int):
        self.nama = nama
        self.id = id
        self.rilis = rilis
        self._is_checked_out = False

class Book(LibraryItem):
    def __init__(self, nama: str, id: str, rilis: int, author: str, isbn: str, pages: int):
        super().__init__(nama, id, rilis)
        self.author = author
        self.isbn = isbn
        self.pages = pages

class Magazine(LibraryItem):
    def __init__(self, nama: str, id: str, rilis: int, publisher: str, series: str):
        super().__init__(nama, id, rilis)
        self.publisher = publisher
        self.series = series
```

### Polymorphosm
```python
class LibraryItem(ABC):
    @abstractmethod
    def informasi(self) -> str:
        pass

class Book(LibraryItem):
    def informasi(self) -> str:
        return f"Book: {self.nama}, ID: {self.id}, Author: {self.author}, ISBN: {self.isbn}, Pages: {self.pages}, Released: {self.rilis}, Checked Out: {self.is_checked_out}"

class Magazine(LibraryItem):
    def informasi(self) -> str:
        return f"Magazine: {self.nama}, ID: {self.id}, Publisher: {self.publisher}, Series: {self.series}, Released: {self.rilis}, Checked Out: {self.is_checked_out}"
```

### Abstarct
```python
from abc import ABC, abstractmethod

class LibraryItem(ABC):
    def __init__(self, nama: str, id: str, rilis: int):
        self.nama = nama
        self.id = id
        self.rilis = rilis
        self._is_checked_out = False

    @abstractmethod
    def informasi(self) -> str:
        pass

    def meminjam(self):
        self._is_checked_out = True

    def mengembalikan(self):
        self._is_checked_out = False
```

## 🖥️ How to run Program

1. Pastikan sudah menginstal **Python 3.1x** atau versi terbaru
2. jalankan file program dengan nama `123140208_RB.py`
3. Jalankan program melalui terminal:
   ```bash
   python 123140208_RB.py
   ```
4. Pilih menu pilihan:
   ```
   ==================================================
    Selamat datang di Library ITERA:
    ==================================================
    1. Tambah buku
    2. Tambah majalah
    3. Hapus item
    4. Cari item
    5. Tampilkan semua item
    6. Keluar
    ==================================================
    Masukan pilihan dengan cara pilih nomor 1-6:
   ```

---

## 🧾 Contoh Output

```
==========================================================================================
SEMUA ITEM DI PERPUSTAKAAN
==========================================================================================
No. Tipe     ID     Nama                 Detail          Tahun  Status
------------------------------------------------------------------------------------------
1   Buku     B001   10 dosa besar ohim   350 hal         2020   Tersedia
2   Buku     B002   Atri my dear momen... 250 hal         2019   Tersedia
3   Buku     B003   1001 kisah dunia     400 hal         2021   Tersedia
4   Majalah  M001   Jawir vs genteng     Monthly Stor... 2022   Tersedia
5   Majalah  M001   Tech Today           Monthly Tech    2021   Tersedia
==========================================================================================
Total: 5 item
```

---
