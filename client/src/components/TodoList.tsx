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

  return (
    <List>
      {todos?.length ? (
        todos.map(({ description, done, id }) => (
          <List.Item as="a" key={id}>
            <Icon name="caret right" />
            <List.Content>
              <List.Header>{description}</List.Header>
              <List.Description>Status: {done}</List.Description>
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
