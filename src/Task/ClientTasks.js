import React, { useState, useContext, useEffect } from "react";
import { Flex, Heading } from "@chakra-ui/react";
import Column from "../DragAndDropUI/Column.js";
import { DragDropContext} from "react-beautiful-dnd";
import axios from "axios";
import { ClientTasks } from "../Client/Client";
import { InitialState } from "../DragAndDropUI/InitialState";

const GetTasks = () => {

  const clientTasks = useContext(ClientTasks);
  const initialState = useContext(InitialState);
  const clientCrdt = JSON.parse(localStorage.getItem('Client'));
  const storedToken = JSON.parse(localStorage.getItem('Token'));

  useEffect( () => {
    axios.get(`${process.env.REACT_APP_API_KEY}/api/ManageTask/${clientCrdt.id}`, {
      headers: {
      'Authorization': `Bearer ${storedToken}`,
      'Content-Type': 'application/json'
    }})
      .then(async response => {
        return await response.data
      })
      .then( (data) => {
        clientTasks.tasks = data;
        const clientData = {
          tasks: clientTasks.tasks,
          columns: {
            column1: {
              strength: "S1",
              id: "column1",
              title: "Important And Urgent",
              taskIds: clientTasks.tasks.filter(task => task.strength === "S1").map(t => t.name)
            },
            column2: {
              strength: "S2",
              id: "column2",
              title: "Important But Not Urgent",
              taskIds: clientTasks.tasks.filter(task => task.strength === "S2").map(t => t.name)
            },
            column3: {
              strength: "S3",
              id: "column3",
              title: "Not Important But Urgent",
              taskIds: clientTasks.tasks.filter(task => task.strength === "S3").map(t => t.name)
            },
            column4: {
              strength: "S4",
              id: "column4",
              title: "Not Important And Not Urgent",
              taskIds: clientTasks.tasks.filter(task => task.strength === "S4").map(t => t.name)
            },
          },
          columnOrder: ["column1", "column2", "column3", "column4"],
        };
        setState(clientData);
      })
      .catch(error => console.log(error.message));
  }, []);
  
  const initialData = {
    tasks: clientTasks.tasks,
    columns: initialState.columns,
    columnOrder: initialState.columnOrder
  };

  const [state, setState] = useState(initialData);

  const handleDelete = (name) => {
    console.log(storedToken);
  axios.delete(`${process.env.REACT_APP_API_KEY}/api/ManageTask/${clientCrdt.id}/${name}`, {
    headers: {
    Authorization : `Bearer ${storedToken}`,
  }})
  .then( async response => {
    return await response.data
  })
  .then( () => {
    setState((prevState) => {
      const updatedTasks = [ ...prevState.tasks ]; // array of tasks
      const updatedColumns = { ...prevState.columns }; // object of columns
  
      // Remove the task from the tasks object
      const indexOfTask = updatedTasks.findIndex(task => task.name === name);
      updatedTasks.splice(indexOfTask,1);
  
      // Remove the task from all columns
      Object.keys(updatedColumns).forEach((columnId) => {
        const column = updatedColumns[columnId];
        column.taskIds = column.taskIds.filter((taskName) => taskName !== name);
      });
  
      return {
        ...prevState,
        tasks: updatedTasks,
        columns: updatedColumns,
      };
    });
  })
  .catch(error => console.log(error.message));
};

  const onDragEnd = (result) => {
    const { destination, source } = result;

    if (!destination) {
      return;
    }

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    const startColumn = state.columns[source.droppableId];
    const endColumn = state.columns[destination.droppableId];

    if (startColumn === endColumn) { //if the item is dropped in the same column
      const newTaskIds = Array.from(startColumn.taskIds); //create a new array of tasks names from the column
      newTaskIds.splice(source.index, 1); //Remove the old location of the task
      newTaskIds.splice(destination.index, 0, result.draggableId);

      const newColumn = {
        ...startColumn,
        taskIds: newTaskIds,
      };

      const newState = {
        ...state,
        columns: {
          ...state.columns,
          [newColumn.id]: newColumn,
        },
      };

      setState(newState);

    } else {
      const patchTask = {
        strength : endColumn.strength,
        name : result.draggableId,
        clientId : clientCrdt.id
      };

      axios.patch(`${process.env.REACT_APP_API_KEY}/api/ManageTask/${clientCrdt.id}`, patchTask, {
        headers: {
        Authorization : `Bearer ${storedToken}`,
      }})
      .then(response => response.data)
      .catch(error => error.message);
        const startTaskIds = Array.from(startColumn.taskIds);
      startTaskIds.splice(source.index, 1);
      const newStartColumn = {
        ...startColumn,
        taskIds: startTaskIds,
      };

      const endTaskIds = Array.from(endColumn.taskIds);
      endTaskIds.splice(destination.index, 0, result.draggableId);
      const newEndColumn = {
        ...endColumn,
        taskIds: endTaskIds,
      };

      const newState = {
        ...state,
        columns: {
          ...state.columns,
          [newStartColumn.id]: newStartColumn,
          [newEndColumn.id]: newEndColumn,
        },
      };

      const updatedStartColumn = {
        ...newState.columns[source.droppableId],
        isTakenFrom: true,
      };
      newState.columns[source.droppableId] = updatedStartColumn;

      setState(newState);
    }
  };

  return (
    <div>
    <DragDropContext onDragEnd={onDragEnd}>
      <Flex
        flexDir="column"
        bg="main-bg"
        minH="100vh"
        w="full"
        color="white-text"
        pb="2rem"
      >
        <Flex py="4rem" flexDir="column" align="center">
          <Heading fontSize="3xl" fontWeight={600}>
          </Heading>
        </Flex>

        <Flex justify="space-between" px="4rem">
          {state.columnOrder.map((columnId) => {
            const column = state.columns[columnId];
            const getTask = (taskName) => {
              const arrayOfTasks = state.tasks.filter(task => task.name === taskName);
              return arrayOfTasks[0];
            }

            const tasks = column.taskIds.map((name) => getTask(name));

            return (
              <Column key={column.id} column={column} tasks={tasks} onDelete={handleDelete} />
            );
          })}
        </Flex>
      </Flex>
    </DragDropContext>
    </div>
  );
};

export default GetTasks;


// ... --> spread syntax : used to copy properties from one object to another
// prevState --> state of the property before update
// splice --> used to remove/add elements