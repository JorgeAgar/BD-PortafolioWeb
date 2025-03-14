document.addEventListener('DOMContentLoaded', async () => {
    // Sample student data

    const studentsList = document.getElementById('studentsList');
    const template = document.getElementById('studentCardTemplate');
    const detailsTemplate = document.getElementById('studentDetailsTemplate');

    // Render students
    async function renderStudents() {
        const students = await api.getStudents();
        studentsList.innerHTML = '';
        students.forEach(student => {
            console.log(student);
            const clone = template.content.cloneNode(true);
            
            clone.querySelector('.student-name').textContent = student.name;
            clone.querySelector('.student-id').textContent = `ID: ${student.code}`;
            clone.querySelector('.student-email').textContent = student.email;
            clone.querySelector('.student-image').src = student.photo;
            clone.querySelector('.github-link').href = `https://github.com/${student.github_link}`;
            clone.querySelector('.edit').onclick = () => {
                window.location.href = 'edit.html?code=' + student.code;
            };
            clone.querySelector('.details').onclick = () => {
                const detailsClone = detailsTemplate.content.cloneNode(true);

                detailsClone.querySelector('.details-student-image').src = student.photo;
                detailsClone.querySelector('.details-name').textContent = student.name;
                detailsClone.querySelector('.details-code').textContent = student.code;
                detailsClone.querySelector('.details-student-description').textContent = student.description;
                fillTechnologies(detailsClone.querySelector('.details-student-technologies'), student.code);
                document.body.appendChild(detailsClone);

            };
            studentsList.appendChild(clone);
        });
    }

    // Initial render
    await renderStudents();

});

async function fillTechnologies(ulist, student_code){

}
