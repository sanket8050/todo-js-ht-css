document.addEventListener("DOMContentLoaded",()=>{
    const taskinput = document.getElementById("task-input");
    const addTaskbtn = document.getElementById("add-task-btn");
    const tasklist = document.getElementById("task-list");
    const emptyimg = document.querySelector(".no-task");
    const todoscontainer = document.querySelector(".todos-container");
    let completed;
    const progressbar = document.getElementById("progress");
    const progressnums = document.getElementById("number");


    const toggleEmptyState = ()=>{
        emptyimg.style.display = tasklist.children.length === 0 ? 'block' : 'none';
        todoscontainer.style.display = tasklist.children.length > 0 ? '100%' : '50%';
    };

    const updateProgress = (checkCompetion = true)=>{
        const totalTask = tasklist.children.length;
        const completedTask = tasklist.querySelectorAll(".checkbox:checked").length;
        progressbar.style.width = totalTask ?  `${(completedTask / totalTask)*100}%` :'0%';
        progressnums.textContent= `${completedTask}/${totalTask}`;

        if(checkCompetion && totalTask > 0 && completedTask === totalTask){
        confetti();
        }


    }
    



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
        });


        editbtn.addEventListener('click',()=>{
            if(!checkbox.checked){
                taskinput.value = li.querySelector('span').textContent;
                li.remove();
                updateProgress(false);
            }
        });

        li.querySelector('.delete-btn').addEventListener('click',()=>{
            li.remove();
            toggleEmptyState();
            updateProgress(checkCompetion);
        });

        tasklist.appendChild(li);
        taskinput.value = "";
        toggleEmptyState();
        updateProgress();
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
});

const confetti=()=>{
    const end = Date.now() + 15 * 1000;

// go Buckeyes!
const colors = ["#bb0000", "#ffffff"];

(function frame() {
  confetti({
    particleCount: 2,
    angle: 60,
    spread: 55,
    origin: { x: 0 },
    colors: colors,
  });

  confetti({
    particleCount: 2,
    angle: 120,
    spread: 55,
    origin: { x: 1 },
    colors: colors,
  });

  if (Date.now() < end) {
    requestAnimationFrame(frame);
  }
})();

}