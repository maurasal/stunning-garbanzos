const loginForm = document.querySelector(".login-form");

loginForm.addEventListener("submit", async (event) => {
  event.preventDefault();

  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;

  try {
    const response = await fetch("/api/users/login", {
      method: "POST",
      body: JSON.stringify({ username, password }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (username && password) {
      const data = await response.json();
      const token = data.token;

      document.cookie = `token=${token}; path=/`;
      console.log("Login Sucessful");
    } else {
      console.error("Login failed");
    }
  } catch (error) {
    console.error("An error occurred", error);
  }
});
