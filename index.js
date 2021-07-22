const inquirer = require("inquirer");
const mysql = require("mysql");
const util = require("util");
//creating a connection to the sql database
const connection = mysql.createConnection({
	host: "localhost",

	// Your port; if not 3306
	port: 3306,

	// Your username
	user: "root",

	// Your password
	password: "",
	database: "employee_db",
});

connection.query = util.promisify(connection.query);

const start = async () => {
	const answers = await inquirer.prompt([
		{
			name: "action",
			type: "list",
			message: "What would you like to do?",
			choices: [
				"view departments",
				"view roles",
				"view employees",
				"add departments",
				"add roles",
				"add employees",
				"update employee roles",
				"exit",
			],
		},
	]);
	console.log(answers);
	switch (answers.action) {
		case "view departments":
			viewDepartment();
			break;
		case "view roles":
			viewRole();
			break;
		case "view employees":
			viewEmployees();
			break;
		case "add departments":
			addDepartment();
			break;
		case "add roles":
			addRole();
			break;
		case "add employees":
			addEmployee();
			break;
		case "update employee roles":
			updateEmployeeRole();
			break;
		case "delete":
			deleteData();
			break;
		case "exit":
			connection.end();
			break;
		default:
			console.log("Not a valid option");
			break;
	}
};

const viewDepartment = async () => {
	try {
		const data = await connection.query("SELECT * FROM department");
		console.table(data);
	} catch (err) {
		console.log(err);
	}
	start();
};

const addEmployee = async () => {
	//ask the user for the emplyoee details with an inquierer
	connection.query("SELECT * FROM role", async (err, data) => {
		console.table(data);

		const answers = await inquirer.prompt([
			{
				type: "input",
				message: "What is the employee's first name? ",
				name: "firstName",
			},
			{
				type: "input",
				message: "What is the employee's Last name? ",
				name: "lastName",
			},
			{
				type: "list",
				message: "What is the employee's role? ",
				name: "role",
				choices: data.map((role) => role.title),
			},
		]);
		connection.query(
			"INSERT INTO employee SET ?",
			{
				first_name: answers.firstName,
				last_name: answers.lastName,
				role_id: data.find((role) => role.title === answers.role).id,
			},
			console.log("Employee successfully added")
		);
		start();
	});
};

const addDepartment = () => {
	connection.query("SELECT * FROM department", async (err, data) => {
		console.table(data);

		try {
			const answers = await inquirer.prompt([
				{
					type: "input",
					message: "What department would you like to add?",
					name: "departmentName",
				},
			]);
			connection.query(
				"INSERT INTO department SET ?",
				{
					name: answers.departmentName,
				},
				console.log("Department successfully added")
			);
		} catch (err) {
			if (err) {
				console.log(err);
			}
		}
		start();
	});
};

const addRole = async () => {
	// query the database to get all the roles
	connection.query("SELECT * FROM department", async (err, data) => {
		console.table(data);

		try {
			const answers = await inquirer.prompt([
				{
					type: "input",
					message: "What is the role's title?",
					name: "title",
				},
				{
					type: "number",
					message: "Please enter a salary for this role",
					name: "salary",
				},
				{
					type: "list",
					message: "Please select which department this role is being added to",
					choices: data.map((department) => department.name),
					name: "departmentId",
				},
			]);
			await connection.query("INSERT INTO role SET ?", {
				title: answers.title,
				salary: answers.salary,
				department_id: data.find(
					(department) => department.name === answers.departmentId
				).id,
			});
			console.log("Role has been successfully added");
		} catch (error) {
			console.log(error);
		}
		start();
	});
};

const viewRole = () => {
	connection.query(
		"SELECT name, title, salary FROM role INNER JOIN department ON role.department_id = department.id",
		(err, data) => {
			if (err) throw err;
			console.table(data);
			start();
		}
	);
};

const updateEmployeeRole = async () => {
	connection.query("SELECT * FROM role", async (err, data) => {
		console.table(data);
		const answers = await inquirer.prompt([
			{
				type: "list",
				message: "What role would you like to update? ",
				name: "role",
				choices: data.map((role) => role.title),
			},
			{
				type: "input",
				message: "What is the new salary?",
				name: "salary",
			},
		]);
		connection.query("UPDATE role SET ? WHERE ?", [
			{
				salary: answers.salary,
			},
			{
				id: data.find((role) => role.title === answers.role).id,
			},
		]);
		console.log("Role has been successfully updated");
		start();
	});
};

async function viewEmployees() {
	const employees = await connection.query(
		"SELECT employee.id,employee.first_name,employee.last_name,role.title,employee.manager_id FROM employee INNER JOIN role ON employee.role_id = role.id",
		(err, data) => {
			console.table(data);
			start();
		}
	);
}

connection.connect((err) => {
	if (err) throw err;
	start();
});
