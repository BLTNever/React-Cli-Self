
import { handleActions } from 'redux-actions'

//定义reducer
const reducer = handleActions(
    {
        HOME_PAGE: (state, action) => ({ 
            ...state, page: action.payload 
        }),
        HOME_LIST: (state, action) => ({ 
            ...state, list: action.payload 
        }),
    },
    {
        // 默认
        list: {}
    }
);

export default reducer;


// export function home(state = {}, action) {
//     switch (action.type) {
//         case "GET_HR_CENTER_LIST":
//             return Object.assign({}, state, action.result);

//         default:
//             return state;
//     }
// }