import Container from '@/page/common/components/Container';
import {Provider} from 'react-redux';
import {keyCloseLogin} from '@/redux/actions/action-login';
import store from '@/redux/store';
require('@/styles.css');

class Layout extends React.Component{

	componentDidMount(){
		window.addEventListener("keydown",function(e){
			let data = {
				code:e.code
			}
			store.dispatch(keyCloseLogin(data));
		});
	}

	render(){
		return(
			<div id="layout">
			 	<Provider store={store}>
					<Container/>
				</Provider>
			</div>
		)
	}
}

ReactDom.render(<Layout/>,document.getElementById('app'))
