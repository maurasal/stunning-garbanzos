const addJobHandler =  async (event) => {
  event.preventDefault();

  const job_title = document.querySelector('#jobTitle').value.trim();
  const company_name = document.querySelector('#companyName').value.trim();
  const salary = document.querySelector('#salary').value.trim();
  const application_status = document.querySelector('#applicationStatus').value.trim();

  if (job_title && company_name && salary && application_status) {
    const response = await fetch(`/api/jobApplications`, {
      method: 'POST',
      body: JSON.stringify({ job_title, company_name, salary, application_status }),
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


  