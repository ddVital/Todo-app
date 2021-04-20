import React from 'react';
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
                <div className="todos" {...provided.droppableProps} ref={provided.innerRef}>
                  {todos.map((todo, index) => {
                    return (
                        <Draggable key={todo.id} draggableId={todo.id} index={index}>
                          {(provided) => (
                            <div ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
                              <Todo
                                key={todo.id}
                                setTodos={setTodos}
                                todos={todos}
                                todo={todo}
                              />
                            </div>
                          )}
                      </Draggable>
                    );
                  })}
                {provided.placeholder}
              </div>
            )}
        </Droppable>
      </DragDropContext>
    </div>
  );
}

export default TodoList;