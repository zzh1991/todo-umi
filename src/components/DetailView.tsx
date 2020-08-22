import React, { Component } from 'react';
import AceEditor from 'react-ace';
import { Button } from 'antd';
import { EditFilled, SaveFilled, CloseCircleFilled } from '@ant-design/icons';
import ReactMarkdown from 'react-markdown';
import './DetailView.less';

import 'ace-builds/src-noconflict/theme-github';
import 'ace-builds/src-noconflict/mode-markdown';

interface DetailProps {
  detail: string | undefined;
  handleDetailChange: any;
  saveDetailChange?: any;
}

interface DetailState {
  // editMode: boolean;
}

export default class DetailView extends Component<DetailProps, DetailState> {
  constructor(props: DetailProps) {
    super(props);
    this.state = {
      editMode: false,
    };
  }

  enableModify = () => {
    this.setState({
      editMode: true,
    });
  };

  saveModification = () => {
    const { saveDetailChange } = this.props;
    if (saveDetailChange) {
      saveDetailChange();
    }
  };

  render() {
    const { detail } = this.props;
    return (
      <div className="detail-grid">
        <div className="detail-button">
          <Button icon={<SaveFilled />} onClick={this.saveModification}>
            Save
          </Button>
        </div>
        <div className="editor-view">
          <AceEditor
            mode="markdown"
            theme="github"
            name="detail"
            style={{ maxHeight: '35vh', flex: 1, height: '35vh' }}
            fontSize={14}
            showPrintMargin={false}
            showGutter={false}
            highlightActiveLine={false}
            value={detail}
            onChange={this.props.handleDetailChange}
            setOptions={{
              enableBasicAutocompletion: false,
              enableLiveAutocompletion: false,
              enableSnippets: false,
              showLineNumbers: false,
              tabSize: 2,
            }}
          />
          <ReactMarkdown className="home-detail-view" source={detail} />
        </div>
      </div>
    );
  }
}
