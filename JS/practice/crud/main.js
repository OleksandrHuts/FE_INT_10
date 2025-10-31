const users = [
    { first_name: 'Alice', last_name: 'Smith', role: 'Developer', salary: 75000, id: '84hsdf794jwrf' },
    { first_name: 'Bob', last_name: 'Johnson', role: 'Designer', salary: 68000, id: '89sdfgvnl34tgbd' },
    { first_name: 'Carol', last_name: 'Davis', role: 'Product Manager', salary: 92000, id: 'sd834rtbngsdbb' },
    { first_name: 'Dave', last_name: 'Miller', role: 'QA Engineer', salary: 60000, id: 'dv8hlkldgsww' },
    { first_name: 'Eve', last_name: 'Wilson', role: 'DevOps', salary: 80000, id: '289vdfh347cvbwv' }
];
const modal = document.querySelector('.edit_user_modal');
const user_first_name_input = document.querySelector('input[name="user_first_name"]');
const user_last_name_input = document.querySelector('input[name="user_last_name"]');
const user_role_input = document.querySelector('input[name="user_role"]');
const user_salary_input = document.querySelector('input[name="user_salary"]');

let activeEditingUser = null;
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
                    <td>
                        <button data-id="${user.id || ''}" class='action_button edit' aria-label='edit'><i class="fa-solid fa-pencil"></i></button>
                        <button data-id="${user.id || ''}" class='action_button delete' aria-label='delete'><i class="fa-solid fa-trash"></i></button>
                    </td>
                </tr>
            `;
        generated_rows += markup
    });
    table.innerHTML = generated_rows;

    const edit_buttons = document.querySelectorAll('.edit');
    [...edit_buttons].forEach(btn => {
        btn.addEventListener('click', editUserHandler);
    })

    const delete_buttons = document.querySelectorAll('.delete');
    [...delete_buttons].forEach(btn => {
        btn.addEventListener('click', deleteUserHandler);
    })
};

function editUserHandler(e) {
    modal.classList.toggle('active');

    const targetId = e.target.dataset.id;
    if (!targetId) return false;

    activeEditingUser = users.find(el => el.id === targetId);

    if (!activeEditingUser) return false;
    setEditModalFields()
}

function setEditModalFields() {
    const { first_name, last_name, role, salary } = activeEditingUser;

    user_first_name_input.value = first_name;
    user_last_name_input.value = last_name;
    user_role_input.value = role;
    user_salary_input.value = salary;
}

function editConfirm() {
    let targetUser = users.find(el => el.id === activeEditingUser.id);

    targetUser.first_name = user_first_name_input.value;
    targetUser.last_name = user_last_name_input.value;
    targetUser.role = user_role_input.value;
    targetUser.salary = user_salary_input.value;

    modal.classList.remove('active');
    renderTable(users);
}

function deleteUserHandler(e) {
    const targetId = e.target.dataset.id;
    if (!targetId) return false;

    const targetIndex = users.findIndex(el => el.id === targetId);
    if (targetIndex < 0) return false;

    users.splice(targetIndex, 1);
    renderTable(users);
}


function addNewUser() {
    const first_name = document.querySelector('#user_f_name').value;
    const last_name = document.querySelector('#user_l_name').value;
    const salary = document.querySelector('#user_salary').value;

    if (!first_name || !last_name) return false;

    const new_user = {
        first_name,
        last_name,
        salary,
        role: 'visitor',
        id: `djkl347457${first_name}`
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


function sortTable(sortKey) {
    if (typeof users[0][sortKey] === 'number') {
        //Numbers
        users.sort((a, b) => a[sortKey] - b[sortKey])
    } else {
        //Strings
        users.sort((a, b) => a[sortKey].toLowerCase().localeCompare(b[sortKey].toLowerCase()));
    }
    renderTable(users);
}

document.addEventListener("DOMContentLoaded", () => {
    renderTable(users);
});