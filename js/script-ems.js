// CREATE AN ARRAY OF EMPLOYEES
let employees = [
    [64891325, 'Mila Morris', 9576, 'mmorris@email.com', 'Sales'],
    [78412569, 'Shawn TheSheep', 2397, 'ssheep@email.com', 'Marketing'],
    [33168712, 'Paula Petty', 5698, 'ppetty@email.com', 'QA'],
    [22489445, 'Timothy Grant', 3344, 'tgrant@email.com', 'Engineering'],
    [46852317, 'Lula Lemon', 6699, 'llemon@email.com', 'Administrative']
]

// CHECK TO SEE IF STORAGE OBJECT EXISTS WHEN THE PAGE LOADS
if (localStorage.getItem('employees')) {
    // IF DOES, RETURN STORAGE OBJECT INTO ARRAY INSTEAD OF POPULATED ARRAY
    employees = JSON.parse(localStorage.getItem('employees'))
}

// GET DOM ELEMENTS
let form     = document.querySelector('#addForm');
let empTable    = document.querySelector('#empTable');
let tbody = empTable.getElementsByTagName('tbody')[0];
let empCount    = document.querySelector('#empCount');

// BUILD THE EMPLOYEES TABLE WHEN THE PAGE LOADS
buildGrid();

// ADD EMPLOYEE
form.addEventListener('submit', (e) => {
    // PREVENT FORM SUBMISSION
    e.preventDefault();

    // GET THE VALUES FROM THE TEXT BOXES
    let id          = document.getElementById('id').value;
    let name        = document.getElementById('name').value;
    let ext         = document.getElementById('extension').value;
    let email       = document.getElementById('email').value;
    let department  = document.getElementById('department').value;

    // ADD THE NEW EMPLOYEE TO A NEW ARRAY OBJECT
    let newEmployee = [id, name, ext, email, department];

    // PUSH THE NEW ARRAY TO THE *EXISTING* EMPLOYEES ARRAY
    employees.push(newEmployee);

    // BUILD THE GRID
    buildGrid();

    // RESET THE FORM
    form.reset();

    // SET FOCUS BACK TO THE ID TEXT BOX
    document.querySelector('#addForm').focus();
});

// DELETE EMPLOYEE
empTable.addEventListener('click', (e) => {
    // CONFIRM THE DELETE
    if(e.target.tagName === 'BUTTON') {
        let confirmDelete = confirm ('Are you sure you want to delete this employee?');

        if (confirmDelete) {
            // GET THE SELECTED ROWINDEX FOR THE TR (PARENTNODE.PARENTNODE)
            let row = e.target.parentNode.parentNode;
            let index = row.rowIndex - 1;

            // REMOVE EMPLOYEE FROM ARRAY
            employees.splice(index, 1);

            // BUILD THE GRID
            buildGrid();
        }
    }
})

// BUILD THE EMPLOYEES GRID
function buildGrid() {
    // REMOVE THE EXISTING SET OF ROWS BY REMOVING THE ENTIRE TBODY SECTION
    tbody.innerHTML = '';
    // REBUILD THE TBODY FROM SCRATCH

    // LOOP THROUGH THE ARRAY OF EMPLOYEES
    for (let employee of employees) {

        // REBUILDING THE ROW STRUCTURE
        let row = document.createElement('tr');

        row.innerHTML = `
            <td>${employee [0]}</td>
            <td>${employee [1]}</td>
            <td>${employee [2]}</td>
            <td>${employee [3]}</td>
            <td>${employee [4]}</td>
            <td><button class = "btn btn-danger btn-sm">X</button></td> `;
    

        // BIND THE TBODY TO THE EMPLOYEE TABLE
        tbody.appendChild(row)
    }

    // UPDATE EMPLOYEE COUNT
    empCount.textContent = employees.length

    // STORE THE ARRAY IN STORAGE
    localStorage.setItem('employees', JSON.stringify(employees))
};