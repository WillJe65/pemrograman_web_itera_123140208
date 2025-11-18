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

class Book(LibraryItem):
    def __init__(self, nama: str, id: str, rilis: int, author: str, isbn: str, pages: int):
        super().__init__(nama, id, rilis)
        self.author = author
        self.isbn = isbn
        self.pages = pages

    def informasi(self) -> str:
        return f"Book: {self.nama}, ID: {self.id}, Author: {self.author}, ISBN: {self.isbn}, Pages: {self.pages}, Released: {self.rilis}, Checked Out: {self.is_checked_out}"
    
class Magazine(LibraryItem):
    def __init__(self, nama: str, id: str, rilis: int, publisher: str, series: str):
        super().__init__(nama, id, rilis)
        self.publisher = publisher
        self.series = series
    
    def informasi(self) -> str:
        return f"Magazine: {self.nama}, ID: {self.id}, Publisher: {self.publisher}, Series: {self.series}, Released: {self.rilis}, Checked Out: {self.is_checked_out}"
    
class Library:
    def __init__(self):
        self.items: list[LibraryItem] = []

    def tambah_item(self, item: LibraryItem):
        self.items.append(item)
    
    def kurangi_item(self, id: str) -> bool:
        for item in self.items:
            if item.id == id:
                self.items.remove(item)
                return True
        return False

    def cari_item(self, nama: str) -> list:
        hasil = []
        for item in self.items:
            if nama.lower() in item.nama.lower():
                hasil.append(item)
        return hasil
    
    def display_items(self):
        if not self.items:
            print("Tidak ada item dalam perpustakaan.")
        else:
            for item in self.items:
                print(item.informasi())

def input_angka(prompt: str) -> int:
    #Handle input untuk angka dengan error handling
    while True:
        try:
            return int(input(prompt))
        except ValueError:
            print("Error: Masukkan harus berupa angka!")

def input_teks(prompt: str, allow_empty: bool = False) -> str:
    #Handle input untuk teks dengan validasi
    while True:
        teks = input(prompt).strip()
        if not teks and not allow_empty:
            print("Error: Input tidak boleh kosong!")
        else:
            return teks

def validasi_id_unik(library: Library, id: str) -> bool:
    #Validasi apakah ID sudah digunakan
    for item in library.items:
        if item.id == id:
            print("Error: ID sudah digunakan! Gunakan ID yang berbeda.")
            return False
    return True

def tambah_buku_menu(library: Library):
    #Menu untuk menambah buku dengan error handling
    try:
        print("\n=== TAMBAH BUKU ===")
        nama = input_teks("Nama buku: ")
        id = input_teks("Nomor buku (ID): ")
        
        # Validasi ID unik
        if not validasi_id_unik(library, id):
            return
            
        rilis = input_angka("Tahun rilis: ")
        author = input_teks("Author: ")
        isbn = input_teks("Masukan ISBN: ")
        pages = input_angka("Jumlah halaman: ")
        
        # Validasi data tidak negatif
        if rilis < 0:
            print("Error: Tahun rilis tidak boleh negatif!")
            return
        if pages <= 0:
            print("Error: Jumlah halaman harus lebih dari 0!")
            return
            
        new_book = Book(nama, id, rilis, author, isbn, pages)
        library.tambah_item(new_book)
        print("Buku berhasil ditambahkan.")
        
    except KeyboardInterrupt:
        print("\nOperasi dibatalkan oleh user.")
    except Exception as e:
        print(f"Error tidak terduga: {e}")

def tambah_majalah_menu(library: Library):
    #Menu untuk menambah majalah dengan error handling
    try:
        print("\n=== TAMBAH MAJALAH ===")
        nama = input_teks("Nama Magazine: ")
        id = input_teks("Nomor Magazine (ID): ")
        
        # Validasi ID unik
        if not validasi_id_unik(library, id):
            return
            
        rilis = input_angka("Tahun Rilis: ")
        publisher = input_teks("Nama Publisher: ")
        series = input_teks("Masukan nama seriesnya: ")
        
        # Validasi tahun tidak negatif
        if rilis < 0:
            print("Error: Tahun rilis tidak boleh negatif!")
            return
            
        new_magazine = Magazine(nama, id, rilis, publisher, series)
        library.tambah_item(new_magazine)
        print("Magazine berhasil ditambahkan.")
        
    except KeyboardInterrupt:
        print("\nOperasi dibatalkan oleh user.")
    except Exception as e:
        print(f"Error tidak terduga: {e}")

