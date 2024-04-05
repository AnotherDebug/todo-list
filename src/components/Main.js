import React, { useState, useEffect } from "react";
import Button from "./partials/Button";
import TextInput from "./partials/TextInput";
import Section from "./partials/Section";
import UnList from "./partials/UnList";

const Main = () => {

  // Stato per la lista delle attività
  const [tasks, setTasks] = useState([]);
  // Stato per memorizzare il nuovo task
  const [newTask, setNewTask] = useState("");
  console.log(newTask);



  // Effetto per recuperare i dati dei task dall'API all'avvio dell'app
  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await fetch("http://localhost:3001/tasks");
        if (!response.ok) {
          throw new Error("Errore durante il recupero dei task");
        }
        const tasksData = await response.json();
        setTasks(tasksData);
      } catch (error) {
        console.error(error);
      }
    };
    fetchTasks();
  }, []);



  // Funzione per aggiungere una nuova attività alla lista al click del bottone
  const addTodo = async (todoText) => {
    todoText.preventDefault();
    const newTodo = { id: Date.now(), text: todoText, done: false };
    try {
      const response = await fetch("http://localhost:3001/tasks", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newTodo),
      });
      if (!response.ok) {
        throw new Error("Errore durante l'aggiunta del task");
      }

      // Dopo aver aggiunto il nuovo task, aggiornato l'elenco dei task dall'API
      const updatedTasksResponse = await fetch("http://localhost:3001/tasks");
      if (!updatedTasksResponse.ok) {
        throw new Error("Errore durante il recupero dei task aggiornati");
      }
      const updatedTasks = await updatedTasksResponse.json();

      // Aggiorna lo stato dei task nel componente React con l'elenco aggiornato dei task
      setTasks(updatedTasks);

      // Svuota il campo dell'input per il nuovo task
      setNewTask("");
    } catch (error) {
      console.error(
        "Si è verificato un errore durante l'aggiunta del task:",
        error
      );
    }
    return setNewTask("");
  };



  // Funzione per eliminare un'attività alla lista al click del bottone
  const deleteTask = async (taskId) => {
    console.log(taskId);
    try {
      const response = await fetch(`http://localhost:3001/tasks/${taskId}`, {
        method: "DELETE",
      });
  
      if (!response.ok) {
        throw new Error("Errore durante l'eliminazione del task");
      }
  
      const updatedTasksResponse = await fetch("http://localhost:3001/tasks");
      if (!updatedTasksResponse.ok) {
        throw new Error("Errore durante il recupero dei task aggiornati");
      }
      const updatedTasks = await updatedTasksResponse.json();
  
      setTasks(updatedTasks);
    } catch (error) {
      console.error("Si è verificato un errore durante l'eliminazione del task:", error);
    }
  };


  // Funzione per gestire il cambiamento del valore del nuovo task
  const handleTaskInputChange = (event) => {
    setNewTask(event.target.value);
  };

  return (
    <main>
      <Section title="Inserisci qui i tuoi tasks">
        <div className="d-flex justify-content-center ">
          <>
            <TextInput
              value={newTask}
              onChange={handleTaskInputChange}
              placeholder="Aggiungi un nuovo task"
            />
          </>
          <>
            <Button type="btn-warning" onClick={() => addTodo(newTask)}>
              <i className="fas fa-plus"></i> aggiungi
            </Button>
          </>
        </div>
      </Section>
      <Section title="Tasks" className="mt-3">
        {/* Verifico se ci sono attività nella lista */}
        {tasks.length === 0 ? (
          <p>Non ci sono attività da fare al momento.</p>
        ) : (
          // Passo le funzioni di eliminazione e la lista delle attività al componente UnList
          <UnList tasks={tasks} onDelete={deleteTask} />
        )}
      </Section>
    </main>
  );
};

export default Main;





//----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------



//CON "LOCALSTORE"

// const Main = () => {
//   // Stato per la lista delle attività
//   const [tasks, setTasks] = useState([]);
//   // Stato per memorizzare il nuovo task
//   const [newTask, setNewTask] = useState("");
//   console.log(newTask);

//     // Effetto per leggere i dati salvati in localStorage all'avvio dell'app
//   useEffect(() => {
//     // Leggi i dati salvati in localStorage o inizializza un array vuoto se non ci sono dati
//     const storedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
//     console.log(storedTasks);
//     // Aggiorna lo stato con i dati letti da localStorage
//     if (storedTasks) {
//       setTasks(storedTasks);
//      }
//   },[]);

//   // Effetto per scrivere i dati della lista in localStorage quando la lista viene aggiornata
//   useEffect(() => {
//     localStorage.setItem('tasks', JSON.stringify(tasks));
//     console.log(tasks);
//   }, [tasks]);

//    // Funzione per aggiungere una nuova attività alla lista al click del bottone
//   const addTodo = (todoText) => {
//     // Crea un nuovo oggetto todo con un ID univoco e il testo dell'attività
//     const newTodo = { id: Date.now(), text: todoText, done: false };
//     console.log(newTodo + "NUOVO TODO");
//     // Aggiorna lo stato con la nuova attività aggiunta alla fine della lista
//     setTasks([...tasks, newTodo]);
//     //svuoto il campo dell'input
//     setNewTask("");
//   };

//   // Funzione per eliminare un'attività dalla lista
//   const deleteTodo = (todoId) => {
//     // Filtra le attività rimuovendo quella con l'ID corrispondente
//     const updatedTasks = tasks.filter(todo => todo.id !== todoId);
//     setTasks(updatedTasks);
//   };

//   // Funzione per gestire il cambiamento del valore del nuovo task
//   const handleTaskInputChange = (event) => {
//     setNewTask(event.target.value);
//   };

//   return (
//     <main>
//       <Section title="Inserisci qui le cose da fare">
//         <div className="d-flex justify-content-center ">
//           <>
//             <TextInput
//               value={newTask}
//               onChange={handleTaskInputChange}
//               placeholder="Aggiungi un nuovo task"
//             />
//           </>
//           <>
//             <Button type="btn-warning" onClick={() => addTodo(newTask)}>
//               <i className="fas fa-plus"></i> aggiungi
//             </Button>
//           </>
//         </div>
//       </Section>
//       <Section title="Tasks" className="mt-3">
//         {/* TODO: devo passare i tasks in UnList */}
//         {tasks.length === 0 ? (
//           <p>Non ci sono attività da fare al momento.</p>
//         ) : (
//           <UnList tasks={tasks} onDelete={deleteTodo}/>
//         )}
//       </Section>
//     </main>
//   );
// };
