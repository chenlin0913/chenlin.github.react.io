import React,{Component} from 'react';

var websocket = null;

export default class Home extends Component{
	
	constructor(props){
		super(props);
		this.state = {
			mod:null,
			message:'',
			gomessage:'发送'
		}
	} 

	sockets = () =>{
		
		if ('WebSocket' in window) {
	        websocket = new WebSocket("ws://10.38.39.202:9080/mmalltest/websocket");
	    }
	    else {
	        alert('当前浏览器 Not support websocket')
	    }

	    //连接发生错误的回调方法
	    websocket.onerror =  () =>{
        	this.setMessageInnerHTML("WebSocket连接发生错误");
    	}

    	 //连接成功建立的回调方法
	    websocket.onopen =  () =>{
	        this.setMessageInnerHTML("WebSocket连接成功");
	    }

	    //接收到消息的回调方法
	    websocket.onmessage = (event) =>{
	        this.setMessageInnerHTML(event.data);
	    }

	    //连接关闭的回调方法
	    websocket.onclose =  () =>{
	        this.setMessageInnerHTML("WebSocket连接关闭");
	    }
	}

	setMessageInnerHTML = (innerHTML) =>{
		this.setState({
			message:innerHTML
		});
	}

	closeWebSocket = () =>{
		 websocket.close();
	}

	send = () =>{
		let message = this.state.gomessage;
		websocket.send(message);
	}

	handleChange = (event) =>{
		this.setState({
			gomessage:event.target.value
		});
	}
	
	componentWillMount(){
		console.log(this.props);
	}

	componentDidMount(){

		this.sockets();
	}

	componentWillUnmount(){
		socket.close();
	}
	
	render(){
		const message = this.state.gomessage;
		return(
			<div id="home">
				<i>这里是Home</i><br/>
				<input type="text" value={message} onChange={this.handleChange}/><br/>
				<label onClick={this.send}>发射事件</label><br/>
				<label>通讯信息：{this.state.message}</label>
			</div>
		)
	}
}

