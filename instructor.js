window.onload = () => {
  getInstructor();
};

function getInstructor() {
  const apiUrl = "http://192.168.1.4:9090/api/list";
  // Assuming the JSON data is stored in a file named 'data.json'
  // Replace 'API_URL' with the URL of your API
  fetch(apiUrl)
    .then((response) => response.json())
    .then((data) => {
      // Create table
      let container = document.querySelector("#containerr");
      // container.innerHTML = '';
      let table = document.querySelector("#myTable");
      table.innerHTML = "";
      // Create table header
      let thead = document.createElement("thead");
      let headerRow = document.createElement("tr");
      [
        "ID",
        "FIRST NAME",
        "LAST NAME",
        "EMAIL",
        "YOUTUBE CHANNEL",
        "HOBBY",
        "COURSE",
      ].forEach((headerText) => {
        let th = document.createElement("th");
        th.appendChild(document.createTextNode(headerText));
        headerRow.appendChild(th);
      });
      thead.appendChild(headerRow);
      table.appendChild(thead);

      // Create table body
      let tbody = document.createElement("tbody");
      data.forEach((instructor) => {
        let row = document.createElement("tr");
        [
          instructor.id,
          instructor.firstName,
          instructor.lastName,
          instructor.email,
          instructor.instructorDtl.youtubeChannel,
          instructor.instructorDtl.hobby,
        ].forEach((text) => {
          let td = document.createElement("td");
          td.appendChild(document.createTextNode(text));
          row.appendChild(td);
        });

        // Add courses to the row
        instructor.courses.forEach((course) => {
          let td = document.createElement("td");
          td.appendChild(document.createTextNode(course.title));
          row.appendChild(td);
        });

        tbody.appendChild(row);
      });
      table.appendChild(tbody);
      
      // Append the table to the body (or any other container)
      container.appendChild(table);
      // document.body.appendChild(container);
    })
    .catch((error) => console.error("Error:", error));
}

function createRow() {
  // Get the div element
  let div = document.querySelector("#myTable");

  // Create a new table element
  let table = document.createElement("table");
  table.innerHTML = "";
  // Append the table to the div
  div.appendChild(table);

  // Now you can use the insertRow method on the table element
  let newRow = table.insertRow();

  //Create cells
  let firstName = newRow.insertCell();
  let lastName = newRow.insertCell();
  let email = newRow.insertCell();
  let ytChannel = newRow.insertCell();
  let hobbyy = newRow.insertCell();
  let coursee = newRow.insertCell();
  let input1 = document.createElement("input");
  let input2 = document.createElement("input");
  let input3 = document.createElement("input");
  let input4 = document.createElement("input");
  let input5 = document.createElement("input");
  let input6 = document.createElement("input");

  //Declare input type
  input1.type = "text";
  input2.type = "text";
  input3.type = "text";
  input4.type = "text";
  input5.type = "text";
  input6.type = "text";

  //Append input to cell
  firstName.appendChild(input1);
  lastName.appendChild(input2);
  email.appendChild(input3);
  ytChannel.appendChild(input4);
  hobbyy.appendChild(input5);
  coursee.appendChild(input6);

  //Append cell to row
  newRow.appendChild(firstName);
  newRow.appendChild(lastName);
  newRow.appendChild(email);
  newRow.appendChild(ytChannel);
  newRow.appendChild(hobbyy);
  newRow.appendChild(coursee);

  table.appendChild(newRow);
  console.log(table);

  // console.log(ytChannel.textContent);

  // addInstructor(url, instructor, youtubeChannel, hobby, courses)
  //     .then(response => console.log(response))
  //     .catch(error => console.error(error));
}
let isEventListenerAdded = false;
function addInstructor() {

  let saveButton = document.querySelector("#save");
  console.log(saveButton);
  console.log('isEventListenerAdded : '+isEventListenerAdded);
  if (!isEventListenerAdded) {
    saveButton.addEventListener("click", () => {
      let inputs = document.querySelectorAll('#myTable input[type="text"]');
      let values = [];
  
      inputs.forEach((input) => {
        values.push(input.value);
      });
  
      console.log(values);
      const url = "http://192.168.1.4:9090/api/add";
      const data = {
        instructor: {
          firstName: values[0],
          lastName: values[1],
          email: values[2],
        },
        youtubeChannel: values[3],
        hobby: values[4],
        courses: values[5],
      };
      console.log(data.instructor);
      console.log(data.youtubeChannel);
      console.log(data.hobby);
      console.log(data.courses);
      axios
        .post(url, {
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
          },
          body: JSON.stringify(data),
        })
        // .then((response) => {
        //   console.log('Response : '+response.ok);
        //   if (!response.ok) {
        //     throw new Error(`An error occurred: ${response.statusText}`);
        //   }
        //   window.location.reload();
        //   return response.json();
        // })
        .then((data) => {
          console.log("Data : " + data);
        })
        .catch((error) => {
          // Handle the error
          console.error(error);
        });
    });
    console.log('Hey : ');
    isEventListenerAdded = true;
    console.log('isEventListenerAdded : '+isEventListenerAdded);
  }
}
