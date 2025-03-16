document.addEventListener('DOMContentLoaded', async () => {
    // Sample student data

    const studentsList = document.getElementById('studentsList');
    const template = document.getElementById('studentCardTemplate');
    const detailsTemplate = document.getElementById('studentDetailsTemplate');
    const add_tech_template = document.getElementById('addTechTemplate');

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
            clone.querySelector('.github-link').href = student.github_link;
            clone.querySelector('.edit').onclick = () => {
                window.location.href = 'edit.html?code=' + student.code;
            };
            clone.querySelector('.details').onclick = async () => {
                const detailsClone = detailsTemplate.content.cloneNode(true);

                detailsClone.querySelector('.details-student-image').src = student.photo;
                detailsClone.querySelector('.details-name').textContent = student.name;
                detailsClone.querySelector('.details-code').textContent = student.code;
                detailsClone.querySelector('.details-email').textContent = student.email;
                detailsClone.querySelector('.details-github').href = student.github_link;
                detailsClone.querySelector('.details-student-description').textContent = student.description;
                detailsClone.querySelector('.details-student-add-tech').onclick = async () => {
                    const addTechClone = add_tech_template.content.cloneNode(true);
                    const viewInstance = document.body.querySelector('.details-view');

                    const allTechnologies = await api.getTechnologies();
                    const studentTechnologies = await api.getStudentTechnologies(student.code);
                    const studentTechCodes = studentTechnologies.map(tech => tech.technology.code);
                    const availableTechnologies = allTechnologies.filter(tech => !studentTechCodes.includes(tech.code));

                    const selectTech = addTechClone.querySelector('#add-tech-select');
                    availableTechnologies.forEach(tech => {
                        const option = document.createElement('option');
                        option.value = tech.code;
                        option.textContent = tech.name;
                        selectTech.appendChild(option);
                    });
                    
                    addTechClone.querySelector('.add-tech-cancel').onclick = () => {
                        viewInstance.removeChild(viewInstance.querySelector('.add-tech-container'));
                    };

                    addTechClone.querySelector('.add-tech-add').onclick = async () => {
                        let newStudentTech = null;
                        availableTechnologies.forEach(avTech => {
                            if(avTech.code == selectTech[selectTech.selectedIndex].value){
                                newStudentTech = avTech;
                            }
                        });

                        const addFieldSet = viewInstance.querySelector('.add-tech-container').querySelector('#addTechFieldset')
                        let addLevel = 0;
                        if(addFieldSet.querySelector('#level1').checked){
                            addLevel = 1;
                        } else if(addFieldSet.querySelector('#level2').checked){
                            addLevel = 2;
                        }else if(addFieldSet.querySelector('#level3').checked){
                            addLevel = 3;
                        }else if(addFieldSet.querySelector('#level4').checked){
                            addLevel = 4;
                        }else if(addFieldSet.querySelector('#level5').checked){
                            addLevel = 5;
                        }
                        
                        const studentTechJSON = {
                            student_code: student.code,
                            technology_code: selectTech[selectTech.selectedIndex].value,
                            // technology: newStudentTech,
                            level: addLevel
                        };
                        
                        console.log(studentTechJSON);
                        try {
                            let response = await api.addStudentTechnology(studentTechJSON);
                            console.log(response);
                            await renderTechnologies(detailsClone.querySelector('.details-student-technologies'), student.code);  
                            alert("Se ha añadido la tecnología exitosamente");
                        } catch (error) {
                            console.error(error);
                        }
                    }
                    // console.log(viewInstance);
                    viewInstance.appendChild(addTechClone);
                };
                detailsClone.querySelector('.details-back').onclick = () => {
                    const viewInstance = document.body.querySelector('.details-view');
                    // console.log(viewInstance);
                    viewInstance.style.display = 'none';
                    document.body.removeChild(viewInstance);
                }
                await renderTechnologies(detailsClone.querySelector('.details-student-technologies'), student.code);
                document.body.appendChild(detailsClone);

            };
            studentsList.appendChild(clone);
        });
    }

    // Initial render
    await renderStudents();

});

const tech_template = document.getElementById('technologyTemplate');
const star_template = document.getElementById('starTemplate');
const edit_template = document.getElementById('editTechTemplate');

async function renderTechnologies(ulist, student_code){
    ulist.innerHTML = '';
    const technologies = await api.getStudentTechnologies(student_code);

    if(technologies.length == 0){
        ulist.innerHTML = '<h2 class="details-noTech">Este usuario no tiene ninguna tecnología</h2>';
    }

    technologies.forEach(technology => {
        console.log(technology);
        const clone = tech_template.content.cloneNode(true);
        let rating = technology.level;
        for(let i = 0; i < rating; i++){
            const starList = clone.querySelector('.tech-stars');
            const starClone = star_template.content.cloneNode(true);
            // console.log(starList);
            // console.log(clone);
            starList.appendChild(starClone);
        }
        clone.querySelector('.tech-name').textContent = technology.technology.name;
        clone.querySelector('.tech-img').src = technology.technology.image;
        clone.querySelector('#tech-delete-button').onclick = async () => {
            try {
                let response = await api.deleteStudentTechnology(student_code, technology.technology.code);
                console.log(response);
                alert("Se borró la tecnología exitosamente");
                renderTechnologies(ulist, student_code);
                return;
            } catch (error) {
                alert("Ha ocurrido un error");
                console.error(error);
            }
        };
        clone.querySelector('#tech-edit-button').onclick = async () => {
            let cloneEdit = edit_template.content.cloneNode(true);
            cloneEdit.querySelector('.edit-tech-technology-name').textContent = technology.technology.name;
            cloneEdit.querySelector('.edit-tech-technology-logo').src = technology.technology.image;

            const editContainer = document.body.querySelector('.details-view');
            editContainer.appendChild(cloneEdit);

            cloneEdit = editContainer.querySelector('.edit-tech-container');

            cloneEdit.querySelector('.edit-tech-save').onclick = async () => {
                try {
                    const fieldSet = editContainer.querySelector('#editTechFieldset')
                    let newLevel = 0;
                    if(fieldSet.querySelector('#level1').checked){
                        newLevel = 1;
                    } else if(fieldSet.querySelector('#level2').checked){
                        newLevel = 2;
                    }else if(fieldSet.querySelector('#level3').checked){
                        newLevel = 3;
                    }else if(fieldSet.querySelector('#level4').checked){
                        newLevel = 4;
                    }else if(fieldSet.querySelector('#level5').checked){
                        newLevel = 5;
                    }
    
                    let response = await api.updateStudentTechnology(student_code, technology.technology.code, newLevel);
                    console.log(response);
                    renderTechnologies(ulist, student_code);
                    return;
                } catch (error) {
                    alert("ha ocurrido un error");
                    console.error(error);
                }
            };

            cloneEdit.querySelector('.edit-tech-cancel').onclick = () => {
                cloneEdit.style.display = 'none';
                editContainer.removeChild(cloneEdit);
            };
            
        };
        ulist.appendChild(clone);
    });
}