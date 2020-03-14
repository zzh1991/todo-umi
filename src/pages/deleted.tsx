import React from 'react';
import styles from './index.less';
import TodoList from '../components/TodoList';

export default () => {
  return (
    <div>
      <TodoList addMode={false} type={'deleted'} />
    </div>
  );
}
