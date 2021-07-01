const { resolveSoa } = require('dns');
const inquirer = require('inquirer');
const mysql = require('mysql');

//creating a connection to the sql database
const connection = mysql.createConnection({
  host: 'localhost',

  // Your port; if not 3306
  port: 3306,

  // Your username
  user: 'root',

  // Your password
  password: '',
  database: 'employee_db',
});

const start = async () => {
  const answers = await inquirer
  .prompt([
    {
      name: 'action',
      type: 'list',
      message: 'What would you like to do?',
      choices: ['view departments', 'view roles', 'view employees', 'add departments', 'add roles', 'add employees', 'update employee roles']
    }
  ])
  console.log(answers)
  switch(answers.action) {
    case 'view departments':
      viewDepartment()
      break;
    case 'view roles':
      viewRole()
      break;
    case 'view employees':
      viewEmployee()
      break;
    case 'add departments':
      addDepartment()
      break;
    case 'add roles':
      addRole()
      break;
    case 'add Employee':
      addEmployee()
      break;
    case 'update Role':
      updateRole()
      break;
    case 'update Employee manager':
      updateEmployee()
      break;
    case 'update Employee Manager':
      updateManager()
      break;
    case 'delete':
      deleteData()
      break;
    case 'Exit':
      connection.end()
      break;
    default:
      console.log("Not a valid option")
      break;
  }
};

const viewDepartment = () => {
  connection.query('SELECT * FROM department', (err, data) => {
    if (err) throw err
    console.table(data)
  })
}

const addEmployee = () => {
  connection.query
};

const addDepartment = () => {
  connection.query('INSERT INTO department ')
}

const addRole = () => {

}

const viewRole = () => {
  connection.query('SELECT name, title, salary FROM role INNER JOIN department ON role.department_id = department.id', (err,data) => {
    if (err) throw err
    console.table(data)

  })
};

const updateRole = () => {
  const query = connection.query(
    'UPDATE role SET ? WHERE ?',

  )
};

const deleteData = () => {

};

const viewEmployee = () => {

};

const updateEmployee = () => {

};

const updateManager = () => {

}



connection.connect((err) => {
  if (err) throw err;
  start();
})



//connect to database







// terminal logic
  //inquirer for the user
      //queries to the database
          //views (SELECT * from table)
          //adds(INSERT INTO table new values)
          //updates(etc)