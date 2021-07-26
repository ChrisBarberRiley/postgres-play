import { Button, Form } from 'semantic-ui-react';

const TodoForm = () => (
  <Form>
    <Form.Group widths={2}>
      <Form.Input placeholder="Description" />
      <Button type="submit">Submit</Button>
    </Form.Group>
  </Form>
);
export default TodoForm;
