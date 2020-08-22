import React, { Component } from 'react';
import {
  Button,
  Table,
  Modal,
  Select,
  Input,
  DatePicker,
  Tag,
  notification,
} from 'antd';
import { FileAddFilled, EditFilled } from '@ant-design/icons';
import { connect } from 'umi';
import { Dispatch, AnyAction } from 'redux';
import moment from 'moment';
import DetailView from './DetailView';
import { selectData, saveData, updateData } from '../db/DbOperation';
import ITodo from '../models/ITodo';
import './TodoList.less';

const Option = Select.Option;

interface TodoProps {
  type: string;
  addMode: boolean;
  todos: any;
  dispatch: Dispatch<AnyAction>;
}

interface TodoState {
  visible: boolean;
  description: string;
  detail: string | undefined;
  status: string;
  dueDate: number | null;
  addStatus: boolean;
  id: number | null;
  createTime: number | null;
}

class TodoList extends Component<TodoProps, TodoState> {
  constructor(props: TodoProps) {
    super(props);
    this.state = {
      visible: false,
      description: '',
      detail: '',
      status: '',
      dueDate: null,
      addStatus: false,
      id: null,
      createTime: null,
    };
  }

  componentDidMount() {
    const { type } = this.props;
    this.fetchTodoList(type);
  }

  fetchTodoList = (type: string) => {
    selectData(type).then((data) => {
      this.props.dispatch({
        type: 'todos/getTodos',
        payload: data,
      });
    });
  };

  handleAdd = () => {
    this.setState({
      addStatus: true,
      visible: true,
      description: '',
      detail: '',
      status: '',
      dueDate: null,
      id: null,
    });
  };

  handleOk = () => {
    const {
      id,
      description,
      dueDate,
      detail,
      status,
      addStatus,
      createTime,
    } = this.state;
    const { type } = this.props;
    console.log(createTime);
    let data = {
      description,
      updateTime: Date.now(),
      detail,
      status,
      createTime: createTime || Date.now(),
    };
    if (dueDate !== null && dueDate !== undefined) {
      data = {
        ...data,
        dueDate: dueDate.valueOf(),
      };
    }
    if (!addStatus) {
      data = {
        ...data,
        id,
        createTime: createTime || Date.now(),
      };
      updateData(data)
        .then((data) => {
          this.props.dispatch({
            type: 'todo/updateToDo',
            payload: data,
          });
        })
        .then(() => this.fetchTodoList(type));
    } else {
      console.log(data);
      saveData(data)
        .then((res) => {
          this.props.dispatch({
            type: 'todo/addToDo',
            payload: data,
          });
        })
        .then(() => this.fetchTodoList(type));
    }

    this.setState({
      visible: false,
      addStatus: false,
    });
  };
  handleCancel = () => {
    this.setState({
      visible: false,
      addStatus: false,
    });
  };

  handleDueDateChange = (dueDate) => {
    this.setState({
      dueDate,
    });
  };

  handleStatueChange = (status) => {
    this.setState({
      status,
    });
  };

  handleDescriptionChange = (e: any) => {
    this.setState({
      description: e.target.value,
    });
  };

  handleDetailChange = (detail: string) => {
    this.setState({
      detail,
    });
  };

  handleExpandRow = (expanded: boolean, record: ITodo) => {
    if (expanded) {
      this.setState({
        id: record.id,
        detail: record.detail,
        description: record.description,
        status: record.status,
        dueDate: record.dueDate,
        createTime: record.createTime,
      });
    }
  };

  saveDetailChange = () => {
    if (!this.state.addStatus) {
      const {
        id,
        description,
        dueDate,
        detail,
        status,
        createTime,
      } = this.state;
      const { type } = this.props;
      const data = {
        id,
        detail,
        description,
        updateTime: Date.now(),
        status,
        dueDate,
        createTime,
      };
      updateData(data)
        .then((data) => {
          this.props.dispatch({
            type: 'todo/updateToDo',
            payload: data,
          });
        })
        .then(() => {
          notification.open({
            message: 'Save Detail Successfully.',
          });
          this.fetchTodoList(type);
        });
    }
  };

  renderToggleContent = () => (
    <DetailView
      detail={this.state.detail}
      handleDetailChange={this.handleDetailChange}
      saveDetailChange={this.saveDetailChange}
    />
  );

