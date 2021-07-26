import { Container, Header } from 'semantic-ui-react';
import './App.css';
import TodoForm from './components/TodoForm';
import TodoList from './components/TodoList';

const App: React.FC = () => {
  return (
    <Container text>
      <Header as="h2">Simple todo app using Postgres and Typescript</Header>
      <TodoForm />

      <hr />

      <TodoList />
    </Container>
  );
};

export default App;
