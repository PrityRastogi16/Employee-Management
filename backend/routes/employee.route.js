const express = require("express");
const employeeRouter = express.Router();
const {auth} = require("../middleware/auth")

const {createEmployee, getAllEmployees, updateEmployee,deleteEmployee,filterEmpByDepartment, sortEmployeesBySalary, searchEmpByFirstName} = require("../controllers/employee.controller");

employeeRouter.use(express.json());
// employeeRouter.use(auth);

employeeRouter.post("/create", createEmployee);
employeeRouter.get("/", getAllEmployees)
employeeRouter.put("/update/:id", updateEmployee);
employeeRouter.delete("/delete/:id",deleteEmployee);
employeeRouter.get("/filterbyDept",filterEmpByDepartment)
employeeRouter.get("/sortBySalary", sortEmployeesBySalary);
employeeRouter.get("/searchByName",searchEmpByFirstName)

module.exports={
    employeeRouter
}

