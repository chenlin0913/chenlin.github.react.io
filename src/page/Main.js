import { withStyles } from '@material-ui/core/styles';
import {Button,Snackbar,IconButton }from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import Avatar from '@material-ui/core/Avatar';
import classNames from 'classnames';

const styles = theme => ({
  	close: {
	    width: theme.spacing.unit * 4,
	    height: theme.spacing.unit * 4,
  	},
  	avatar: {
	    margin: 10,
	},
	bigAvatar: {
	    width: 50,
	    height: 50,
	},
});

class Main extends React.Component{
	constructor(props){
		super(props);
		this.state = {
			mod:null,
			open:false
		}
	} 
	
	componentWillMount(){
		console.log("Main");
	}

	handleOpen = () =>{
		this.setState({
			open:true
		})
	}

	handleClose = (event,reason) =>{
		if(reason == 'clickaway'){
			return;
		}
		this.setState({
			open:false
		})
	}

	handleGoPlan = () =>{
		this.props.history.push({pathname:"/plan",state:{id:'121212'}});
	}

	handleGoTable = () =>{
		this.props.history.push({pathname:"/enhancedtable"});
	}

	handleGoHome = () =>{
		this.props.history.push({pathname:"/home"});
	}
	
	render(){
		const { classes } = this.props;
		return(
			<div>

			<label onClick={this.handleOpen}>Main 初始页面!!</label><br/>
			<label onClick={this.handleGoPlan}>进入Plan页面</label><br/>
			<label onClick={this.handleGoTable}>进入Table页面</label><br/>
			<label onClick={this.handleGoHome}>进入Home页面</label><br/>
			<Avatar alt="Adelle Charles" src="static\images\bgi.jpg" className={classNames(classes.avatar, classes.bigAvatar)}/>
			 <Snackbar
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'left',
          }}
          open={this.state.open}
          autoHideDuration={6000}
          onClose={this.handleClose}
          ContentProps={{
            'aria-describedby': 'message-id',
          }}
          message={<span id="message-id">Note archived</span>}
          action={[
            <Button key="undo" color="secondary" size="small" onClick={this.handleClose}>
              UNDO
            </Button>,
            <IconButton
              key="close"
              aria-label="Close"
              color="inherit"
              className={classes.close}
              onClick={this.handleClose}
            >
              <CloseIcon />
            </IconButton>,
          ]}
        />
			</div>
		)
	}
}
Main.propTypes = {
  classes: PropTypes.object.isRequired,
};
export default withStyles(styles)(Main);