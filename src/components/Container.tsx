import React, { Component } from 'react';
import { Menu } from 'antd';
import { history } from 'umi';
import {
  CalendarOutlined,
  DeleteOutlined,
  CheckCircleOutlined,
} from '@ant-design/icons';

import './Container.less';

export default class Container extends Component<any, any> {
  constructor(props: any) {
    super(props);
    this.state = {
      menuKey: this.getDefaultMenu(),
    };
  }

  getDefaultMenu = () => {
    const path = history.location.pathname;
    if (path === undefined || path === '/') {
      return '/todo';
    }
    return path;
  };

  onMenuChick = (menu: any) => {
    const { menuKey } = this.state;
    if (menu.key === menuKey) {
      return;
    }
    history.push(menu.key);
    this.setState({
      menuKey: menu.key,
    });
  };

  render() {
    const { menuKey } = this.state;
    return (
      <div className="page-display">
        <div className="page-header">
          <span
            className="page-header-title"
            onClick={() => this.onMenuChick({ key: '/todo' })}
            onKeyPress={() => this.onMenuChick({ key: '/todo' })}
          >
            Todo Manager
          </span>
          <Menu
            mode="horizontal"
            onClick={this.onMenuChick}
            defaultSelectedKeys={[menuKey]}
          >
            <Menu.Item key="/todo" icon={<CalendarOutlined />}>
              Todo
            </Menu.Item>
            <Menu.Item key="/completed" icon={<CheckCircleOutlined />}>
              Completed
            </Menu.Item>
            <Menu.Item key="/deleted" icon={<DeleteOutlined />}>
              Deleted
            </Menu.Item>
          </Menu>
        </div>
        <div>{this.props.children}</div>
        <div className="page-footer">Todo ©2017-2021 Created by zzh</div>
      </div>
    );
  }
}
