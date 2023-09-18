let editingRow = null;


// Function to authenticate the user and make an authenticated API request
function authenticateAndCallAPI() {
    const authUrl = 'https://qa2.sunbasedata.com/sunbase/portal/api/assignment_auth.jsp';
    const apiUrl = 'https://qa2.sunbasedata.com/sunbase/portal/api/your_authenticated_endpoint';

    // Request body with user credentials
    const requestBody = {
        login_id: 'test@sunbasedata.com',
        password: 'Test@123',
    };

    // Make the POST request to authenticate
    fetch(authUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody),
    })
    .then(response => {
        if (response.ok) {
            // Authentication successful, extract the Bearer token
            return response.json();
        } else if (response.status === 401) {
            // Authentication failed, unauthorized
            throw new Error('Invalid Authorization');
        } else {
            // Other errors
            throw new Error('Authentication failed');
        }
    })
    .then(data => {
        // Extract the Bearer token from the response
        const token = data.token; // Assuming the token is in the response JSON

        // Make an authenticated API request using the token
        fetch(apiUrl, {
            method: 'GET', // or 'POST', 'PUT', etc., depending on the API endpoint
            headers: {
                'Authorization': 'Bearer ' + token,
                'Content-Type': 'application/json',
            },
        })
        .then(response => {
            if (response.ok) {
                // API request successful, handle the response as needed
                return response.json();
            } else {
                // Handle API request failure
                throw new Error('API request failed');
            }
        })
        .then(apiResponse => {
            // Handle the API response data as needed
            document.getElementById('response').textContent = 'API Response: ' + JSON.stringify(apiResponse);
        })
        .catch(error => {
            // Handle API request failure, e.g., display an error message
            document.getElementById('response').textContent = 'API Request failed: ' + error;
        });
    })
    .catch(error => {
        // Handle authentication failure, e.g., display an error message
        document.getElementById('response').textContent = 'Authentication failed: ' + error;
    });
}

// Add a new customer
function addCustomer() {
    const table = document.getElementById("table");
    const newRow = table.insertRow(table.rows.length - 1); // Add the new row before the last row (excluding the header row).
    
    // Get values from input fields
    const firstName = document.getElementById("new_fname").value;
    const lastName = document.getElementById("new_lname").value;
    const country = document.getElementById("new_country").value;
    const mobileNumber = document.getElementById("new_mNumber").value;
    const Email = document.getElementById("new_Email").value;
    
    // Calculate the new serial number (Sno)
    const sno = table.rows.length - 2;

    // Insert data into the new row
    newRow.innerHTML = `
        <td>${sno}</td>
        <td>${firstName}</td>
        <td>${lastName}</td>
        <td>${country}</td>
        <td>${mobileNumber}</td>
        <td>${Email}</td>
        <td><button onclick="editRow(this)">Edit</button> <button onclick="deleteRow(this)">Delete</button></td>
    `;

    // Clear input fields after adding a customer
    document.getElementById("new_fname").value = "";
    document.getElementById("new_lname").value = "";
    document.getElementById("new_country").value = "";
    document.getElementById("new_mNumber").value = "";
    document.getElementById("new_Emailr").value = "";
}

// Edit a customer row
function editRow(button) {
    editingRow = button.parentNode.parentNode;
    document.getElementById("fname").value = editingRow.cells[1].textContent;
    document.getElementById("lname").value = editingRow.cells[2].textContent;
    document.getElementById("country").value = editingRow.cells[3].textContent;
    document.getElementById("mNumber").value = editingRow.cells[4].textContent;
    document.getElementById("Email").value = editingRow.cells[5].textContent;
}

// Update an edited customer row
function updateRow() {
    if (!editingRow) {
        return; // If there is no row being edited, do nothing.
    }

    // Get the edited values from the input fields
    const firstName = document.getElementById("fname").value;
    const lastName = document.getElementById("lname").value;
    const country = document.getElementById("country").value;
    const mobileNumber = document.getElementById("mNumber").value;
    const Email = document.getElementById("mNumber").value;

    // Update the row with the edited values
    editingRow.cells[1].textContent = firstName;
    editingRow.cells[2].textContent = lastName;
    editingRow.cells[3].textContent = country;
    editingRow.cells[4].textContent = mobileNumber;
    editingRow.cells[5].textContent = Email;

    // Clear input fields and reset editingRow
    document.getElementById("fname").value = "";
    document.getElementById("lname").value = "";
    document.getElementById("country").value = "";
    document.getElementById("mNumber").value = "";
    document.getElementById("email").value = "";
    editingRow = null;
}

// Delete a customer row
function deleteRow(button) {
    const rowToDelete = button.parentNode.parentNode;
    if (editingRow === rowToDelete) {
        
        document.getElementById("fname").value = "";
        document.getElementById("lname").value = "";
        document.getElementById("country").value = "";
        document.getElementById("mNumber").value = "";
        document.getElementById("Email").value = "";
        editingRow = null;
    }
    rowToDelete.remove();
}