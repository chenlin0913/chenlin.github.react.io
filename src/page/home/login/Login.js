import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Modal from '@material-ui/core/Modal';
import TextField from '@material-ui/core/TextField';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import {goToLogin} from '@/redux/actions/action-login';
import { connect } from 'react-redux';
import store from '@/redux/store';


const styles = theme =>({
	card:{
		minWidth:400,
		position: 'absolute',
		top:'20%',
		left:'40%'
	},
	pos:{
		marginBottom:12
	},
	textField:{
		marginLeft:theme.spacing.unit,
		marginRight: theme.spacing.unit,
		width: 325
	},
	leftIcon:{
  		marginRight: theme.spacing.unit
  	},
  	botLogin:{
  		backgroundColor:'#9d8988',
  		color:'#ffffff',
  		margin: theme.spacing.unit,
  		width:'45%'
  	},
  	botforgot:{
  		color:'#fefefe',
  		width:'45%'
  	},
  	rightIcon: {
    	marginReft: theme.spacing.unit,
  	},
  	container:{
		display: 'flex',
		flexWrap: 'wrap'
	}
})


class Login extends React.Component{
	
	constructor(props){
		super(props);
		this.state = {
			username:'',
			password:''
		}
	}

	handleGetAccount = username => event =>{
		this.setState({
	      	username: event.target.value
	    });
	}

	handleGetPwd = password => event =>{
		this.setState({
			password: event.target.value
		});
	}

	handleClose = () =>{
		store.dispatch({
			type:'CLOSELOGIN',
			open:false
		})
	}

	handleClick = () =>{
		store.dispatch(goToLogin(this.state));
	}

	shorOrHidden = (open) =>{
		if(open){
			const {classes, theme} = this.props;
			return(
				<form className={classes.container} noValidate autoComplete="off">
		      		<Card className={classes.card}>
		      			<CardContent>
		      				<Typography variant="headline" component="p">
								LOGIN
		      				</Typography><br/>
		      				<Typography className={classes.pos} color="textSecondary">
		      					<TextField id="username" label="USER NAME" placeholder="YOUR USER NAME" className={classes.textField} value={this.state.username} onChange={this.handleGetAccount('account')} margin="normal"/>
		      				</Typography>
		      				<Typography component="p">
								<TextField id="password-input" label="PASSWORD" placeholder="YOUR PASSWORD" className={classes.textField}  type="password" value={this.state.password} onChange={this.handleGetPwd('password-input')} autoComplete="current-password" margin="normal"/>
		      				</Typography><br/>
		      				<Typography component="p">
								<Button size="Large" variant="raised" className={classes.botLogin} onClick={this.handleClick}>
									LOGIN
									<KeyboardArrowRight className={classes.rightIcon}/>
								</Button>
								<Button size="Large" variant="raised" className={classes.botforgot}>FORGOT PWD</Button>
							</Typography><br/>
		      			</CardContent>
		      		</Card>
	      		</form>
			)
		}else{
			return null
		}
	}

	componentWillMount(){
		
	}

	componentWillReceiveProps(nextProps){
		if(!nextProps.open){
			this.setState({
				password: ''
			});
		}
	}



	render(){
		
		return(
			<div id="logins">
				{this.shorOrHidden(this.props.open)}
			</div>
		)
	}
}

const mapStateToProps = (store) =>{
	return{
		open:store.implLogin.open
	}
}

Login.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired
}

export default connect(mapStateToProps)(withStyles(styles)(Login));