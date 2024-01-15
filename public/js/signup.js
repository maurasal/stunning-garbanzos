async function signupForm(event) {
  event.preventDefault();

  const email = document.querySelector("#email-signup").value.trim(); // Ensure this selector matches your HTML
  const password = document.querySelector("#pwd").value.trim();

  if (email && password) {
    try {
      const response = await fetch("/api/users", {
        method: "POST",
        body: JSON.stringify({ user_name: userName, email, password }),
        headers: { "Content-Type": "application/json" },
      });

      if (response.ok) {
        alert("Signup successful!");
        document.location.replace("/profile"); // Redirect to profile page or login page as needed
      } else {
        console.log("Failed to sign up. Status code:", response.status);
      const data = await response.json();
      alert(data.message || "Failed to sign up.");
      }
    } catch (error) {
      // In case of a network error or other issues
      console.error("Error during signup:", error);
    alert("Error during signup. See console for details.");

    }
  }
}

document
  .querySelector("#signupForm") // Ensure this selector matches the form ID in your HTML
  .addEventListener("submit", signupForm);