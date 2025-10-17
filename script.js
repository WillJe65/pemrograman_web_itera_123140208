const openpopup = document.getElementById("openpopup");
const closepopup = document.getElementById("closepopup");
const popup = document.getElementById("popup");

openpopup.addEventListener('click', () => {
    popup.style.display = 'block';
});

closepopup.addEventListener('click', () => {
    popup.style.display = 'none';
    taskManager.cancelEdit();
});

window.addEventListener('click', (e) => {
    if (e.target === popup) {
        popup.style.display = 'none';
        taskManager.cancelEdit();
    }
});

class TaskManager {
    constructor() {
        this.tasks = this.loadTasks();
        this.currentEditId = null;
        this.init();
    }

    init() {
        this.generateTable();
        this.setupEventListeners();
    }

    loadTasks() {
        const tasksJSON = localStorage.getItem("studenttasks");
        return tasksJSON ? JSON.parse(tasksJSON) : [];
    }

    saveTasks() {
        localStorage.setItem("studenttasks", JSON.stringify(this.tasks));
    }

    // METHOD FILTER 
    filterTasks() {
        const statusFilter = document.querySelector('.status-filter').value;
        const deadlineFilter = document.querySelector('.deadline-filter').value;
        
        let filteredTasks = [...this.tasks]; // Copy semua tasks

        // Filter Status
        if (statusFilter !== 'all') {
            filteredTasks = filteredTasks.filter(task => task.status === statusFilter);
        }

        // Filter Deadline
        if (deadlineFilter !== 'all') {
            const today = new Date();
            
            filteredTasks = filteredTasks.filter(task => {
                const taskDate = new Date(task.date);
                
                switch(deadlineFilter) {
                    case 'today':
                        return this.isSameDay(taskDate, today);
                    case 'week':
                        return this.isThisWeek(taskDate);
                    case 'overdue':
                        return taskDate < today && !this.isSameDay(taskDate, today);
                    default:
                        return true;
                }
            });
        }

        return filteredTasks;
    }

    //Fungsi untuk Filter tanggal
    isSameDay(date1, date2) {
        return date1.toDateString() === date2.toDateString();
    }

    isThisWeek(date) {
        const today = new Date();
        const startOfWeek = new Date(today);
        startOfWeek.setDate(today.getDate() - today.getDay()); // Minggu
        const endOfWeek = new Date(startOfWeek);
        endOfWeek.setDate(startOfWeek.getDate() + 6); // Sabtu
        
        return date >= startOfWeek && date <= endOfWeek;
    }

    // RENDER TABLE DENGAN FILTER
    generateTable() {
        const filteredTasks = this.filterTasks();
        const tablebody = document.getElementById("tasktable");
        tablebody.innerHTML = "";

        if (filteredTasks.length === 0) {
            const emptyRow = document.createElement("tr");
            emptyRow.innerHTML = `
                <td colspan="6" style="text-align: center; padding: 20px; color: #7f8c8d;">
                    Tidak ada tugas yang sesuai dengan filter
                </td>
            `;
            tablebody.appendChild(emptyRow);
            return;
        }

        filteredTasks.forEach((task, index) => {
            const row = document.createElement("tr");
            
            let deadlineClass = "";
            let deadlineText = this.formatDate(task.date);

            if (this.isDeadlinePassed(task.date)) {
                deadlineClass = "deadline-terlewat";
            } else if (this.isDeadlineApproaching(task.date)) {
                deadlineClass = "hampir-deadline";
            }
            
            row.innerHTML = `
                <td>${index + 1}</td>
                <td>${task.tugas}</td>
                <td>${task.matakuliah}</td>
                <td class="${deadlineClass}">${deadlineText}</td>
                <td>
                    <span class="status-badge ${task.status}">
                        ${this.getStatusText(task.status)}
                    </span>
                </td>
                <td>
                    <button class="btn-edit" onclick="taskManager.startEdit('${task.id}')">Edit</button>
                    <button class="btn-delete" onclick="taskManager.deleteTask('${task.id}')">Hapus</button>
                </td>
            `;

            tablebody.appendChild(row);
        });

        // Update counter
        this.updateTaskCounter(filteredTasks.length);
    }

    // Update Counter tugas untuk filter
    updateTaskCounter(filteredCount) {
        const totalCount = this.tasks.length;
        const counter = document.querySelector('.task-counter');
        if (counter) {
            counter.textContent = `Menampilkan ${filteredCount} dari ${totalCount} tugas`;
        }
    }

