const url = 'https://employee-management-zojn.onrender.com';

// Function to fetch all employees with pagination
async function fetchEmployees() {
  try {
    const response = await fetch(`${url}/employee`);
    if (!response.ok) {
      throw new Error('Failed to fetch employees');
    }
    const data = await response.json();
    console.log(data.employees)
    return data.employees;
  } catch (error) {
    console.error('Error fetching employees:', error);
    throw error;
  }
}


// Example usage:
async function loadEmployees() {
    try {
      const employees = await fetchEmployees();
      const tableBody = document.getElementById('employeeList');
      tableBody.innerHTML = ''; // Clear existing table rows
      employees.forEach(employee => {
        const row = document.createElement('tr');
        row.innerHTML = `
          <td>${employee.firstName}</td>
          <td>${employee.lastName}</td>
          <td>${employee.email}</td>
          <td>${employee.department}</td>
          <td>${employee.salary}</td>
          
          <td>
            <button class="editBtn" data-id="${employee._id}">Edit</button>
            <button class="deleteBtn" data-id="${employee._id}" onClick="deleteEmployee('${employee._id}')">Delete</button>
          </td>
        `;
        tableBody.appendChild(row);
      });
    } catch (error) {
      // Handle error
      console.error('Error loading employees:', error);
    }
  }


  document.getElementById('filterBtn').addEventListener('click', async () => {
    const selectedDepartment = document.getElementById('filterDropdown').value;
    if (selectedDepartment) {
      try {
        const filteredEmployees = await filterEmployeesByDepartment(selectedDepartment);
        // Render filtered employees in the table
        renderEmployees(filteredEmployees);
        console.log('Filtered Employees:', filteredEmployees);
      } catch (error) {
        // Handle error
        console.error('Error filtering employees:', error);
      }
    }
  });
  
  // Event listener for the Sort by Salary button
  document.getElementById('sortBySalaryBtn').addEventListener('click', async () => {
    try {
      const sortedEmployees = await sortEmployeesBySalary();
      // Render sorted employees in the table
      renderEmployees(sortedEmployees); 
      console.log('Sorted Employees:', sortedEmployees);
    } catch (error) {
      // Handle error
      console.error('Error sorting employees:', error);
    }
  });
  async function sortEmployeesBySalary() {
    try {
      const response = await fetch(`${url}/employee/sortBySalary`);
      if (!response.ok) {
        throw new Error('Failed to fetch employees sorted by salary');
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error sorting employees by salary:', error);
      throw error;
    }
  }
  
  
  // Event listener for the Search input
  document.getElementById('searchInput').addEventListener('input', async (event) => {
    const searchTerm = event.target.value.trim();
    if (searchTerm) {
      try {
        const searchedEmployees = await searchEmployeesByFirstName(searchTerm);
        // Render searched employees in the table
        console.log('Searched Employees:', searchedEmployees);
        renderEmployees(searchedEmployees); 
      } catch (error) {
        // Handle error
        console.error('Error searching employees:', error);
      }
    }
  });

  function renderEmployees(employees) {
    const tableBody = document.getElementById('employeeList');
    tableBody.innerHTML = ''; // Clear existing table rows
    employees.forEach(employee => {
      const row = document.createElement('tr');
      row.innerHTML = `
        <td>${employee.firstName}</td>
        <td>${employee.lastName}</td>
        <td>${employee.email}</td>
        <td>${employee.department}</td>
        <td>${employee.salary}</td>
        <td>
          <button class="editBtn" data-id="${employee._id}">Edit</button>
          <button class="deleteBtn" data-id="${employee._id}">Delete</button>
        </td>
      `;
      tableBody.appendChild(row);
    });
  }

  async function filterEmployeesByDepartment(department) {
    try {
      const response = await fetch(`${url}/employee/filterbyDept?department=${department}`);
      if (!response.ok) {
        throw new Error('Failed to filter employees by department');
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error filtering employees by department:', error);
      throw error;
    }
  }
  
  // Function to search employees by first name
  async function searchEmployeesByFirstName(firstName) {
    try {
      const response = await fetch(`${url}/employee/searchByName?firstName=${firstName}`);
      if (!response.ok) {
        throw new Error('Failed to search employees by first name');
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error searching employees by first name:', error);
      throw error;
    }
  }

  async function deleteEmployee(employeeId) {
    try {
        const response = await fetch(`${url}/employee/delete/${employeeId}`, {
            method: "DELETE", 
        });
        const data = await response.json();
        if (response.ok) {
            console.log(data.message);
            
            loadEmployees();
        } else {
            console.error("Error:", data.message);
        }
    } catch (error) {
        console.error("Error:", error);
    }
}

// Call the function to load employees when the page loads
document.addEventListener('DOMContentLoaded', loadEmployees);