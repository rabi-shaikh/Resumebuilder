// Function to get form data and generate the resume
function generateResume(event) {
    event.preventDefault(); // Prevent form submission and page reload
    // Handle profile picture upload
    var profilePicInput = document.getElementById('profile-pic');
    var profilePicUrl;
    if (profilePicInput.files && profilePicInput.files[0]) {
        profilePicUrl = URL.createObjectURL(profilePicInput.files[0]);
    }
    // Get form values
    var name = document.getElementById('name').value;
    var email = document.getElementById('email').value;
    var phone = document.getElementById('phone').value;
    var education = document.getElementById('education').value;
    var experience = document.getElementById('experience').value;
    var linkedin = document.getElementById('linkedin').value;
    var github = document.getElementById('github').value;
    // Get all the skills from the skill list
    var skills = [];
    var skillItems = document.querySelectorAll('#skill-list li');
    skillItems.forEach(function (item) { return skills.push(item.textContent || ''); });
    // Resume Data object
    var resumeData = {
        profilePicUrl: profilePicUrl,
        name: name,
        email: email,
        phone: phone,
        education: education,
        experience: experience,
        skills: skills,
        linkedin: linkedin,
        github: github,
    };
    // Display the generated resume
    displayResume(resumeData);
}
// Function to display the resume
function displayResume(data) {
    var resumeDisplay = document.getElementById('resume-display');
    // Clear any previous resume
    resumeDisplay.innerHTML = '';
    // Create resume structure dynamically
    var resumeHTML = "\n     ".concat(data.profilePicUrl ? "<img src=\"".concat(data.profilePicUrl, "\" alt=\"Profile Picture\" width=\"150\" height=\"150\" />") : '', "\n      <p><strong>Name:</strong><span contentediable=\"true\"> ").concat(data.name, "</span></p>\n      <p><strong>Email:</strong> ").concat(data.email, "</p>\n      <p><strong>Phone:</strong> ").concat(data.phone, "</p>\n      <p><strong>Education:</strong> ").concat(data.education, "</p>\n      <p><strong>Experience:</strong> ").concat(data.experience, "</p>\n      <p><strong>Skills:</strong> ").concat(data.skills.join(', '), "</p>\n      ").concat(data.linkedin ? "<p><strong>LinkedIn:</strong> <a href=\"".concat(data.linkedin, "\" target=\"_blank\">").concat(data.linkedin, "</a></p>") : '', "\n      ").concat(data.github ? "<p><strong>GitHub:</strong> <a href=\"".concat(data.github, "\" target=\"_blank\">").concat(data.github, "</a></p>") : '', "\n     \n    ");
    // Inject the resume into the HTML
    resumeDisplay.innerHTML = resumeHTML;
}
// Function to add skills dynamically
var addSkillButton = document.getElementById('add-skill');
addSkillButton.addEventListener('click', function () {
    var skillInput = document.getElementById('skill-input');
    var skillList = document.getElementById('skill-list');
    if (skillInput.value.trim() !== '') {
        var li = document.createElement('li');
        li.textContent = skillInput.value;
        skillList.appendChild(li);
        skillInput.value = ''; // Clear input after adding
    }
});
// Add event listener to the form
var form = document.getElementById('resume-form');
form.addEventListener('submit', generateResume);
