import ITodo from './ITodo';

export default {
  namespace: 'todo',
  state: {},
  reducers: {
    addTodo(state : ITodo, { payload: data } : {
      payload : ITodo,
    }) {
      return data;
    },
    updateTodo(state : ITodo, { payload: data } : {
      payload : ITodo,
    }) {
      return data;
    },
  },
};