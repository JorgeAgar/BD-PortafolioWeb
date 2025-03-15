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
            clone.querySelector('.details').onclick = async () => {
                const detailsClone = detailsTemplate.content.cloneNode(true);

                detailsClone.querySelector('.details-student-image').src = student.photo;
                detailsClone.querySelector('.details-name').textContent = student.name;
                detailsClone.querySelector('.details-code').textContent = student.code;
                detailsClone.querySelector('.details-email').textContent = student.email;
                detailsClone.querySelector('.details-github').href = `https://github.com/${student.github_link}`;
                detailsClone.querySelector('.details-student-description').textContent = student.description;
                detailsClone.querySelector('.details-back').onclick = () => {
                    const viewInstance = document.body.querySelector('.details-view');
                    console.log(viewInstance);
                    viewInstance.style.display = 'none';
                    document.body.removeChild(viewInstance);
                }
                await fillTechnologies(detailsClone.querySelector('.details-student-technologies'), student.code);
                document.body.appendChild(detailsClone);

            };
            studentsList.appendChild(clone);
        });
    }

    // Initial render
    await renderStudents();

});

const tech_template = document.getElementById('technologyTemplate');
async function fillTechnologies(ulist, student_code){
    const technologies = await api.getStudentTechnologies(student_code);

    technologies.forEach(technology => {
        const clone = tech_template.content.cloneNode(true);
        clone.querySelector('.tech-name').textContent = technology.technology.name;
        clone.querySelector('.tech-img').src = technology.technology.image;
        ulist.appendChild(clone);
        console.log(clone.querySelector('.tech-stars'));
    });
}