  renderTag = (text: string) => {
    if (text === 'todo') {
      return <Tag color="#FFA500">todo</Tag>;
    }
    if (text === 'completed') {
      return <Tag color="#87d068">completed</Tag>;
    }
    return <Tag color="#f50">deleted</Tag>;
  };

  render() {
    const { addStatus } = this.state;
    const columns = [
      {
        title: 'Description',
        dataIndex: 'description',
        key: 'description',
        className: 'table-column',
        sorter: (a: ITodo, b: ITodo) =>
          a.description.length - b.description.length,
      },
      {
        title: 'Create Time',
        dataIndex: 'createTime',
        className: 'table-column',
        render: (text) => moment(text).format('YYYY-MM-DD HH:mm:ss'),
        key: 'createTime',
        sorter: (a, b) => a.createTime - b.createTime,
      },
      {
        title: 'Update Time',
        dataIndex: 'updateTime',
        className: 'table-column',
        render: (text) => moment(text).format('YYYY-MM-DD HH:mm:ss'),
        key: 'updateTime',
        sorter: (a, b) => a.updateTime - b.updateTime,
      },
      {
        title: 'Due Date',
        dataIndex: 'dueDate',
        className: 'table-column',
        render: (text) => {
          if (text === null || text === undefined) {
            return '';
          }
          return moment(text).format('YYYY-MM-DD HH:mm:ss');
        },
        key: 'dueDate',
        sorter: (a, b) => a.dueDate - b.dueDate,
      },
      {
        title: 'Status',
        dataIndex: 'status',
        key: 'status',
        className: 'table-column',
        render: this.renderTag,
      },
      {
        title: 'Action',
        className: 'table-column',
        key: 'action',
        render: (text) => (
          <Button
            icon={<EditFilled />}
            size="small"
            type="primary"
            onClick={() => {
              let dueDate = null;
              if (text.dueDate !== null && text.dueDate !== undefined) {
                dueDate = moment(text.dueDate);
              }
              this.setState({
                visible: true,
                description: text.description || '',
                detail: text.detail || '',
                status: text.status || '',
                id: text.id || null,
                dueDate,
                createTime: text.createTime || Date.now(),
              });
            }}
          >
            Edit
          </Button>
        ),
      },
    ];

    return (
      <div className="home-todo-list">
        {this.props.addMode && (
          <div className="todo-list-add-btn">
            <Button
              type="primary"
              icon={<FileAddFilled />}
              onClick={this.handleAdd}
            >
              Add
            </Button>
          </div>
        )}
        <Table
          columns={columns}
          expandedRowRender={this.renderToggleContent}
          dataSource={this.props.todos || []}
          rowKey={(record) => record.id}
          onExpand={(expanded, record) => {
            this.handleExpandRow(expanded, record);
          }}
        />
        <Modal
          title={!addStatus ? 'Edit' : 'Add'}
          width="75vw"
          visible={this.state.visible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
        >
          <div>
            <div className="edit-view">
              {'Description:  '}
              <Input
                style={{ width: '20vw' }}
                value={this.state.description}
                onChange={this.handleDescriptionChange}
              />
            </div>
            <div className="edit-view">
              {'Status:  '}
              <Select
                style={{ width: 120, marginLeft: 32 }}
                value={this.state.status}
                onChange={this.handleStatueChange}
              >
                <Option value="todo">todo</Option>
                <Option value="completed">completed</Option>
                <Option value="deleted">deleted</Option>
              </Select>
            </div>
            <div className="edit-view">
              {'Due Date:  '}
              <DatePicker
                showTime
                style={{ marginLeft: 14 }}
                format="YYYY-MM-DD HH:mm"
                placeholder="Select Time"
                onChange={this.handleDueDateChange}
                value={this.state.dueDate}
                allowClear
              />
            </div>
            <br />
            <h4>Detail</h4>
            <DetailView
              detail={this.state.detail}
              handleDetailChange={this.handleDetailChange}
              saveDetailChange={this.saveDetailChange}
            />
          </div>
        </Modal>
      </div>
    );
  }
}

export default connect(({ todos }: any) => ({
  todos,
}))(TodoList);
