# 🎓 Sistem Manajemen Nilai Mahasiswa
Program Python untuk mengelola data nilai mahasiswa dengan fitur lengkap.

✨ Fitur
- 📋 Tampilkan semua data mahasiswa dalam tabel
- 🏆 Cari nilai tertinggi & terendah
- ➕ Input data mahasiswa baru
- 🔍 Filter berdasarkan grade (A-E)
- 📊 Hitung rata-rata nilai kelas
- 💾 Data tersimpan dalam memori

## Struktur Program

Program ini menyimpan data mahasiswa dengan tipe data  **dictionary** dimana memiliki struktur yang berisi:

```python
data_mahasiswa = [
    {
        'nama': 'Ahmad Rizki',
        'nim': '20210001', 
        'nilai_uts': 85,
        'nilai_uas': 90,
        'nilai_tugas': 88
    }
]
```

### Untuk menghitung Nilai akhir kami menggunakan rumus berikut:
```python
def hitung_nilai_akhir(uts, uas, tugas):
    return (uts * 0.3) + (uas * 0.4) + (tugas * 0.3)

```

### Dari nilai akhir yang ada, kita dapatkan menkategorikan sebagai berikut:
```python
def tentukan_grade(nilai_akhir):
    if nilai_akhir >= 80: return 'A'
    elif nilai_akhir >= 70: return 'B'
    elif nilai_akhir >= 60: return 'C'
    elif nilai_akhir >= 50: return 'D'
    else: return 'E'
```

### Fungsi Menghitung nilai tertinggi mahasiswa
```python
def nilai_maks(mahasiswa_list):
    return max(mahasiswa_list, 
              key=lambda x: hitung_nilai_akhir(
                  x['nilai_uts'], x['nilai_uas'], x['nilai_tugas']
              ))
```

### Switch Case untuk control program
```python
match pilihan:
    case '1': tampilkan_data(data_mahasiswa)
    case '2': 
    case '7': return False  # keluar
```

## 🖥️ How to run Program

1. Pastikan sudah menginstal **Python 3.1x** keatas dikarenakan menggunakan metode switch case 
2. jalankan file program dengan nama `123140208_RB.py`
3. Jalankan program melalui terminal:
   ```bash
   python 123140208_RB.py
   ```
4. Pilih menu pilihan:
   ```
   ==================================================
     Selamat Datang di Sistem Manajemen Nilai Mahasiswa
    ==================================================     
    1. Tampilkan Semua Data Mahasiswa
    2. Cari Mahasiswa dengan Nilai Tertinggi
    3. Cari Mahasiswa dengan Nilai Terendah
    4. Input Data Mahasiswa Baru
    5. Filter Mahasiswa Berdasarkan Grade
    6. Hitung Rata-rata Nilai Kelas
    7. Keluar
    --------------------------------------------------     
    Masukkan pilihan (1-7):
   ```

---

## 🧾 Contoh Output

```
Daftar Nilai Mahasiswa
=====================================================================================
No  Nama            NIM          UTS    UAS    Tugas  Nilai Akhir  Grade 
-------------------------------------------------------------------------------------
1   Ahmad Rizki     20210001     85     90     88     87.90        A     
2   Siti Nurhaliza  20210002     78     82     80     80.20        A     
3   Budi Santoso    20210003     65     70     68     67.90        C     
4   Dewi Lestari    20210004     55     60     58     57.90        D     
5   Fajar Pratama   20210005     45     50     48     47.90        E     
=====================================================================================
```

---
