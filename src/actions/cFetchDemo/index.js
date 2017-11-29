/**
 * whatwg-fetch 封装后使用的例子
 */
import cFetch from '../../utils/cFetch';
import API from '../../config/api';

const { getData } = API.cFetchDemo;
export const getCfetchData = createAction('CFETCH_DATA');

//修改最后工作日
export const fetchGetCfetchData = (params) => (dispatch) => {
    return cFetch(
        getCfetchData, 
        Object.assign(
            {
                method: 'POST',
                body: params,
            }, 
            process.env.NODE_ENV === 'production' ? {} : { credentials: 'omit' }
        )
    ) 
    .then(res => {
        dispatch(getCfetchData(res.result))
    })
};
