import React from 'react';
import Container from '../components/Container';
import TodoList from '../components/TodoList';

export default () => {
  return (
    <Container>
      <TodoList addMode={true} type={'todo'} />
    </Container>
  );
};
