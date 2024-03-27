const mongoose = require("mongoose");

const employeeSchema = new mongoose.Schema({
    firstName: {
      type: String
    },
    lastName: {
      type: String
    },
    email: {
      type: String
    },
    department: {
      type: String
    },
    salary: {
      type: Number
    }
  });
  
  const EmployeeModel = mongoose.model('Employee', employeeSchema);
  
  module.exports = {EmployeeModel};