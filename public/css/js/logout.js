const loginForm = document.getElementById('login-form');

loginForm.addEventListener('submit', async (event) => {
  event.preventDefault();

  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;

  try {
    const response = await fetch('/api/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });

    if (email && password) {
      const data = await response.json();
      const token = data.token;

      document.cookie = `token=${token}; path=/`;
    } else {
      console.error('Login failed');
    }
  } catch (error) {
    console.error('An error occurred', error);
  }
});