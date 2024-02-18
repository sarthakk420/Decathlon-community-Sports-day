// Function to handle user registration
function registerParticipation() {
  // Extracts user input
  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;

  // Validates user inputs to ensure both name and email are provided
  if (name.trim() === "" || email.trim() === "") {
    alert("Please fill in all fields.");
    return;
  }

  // Sends a POST request to the Flask backend for user registration
  fetch("/register", {
    method: "POST",
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      name: name,
      email: email,
    }),
  })
  .then(response => {
    // Checks if the registration was successful
    if (!response.ok) {
      throw new Error(`Registration failed: ${response.status} - ${response.statusText}`);
    }
    console.log("Registration successful");

    // Update the webpage to thank the user for registering
    const registerSection = document.getElementById("register");
    registerSection.innerHTML = `
      <h2>Thank You for Registering!</h2>
      <p>We look forward to seeing you at the Decathlon Community Sports Day.</p>
    `;
  })
  .catch(error => {
    // Handles errors during registration
    console.error("Registration error:", error);
    alert("Registration failed. Please try again.");
  });
}

// Listens for the form submission
document.getElementById("registration-form").addEventListener("submit", function (event) {
  event.preventDefault();
  registerParticipation();
});

// Fetches user data from the "/api/users" endpoint
console.log("Fetching users...");
fetch('/api/users')  // Initiates a GET request to the "/api/users" endpoint
  .then(response => {
    // Checks if the fetch operation was successful
    if (!response.ok) {
      throw new Error(`Fetch error: ${response.status} - ${response.statusText}`);
    }
    return response.json(); // Returns the JSON representation of the response
  })
  .then(data => {
     // Displays the received user data on the webpage
    console.log("Received data:", data); 
    const userList = document.getElementById('user-list');
    userList.innerHTML = ''; // Clears the existing user list

    // Iterates through each user in the fetched data
    data.forEach(user => {
      console.log("User:", user); 
      userList.innerHTML += `<li>Name: ${user.name}, Email: ${user.email}</li>`; // Generates new list items for each user and appends them to the user list
    });
  })
  .catch(error => {
    // Handles errors during the fetch operation
    console.error("Fetch error:", error); 
    const userList = document.getElementById('user-list');
    userList.innerHTML = '<li>Error fetching user data.</li>';   // Provides a fallback message on the webpage in case of an error
  });
