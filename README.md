# webset

webset 组件库，基于 ant design 实现。

注: 组件功能尚在演进中，风险需自行评估。

### 组件列表

- AppContext: react Context 组件
- AppProvider: react Context.Provider 组件
- Navigator: 导航器组件
- Http: http 功能封装类
- SecureHttp: Http 扩展类，支持对接口数据进行加解密
- AppFrame: 应用框架组件
- BasePage: 基础页面组件，可选
- HoldTable: 预占空间表格组件
- FullTable: 全宽高表格组件
- PageTable: 分页表格组件
- EditTable: 可编辑表格组件
- Form: form 组件
- ScrollView: 可滚动 div 组件
- FlexTabs: antd.Tabs 扩展组件，采用 flex 布局
- SvgIcon: antd.Icon 扩展组件，支持把 svg 图片显示为 icon
- ContextMenu: 右键菜单组件
- BaseDialog: 基础对话框组件
- FormDialog: BaseDialog 扩展组件，支持 form 组件显示及一些默认行为

### 安装
```
yarn add git+https://github.com/rilyu/webset.git#master
```

### 要求

在 Application 根组件渲染 AppProvider ， value 值类型参考 AppContext , value.http 需包含 loadEnumData 函数，例如:
```jsx
  constructor(props) {
    super(props);
    ...
    this.appContextValue = {app: this, navigator: this.navigator, http: this.http};
  }

  render() {
    return (
      <AppProvider value={this.appContextValue}>
        <Application />
      </AppProvider>
    );
  }
```
