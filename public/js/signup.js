async function signupForm(event) {
  event.preventDefault();

  const userName = document.querySelector("#user-name-signup").value.trim();
  const password = document.querySelector("#pwd").value.trim();

  if (userName && password) {
    try {
      const response = await fetch("/api/users", {
        method: "POST",
        body: JSON.stringify({ user_name: userName, password }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        document.location.replace("/");
      } else {
        alert("Failed to create account.");
      }
    } catch (error) {
      console.error("An error occurred", error);
    }
  }
}

function attachSignupEventListener() {
  // Listen for submit events on the form
  document.querySelector("#signupForm").addEventListener("submit", signupForm);
}

// Attach the event listener when the page loads
attachSignupEventListener();