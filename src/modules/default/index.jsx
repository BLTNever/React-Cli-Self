
import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import autobind from "autobind-decorator";
import { browserHistory } from 'react-router'

// components

// submodule
import "./index.less";

// modules

// utils

// actions

// 将store注入组件的props
const mapStateToProps = state => ({});
// 将action与dispatch进行绑定并注入组件的props
const mapDispatchToProps = dispatch => ({
    //区分绑定到props的action与传递的props
    actions: bindActionCreators(
        {
            dispatch,
        },
        dispatch
    )
});

// @connect(mapStateToProps, mapDispatchToProps)
// export default class Default extends Component {
class Default extends Component {
    static defaultProps = {

    };
    // propTypes 验证
    // redux的数据要在static里做验证，数据可以放在actions里。 也可以新建一个类
    // 例： default
    // isRequired 数据不能为空
    static propTypes = {
        actions: PropTypes.shape({
            dispatch: PropTypes.func.isRequired,
        }).isRequired,
        default: PropTypes.shape({
            data: PropTypes.object,
        })
    };
    constructor(props) {
        super(props);
        this.state = {

        };
    }

    componentWillMount() {

    }

    render() {

        return (
            <div>
                <h1>Defult Page</h1>
            </div>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Default)