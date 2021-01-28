import React, { useState} from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
// importing components
import Todo from './Todo';

const TodoList = ({ todos, setTodos }) => {

  function handleOnDragEnd(result) {
    if (!result.destination) return;

    const items = Array.from(todos);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    setTodos(items);
  }

  return (
    <div className="todos-container">
      <DragDropContext onDragEnd={handleOnDragEnd}>
        <Droppable droppableId="todos">
          {(provided) => (
                <ul className="characters" {...provided.droppableProps} ref={provided.innerRef}>
                  {todos.map((todo, index) => {
                    return (
                      <Draggable key={todo.id} draggableId={todo.id} index={index}>
                        {(provided) => (
                          <li ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
                            <Todo 
                              key={todo.id}
                              setTodos={setTodos}
                              todos={todos}
                              todo={todo}
                            />
                          </li>
                        )}
                     </Draggable>
                    );
                  })}
                {provided.placeholder}
              </ul>
            )}
        </Droppable>
      </DragDropContext>
    </div>
  );
}

export default TodoList;

// import React from 'react';
// import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
// // importing components
// import Todo from './Todo';

// const TodoList = ({ todos, setTodos }) => {
//   return (
//     <div className="todos-container">
//       {todos.map(todo => (
//         <Todo 
//           key={todo.id}
//           setTodos={setTodos}
//           todos={todos}
//           todo={todo}
//         />
//       ))}
//     </div>
//   );
// }

// export default TodoList;