import { withStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import CircularProgress from '@material-ui/core/CircularProgress';

const styles = theme =>({
	progress:{
		position: 'absolute',
		top:'50%',
		left:'50%'
	}
})

class Loading extends React.Component{

	constructor(props){
		super(props);
		this.state = {
			completed:0
		}
	}

	componentWillMount(){
		console.log("开始");
	}

	componentDidMount(){
		this.timer = setInterval(this.progress, 20);
	}

	componentWillUnmount(){
		clearInterval(this.timer);
	}

	timer;

	progress = () =>{
		const { completed } = this.state;
		this.setState({ completed: completed >= 100 ? 0 : completed + 1 });
	}

	render(){
		const {classes} = this.props;
		return(
			<div className="spin-loading-cl">
				<Modal aria-labelledby="simple-modal-title" aria-describedby="simple-modal-description" open="true">
					<CircularProgress className={classes.progress} variant="determinate" size={50} value={this.state.completed}/>
				</Modal>
			</div>
		)
	}
}

Loading.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Loading);
