def hitung_nilai_akhir(uts, uas, tugas):
    #Rumus perhitungan nilai akhir
    return (uts * 0.3) + (uas * 0.4) + (tugas * 0.3)

def tentukan_grade(nilai_akhir):
    #Nilai grade berdasarkan golongannya
    if nilai_akhir >= 80:
        return 'A'
    elif nilai_akhir >= 70:
        return 'B'
    elif nilai_akhir >= 60:
        return 'C'
    elif nilai_akhir >= 50:
        return 'D'
    else:
        return 'E'

def tampilkan_data(mahasiswa_list):
    #tampilan output dengan format tabel
    if not mahasiswa_list:
        print("Tidak ada data mahasiswa.")
        return
    
    print("\n" + "="*85)
    print(f"{'No':<3} {'Nama':<15} {'NIM':<12} {'UTS':<6} {'UAS':<6} {'Tugas':<6} {'Nilai Akhir':<12} {'Grade':<6}")
    print("-"*85)
    
    for i, mahasiswa in enumerate(mahasiswa_list, 1):
        nilai_akhir = hitung_nilai_akhir(mahasiswa['nilai_uts'], mahasiswa['nilai_uas'], mahasiswa['nilai_tugas'])
        grade = tentukan_grade(nilai_akhir)
        
        print(f"{i:<3} {mahasiswa['nama']:<15} {mahasiswa['nim']:<12} "
              f"{mahasiswa['nilai_uts']:<6} {mahasiswa['nilai_uas']:<6} "
              f"{mahasiswa['nilai_tugas']:<6} {nilai_akhir:<12.2f} {grade:<6}")
    print("="*85)

def nilai_maks(mahasiswa_list):
    #Mencari mahasiswa nilai maks
    if not mahasiswa_list:
        return None
    
    maks = max(mahasiswa_list, key=lambda x: hitung_nilai_akhir(x['nilai_uts'], x['nilai_uas'], x['nilai_tugas']))
    return maks

def nilai_min(mahasiswa_list):
    #mencari mahasiswa nilai minim
    if not mahasiswa_list:
        return None
    
    minim = min(mahasiswa_list, key=lambda x: hitung_nilai_akhir(x['nilai_uts'], x['nilai_uas'], x['nilai_tugas']))
    return minim

def input_data_mahasiswa():
    #Memasukkan data mahasiswa baru
    print("\n--- Input Data Mahasiswa Baru ---")
    nama = input("Masukkan nama mahasiswa: ")
    nim = input("Masukkan NIM: ")
    
    try:
        nilai_uts = float(input("Masukkan nilai UTS: "))
        nilai_uas = float(input("Masukkan nilai UAS: "))
        nilai_tugas = float(input("Masukkan nilai Tugas: "))
    except ValueError:
        print("Error: Nilai harus berupa angka!")
        return None
    
    mahasiswa_baru = {
        'nama': nama,
        'nim': nim,
        'nilai_uts': nilai_uts,
        'nilai_uas': nilai_uas,
        'nilai_tugas': nilai_tugas
    }
    
    print("Data mahasiswa berhasil ditambahkan!")
    return mahasiswa_baru

def filter_by_grade(mahasiswa_list, grade):
    #filter mahasiswa berdasarkan grade tertentu
    hasil_filter = []
    for mahasiswa in mahasiswa_list:
        nilai_akhir = hitung_nilai_akhir(mahasiswa['nilai_uts'], mahasiswa['nilai_uas'], mahasiswa['nilai_tugas'])
        if tentukan_grade(nilai_akhir) == grade.upper():
            hasil_filter.append(mahasiswa)
    return hasil_filter

def average_class(mahasiswa_list):
    #Menghitung rata-rata nilai akhir kelas
    if not mahasiswa_list:
        return 0
    
    total_nilai = 0
    for mahasiswa in mahasiswa_list:
        nilai_akhir = hitung_nilai_akhir(mahasiswa['nilai_uts'], mahasiswa['nilai_uas'], mahasiswa['nilai_tugas'])
        total_nilai += nilai_akhir
    
    return total_nilai / len(mahasiswa_list)

def hitung_nilai_akhir(uts, uas, tugas):
    #Rumus perhitungan nilai akhir
    return (uts * 0.3) + (uas * 0.4) + (tugas * 0.3)

