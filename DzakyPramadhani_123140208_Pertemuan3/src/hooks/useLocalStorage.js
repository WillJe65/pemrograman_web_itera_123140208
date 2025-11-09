import { useState, useEffect } from 'react';

/**
 * Mendapatkan nilai dari localStorage.
 * @param {string} key - Kunci untuk localStorage.
 * @param {any} initialValue - Nilai default jika tidak ada di localStorage.
 */
function getSavedValue(key, initialValue) {
  const savedValue = localStorage.getItem(key);
  
  if (savedValue) {
    // Jika nilai tersimpan ada, parse kembali
    try {
      return JSON.parse(savedValue);
    } catch (e) {
      // Jika error parsing, kembalikan nilai tersimpan apa adanya
      return savedValue;
    }
  }

  // Jika initialValue adalah fungsi (lazy initialization), panggil
  if (initialValue instanceof Function) {
    return initialValue();
  }

  // Kembalikan nilai awal jika tidak ada yang tersimpan
  return initialValue;
}

/**
 * Sebuah custom hook yang menggabungkan useState dengan localStorage.
 * @param {string} key - Kunci unik untuk item di localStorage.
 * @param {any} initialValue - Nilai awal yang akan digunakan jika tidak ada nilai di localStorage.
 */
export function useLocalStorage(key, initialValue) {
  // Gunakan fungsi getSavedValue untuk inisialisasi state secara "lazy"
  const [value, setValue] = useState(() => {
    return getSavedValue(key, initialValue);
  });

  // Gunakan useEffect untuk menyimpan ke localStorage setiap kali `value` berubah
  useEffect(() => {
    // Simpan nilai ke localStorage
    localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]); // Jalankan efek ini jika key atau value berubah

  // Kembalikan nilai dan fungsi setternya, sama seperti useState
  return [value, setValue];
}