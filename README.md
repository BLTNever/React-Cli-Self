
## 参考
webpack2
脚手架工具 create-react-app [地址](https://github.com/facebookincubator/create-react-app)
增加`react-router` `thunk`
开启代理服务
前端技术栈：react + redux + fetch + es6

## 开发
环境准备妥当之后，把项目clone下来，切换到对应分支。安装项目依赖：
```
npm install
```
即可开始开发。
- 启动项目(mock也会同时开启)
```
npm run start
```
- 打包项目
```
npm run build
```

## 开发规范：

#### 一、接口相关
cFetch:
* 接口地址统一存放src/app/config
* 使用的是whatwg-fetch，然后在此基础上埋了一些方法，用于处理一些后端返回的东西。（数据层／业务层分离）
* 调用接口直接在js文件顶部引入公共方法：
组建内部state就写内部
```
import cFetch from '../../utils/cFetch';
cFetch(‘url’, { method: 'POST', body: formData })
    .then(res => {
	// write code        
    }).catch(() => {
        // write code
    })
```

Or
Fecth:
cFetch:
* 接口在actions里直接写
* fetch有在utils里封装了一下， 引入../../utils/fetch.js
* 绑定到redux上dispatch数据，createAction 统一大写 下划线
* 在reducers同名文件下创建
* 调用要在static加校验
* 调用接口直接在js文件顶部引入公共方法：
组建内部state就写内部
```
import { createAction } from "redux-actions";
import fetch from "../../utils/fetch.js";

export const getData = createAction("GET_DATA")
export const fetchData = (param) => dispatch =>
    fetch("url", {
        body: param,
        // meta: {
        //     dipId: 67252
        // }
    }).then(res => {
        dispatch(getData(res.result));
        return res;
    });
```

需要共享的state用redux存store

```
import { fetchData } from '../../actions/usersPreJob/';

const mapDispatchToProps = (dispatch) => ({
    actions: bindActionCreators({
        fetchData
    }, dispatch)
});

componentWillMount() {
    this.props.actions.fetchData();
}

```
* 请求方式有3种，配置的位置在script/server.js
1. 本地开发后执行build, commit到服务器，然后访问线上地址
2. Mock（目前大家统一的做法）
3. 我们后端开启服务

```
//  联调接口入口
yield proxy(
    {
        host: 'http://11.161.81.109:7001',
        match: /\/hrmregister\//,
    }
);
```

```
//  mock数据入口
yield proxy(
 {
 host: 'http://30.2.224.72:2016/',
 match: /(\/hrmregister\/)/
 }
 );
 yield proxy({host: 'https://xxx.xxxxx.com', match: /^(\/admin\/|\/app\/)/});
```

#### 二、书写规范
项目中使用了eslint，目前很多小伙伴没有在意上面的报错和警告。这个有待解决，不要留有任何bug和warning！！！
除此之外，有一些规范不能被检测到请大家书写时尽量保持规范

例如：
1、
```
error writing：
import {Layout} from 'antd';

Right writing
import { Layout } from 'antd';

Error writing:
//这里是注释

Right writing:
// 这里是注释
```

2、
代码行间距的间隔不要超过2行，一般就1行

3、
各自写的代码顶部标注自己的信息，如：
```
/**
 * Created by Alec on yyyy/mm/dd.
 */
import React from 'react';
import { connect } from 'react-redux';
```

4、缩进使用tab还是或空格没有严格要求，按个人习惯来，但是要统一，不要混用就行


#### 目前问题

1. webpack 2所带来的export与ES6class在babel编译有问题。
    1.1 使用webpack 1 安装babel-plugin-add-module-exports插件解决
    1.2 找一个webpack 2的工具解决
2. webpack 2 换成webpack 3 
3. routes里要在后面加.default 解决问题1的问题
4. babel-plugin-transform-decorators-legacy 插件还是webpack 2不支持的原因 不能写 
    @connect(mapStateToProps, mapDispatchToProps)
    export default class ClassName extends Component {}