def tentukan_grade(nilai_akhir):
    #Nilai grade berdasarkan golongannya
    if nilai_akhir >= 80:
        return 'A'
    elif nilai_akhir >= 70:
        return 'B'
    elif nilai_akhir >= 60:
        return 'C'
    elif nilai_akhir >= 50:
        return 'D'
    else:
        return 'E'

def tampilkan_data(mahasiswa_list):
    #tampilan output dengan format tabel
    if not mahasiswa_list:
        print("Tidak ada data mahasiswa.")
        return
    
    print("\n" + "="*85)
    print(f"{'No':<3} {'Nama':<15} {'NIM':<12} {'UTS':<6} {'UAS':<6} {'Tugas':<6} {'Nilai Akhir':<12} {'Grade':<6}")
    print("-"*85)
    
    for i, mahasiswa in enumerate(mahasiswa_list, 1):
        nilai_akhir = hitung_nilai_akhir(mahasiswa['nilai_uts'], mahasiswa['nilai_uas'], mahasiswa['nilai_tugas'])
        grade = tentukan_grade(nilai_akhir)
        
        print(f"{i:<3} {mahasiswa['nama']:<15} {mahasiswa['nim']:<12} "
              f"{mahasiswa['nilai_uts']:<6} {mahasiswa['nilai_uas']:<6} "
              f"{mahasiswa['nilai_tugas']:<6} {nilai_akhir:<12.2f} {grade:<6}")
    print("="*85)

def nilai_maks(mahasiswa_list):
    #Mencari mahasiswa nilai maks
    if not mahasiswa_list:
        return None
    
    maks = max(mahasiswa_list, key=lambda x: hitung_nilai_akhir(x['nilai_uts'], x['nilai_uas'], x['nilai_tugas']))
    return maks

def nilai_min(mahasiswa_list):
    #mencari mahasiswa nilai minim
    if not mahasiswa_list:
        return None
    
    minim = min(mahasiswa_list, key=lambda x: hitung_nilai_akhir(x['nilai_uts'], x['nilai_uas'], x['nilai_tugas']))
    return minim

def input_data_mahasiswa():
    #Memasukkan data mahasiswa baru
    print("\n--- Input Data Mahasiswa Baru ---")
    nama = input("Masukkan nama mahasiswa: ")
    nim = input("Masukkan NIM: ")
    
    try:
        nilai_uts = float(input("Masukkan nilai UTS: "))
        nilai_uas = float(input("Masukkan nilai UAS: "))
        nilai_tugas = float(input("Masukkan nilai Tugas: "))
    except ValueError:
        print("Error: Nilai harus berupa angka!")
        return None
    
    mahasiswa_baru = {
        'nama': nama,
        'nim': nim,
        'nilai_uts': nilai_uts,
        'nilai_uas': nilai_uas,
        'nilai_tugas': nilai_tugas
    }
    
    print("Data mahasiswa berhasil ditambahkan!")
    return mahasiswa_baru

def filter_by_grade(mahasiswa_list, grade):
    #filter mahasiswa berdasarkan grade tertentu
    hasil_filter = []
    for mahasiswa in mahasiswa_list:
        nilai_akhir = hitung_nilai_akhir(mahasiswa['nilai_uts'], mahasiswa['nilai_uas'], mahasiswa['nilai_tugas'])
        if tentukan_grade(nilai_akhir) == grade.upper():
            hasil_filter.append(mahasiswa)
    return hasil_filter

def average_class(mahasiswa_list):
    #Menghitung rata-rata nilai akhir kelas
    if not mahasiswa_list:
        return 0
    
    total_nilai = 0
    for mahasiswa in mahasiswa_list:
        nilai_akhir = hitung_nilai_akhir(mahasiswa['nilai_uts'], mahasiswa['nilai_uas'], mahasiswa['nilai_tugas'])
        total_nilai += nilai_akhir
    
    return total_nilai / len(mahasiswa_list)