    // Membuat ID unik untuk setiap tugas
    generateId() {
        return Date.now().toString(36) + Math.random().toString(36).substr(2);
    }

    //fitur CRUD
    addTask(taskData) {
        const task = {
            id: this.generateId(),
            tugas: taskData.tugas,
            matakuliah: taskData.matakuliah,
            date: taskData.date,
            status: taskData.status,
            createdAt: new Date().toISOString()
        };
        this.tasks.push(task);
        this.saveTasks();
        this.generateTable(); // Render ulang dengan filter
    }

    //Rewrite
    editTask(id, updatedData) {
        const taskIndex = this.tasks.findIndex(task => task.id === id);
        if (taskIndex !== -1) {
            this.tasks[taskIndex] = { ...this.tasks[taskIndex], ...updatedData };
            this.saveTasks();
            this.generateTable(); // Render ulang dengan filter
        }
    }

    //Delete
    deleteTask(id) {
        if (confirm("Apakah anda yakin untuk menghapus tugas ini?")) {
            this.tasks = this.tasks.filter(task => task.id !== id);
            this.saveTasks();
            this.generateTable(); // Render ulang dengan filter
        }
    }

    //format penanggalan
    formatDate(dateString) {
        const date = new Date(dateString);
        return date.toLocaleDateString("id-ID", {
            day: "2-digit",
            month: "short",
            year: "numeric"
        });
    }

    //jika deadline sudah dekat
    isDeadlineApproaching(deadline) {
        const today = new Date();
        const deadlineDate = new Date(deadline);
        const timeDiff = deadlineDate - today;
        const daysDiff = timeDiff / (1000 * 60 * 60 * 24);
        return daysDiff <= 2 && daysDiff > 0;
    }

    //jika deadline terlewat
    isDeadlinePassed(deadline) {
        return new Date(deadline) < new Date();
    }

    //mendapatkan status dari input
    getStatusText(status) {
        const statusMap = {
            'belum': 'Belum',
            'progress': 'Progress', 
            'done': 'Selesai'
        };
        return statusMap[status] || status;
    }

    //Mengubah tampilan untuk form edit dan arah logicnya
    startEdit(id) {
        const task = this.tasks.find(task => task.id === id);
        if (task) {
            this.currentEditId = id;
            document.getElementById('tugas').value = task.tugas;
            document.getElementById('matakuliah').value = task.matakuliah;
            document.getElementById('date').value = task.date;
            document.getElementById('status').value = task.status;

            const submitButton = document.querySelector("#taskform button");
            submitButton.textContent = "Update Tugas";

            popup.style.display = 'block';
        }
    }

    //mengembalikan seperti semula
    cancelEdit() {
        this.currentEditId = null;
        this.clearForm();
        const submitButton = document.querySelector('#taskform button');
        submitButton.textContent = 'Simpan';
        popup.style.display = 'none';
    }


    clearForm() {
        document.getElementById('taskform').reset();
    }

    //Main program berdasarkan event yang sedang dilakukan client
    setupEventListeners() {
        const form = document.getElementById('taskform');
        
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const formData = {
                tugas: document.getElementById('tugas').value.trim(),
                matakuliah: document.getElementById('matakuliah').value.trim(),
                date: document.getElementById('date').value,
                status: document.getElementById('status').value
            };

            if (this.currentEditId) {
                this.editTask(this.currentEditId, formData);
            } else {
                this.addTask(formData);
            }
            
            this.cancelEdit();
            alert(this.currentEditId ? 'Tugas berhasil diupdate!' : 'Tugas berhasil ditambahkan!');
        });

        // EVENT LISTENERS UNTUK FILTER
        document.querySelector('.status-filter').addEventListener('change', () => {
            this.generateTable();
        });

        document.querySelector('.deadline-filter').addEventListener('change', () => {
            this.generateTable();
        });

        // Reset filter button (opsional)
        const resetBtn = document.querySelector('.reset-filters');
        if (resetBtn) {
            resetBtn.addEventListener('click', () => {
                document.querySelector('.status-filter').value = 'all';
                document.querySelector('.deadline-filter').value = 'all';
                this.generateTable();
            });
        }
    }
}

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    window.taskManager = new TaskManager();
});