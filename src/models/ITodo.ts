export default interface ITodo {
  id: number;
  description: string;
  status: string;
  createTime: number;
  updateTime: number;
  dueDate: number | null;
  detail: string | null;
}
