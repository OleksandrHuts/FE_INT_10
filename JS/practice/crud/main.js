const users = [
    { first_name: 'Alice', last_name: 'Smith', role: 'Developer', salary: 75000 },
    { first_name: 'Bob', last_name: 'Johnson', role: 'Designer', salary: 68000 },
    { first_name: 'Carol', last_name: 'Davis', role: 'Product Manager', salary: 92000 },
    { first_name: 'Dave', last_name: 'Miller', role: 'QA Engineer', salary: 60000 },
    { first_name: 'Eve', last_name: 'Wilson', role: 'DevOps', salary: 80000 }
];
//render users
function renderTable(users) {
    const table = document.querySelector('#users-table-body');
    if (!table) return false;
    let generated_rows = '';

    users.forEach(user => {
        const markup = `
                <tr>
                    <td>${user.first_name}</td>
                    <td>${user.last_name}</td>
                    <td>${user.role}</td>
                    <td>${user.salary}</td>
                    <td>Actions</td>
                </tr>
            `;
        generated_rows += markup
    });
    table.innerHTML = generated_rows;
};

function addNewUser() {
    const first_name = document.querySelector('#user_f_name').value;
    const last_name = document.querySelector('#user_l_name').value;
    const salary = document.querySelector('#user_salary').value;

    if (!first_name || !last_name) return false;

    const new_user = {
        first_name,
        last_name,
        salary,
        role: 'visitor'
    };

    users.push(new_user);
    renderTable(users);
};

function searchUser() {
    const search_value = document.querySelector('#search-value').value;

    const result = users.filter(user => {
        return (`${user.first_name} ${user.last_name}`).toLowerCase().includes(search_value.toLowerCase())
    });

    renderTable(result)
    
}

document.addEventListener("DOMContentLoaded", () => {
    renderTable(users);
});