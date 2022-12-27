// BaseTree.js

import React from 'react';
import PropTypes from 'prop-types';

import {TreeSelect} from 'antd';

import Field from '../Field/Field';

import './BaseEnum.css';

export default class BaseTree extends Field {

  static propTypes = {
    ...Field.propTypes,
    readOnly: PropTypes.bool,
    rootId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    onDataHandle: PropTypes.func, //(data) => data , 过滤数据或增加数据项
  };

  static defaultProps = {
    ...Field.defaultProps,
    allowClear: true,
    treeDefaultExpandAll: true,
    showSearch: true,
  };

  constructor(props) {
    super(props);
    this.state = {
      ...this.state,
      loading: false,
      data: null,
      treeData: null,
      searchValue: '',
    };
  }

  async componentDidMount() {
    super.componentDidMount && super.componentDidMount();
    this.loadData();
  }

  async loadData() {
    this.setState({loading: true});
    try {
      let data = await this.fetchData();
      if (this.props.onDataHandle) data = this.props.onDataHandle(data);
      this.setState({loading: false, data, treeData: this.makeTreeData(data)});
    } catch(err) {
      this.setState({loading: false});
      console.error(err);
    }
  }

  async fetchData() {
    return null;
  }

  getRootId() {
    return this.props.rootId;
  }

  getParentId(item) {
    return item && item.parentId;
  }

  getId(item) {
    return item && item.id;
  }

  getName(item) {
    return item && item.name;
  }

  getTitle(item) {
    return item ? `[${this.getId(item)}]${this.getName(item)}` : '';
  }

  getSelectable(item) {
    return item && (item.selectable !== false);
  }

  getItem(value) {
    let {data} = this.state;
    if (!data) data = [];
    if (value instanceof Array) return data.filter(item => value.indexOf(this.getId(item)) >= 0);
    else return data.filter(item => this.getId(item) === value)[0];
  }

  makeTreeData(data) {
    let findNodes = parentId => {
      return data.filter(item => this.getParentId(item) === parentId).map(item => ({
        item,
        subList: findNodes(this.getId(item)),
      }));
    };

    if (!data) data = [];
    let rootId = this.getRootId() || 0;
    let rootList = data.filter(item => this.getId(item) === rootId);
    if (rootList.length === 0) rootList = data.filter(item => this.getParentId(item) === rootId);
    return rootList.map(item => ({
      item,
      subList: findNodes(this.getId(item)),
    }));
  }

  renderNode(node) {
    let {searchValue} = this.state;
    let {item, subList} = node;
    let title = this.getTitle(item);
    let searchPos = searchValue && title ? title.indexOf(searchValue) : -1;
    if (searchPos >= 0) {
      let head = title.substr(0, searchPos);
      let tail = title.substr(searchPos + searchValue.length);
      title = <span>{head}<span style={{color: '#f50'}}>{searchValue}</span>{tail}</span>;
    }
    return (
      <TreeSelect.TreeNode value={this.getId(item)} title={title} selectable={this.getSelectable(item)} data={item} key={this.getId(item)}>
        {subList.map(subNode => this.renderNode(subNode))}
      </TreeSelect.TreeNode>
    );
  }

  renderDetail() {
    let {readOnly, loading, searchValue, filterTreeNode, onSearch, ...others} = this.otherProps;
    if (loading === undefined) loading = this.state.loading;
    if (searchValue === undefined) searchValue = this.state.searchValue;
    if (filterTreeNode === undefined) filterTreeNode = (value, node) => this.getTitle(node.props.data).toLowerCase().indexOf(value.toLowerCase()) >= 0;
    if (readOnly === undefined) readOnly = (this.mergeProps.mode === 'view');
    let readOnlyProps = readOnly ? {open: false, allowClear: false} : {};
    return (
      <TreeSelect
        dropdownStyle={{maxHeight: 320, overflow: 'auto'}}
        loading={loading}
        searchValue={searchValue}
        filterTreeNode={filterTreeNode}
        onSearch={searchValue => {
          this.setState({searchValue});
          onSearch && onSearch(searchValue);
        }}
        {...others}
        {...readOnlyProps}
      >
        {this.state.treeData ? this.state.treeData.map(item => this.renderNode(item)) : []}
      </TreeSelect>
    );
  }

  // 支持多个 id 值
  renderValueString(value) {
    if (!(value instanceof Array)) value = [value];
    return value.map(v => {
      let item = this.getItem(v);
      return (item ? this.getTitle(item) : (v || v === 0 ? `${v}` : ''));
    }).join(',');
  }

}
