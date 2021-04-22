import React from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
// importing components
import Todo from './Todo';

const TodoList = ({ todos, filteredTodos, setTodos, search }) => {

  function handleOnDragEnd(result) {
    if (!result.destination) return;

    const items = Array.from(filteredTodos);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    setTodos(items);
  }
    
  const getItemStyle = draggableStyle => ({
    // some basic styles to make the items look a bit nicer
    userSelect: "none",
    padding: "6px",
    margin: `0 0 6px 0`,

    // styles we need to apply on draggables
    ...draggableStyle
  });


  return (
    <div>
      {
        filteredTodos.length != 0
        ?
        <DragDropContext onDragEnd={handleOnDragEnd}>
          <Droppable droppableId='todos'>
            {provided => (
                  <div className="todos" {...provided.droppableProps} ref={provided.innerRef}>
                    {filteredTodos.map((todo, index) => {
                      return (
                        <Draggable key={todo.id} draggableId={todo.id} index={index} isDragDisabled={search ? true : false}>
                          {provided => (
                            <div ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}
                            style={getItemStyle(provided.draggableProps.style)}
                            >
                              <Todo
                                key={todo.id}
                                setTodos={setTodos}
                                filteredTodos={filteredTodos}
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
        :
        <div className="msg">
          {
              search
            ?
              `No results for: ${search}`
            :
              "Any todo"
          }
        </div>
      }
    </div>
  );
}

export default TodoList;