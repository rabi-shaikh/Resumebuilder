// Interface to define resume data structure 
interface ResumeData {
    profilePicUrl?: string;
    name: string;
    email: string;
    phone: string;
    education: string;
    experience: string;
    skills: string[];
    linkedin?: string;
    github?: string;
    
}

// Function to get form data and generate the resume
function generateResume(event: Event) {
    event.preventDefault(); // Prevent form submission and page reload

     // Handle profile picture upload
     const profilePicInput = document.getElementById('profile-pic') as HTMLInputElement;
     let profilePicUrl: string | undefined;
     if (profilePicInput.files && profilePicInput.files[0]) {
         profilePicUrl = URL.createObjectURL(profilePicInput.files[0]);
     }

    // Get form values

    const name = (document.getElementById('name') as HTMLInputElement).value;
    const email = (document.getElementById('email') as HTMLInputElement).value;
    const phone = (document.getElementById('phone') as HTMLInputElement).value;
    const education = (document.getElementById('education') as HTMLTextAreaElement).value;
    const experience = (document.getElementById('experience') as HTMLTextAreaElement).value;
    const linkedin = (document.getElementById('linkedin') as HTMLInputElement).value;
    const github = (document.getElementById('github') as HTMLInputElement).value;

    // Get all the skills from the skill list
    const skills: string[] = [];
    const skillItems = document.querySelectorAll('#skill-list li');
    skillItems.forEach(item => skills.push(item.textContent || ''));

   

    // Resume Data object
    const resumeData: ResumeData = {
        profilePicUrl,
        name,
        email,
        phone,
        education,
        experience,
        skills,
        linkedin,
        github,
        
    };

    // Display the generated resume
    displayResume(resumeData);
}

// Function to display the resume
function displayResume(data: ResumeData) {
    const resumeDisplay = document.getElementById('resume-display') as HTMLElement;

    // Clear any previous resume
    resumeDisplay.innerHTML = '';

    // Create resume structure dynamically
    const resumeHTML = `
     ${data.profilePicUrl ? `<img src="${data.profilePicUrl}" alt="Profile Picture" width="150" height="150" />` : ''}
      <p><strong>Name:</strong> ${data.name}</p>
      <p><strong>Email:</strong> ${data.email}</p>
      <p><strong>Phone:</strong> ${data.phone}</p>
      <p><strong>Education:</strong> ${data.education}</p>
      <p><strong>Experience:</strong> ${data.experience}</p>
      <p><strong>Skills:</strong> ${data.skills.join(', ')}</p>
      ${data.linkedin ? `<p><strong>LinkedIn:</strong> <a href="${data.linkedin}" target="_blank">${data.linkedin}</a></p>` : ''}
      ${data.github ? `<p><strong>GitHub:</strong> <a href="${data.github}" target="_blank">${data.github}</a></p>` : ''}
     
    `;

    // Inject the resume into the HTML
    resumeDisplay.innerHTML = resumeHTML;
}

// Function to add skills dynamically
const addSkillButton = document.getElementById('add-skill') as HTMLButtonElement;
addSkillButton.addEventListener('click', () => {
    const skillInput = document.getElementById('skill-input') as HTMLInputElement;
    const skillList = document.getElementById('skill-list') as HTMLElement;

    if (skillInput.value.trim() !== '') {
        const li = document.createElement('li');
        li.textContent = skillInput.value;
        skillList.appendChild(li);
        skillInput.value = ''; // Clear input after adding
    }
});

// Add event listener to the form
const form = document.getElementById('resume-form') as HTMLFormElement;
form.addEventListener('submit', generateResume);