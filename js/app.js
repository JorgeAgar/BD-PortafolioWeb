document.addEventListener('DOMContentLoaded', () => {
    // Sample student data
    const students = [
        {
            name: 'Carlos Rene Angarita Sanguino',
            id: '05372',
            email: 'carlosreneas@ufps.edu.co',
            github: 'GitHub',
            image: 'https://assets.goal.com/images/v3/blt52d5867d0f812c38/GOAL%20-%20Blank%20WEB%20-%20Facebook(1820).jpeg?auto=webp&format=pjpg&width=3840&quality=60'
        },
        {
            name: 'Yan Carlo Angarita Sanguino',
            id: '00001',
            email: 'yancarlo120b@gmail.com',
            github: 'GitHub',
            image: 'https://static.wikia.nocookie.net/futbol/images/f/f9/Cristiano_Ronaldo_Al-Nassr.jpeg/revision/latest?cb=20240225024316'
        },
        {
            name: 'Claudia Yamile Gomez Llanez',
            id: '05096',
            email: 'claudiaygomez@ufps.edu.co',
            github: 'GitHub',
            image: 'https://image.europafm.com/clipping/cmsimages02/2024/09/10/2A6D30A4-242D-4B91-9CA9-72D93E9F96CE/lamine-yamal-joven-futbolista-records-que-escucha-karol_98.jpg?crop=4917,2766,x0,y0&width=1900&height=1069&optimize=low&format=webply'
        },
        {
            name: 'Pepito Perez Rodriguez',
            id: '08096',
            email: 'pepoperez@ufps.edu.co',
            github: 'GitHub',
            image: 'https://assets.goal.com/images/v3/blt77343c47650bbfc1/2342f72fb9136c85780213e2ad65de2843a40911.jpg?auto=webp&format=pjpg&width=3840&quality=60'
        }
    ];

    const studentsList = document.getElementById('studentsList');
    const template = document.getElementById('studentCardTemplate');

    // Render students
    function renderStudents() {
        studentsList.innerHTML = '';
        students.forEach(student => {
            const clone = template.content.cloneNode(true);
            
            clone.querySelector('.student-name').textContent = student.name;
            clone.querySelector('.student-id').textContent = `ID: ${student.id}`;
            clone.querySelector('.student-email').textContent = student.email;
            clone.querySelector('.student-image').src = student.image;
            clone.querySelector('.github-link').href = `https://github.com/${student.github}`;

            studentsList.appendChild(clone);
        });
    }

    // Initial render
    renderStudents();

});
