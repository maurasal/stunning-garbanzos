document.addEventListener('DOMContentLoaded', () => {
    const addJobApplicationForm = document.getElementById('addJobApplicationForm'); // Adjust ID as per your form
    const jobApplicationsContainer = document.getElementById('jobApplicationsContainer'); // Container where job applications will be displayed

    addJobApplicationForm.addEventListener('submit', async (event) => {
        event.preventDefault();

        const jobTitle = document.getElementById('jobTitle').value.trim();
        const companyName = document.getElementById('companyName').value.trim();
        const salary = document.getElementById('salary').value.trim();
        const applicationStatus = document.getElementById('applicationStatus').value.trim();

        const jobApplication = {
            jobTitle,
            companyName,
            salary,
            applicationStatus
        };

        // Add the job application to the container
        addJobApplicationToPage(jobApplication);
    });

    function addJobApplicationToPage(jobApplication) {
        const jobDiv = document.createElement('div');
        jobDiv.className = 'job-application';
        jobDiv.innerHTML = `
            <h3>${jobApplication.jobTitle}</h3>
            <p>Company: ${jobApplication.companyName}</p>
            <p>Salary: ${jobApplication.salary}</p>
            <p>Status: ${jobApplication.applicationStatus}</p>
        `;
        jobApplicationsContainer.appendChild(jobDiv);
    }
});