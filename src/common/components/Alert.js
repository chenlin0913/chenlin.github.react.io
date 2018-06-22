import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';
import withMobileDialog from '@material-ui/core/withMobileDialog';
import { connect } from 'react-redux';
import store from '@/redux/store';

const Transition = (props) =>{
	return <Slide direction="up" {...props} />;
}

class Alert extends React.Component{

	constructor(props){
		super(props);
		
	}

  	handleClose = () => {
  		store.dispatch({
  			type:'CLOSEALERT',
  			open:false
  		});
  	}

  	componentWillMount(){
  		console.log(this.props)
  	}

	render(){
		return(
			<div>
				<Dialog open={this.props.open} TransitionComponent={Transition} keepMounted onClose={this.handleClose} aria-labelledby="alert-dialog-slide-title" ria-describedby="alert-dialog-slide-description">
					<DialogTitle id="alert-dialog-slide-title">
            			{this.props.title}
          			</DialogTitle>
          			<DialogContent>
          				<DialogContentText id="alert-dialog-slide-description">
          					{this.props.message}
          				</DialogContentText>
          			</DialogContent>
          			<DialogActions>
          				<Button onClick={this.handleClose} color="primary">
			              	Disagree
			            </Button>
			            <Button onClick={this.handleClose} color="primary">
			              	Agree
			            </Button>
          			</DialogActions>
				</Dialog>
			</div>
		)
	}
}

const mapStateToProps = (store) =>{
	return{
		open:store.implAlert.open,
		title:store.implAlert.title,
		message:store.implAlert.message
	}
}

export default connect(mapStateToProps)(withMobileDialog()(Alert));