import React from 'react';
import {
    HashRouter,
    Route,
    NavLink,
    Switch
} from 'react-router-dom';
import routes from './routes';

const Router = () => (
    <HashRouter>
        <div className="container-inner">
            <nav className="aside-nav" style={{}}>
                <ul>
                    <li><NavLink to="/" exact>首页介绍</NavLink></li>
                    <li><NavLink to="/Form" exact>基础表单示例（非自动）</NavLink></li>
                    <li><NavLink to="/AutoForm" exact >使用自动表单</NavLink></li>
                    <li><NavLink to="/AutoFormTest" exact >bug复现</NavLink></li>
                    <li><NavLink to="/TryAutoForm" exact >自动表单试一试</NavLink></li>
                    <li>Controls输入控件：</li>
                    <li>
                        <ul className="sub-nav">
                            <li><NavLink to="/Input" exact>输入框</NavLink></li>
                            <li><NavLink to="/Upload" exact>图片视频上传</NavLink></li>
                            <li><NavLink to="/RadioGroup" exact>RadioGroup</NavLink></li>
                            <li><NavLink to="/Select" exact>Select</NavLink></li>
                            <li><NavLink to="/DateTimeInput" exact>日期时间输入</NavLink></li>
                        </ul>
                    </li>

                    <li>Fieldsets字段组：</li>
                    <li>
                        <ul className="sub-nav">
                            <li><NavLink to="/ListFieldset" exact>ListFieldset</NavLink></li>
                            <li><NavLink to="/GroupFieldset" exact>GroupFieldset</NavLink></li>
                            <li><NavLink to="/RadioFieldset" exact>RadioFieldset</NavLink></li>
                            <li><NavLink to="/TabFieldset" exact>TabFieldset</NavLink></li>
                            <li><NavLink to="/TableFieldset" exact>TableFieldset</NavLink></li>
                        </ul>
                    </li>
                    <li>物料自动表单示例：</li>
                    <li>
                        <ul className="sub-nav">
                            <li><NavLink to={{pathname: '/AutoForm/108'}} exact>宽版综艺节目样式（108）</NavLink></li>
                            <li><NavLink to={{pathname: '/AutoForm/109'}} exact>PC视频样式（109）</NavLink></li>
                            <li><NavLink to={{pathname: '/AutoForm/110'}} exact>大图倒计时样式（110）</NavLink></li>
                            <li><NavLink to={{pathname: '/AutoForm/111'}} exact>大图轮展表格样式（111）</NavLink></li>
                            <li><NavLink to={{pathname: '/AutoForm/112'}} exact>大图轮播样式（112）</NavLink></li>
                            <li><NavLink to={{pathname: '/AutoForm/311'}} exact>背景图样式（311）</NavLink></li>
                            <li><NavLink to={{pathname: '/AutoForm/313'}} exact>大图样式（313）</NavLink></li>
                            <li><NavLink to={{pathname: '/AutoForm/314'}} exact>大图倒计时样式（314）</NavLink></li>
                            <li><NavLink to={{pathname: '/AutoForm/315'}} exact>视频样式1（315）</NavLink></li>
                            <li><NavLink to={{pathname: '/AutoForm/316'}} exact>视频样式2（316）</NavLink></li>
                            <li><NavLink to={{pathname: '/AutoForm/317'}} exact>导航样式（317）</NavLink></li>
                            <li><NavLink to={{pathname: '/AutoForm/318'}} exact>旅游样式（318）</NavLink></li>
                        </ul>
                    </li>
                </ul>
            </nav>
            <div className="main-body">
                <div className="body-inner">
                    <Switch>
                        {
                            routes.map((route, index) => (
                                <Route key={index} {...route} />
                            ))
                        }
                    </Switch>
                </div>
            </div>
        </div>
    </HashRouter>
);

export default Router;