import axios from 'axios';
import { useEffect, useState } from 'react';
import { Icon, List } from 'semantic-ui-react';

const TodoList: React.FC = () => {
  interface Todo {
    id: number;
    description: string;
    done: boolean;
  }
  const [todos, setTodos] = useState<Todo[]>([]);

  useEffect(() => {
    const fetchTodos = async () => {
      const { data } = await axios.get('http://localhost:5000/todos');
      setTodos(data.data);
    };
    fetchTodos();
  }, []);

  // Much cleaner ways to do this, it was a practice project,
  // would naturally place item into it's own component and throw axios into
  // it's own hook to avoid repetition etc.
  const toggleTodo = async (
    id: Number,
    status: boolean,
    description: string,
  ) => {
    const result = await axios.put(
      `http://localhost:5000/todos/${id}`,
      {
        done: status,
        description,
      },
      { headers: { 'Content-Type': 'application/json' } },
    );
    console.log('result', result);
  };

  return (
    <List>
      {todos?.length ? (
        todos.map(({ description, done, id }) => (
          <List.Item as="a" key={id}>
            <Icon name="caret right" />
            <List.Content>
              <List.Header>{description}</List.Header>
              <List.Description
                onClick={() => toggleTodo(id, !done, description)}
              >
                Status: {done ? <>Complete</> : <>Pending</>}
              </List.Description>
            </List.Content>
          </List.Item>
        ))
      ) : (
        <p>No todos</p>
      )}
    </List>
  );
};

export default TodoList;
