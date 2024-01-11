// const addInfoButton = document.getElementById("addJob");

const addJobHandler =  async (event) => {
  event.preventDefault();

  const title = document.querySelector('#jobTitle').value.trim();
  const company = document.querySelector('#companyName').value.trim();
  const salary = document.querySelector('#salary').value.trim();
  const status = document.querySelector('#applicationStatus').value.trim();

  if (title && company && salary && status) {
    const response = await fetch(`/api/jobApplications`, {
      method: 'POST',
      body: JSON.stringify({ title, company, salary, status }),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (response.ok) {
      document.location.replace('/profile');
    } else {
      alert('Failed to create Project');
    }
  }
};

document
  .querySelector('.new-job-application')
  .addEventListener('submit', addJobHandler)
