// 引入组件
import Introduce from './Introduce';
import Input from './controls/Input';
import Upload from './controls/Upload';
import RadioGroup from './controls/RadioGroup';
import Select from './controls/Select';
import DateTimeInput from './controls/DateTimeInput';

import ListFieldset from './fieldsets/ListFieldset';
import GroupFieldset from './fieldsets/GroupFieldset';
import RadioFieldset from './fieldsets/RadioFieldset';
import TabFieldset from './fieldsets/TabFieldset';
import TableFieldset from './fieldsets/TableFieldset';

import Form from './Form';
import AutoForm from './AutoForm';
import AutoFormTest from './AutoFormTest';
import TryAutoForm from './AutoForm/TryAutoForm';
import AsyncAutoForm from './AutoForm/AsyncAutoForm';

const routes = [
    { path: '/', component: Introduce, exact: true },
    { path: '/Input', component: Input },
    { path: '/Upload', component: Upload },
    { path: '/RadioGroup', component: RadioGroup },
    { path: '/Select', component: Select },
    { path: '/DateTimeInput', component: DateTimeInput },
    { path: '/Form', component: Form },
    { path: '/ListFieldset', component: ListFieldset },
    { path: '/GroupFieldset', component: GroupFieldset },
    { path: '/RadioFieldset', component: RadioFieldset },
    { path: '/TabFieldset', component: TabFieldset },
    { path: '/TableFieldset', component: TableFieldset },
    { path: '/AutoForm', component: AutoForm, exact: true },
    { path: '/AutoFormTest', component: AutoFormTest, exact: true },
    { path: '/TryAutoForm', component: TryAutoForm, exact: true },
    { path: '/AutoForm/:id', component: AsyncAutoForm, exact: true },
];

export default routes;