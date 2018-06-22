import { BrowserRouter, HashRouter, Route, hashHistory, Switch } from 'react-router-dom';
import {Provider} from 'react-redux';
import store from '@/redux/store';
import Main from '@/page/Main';
import * as NeedRouter from '@/router/app';


/**
 * (路由根目录组件，显示当前符合条件的组件)
 * 
 * @class Roots
 * @extends {Component}
 */
class Roots extends React.Component {
    render() {
        return (
            <div>{this.props.children}</div>
        );
    }
}

const Apps = () => (
  
  	<HashRouter history={hashHistory}>
        	<Switch>
  	        <Route exact path='/' component={Main}/>
  	        <Route path="/home" component={NeedRouter.HomeApp}/>
  	        <Route path="/list" component={NeedRouter.ListApp}/>
            <Route path="/plan" component={NeedRouter.PlanApp}/>
            <Route path="/enhancedtable" component={NeedRouter.EnhancedTableApp}/>
        	</Switch>
      </HashRouter>
  
)

export default Apps;