document.getElementById('formTask').addEventListener('submit', saveTask); //el documento selecciona al formulario y agregale un escucha a su evento submit

function saveTask(e){

    let title = document.getElementById('title').value;//guardamos lo que se encuentra dentro del campo en una variable
    
    let description = document.getElementById('description').value;

    const task = {//creamos la tarea con los dos valores anteriores
        title,//title:title
        description//description: description
    };
    //Nos perfimite guardar los datos y en el navegador y tiene algunos metodos set item nos permite poder almacenar un dato en base a dos parametra uno el nombre docmo vamos allamar los datos y el valor de los datos  
    // localStorage.setItem('tasks', JSON.stringify(task));

    // console.log(JSON.parse(localStorage.getItem('tasks')));// obtener los datos y lo comvierte en un objeto 

    if (localStorage.getItem('tasks') === null){ //si desde el localstorage ya exite un valor llamdo tareas y es nulo pues vamos a empesar a crear  tareas
        let tasks = [];
        tasks.push(task); // se llenara atravez de lmetodo push con una tarea nueva
        localStorage.setItem('tasks', JSON.stringify(tasks));  // alamcesnar el valor en el coal storage  en formato de string


    }else{// si ya existen valores vamos a actualizarlos
        let tasks = JSON.parse(localStorage.getItem('tasks'));// obtener los valores que tengo en el local storage y almacenarlos en una variable
        tasks.push(task);// con esto actualizo las tareas antiguas
        localStorage.setItem('tasks', JSON.stringify(tasks)); //y las vuelvo a almasenar
    }

    getTasks();
    document.getElementById('formTask').reset();
    e.preventDefault();
}

function getTasks(){// va hacer una consultqa al localStorage y una vez obtenidos los va amostar por pantalla 
    let tasks = JSON.parse(localStorage.getItem('tasks'));// quiero obtener las tareas y combertirlas a un formato de json y se almacena en una variable
    let tasksView = document.getElementById('tasks');// obtener la id del documento y asignarla auna variable 

    tasksView.innerHTML = '';

    for(let i = 0; i < tasks.length; i++){
        let title = tasks[i].title;
        let description = tasks[i].description;
        
        tasksView.innerHTML += `<div class="card mb-3">
            <div class="card-body">
                <p>${title} - ${description}</p>
                <a class="btn btn-danger" onclick="deleteTask('${title}')">DELETE </a>
            </div>
        </div>` 
    }

}

function deleteTask(title){
    let tasks = JSON.parse(localStorage.getItem('tasks'));
    for (let i = 0 ; i < tasks.length; i++){
        if (tasks[i].title == title){
            tasks.splice(i, 1);
        }
    }
    localStorage.setItem('tasks', JSON.stringify(tasks));// vuelve a almecenar las tareas si nese item menos 
    getTasks();
}

getTasks();