def switch_case(pilihan, data_mahasiswa):
    #Fungsi switch case untuk menangani pilihan menu, Return True jika program harus berlanjut, False jika harus berhenti
    match pilihan:
        case '1':
            tampilkan_data(data_mahasiswa)
            return True
            
        case '2':
            maks = nilai_maks(data_mahasiswa)
            if maks:
                nilai_akhir = hitung_nilai_akhir(maks['nilai_uts'], maks['nilai_uas'], maks['nilai_tugas'])
                grade = tentukan_grade(nilai_akhir)
                print(f"\nMahasiswa dengan nilai tertinggi:")
                print(f"Nama: {maks['nama']}")
                print(f"NIM: {maks['nim']}")
                print(f"Nilai Akhir: {nilai_akhir:.2f}")
                print(f"Grade: {grade}")
            else:
                print("Tidak ada data mahasiswa.")
            return True
            
        case '3':
            minim = nilai_min(data_mahasiswa)
            if minim:
                nilai_akhir = hitung_nilai_akhir(minim['nilai_uts'], minim['nilai_uas'], minim['nilai_tugas'])
                grade = tentukan_grade(nilai_akhir)
                print(f"\nMahasiswa dengan nilai terendah:")
                print(f"Nama: {minim['nama']}")
                print(f"NIM: {minim['nim']}")
                print(f"Nilai Akhir: {nilai_akhir:.2f}")
                print(f"Grade: {grade}")
            else:
                print("Tidak ada data mahasiswa.")
            return True
            
        case '4':
            mahasiswa_baru = input_data_mahasiswa()
            if mahasiswa_baru:
                data_mahasiswa.append(mahasiswa_baru)
            return True
            
        case '5':
            print("\nPilihan Grade: A, B, C, D, E")
            grade_input = input("Masukkan grade yang ingin difilter: ").upper()
            
            if grade_input in ['A', 'B', 'C', 'D', 'E']:
                hasil_filter = filter_by_grade(data_mahasiswa, grade_input)
                if hasil_filter:
                    print(f"\nMahasiswa dengan grade {grade_input}:")
                    tampilkan_data(hasil_filter)
                else:
                    print(f"Tidak ada mahasiswa dengan grade {grade_input}.")
            else:
                print("Grade tidak valid!")
            return True
            
        case '6':
            rata_rata = average_class(data_mahasiswa)
            print(f"\nRata-rata nilai akhir kelas: {rata_rata:.2f}")
            return True
            
        case '7':
            print("Terima kasih telah menggunakan program!")
            return False  # menghentikan program
            
        case _:
            print("Pilihan tidak valid! Silakan pilih 1-7.")
            return True

def main():
    # Data awal mahasiswa (minimal 5)
    data_mahasiswa = [
        {'nama': 'Ahmad Rizki', 'nim': '20210001', 'nilai_uts': 85, 'nilai_uas': 90, 'nilai_tugas': 88},
        {'nama': 'Siti Nurhaliza', 'nim': '20210002', 'nilai_uts': 78, 'nilai_uas': 82, 'nilai_tugas': 80},
        {'nama': 'Budi Santoso', 'nim': '20210003', 'nilai_uts': 65, 'nilai_uas': 70, 'nilai_tugas': 68},
        {'nama': 'Dewi Lestari', 'nim': '20210004', 'nilai_uts': 55, 'nilai_uas': 60, 'nilai_tugas': 58},
        {'nama': 'Fajar Pratama', 'nim': '20210005', 'nilai_uts': 45, 'nilai_uas': 50, 'nilai_tugas': 48}
    ]
    
    while True:
        print("\n" + "="*50)
        print("     Selamat Datang di Sistem Manajemen Nilai Mahasiswa")
        print("="*50)
        print("1. Tampilkan Semua Data Mahasiswa")
        print("2. Cari Mahasiswa dengan Nilai Tertinggi")
        print("3. Cari Mahasiswa dengan Nilai Terendah")
        print("4. Input Data Mahasiswa Baru")
        print("5. Filter Mahasiswa Berdasarkan Grade")
        print("6. Hitung Rata-rata Nilai Kelas")
        print("7. Keluar")
        print("-"*50)
        
        pilihan = input("Masukkan pilihan (1-7): ")
        
        # Jika switch_case mengembalikan False, program selesai
        if not switch_case(pilihan, data_mahasiswa):
            break

if __name__ == "__main__":
    main()