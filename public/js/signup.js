async function signupForm(event) {
  event.preventDefault();

  const userName = document.querySelector("#user-name-signup").value.trim();
  const pswd = document.querySelector("#pwd").value.trim();

  if (userName && pswd) {
    console.log("Working");
    // Send a POST request to the API endpoint with the user's username and password
    const response = await fetch("/api/users", {
      method: "POST",
      body: JSON.stringify({ user_name: userName, password: pswd }),
      headers: { "Content-Type": "application/json" },
    });
    // Check the response status: is it a success?
    // If yes, navigate to the home page; otherwise, display an error
    if (response.ok) {
      document.location.replace("/dashboard");
    } else {
      alert("Failed to create account.");
    }
  }
}
// Listen for submit events on the form
document
  .querySelector(".login_sgnup-btn")
  .addEventListener("submit", signupForm);
