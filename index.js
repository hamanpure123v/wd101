function validateDOB() {
  // Get the input value from the DOB field
  var dobInput = document.getElementById('dob').value;

  // Create a Date object from the input value
  var dobDate = new Date(dobInput);

  // Get the current date
  var currentDate = new Date();

  // Calculate the age by subtracting the birth year from the current year
  var age = currentDate.getFullYear() - dobDate.getFullYear();

  // Check if the age is within the specified range (18 to 55)
  if (age >= 18 && age <= 55) {
      // Age is valid, submit the form or perform other actions
      return true;
  } else {
      // Age is not valid, show an error message
      alert('Age must be between 18 and 55.');
      return false;
  }
}

// Add an event listener to the form for validation before submission
document.getElementById('user-form').addEventListener('submit', function(event) {
  if (!validateDOB()) {
      // Prevent form submission if age validation fails
      event.preventDefault();
  }
});

// Set the max attribute for the date input to limit selection to 18 years ago
var maxDate = new Date();
maxDate.setFullYear(maxDate.getFullYear() - 18);
var maxDateString = maxDate.toISOString().split('T')[0];
document.getElementById('dob').setAttribute('max', maxDateString);

// Set the min attribute for the date input to limit selection to 55 years ago
var minDate = new Date();
minDate.setFullYear(minDate.getFullYear() - 55);
var minDateString = minDate.toISOString().split('T')[0];
document.getElementById('dob').setAttribute('min', minDateString);

let userform = document.getElementById("user-form");

const retriveEntries =() =>{
let entries = localStorage.getItem("user-entries");
if (entries) {
  entries = JSON.parse(entries);
}else{
  entries = [];
}
return entries;
}

const display_entries =  () => {
  const entries = retriveEntries();
  
  const table_entries = entries.map((entry) =>{
    const name_cell = `<td>${entry.name}</td>`;
    const email_cell = `<td>${entry.email}</td>`;
    const password_cell = `<td>${entry.password}</td>`;
    const dob_cell = `<td>${entry.dob}</td>`;
    const acceptterms_cell = `<td>${entry.acceptedTermsAndconditions}</td>`;
    return (`<tr> ${name_cell} ${email_cell} ${password_cell} ${dob_cell}${acceptterms_cell}</tr>`);

  }).join("\n");

  const table = `<table id="user-table">
            
  <tr>
      <th>Name</th>
      <th>Email Id</th>
      <th>Password</th>
      <th>Date of Birth</th>
      <th>Accepted terms?</th>
  </tr>
  ${table_entries}
</table>`

  let details = document.getElementById("user-entries");
  details.innerHTML = table;
}

let userentries = retriveEntries();
const saveuserform = (event) =>{
  event.preventDefault();
  const name=document.getElementById("name").value;
  const email=document.getElementById("email").value;
  const password=document.getElementById("password").value;
  const dob=document.getElementById("dob").value;

  const acceptedTermsAndconditions =document.getElementById("acceptTerms").checked;

  const entry = {
    name,
    email,
    password,
    dob,
    acceptedTermsAndconditions
  };
  userentries.push(entry);
  localStorage.setItem("user-entries",JSON.stringify(userentries));
  display_entries();

};

userform.addEventListener("submit", saveuserform);
display_entries();
