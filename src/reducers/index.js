import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

// 自动注册reducers文件夹下的文件到redux  store
const context = require.context("./", true, /\w+\/\w+\.js$/);
const keys = context.keys();

const reducers = keys.reduce((memo, key) => {
    const arr = key.match(/(\w+)\/([^\/]+)\.js$/);
    memo[`${arr[1].toUpperCase()}_${arr[2].toUpperCase()}`] = context(key);
    return memo;
}, {});

export default combineReducers({ ...reducers, routing: routerReducer });

