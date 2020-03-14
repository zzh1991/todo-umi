import ITodo from './ITodo';

export default {
  namespace: 'todos',
  state: [],
  reducers: {
    getTodos(state : Array<ITodo>, { payload: data } : {
      payload : Array<ITodo>,
    }) {
      return data;
    },
  },
};