def hapus_item_menu(library: Library):
    #Menu untuk menghapus item dengan error handling
    try:
        print("\n=== HAPUS ITEM ===")
        if not library.items:
            print("Tidak ada item yang bisa dihapus.")
            return
            
        id = input_teks("Masukan ID item yang akan dihapus: ")
        if library.kurangi_item(id):
            print("Item berhasil dihapus.")
        else:
            print("Item tidak ditemukan")
            
    except KeyboardInterrupt:
        print("\nOperasi dibatalkan oleh user.")
    except Exception as e:
        print(f"Error tidak terduga: {e}")

def cari_item_menu(library: Library):
    #Menu untuk mencari item dengan error handling#
    try:
        print("\n=== CARI ITEM ===")
        if not library.items:
            print("Tidak ada item dalam perpustakaan.")
            return
            
        nama = input_teks("Masukan nama item yang dicari: ")
        results = library.cari_item(nama)
        if results:
            print(f"\nDitemukan {len(results)} item:")
            for item in results:
                print(item.informasi())
        else:
            print("Item tidak ditemukan.")
            
    except KeyboardInterrupt:
        print("\nOperasi dibatalkan oleh user.")
    except Exception as e:
        print(f"Error tidak terduga: {e}")

def tampilkan_semua_menu(library: Library):
    #Menu untuk menampilkan semua item dalam bentuk tabel compact
    try:
        if not library.items:
            print("\nTidak ada item dalam perpustakaan.")
            return
        
        print("\n" + "="*90)
        print("SEMUA ITEM DI PERPUSTAKAAN")
        print("="*90)
        
        # Header tabel
        print(f"{'No.':<3} {'Tipe':<8} {'ID':<6} {'Nama':<20} {'Detail':<15} {'Tahun':<6} {'Status':<10}")
        print("-"*90)
        
        # Data tabel
        for i, item in enumerate(library.items, 1):
            if isinstance(item, Book):
                tipe = "Buku"
                detail = f"{item.pages} hal"
            else:  # Magazine
                tipe = "Majalah" 
                detail = item.series[:12] + "..." if len(item.series) > 12 else item.series
            
            status = "diPinjam" if item.is_checked_out else "Tersedia"
            nama = item.nama[:18] + "..." if len(item.nama) > 18 else item.nama
            
            print(f"{i:<3} {tipe:<8} {item.id:<6} {nama:<20} {detail:<15} {item.rilis:<6} {status:<10}")
        
        print("="*90)
        print(f"Total: {len(library.items)} item")
        
    except Exception as e:
        print(f"Error saat menampilkan item: {e}")

def main():
    library = Library()
    
    library.tambah_item(Book("10 dosa besar ohim", "B001", 2020, "Royhan", "978-3-16-148410-0", 350))
    library.tambah_item(Book("Atri my dear moments", "B002", 2019, "Farisi", "978-1-23-456789-0", 250))
    library.tambah_item(Book("1001 kisah dunia", "B003", 2021, "Citra", "978-0-12-345678-9", 400))
    library.tambah_item(Magazine("Jawir vs genteng", "M001", 2022, "ngawi production", "Monthly Story"))
    library.tambah_item(Magazine("Tech Today", "M001", 2021, "Tech Publisher", "Monthly Tech"))

    while True:
        try:
            print("\n" + "="*50)
            print("Selamat datang di Library ITERA:")
            print("="*50)
            print("1. Tambah buku")
            print("2. Tambah majalah")
            print("3. Hapus item")
            print("4. Cari item")
            print("5. Tampilkan semua item")
            print("6. Keluar")
            print("="*50)

            choice = input_teks("Masukan pilihan dengan cara pilih nomor 1-6: ")

            if choice == '1':
                tambah_buku_menu(library)
            elif choice == '2':
                tambah_majalah_menu(library)
            elif choice == '3':
                hapus_item_menu(library)
            elif choice == '4':
                cari_item_menu(library)
            elif choice == '5':
                tampilkan_semua_menu(library)
            elif choice == '6':
                print("\nKeluar program.")
                print("Terima kasih telah menggunakan layanan kami!")
                break
            else:
                print("Error: Pilihan tidak valid. Silahkan pilih nomor 1-6.")
                
        except KeyboardInterrupt:
            print("\n\nProgram dihentikan oleh user. Terima kasih!")
            break
        except Exception as e:
            print(f"Error tidak terduga di menu utama: {e}")

if __name__ == "__main__":
    main()