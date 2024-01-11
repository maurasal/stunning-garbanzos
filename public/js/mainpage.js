document.addEventListener("DOMContentLoaded", async () => {
    const jobApplicationsContainer = document.getElementById("jobApplicationsContainer");
    const addJobApplicationBtn = document.getElementById("addJobApplicationBtn");
  
    // Function to render a job application card
    const renderJobApplication = (job) => {
      const jobApplicationCard = document.createElement("div");
      jobApplicationCard.classList.add("job-application-card");
  

      jobApplicationCard.innerHTML = `
        <h3>${job.jobTitle}</h3>
        <p>Company Name: ${job.companyName}</p>
        <p>Salary: ${job.salary}</p>
        <p>Status: ${job.applicationStatus}</p>
        <button class="editJobBtn">Edit</button>
        <button class="deleteJobBtn">Delete</button>
      `;
  
      jobApplicationsContainer.appendChild(jobApplicationCard);
  
      // Add event listeners for edit and delete buttons
      const editJobBtn = jobApplicationCard.querySelector(".editJobBtn");
      const deleteJobBtn = jobApplicationCard.querySelector(".deleteJobBtn");
  
      editJobBtn.addEventListener("click", () => {
        // Handle edit logic 
        console.log("Edit job:", job.id);
      });
  
      deleteJobBtn.addEventListener("click", () => {
        // Handle delete logic here
        console.log("Delete job:", job.id);
      });
    };
  
    // Function to fetch and render job applications
    const fetchAndRenderJobApplications = async () => {
      try {
        const response = await fetch("/api/jobApplications");
        if (response.ok) {
          const jobApplications = await response.json();
          jobApplications.forEach(renderJobApplication);
        }
      } catch (error) {
        console.error("Error fetching job applications:", error);
      }
    };
  
    // Event listener for the "Add Job Application" button
    addJobApplicationBtn.addEventListener("click", () => {
      // assuming we have a form for adding a new job application
      const newJobApplication = {
        jobTitle: "New Job", // Get the values from form
        companyName: "New Company",
        salary: "$100,000",
        applicationStatus: "Applied",
      };
  
      fetch("/api/jobApplications", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newJobApplication),
      })
        .then((response) => response.json())
        .then((addedJob) => {
          renderJobApplication(addedJob);
        })
        .catch((error) => {
          console.error("Error adding job application:", error);
        });
    });
  
    // Fetch and render existing job applications on page load
    fetchAndRenderJobApplications();
  });