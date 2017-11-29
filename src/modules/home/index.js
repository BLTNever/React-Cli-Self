import React from "react";
import PropTypes from "prop-types";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import "./index.less";

/*
* 将store注入组件的props
* */
const mapStateToProps = state => ({
    home: { ...state.HOME_PAGE }
});

/*
* 将action与dispatch进行绑定并注入组件的props
* */
const mapDispatchToProps = dispatch => ({
    //区分绑定到props的action与传递的props
    actions: bindActionCreators(
        {
            dispatch,
        },
        dispatch
    )
});

class Home extends React.Component {
    static defaultProps = {
        home: {},
    };
    //propTypes 验证
    static propTypes = {
        actions: PropTypes.shape({
            dispatch: PropTypes.func.isRequired,
            home: PropTypes.object,
        }).isRequired
    };

    constructor(props) {
        super(props);
        this.state = {}
    }
    componentWillMount() {

    }

    render() {
        return (
            <div className="home">
                <h1>homePage</h1>
            </div>
        );
    }
}



export default connect(mapStateToProps, mapDispatchToProps)(Home);
