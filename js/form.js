const form = document.getElementById("formulario");
const name = document.getElementById("nombre");
const code = document.getElementById("codigo");
const email = document.getElementById("email");
const description = document.getElementById("descripcion");
const github_link = document.getElementById("github");
const photo = document.getElementById("fotoURL");

document.getElementById("crearStudent").addEventListener("click", () => {
    if(!form.checkValidity()){
        return;
    }
    
    const estudiante = {
        code: code.value,
        name: name.value,
        email: email.value,
        photo: photo.value,
        github_link: github_link.value,
        description: description.value,
    };

    try {
        console.log(estudiante);
        let response = api.createStudent(estudiante);
        console.log(response);
        alert("Estudiante creado exitosamente");
    } catch (error) {
        console.error(error);
        alert("hubo un error");
    }
});