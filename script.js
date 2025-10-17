const openpopup = document.getElementById("openpopup");
const closepopup = document.getElementById("close-popup");
const popup = document.getElementById("popup");

class taskmanager{
    constructor(){
        this.tasks = this.loadTasks();
        this.id = 0;
        this.init();
    }

    init(){
        this.generatetable();
        this.setupEventListeners();
    }

    loadTasks(){
        const tasksJSON = localStorage.getItem("studenttasks");
        return tasksJSON ? JSON.parse(tasks) : [];
    }

    saveTasks(){
        localStorage.setItem("studenttasks", JSON.stringify(this.tasks));
    }

    cleantasks(){
        document.getElementById("taskform").reset()
    }
    
    generateid(){
        this.id = this.id+1;
        return this.id;
    }

    addtask(tugas, matakuliah, date, status){
        const task={
            id = this.generateid(),
            tugas = taskData.tugas,
            matakuliah = taskData.matakuliah,
            date = taskData.date,
            status = taskData.status,
            createAt: new Date().toISOString()
        };
        this.tasks.push(task);
        this.saveTasks();
        this.renderTable();
    }

    editTask(id,updatedData){
        const taskIndex = this.tasks.findIndex(task => task.id == id);
        if (taskIndex !== -1){
            this.task[taskIndex] = {...this.tasks[taskIndex], ...updatedData};
            this.saveTasks();
            this.renderTable();
        }
    }

    deletetask(id){
        if(confirm("Apakah anda yakin untuk menghapus tugas ini?")){
            this.tasks = this.tasks.filter(task=> task.id !== id);
            this.saveTasks();
            this.renderTable();
        }
    }

    formatDate(dateString) {
        const date = new Date(dateString);
        return date.toLocaleDateString("id-ID", {
            day: "2-digit",
            month: "long",
            year: "numeric"
        });
    }

    isDeadline(deadline){
        const today = new Date();
        const deadlineDate = new Date(deadline);
        return deadlineDate < today;
    }

    isDeadlinepassed(deadline){
        return new Date(deadline) < new Date();
    }

    renderTable(){
        const tablebody = document.getElementById("tasktable");
        tablebody.innerHTML = "";

        if (this.tasks.length === 0){
            const emptyRow = document.createElement("tr");
            emptyRow.innerHTML = "<td colspan='5' style='text-align: center; padding: 20px;'>Tidak ada tugas yang tersedia.</td>";
            tablebody.appendChild(emptyRow);
            return;
        }

        this.tasks.forEach((task, index) => {
            const row = document.createElement("tr");
            
            let deadlineClass = "";
            let deadlineText = this.formatDate(task.date);

            if (this.isDeadlinepassed(task.date)){
                deadlineClass = "Deadline-terlewat";
            }
            else if(this.isDeadline(task.date)){
                deadlineClass = "Hampir-deadline";
            }
            
             row.innerHTML = `
                <td>${index + 1}</td>
                <td>${task.mataKuliah}</td>
                <td>${task.judulTugas}</td>
                <td>${task.deskripsi || '-'}</td>
                <td class="${deadlineClass}">${deadlineText}</td>
                <td>
                    <span class="prioritas-badge ${task.prioritas}">
                        ${task.prioritas}
                    </span>
                </td>
                <td>
                    <span class="status-badge ${task.status}">
                        ${this.getStatusText(task.status)}
                    </span>
                </td>
                <td>
                    <button class="btn-edit" onclick="taskManager.startEdit('${task.id}')">
                        Edit
                    </button>
                    <button class="btn-delete" onclick="taskManager.deleteTask('${task.id}')">
                        Hapus
                    </button>
                </td>
            `;

            tablebody.appendChild(row);
        });
    }

    startEdit(id){
        const task = this.tasks.find(task => task.id === id);
        if (task){
            this.currentEditId = id;

            document.getElementById('tugas').value = task.tugas;
            document.getElementById('Mata Kuliah').value = task.matakuliah;
            document.getElementById('date').value = task.date.slice(0,16);
            document.getElementById('status').value = task.status;

            const submitButton = document.querySelector("#taskform button");
            submitButton.textContent = "Update Tugas";

            document.querySelector('#popupcontent').scrollIntoView({
                behavior: 'smooth'
            });
        }
    }

    cancelEdit() {
        this.currentEditId = null;
        this.clearForm();
        const submitButton = document.querySelector('#taskForm button');
        submitButton.textContent = 'Tambah Tugas';
    }

    clearForm() {
        document.getElementById('taskForm').reset();
    }

    setupEventListeners() {
        const form = document.getElementById('taskForm');
        
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const formData = {
                Tugas: document.getElementById('tugas').value.trim(),
                mataKuliah: document.getElementById('matakuliah').value.trim(),
                deadline: document.getElementById('date').value,
                status: document.getElementById('status').value
            };

            if (this.currentEditId) {
                this.editTask(this.currentEditId, formData);
                this.cancelEdit();
            } else {
                this.addTask(formData);
                this.clearForm();
            }
            
            // Show success message
            alert(this.currentEditId ? 'Tugas berhasil diupdate!' : 'Tugas berhasil ditambahkan!');
        });

        // Add cancel button for edit mode
        const formContainer = document.querySelector('.form-container');
        const existingCancelBtn = document.querySelector('.btn-cancel');
        
        if (!existingCancelBtn) {
            const cancelBtn = document.createElement('button');
            cancelBtn.type = 'button';
            cancelBtn.className = 'btn-cancel';
            cancelBtn.textContent = 'Batal Edit';
            cancelBtn.style.background = '#95a5a6';
            cancelBtn.style.marginLeft = '10px';
            cancelBtn.onclick = () => this.cancelEdit();
            
            form.querySelector('button').insertAdjacentElement('afterend', cancelBtn);
        }
    }
}

