import React from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { setDefaultHandler } from 'workbox-routing';
// importing components
import Todo from './Todo';

const TodoList = ({ todos, setFilteredTodos, filteredTodos, setTodos, search, status }) => {

  function handleOnDragEnd(result) {
    if (!result.destination) return;

    const items = Array.from(filteredTodos);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    setTodos(items);
    setFilteredTodos(items);
  }

   
  return (
    <div>
      {
        filteredTodos.length !== 0
        ?
        <DragDropContext onDragEnd={handleOnDragEnd}>
          <Droppable droppableId='todos'>
            {provided => (
              <div className="todos" {...provided.droppableProps} ref={provided.innerRef}>
                {filteredTodos.map((todo, index) => {
                  return (
                    <Draggable key={todo.id} draggableId={todo.id} index={index} isDragDisabled={search || status !== "all"? true : false}>
                      {provided => (
                        <div ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps} className="draggableProps">
                          <Todo
                            key={todo.id}
                            setTodos={setTodos}
                            todos={todos}
                            todo={todo}/>
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
        :
        <div className="msg">
          {
              search
            ?
              `No results for: ${search}`
            :
              "Any todo available..."
          }
        </div>
      }
    </div>
  );
}

export default TodoList;