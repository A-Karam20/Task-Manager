import { Flex, Text } from "@chakra-ui/react";
import React from "react";
import { Draggable } from "react-beautiful-dnd";
import { Droppable } from "react-beautiful-dnd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark} from "@fortawesome/free-solid-svg-icons";

const Column = ({ column, tasks, onDelete }) => {
  const handleDelete = (name) => {
    onDelete(name);
  };
  
  return (
    <Flex
      rounded="3px"
      bg="beige"
      w="400px"
      flexDir="column"
      p="1rem"
      border="2px solid deeppink" // Change border color of columns
      mr="1rem" // Add margin between columns
      boxShadow={tasks.length === 0 ? "none" : "0 0 10px rgba(0, 0, 0, 0.3)"} // Add shadow when column has tasks
    >
      <Flex
        align="center"
        h="fit-content"
        bg="transparent"
        rounded="3px 3px 0 0"
        px="1.5rem"
        mb="1.5rem"
        borderBottom="2px solid deeppink" // Add horizontal line between title and panel
      >
        <Text fontSize="17px" fontWeight={600} color="black">
          {column.title}
        </Text>
      </Flex>

      <Droppable droppableId={column.id}>
        {(droppableProvided, droppableSnapshot) => (
          <Flex
            px="1.5rem"
            flex={1}
            flexDir="column"
            ref={droppableProvided.innerRef}
            {...droppableProvided.droppableProps}
            boxShadow={droppableSnapshot.isDraggingOver ? "0 2px 10px deeppink" : "unset"} // Set background color of panel
            pt="0.5rem" // Add padding to top of tasks
          >
            {tasks.map((task, index) => (
              <Draggable key={task.name} draggableId={task.name} index={index}>
                {(draggableProvided, draggableSnapshot) => (
                  <Flex
                    mb="1rem"
                    h="fit-content"
                    bg="blanchedalmond"
                    rounded="5px" // Add rounded corners to tasks
                    p="1rem" // Add padding to tasks
                    border="2px solid deeppink" // Add deeppink border to tasks
                    outline="2px solid"
                    outlineColor={
                      draggableSnapshot.isDragging ? "beige" : "transparent" // Change border color when dragging
                    }
                    boxShadow={
                      draggableSnapshot.isDragging ? "0 5px 10px rgba(0, 0, 0, 0.6)" : "unset"
                    }
                    ref={draggableProvided.innerRef}
                    {...draggableProvided.draggableProps}
                    {...draggableProvided.dragHandleProps}
                  >
                    <Text fontSize="17px" color="black"  fontFamily="Arial,sans-serif">
                      {task.name}</Text>
                    <FontAwesomeIcon
                      icon={faXmark}
                      onClick={() => handleDelete(task.name)}
                      style={{ marginLeft: "auto", cursor: "pointer" }}
                    />
                  </Flex>
                )}
              </Draggable>
            ))}
            {droppableProvided.placeholder}
          </Flex>
        )}
      </Droppable>
    </Flex>
  );
};

export default Column;

