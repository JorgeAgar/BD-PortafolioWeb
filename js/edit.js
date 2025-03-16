const form = document.getElementById('formulario');
const id = getQueryParam(window.location.href, "code");

document.addEventListener('DOMContentLoaded', async() => {
    const student = await api.getStudentByCode(id);
    
    form['codigo'].value = id;
    form['nombre'].value = student.name;
    form['email'].value = student.email;
    form['descripcion'].value = student.description;
    form['github'].value = student.github_link;
    form['fotoURL'].value = student.photo;
});

function getQueryParam(url, param){
    const urlObj = new URL(url);
    return urlObj.searchParams.get(param);
}

document.getElementById('saveStudent').onclick = async (event) => {
    event.preventDefault();
    if(!form.checkValidity()){
        return;
    }
    
    const estudiante = {
        code: form['codigo'].value,
        name: form['nombre'].value,
        email: form['email'].value,
        photo: form['fotoURL'].value,
        github_link: form['github'].value,
        description: form['descripcion'].value,
    };

    try {
        console.log(estudiante);
        let response = await api.updateStudent(id, estudiante);
        console.log(response);
        alert("Estudiante editado exitosamente");
    } catch (error) {
        alert("No se pudo realizar la acción");
        console.error(error);
    }
};