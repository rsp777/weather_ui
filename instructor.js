// window.onload = () => {
//     getInstructor();
//   };
  
function getInstructor() {
    const apiUrl = 'http://192.168.1.3:9090/api/list';
    // Assuming the JSON data is stored in a file named 'data.json'
// Replace 'API_URL' with the URL of your API
fetch(apiUrl)
    .then(response => response.json())
    .then(data => {
        // Create table
        var container = document.getElementsByClassName("container");
        let table = document.querySelector('#myTable');
        console.log(data);
        // Create table header
        let thead = document.createElement('thead');
        let headerRow = document.createElement('tr');
        ['ID', 'FIRST NAME', 'LAST NAME', 'EMAIL', 'YOUTUBE CHANNEL', 'HOBBY', 'COURSE'].forEach(headerText => {
            let th = document.createElement('th');
            th.appendChild(document.createTextNode(headerText));
            headerRow.appendChild(th);
        });
        thead.appendChild(headerRow);
        table.appendChild(thead);

        // Create table body
        let tbody = document.createElement('tbody');
        data.forEach(instructor => {
            let row = document.createElement('tr');
            [instructor.id, instructor.firstName, instructor.lastName, instructor.email, instructor.instructorDtl.youtubeChannel, instructor.instructorDtl.hobby].forEach(text => {
                let td = document.createElement('td');
                td.appendChild(document.createTextNode(text));
                row.appendChild(td);
            });

            // Add courses to the row
            instructor.courses.forEach(course => {
                let td = document.createElement('td');
                td.appendChild(document.createTextNode(course.title));
                row.appendChild(td);
            });

            tbody.appendChild(row);
        });
        table.appendChild(tbody);

        // Append the table to the body (or any other container)
        // container.appendChild(table);
        // document.body.appendChild(container);
    })
    .catch(error => console.error('Error:', error));


}

function addInstructorr(){
const url = 'http://192.168.1.3:9090/api/add';
const instructor = {
    firstName: 'Dhirendra',
    lastName: 'Doe',
    email: 'john.doe@example.com'
};
const youtubeChannel = 'planettt';
const hobby = 'ITI';
const courses = 'Planett';
const review = 'Good';

addInstructor(url, instructor, youtubeChannel, hobby, courses, review)
    .then(response => console.log(response))
    .catch(error => console.error(error));
}
function addInstructor(url, instructor, youtubeChannel, hobby, courses , review) {
  const data = {
    instructor: instructor,
    youtubeChannel: youtubeChannel,
    hobby: hobby,
    courses: courses,
    review: review
};
console.log('asdsadsadasd');
const response = axios.post(url, {

  headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      
  },
  body: JSON.stringify(data)
 
});

return response.text();
}