const logoutButton = document.getElementById('logout-button');

logoutButton.addEventListener('click', async (event) => {
  event.preventDefault();

  try {
    const response = await fetch('/api/users/logout', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
      document.location.replace('/login');
    } else {
      alert('Failed to log out');
    }
  } catch (error) {
    console.error('An error occurred', error);
  }
});