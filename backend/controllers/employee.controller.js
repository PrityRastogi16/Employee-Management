const express = require("express");
const {EmployeeModel} = require("../models/employee.model");

createEmployee = async (req, res) => {
    try {
        const page = req.query.page ? parseInt(req.query.page) : 1;
        const limit = 5;
        const startIndex = (page - 1) * limit;
        const endIndex = page * limit;
    
        const results = {};
    
        if (endIndex < await Employee.countDocuments().exec()) {
          results.next = {
            page: page + 1,
            limit: limit
          };
        }
    
        if (startIndex > 0) {
          results.previous = {
            page: page - 1,
            limit: limit
          };
        }
    
        results.results = await EmployeeModel.find().limit(limit).skip(startIndex).exec();
        res.json(results);
    }
    catch (err) {
        res.status(400).json({ message: err.message });
      }
}

  getAllEmployees = async (req, res) => {
    try {
      const employees = await EmployeeModel.find();
      res.json({msg:"Employees are:", employees});
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  };


  updateEmployee = async (req, res) => {
    try {
      const {id} = req.params;
      const employee = await EmployeeModel.findByIdAndUpdate(id, req.body, { new: true });
      if (!employee) {
        return res.status(404).json({ message: 'Employee not found' });
      }
      res.json({msg:"Employee updated"});
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  };


  deleteEmployee = async (req, res) => {
    try {
      const { id } = req.params;
      const employee = await EmployeeModel.findByIdAndDelete(id);
      if (!employee) {
        return res.status(404).json({ message: 'Employee not found' });
      }
      res.json({ message: 'Employee deleted successfully' });
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  };


  filterEmpByDepartment = async (req, res) => {
    try {
      const { department } = req.query;
      const employees = await EmployeeModel.find({ department: department });
      res.json(employees);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  };

  sortEmployeesBySalary = async (req, res) => {
    try {
      const employees = await EmployeeModel.find().sort({ salary: 1 });
      res.json(employees);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  };

  searchEmpByFirstName = async (req, res) => {
    try {
      const { firstName } = req.query;
      const employees = await EmployeeModel.find({ firstName: firstName });
      res.json(employees);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  };

  module.exports = {
    createEmployee, getAllEmployees,updateEmployee, deleteEmployee,filterEmpByDepartment,sortEmployeesBySalary, searchEmpByFirstName
  }