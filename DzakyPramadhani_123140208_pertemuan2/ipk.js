
document.addEventListener('DOMContentLoaded', () => {
    // DOM elements
    const inputNama = document.getElementById('matakuliah_ipk');
    const inputSks = document.getElementById('sks');
    const inputNilai = document.getElementById('nilai');
    const btnTambah = document.querySelector('.add-mk-btn');
    const btnHitung = document.querySelector('.hitung-ipk-btn');
    const btnReset = document.querySelector('.reset-ipk-btn');
    const matkultabelbody = document.querySelector('#mk-table tbody');
    const spanTotalSks = document.getElementById('total-sks');
    const spanHasilIpk = document.getElementById('hasil-ipk');

    // state
    let courses = [];

    // Async storage to save table data
    const saveToStorage = async () => {
        try {
            await new Promise(resolve => setTimeout(resolve, 50)); // simulate small delay
            localStorage.setItem('ipk_courses', JSON.stringify(courses));
        } catch (err) {
            console.error('Gagal menyimpan ke storage', err);
        }
    };

    // load from storage
    const loadFromStorage = async () => {
        try {
            await new Promise(resolve => setTimeout(resolve, 50));
            const raw = localStorage.getItem('ipk_courses');
            return raw ? JSON.parse(raw) : [];
        } catch (err) {
            console.error('Gagal memuat dari storage', err);
            return [];
        }
    };

    // Render motivational message based on IPK using template literals
    const getMotivasi = (ipk) => {
        if (ipk >= 3.50) return `IPK ${ipk.toFixed(2)} — Hebat! Pertahankan kerja kerasmu dan raih prestasi lebih tinggi.`;
        if (ipk >= 3.00) return `IPK ${ipk.toFixed(2)} — Bagus! Sedikit usaha lagi untuk mencapai yang terbaik.`;
        if (ipk >= 2.00) return `IPK ${ipk.toFixed(2)} — Tetap semangat! Susun strategi belajar dan tingkatkan disiplin.`;
        return `IPK ${ipk.toFixed(2)} — Jangan menyerah. Setiap langkah kecil membawa perubahan besar. Ayo bangkit!`;
    };

    // Calculate IPK (arrow function)
    const calculateIpk = () => {
        const totalSks = courses.reduce((sum, c) => sum + Number(c.sks), 0);
        const totalPoints = courses.reduce((sum, c) => sum + Number(c.sks) * Number(c.grade), 0);
        const ipk = totalSks ? totalPoints / totalSks : 0;
        return { totalSks, ipk };
    };

    // Render/generate table base on data with arrow function
    const render = () => {
        // render table rows
        matkultabelbody.innerHTML = courses.map((c, i) => {
            return `
                <tr>
                    <td>${c.name}</td>
                    <td>${c.sks}</td>
                    <td>${Number(c.grade).toFixed(2)}</td>
                    <td><button class="btn-delete" data-index="${i}">Hapus</button></td>
                </tr>
            `;
        }).join('');

        // attach delete listeners
        matkultabelbody.querySelectorAll('.btn-delete').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const idx = Number(e.currentTarget.dataset.index);
                removeCourse(idx);
            });
        });

        // update totals and ipk
        const { totalSks, ipk } = calculateIpk();
        spanTotalSks.textContent = totalSks;
        spanHasilIpk.textContent = ipk.toFixed(2);

        // render motivational message below hasil-ipk (create if not exists)
        let pesanEl = document.getElementById('pesan-ipk');
        if (!pesanEl) {
            pesanEl = document.createElement('p');
            pesanEl.id = 'pesan-ipk';
            pesanEl.style.marginTop = '8px';
            pesanEl.style.fontWeight = '600';
            const hasilDiv = document.querySelector('.hasil-ipk');
            hasilDiv.appendChild(pesanEl);
        }
        pesanEl.textContent = getMotivasi(ipk);
    };

    // Add course
    //using arrow function
    const addCourse = async () => {
        const name = inputNama.value.trim();
        const sks = Number(inputSks.value);
        const grade = Number(inputNilai.value);

        if (!name) return alert('Masukkan nama mata kuliah');
        if (!sks || sks <= 0) return alert('Masukkan SKS yang valid');

        courses.push({ name, sks, grade });
        await saveToStorage();
        render();

        // clear inputs
        inputNama.value = '';
        inputSks.value = '';
        inputNilai.value = '4.00';
        inputNama.focus();
    };

    // Remove course (arrow)
    const removeCourse = async (index) => {
        courses.splice(index, 1);
        await saveToStorage();
        render();
    };

    // Reset all
    const resetAll = async () => {
        if (!confirm('Reset semua mata kuliah dan hasil IPK?')) return;
        courses = [];
        localStorage.removeItem('ipk_courses');
        await saveToStorage();
        render();
    };

    // Event click button
    btnTambah.addEventListener('click', async (e) => {
        e.preventDefault();
        await addCourse();
    });

    //ipk calculation
    btnHitung.addEventListener('click', (e) => {
        e.preventDefault();
        const { ipk } = calculateIpk();
        // show a small modal-like alert with template literal (keeps it simple)
        alert(`Hasil IPK: ${ipk.toFixed(2)}\n${getMotivasi(ipk)}`);
    });

    //reset button
    btnReset.addEventListener('click', async (e) => {
        e.preventDefault();
        await resetAll();
    });

    // Initialize (async)
    (async () => {
        courses = await loadFromStorage();
        render();
    })();
});