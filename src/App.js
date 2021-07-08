import React from 'react';
import ReactDOM from 'react-dom';

import {Icon, Input} from 'antd';
import 'antd/dist/antd.css';
import * as Webset from './components';

import './App.css';

export default class App extends React.Component {

  constructor(props) {
    super(props);
    this.navigator = new Webset.Navigator([
      {path: '/', Page: Webset.BasePage, params: {title: '首页'}, options: {noClose: true}},
      {path: '/test1', Page: Webset.BasePage, params: {title: '测试1'}, options: {grayTab: true}},
      {path: '/test2/{id}', Page: TestChangePage, params: {title: '测试2'}},
    ], ['/']);
    this.appContextValue = {app: this, navigator: this.navigator, http: null};
  }

  componentDidMount() {
    this.titleChangeHandler = this.navigator.register('titleChange', ({sender, title}) => {
      let path = this.navigator.getPath(sender);
      this.navigator.state.pageSet[path].params.title = title;
      this.setState({});
    });
    setTimeout(() => this.setState({data: [{k: 1, v: 2}]}), 3000);
  }

  componentWillUnmount() {
    this.titleChangeHandler.unregister();
  }

  render() {
    return (
      <Webset.AppProvider value={this.appContextValue}>
        <Webset.AppFrame
          navigator={this.navigator}
          appLogo={<svg viewBox='0 0 1024 1024' version='1.1' xmlns='http://www.w3.org/2000/svg' width='32' height='32'><path d='M264.490667 85.333333h25.621333A179.136 179.136 0 0 1 469.333333 264.533333V469.333333h-204.8A179.136 179.136 0 0 1 85.333333 290.133333v-25.6C85.333333 165.546667 165.546667 85.333333 264.490667 85.333333z m0 853.333334A179.157333 179.157333 0 0 1 85.333333 759.466667v-25.6a179.2 179.2 0 0 1 179.2-179.2H469.333333v204.8a179.2 179.2 0 0 1-179.2 179.2h-25.642666z m495.018666 0h-25.621333A179.136 179.136 0 0 1 554.666667 759.466667V554.666667h204.8a179.136 179.136 0 0 1 179.2 179.2v25.6c0 98.986667-80.213333 179.2-179.157334 179.2z m0-853.333334A179.157333 179.157333 0 0 1 938.666667 264.533333v25.6a179.2 179.2 0 0 1-179.2 179.2H554.666667v-204.8A179.2 179.2 0 0 1 733.866667 85.333333h25.642666z' fill='#ffffff' p-id='7516'></path></svg>}
          appTitle='WEBSET SYSTEM'
          appSubTitle='v0.1'
          menuTree={[
            {key: '/', title: <span><Icon type='home' /><span>首页</span></span>},
            {key: '/test1', title: <span><Icon type='fire' /><span>测试1</span></span>},
            {key: '/test2/12345', title: <span><Icon type='fire' /><span>测试2</span></span>},
          ]}
          menuTheme='dark'
          menuPlace='sider'
          />
      </Webset.AppProvider>
    );
  }

  render_() {
    let {ScrollView} = Webset;
    return (
      <div style={{height: 1600}}>
        <ScrollView style={{width: 300, height: 200, backgroundColor: '#f5f5f5', margin: 10, border: '2px solid #ddd', borderRadius: 2}}>
          <div style={{width: '100%', height: 150, backgroundColor: '#fff'}} onClick={() => console.log('click')}>012345678901234567890123456789</div>
          <div style={{width: '100%', height: 150, backgroundColor: '#faa'}}>012345678901234567890123456789</div>
          <div style={{width: '100%', height: 150, backgroundColor: '#afa'}}>012345678901234567890123456789</div>
          <div style={{width: '100%', height: 150, backgroundColor: '#aaf'}}>012345678901234567890123456789</div>
        </ScrollView>
        <ScrollView style={{width: 300, height: 200, backgroundColor: '#f5f5f5', margin: 10, border: '4px solid #ddd', borderRadius: 4, boxSizing: 'content-box'}}>
          <div style={{width: '200%', height: 40, backgroundColor: '#fff'}}>012345678901234567890123456789</div>
          <div style={{width: '200%', height: 40, backgroundColor: '#faa'}}>012345678901234567890123456789</div>
          <div style={{width: '200%', height: 40, backgroundColor: '#afa'}}>012345678901234567890123456789</div>
          <div style={{width: '200%', height: 40, backgroundColor: '#aaf'}}>012345678901234567890123456789</div>
        </ScrollView>
        <ScrollView style={{width: 300, height: 200, backgroundColor: '#f5f5f5', margin: 10, border: '6px solid #ddd', borderRadius: 6, boxSizing: 'border-box', padding: '10px 20px 3% 5px', transform: 'translate(10px, 20px)'}} scrollBarVisible='visible'>
          <div style={{width: '200%', height: 150, backgroundColor: '#fff'}}>012345678901234567890123456789</div>
          <div style={{width: '200%', height: 150, backgroundColor: '#faa'}}>012345678901234567890123456789</div>
          <div style={{width: '200%', height: 150, backgroundColor: '#afa'}}>012345678901234567890123456789</div>
          <div style={{width: '200%', height: 150, backgroundColor: '#aaf'}}>012345678901234567890123456789</div>
        </ScrollView>
      </div>
    );
  }

}

class TestChangePage extends Webset.BasePage {

  constructor(props) {
    super(props);
    this.state = {
      data: null,
    };
  }

  componentDidMount() {
    setTimeout(() => this.setState({data: [{k: 1, v: 2}]}), 3000);
  }

  render() {
    return (
      <div className='ws-page'>
        <Webset.HoldTable
          size='small'
          rowKey='k'
          bordered={true}
          holdHeight={200}
          columns={[{title: '键', dataIndex: 'k', width: '50%'}, {title: '值', dataIndex: 'v', width: '50%'}]}
          dataSource={this.state.data}
          onRow={(record, index) => ({onDoubleClick: e => console.log(e)})}
          />
        <Webset.EditTable holdHeight={200} />

        <div>{`props.id=${this.props.id}`}</div>
        <div onClick={() => this.context.navigator.emit('titleChange', {sender: this, title: '新标题*'})}>改标题</div>
        <div onClick={() => this.context.navigator.redirectTo('/test2/9999', this.context.navigator.getPath(this))}>redirectTo</div>
        <Input />
        <Webset.Form mode='edit' fieldProps={{span: 24}} ref={v => this.form = v}>
          <Webset.Form.Input title='测试' />
          <Webset.Form.Input title='测试测试测试测试测试测试测试测试' />
        </Webset.Form>
        <Webset.Form.Input title='测试3' />
        <div onMouseEnter={() => console.log(ReactDOM.findDOMNode(this).contains(document.activeElement))}>
          hover
        </div>

      </div>
    );
  }
}
