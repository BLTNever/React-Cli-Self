import { createAction } from "redux-actions";
import fetch from "../../utils/fetch.js";
import { getAllUrlParams } from "../../utils/common.js";

export const getUrlParams = createAction("GET_HOLIDAY");

export const getData = createAction("GET_ADMIN_LIST");

export const fetchUrlParams = () => dispatch => {
    // 做成自定义的直接从url获取所有参数拼成对象
    dispatch(getUrlParams(getAllUrlParams()));
};

export const fetchData = (param) => dispatch =>
    fetch("/hrmregister/mobile/workbench/queryOnJobList", {
        body: param,
        // meta: {
        //     dipId: 67252
        // }
    }).then(res => {
        dispatch(getData(res.result));
        return res;
    });