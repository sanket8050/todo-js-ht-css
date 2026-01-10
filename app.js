// const { json } = require("express");

document.addEventListener("DOMContentLoaded",()=>{
    const taskinput = document.getElementById("task-input");
    const addTaskbtn = document.getElementById("add-task-btn");
    const tasklist = document.getElementById("task-list");
    const emptyimg = document.querySelector(".no-task");
    const todoscontainer = document.querySelector(".todos-container");


    let completed;
    const progressbar = document.getElementById("progress");
    const progressnums = document.getElementById("number");
    const toto = document.querySelector(".to-do-app");

    
    

    const toggleEmptyState = ()=>{
        emptyimg.style.display = tasklist.children.length === 0 ? 'block' : 'none';
        
        todoscontainer.style.display = tasklist.children.length > 0 ? 'flex' : 'none';

        
    };

    const updateProgress = (checkCompetion = true)=>{
        const totalTask = tasklist.children.length;
        const completedTask = tasklist.querySelectorAll(".checkbox:checked").length;
        progressbar.style.width = totalTask ?  `${(completedTask / totalTask)*100}%` :'0%';
        progressnums.textContent= `${completedTask}/${totalTask}`;
        

        if(checkCompetion && totalTask > 0 && completedTask === totalTask){
            runConfetti();
        }


    };

    const saveTaskToLocalStorage = ()=>{
        const tasks = Array.from(tasklist.children).map(li => {
            const checkbox = li.querySelector('.checkbox');
            return {
                text: li.querySelector('span').textContent,
                completed: checkbox.checked
            };
        });
        localStorage.setItem('tasks', JSON.stringify(tasks));

    }
    
    const loadTaskFromLocalStorage = ()=>{
        const savedTasks = JSON.parse(localStorage.getItem('tasks'))  || [];
        savedTasks.forEach(({text,completed})=> addtask(text,completed,false));
        toggleEmptyState();
        updateProgress();
        
    };
    const addtask = (text,completed = false,checkCompetion = true)=>{
        const taskText = text || taskinput.value.trim();
        if(!taskText){
            return;
        }
        const li = document.createElement("li");
        li.innerHTML = `
            <input type="checkbox" class="checkbox" ${completed ? 'checked' : ''} />
            <span>${taskText}</span>
            <div class="task-btn">
                <button class="edit-btn"><i class="fa-solid fa-pen"></i></button>
                <button class="delete-btn"><i class="fa-solid fa-trash"></i></button>
            </div>
        `;

        const checkbox = li.querySelector('.checkbox');
        const editbtn = li.querySelector('.edit-btn');

        checkbox.addEventListener('change', () => {
            const ischecked = checkbox.checked;

            if (ischecked) {
                li.classList.add('completed');
                editbtn.disabled = true;
                editbtn.style.opacity = 0.5;
                editbtn.style.pointerEvents = 'none';
            } else {
                li.classList.remove('completed');
                editbtn.disabled = false;
                editbtn.style.opacity = 1;
                editbtn.style.pointerEvents = 'auto';
            }

            updateProgress();
            saveTaskToLocalStorage();
        });


        editbtn.addEventListener('click',()=>{
            if(!checkbox.checked){
                taskinput.value = li.querySelector('span').textContent;
                li.remove();
                updateProgress(false);
                saveTaskToLocalStorage();
            }
        });

        li.querySelector('.delete-btn').addEventListener('click',()=>{
            li.remove();
            toggleEmptyState();
            updateProgress(checkCompetion);
            saveTaskToLocalStorage();
        });

        tasklist.appendChild(li);
        taskinput.value = "";
        toggleEmptyState();
        updateProgress();
        saveTaskToLocalStorage();
    };

    addTaskbtn.addEventListener("click", ()=> addtask());
    taskinput.addEventListener("keypress", (e)=>{
        if(e.key === "Enter"){
            e.preventDefault();
            addtask();
        }
    });

    toggleEmptyState();
    updateProgress();
    loadTaskFromLocalStorage();
});
const count = 400,
  defaults = {
    origin: { y: 0.7 },
  };

function fire(particleRatio, opts) {
  confetti(
    Object.assign({}, defaults, opts, {
      particleCount: Math.floor(count * particleRatio),
    })
  );
}

function runConfetti() {
  fire(0.25, {
    spread: 26,
    startVelocity: 55,
  });

  fire(0.2, {
    spread: 60,
  });

  fire(0.35, {
    spread: 100,
    decay: 0.91,
    scalar: 0.8,
  });

  fire(0.1, {
    spread: 120,
    startVelocity: 25,
    decay: 0.92,
    scalar: 1.2,
  });

  fire(0.1, {
    spread: 120,
    startVelocity: 45,
  });
}