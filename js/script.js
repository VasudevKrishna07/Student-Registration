const form = document.getElementById('studentForm');
const tableBody = document.querySelector('#studentTable tbody');
const tableSection = document.getElementById('table-section');
let students = JSON.parse(localStorage.getItem('students')) || [];

function renderTable() {
    tableBody.innerHTML = '';
 
    students.forEach((stu, index) => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td title="${stu.name}">${stu.name}</td>
            <td title="${stu.id}">${stu.id}</td>
            <td>
                <div class="scroll-cell" title="${stu.email} tabindex="0">
                    ${stu.email}
                </div>
            </td>
            <td title="${stu.contact}">${stu.contact}</td>
            <td>
                <span class="action-btn edit" data-index="${index}">✏️</span>
                <span class="action-btn delete" data-index="${index}">🗑️</span>
            </td>`;
        tableBody.appendChild(row);
    });
}

function saveAndRender() {
    localStorage.setItem('students', JSON.stringify(students));
    renderTable();
}

form.addEventListener('submit', e => {
    e.preventDefault();
    const name = form.name.value.trim();
    const id = form.studentId.value.trim();
    const email = form.email.value.trim();
    const contact = form.contact.value.trim();
    if (!/^[A-Za-z ]+$/.test(name) || !/^[0-9]+$/.test(id) || !/^[0-9]+$/.test(contact) || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        alert('Please enter valid details.');
        return;
    }
    
    // Duplicate check (based on ID or Email)
    const isDuplicate = students.some(stu => stu.id === id || stu.email === email);
    if (isDuplicate) {
        alert('Student with this ID or Email already exists!');
        return;
    }
    // Add new student
    students.push({ name, id, email, contact });
    form.reset();
    saveAndRender();
});

tableBody.addEventListener('click', e => {
    if (e.target.classList.contains('edit')) {
        const i = e.target.dataset.index;
        const stu = students[i];
        form.name.value = stu.name;
        form.studentId.value = stu.id;
        form.email.value = stu.email;
        form.contact.value = stu.contact;
        students.splice(i,1);
    } else if (e.target.classList.contains('delete')) {
        const i = e.target.dataset.index;
        students.splice(i,1);
    }
    saveAndRender();
});

window.addEventListener('DOMContentLoaded', saveAndRender);