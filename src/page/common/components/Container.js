import { withStyles } from '@material-ui/core/styles';
import classNames from 'classnames';
import Typography from '@material-ui/core/Typography';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import CardMedia from '@material-ui/core/CardMedia';
import AccountCircle from '@material-ui/icons/AccountCircle';
import Apps from '@/router/router';
import {mailFolderListItems,otherMailFolderListItems} from '@/page/common/components/TileData';
import { connect } from 'react-redux';
import store from '@/redux/store';
import Login from '@/page/home/login/Login';
import Alert from '@/common/components/Alert';


const drawerWidth = 240;


const styles = theme =>({
	root:{
		flexGrow: 1,
		height: '100%',
	    zIndex: 1,
	    overflow: 'hidden',
	    position: 'relative',
	    display: 'flex'
	},
	flex:{
		flex:1
	},
	menuButton:{
		marginLeft:12,
		marginRight:36
	},
	appBar:{
		zIndex: theme.zIndex.drawer + 1,
			transition: theme.transitions.create(['width', 'margin'], {
	      	easing: theme.transitions.easing.sharp,
	      	duration: theme.transitions.duration.leavingScreen,
	    }),
		backgroundColor:'#424242'
	},
	appBarShift:{
		marginLeft: drawerWidth,
	    width: `calc(100% - ${drawerWidth}px)`,
	    transition: theme.transitions.create(['width', 'margin'], {
	      	easing: theme.transitions.easing.sharp,
	      	duration: theme.transitions.duration.enteringScreen,
	    }),
	},
	hide:{
		display: 'none',
	},
	drawerPaper:{
		position: 'relative',
		whiteSpace: 'nowrap',
		width: drawerWidth,
		transition: theme.transitions.create('width', {
	      	easing: theme.transitions.easing.sharp,
	      	duration: theme.transitions.duration.enteringScreen,
	    }),
	    backgroundImage:'url(\'static/images/bgi.jpg\')',
	    backgroundSize:'cover',
	    backgroundPosition:'center center'
	},
	drawerPaperClose:{
		overflowX: 'hidden',
		 transition: theme.transitions.create('width', {
	     	easing: theme.transitions.easing.sharp,
	      	duration: theme.transitions.duration.leavingScreen,
	    }),
	    width: theme.spacing.unit * 7,
	    [theme.breakpoints.up('sm')]: {
	      	width: theme.spacing.unit * 9,
	    },
	},
	toolbar: {
	    display: 'flex',
	    alignItems: 'center',
	    justifyContent: 'flex-end',
	    padding: '0 8px',
	    ...theme.mixins.toolbar,
	},
	content: {
	    flexGrow: 1,
	    backgroundColor: theme.palette.background.default,
	    padding: theme.spacing.unit * 3,
	},
	media:{
		height: 0,
    	paddingTop: '56.25%', 
	}
})

class Container extends React.Component{
	constructor(props){
		super(props);
		this.state = {
			open: false,
			anchorEl:null
		}
	}

	handleDrawerOpen = () => {
	    this.setState({ open: true });
	}

	handleDrawerClose = () => {
	    this.setState({ open: false });
	}

	hadnleOpenLogin = () =>{
		store.dispatch({
			type:'OPENLOGIN',
			open:true
		})
	}

	handleMenu = (event) =>{
		this.setState({ anchorEl: event.currentTarget });
	}

	handleClose = (val) =>{
		this.setState({ anchorEl: null });
		switch(val){
			case 'Quit':
			break;
			case 'Quit':
			break;
			default:
			break;
		}
	}

	/**
	 * [notLoggedIn 未登录按钮]
	 * @type {[type]}
	 */
	notLoggedIn = () =>{
		return(
			<Button color="inherit" onClick={this.hadnleOpenLogin}>Login</Button>
		)
	}

	/**
	 * [已登录按钮]
	 * @return {[type]} [description]
	 */
	hasLogged = () =>{
		return(
			<div>
				<IconButton aria-owns="menu-appbar" aria-haspopup="true" onClick={this.handleMenu} color="inherit"><AccountCircle /></IconButton>
	          	<Menu id="menu-appbar" anchorEl={this.state.anchorEl} open={Boolean(this.state.anchorEl)} onClose={this.handleClose}>
					<MenuItem onClick={this.handleClose}>Personal Data</MenuItem>
					<MenuItem onClick={this.handleClose('Quit')}>Quit</MenuItem>
	          	</Menu>
          	</div>
		)
	}

	componentWillMount(){
		console.log(this.props);
	}

	render(){
		const {classes, theme} = this.props;
		return(
			<div className={classes.root}>
		      <AppBar position="absolute" className={classNames(classes.appBar, this.state.open && classes.appBarShift)}>
		        <Toolbar disableGutters={!this.state.open}>
		          <IconButton className={classNames(classes.menuButton, this.state.open && classes.hide)} color="inherit" aria-label="open drawer" onClick={this.handleDrawerOpen}>
		            <MenuIcon />
		          </IconButton>
		          <Typography variant="title" color="inherit" className={classes.flex} noWrap>
		            Title
		          </Typography>
		          {this.props.loginstate?this.hasLogged():this.notLoggedIn()}
		        </Toolbar>
		      </AppBar>
		      	<Drawer variant="permanent" classes={{paper: classNames(classes.drawerPaper, !this.state.open && classes.drawerPaperClose)}} open={this.state.open}>
					<div className={classes.toolbar}>
						<IconButton onClick={this.handleDrawerClose}>
							{theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
						</IconButton>
					</div>
					<Divider />
          			<List>{mailFolderListItems}</List>
          			<Divider />
          			<List>{otherMailFolderListItems}</List>
		      	</Drawer>
		      	<main className={classes.content}>
		      		<div className={classes.toolbar} />
		      		<Typography noWrap>
						<Apps/>
		      		</Typography>
		      	</main>
		      	<Login/>
		      	<Alert/>
		    </div>
		)
	}
}

const mapStateToProps = (store) =>{
	return{
		open:store.implLogin.open,
		loginstate:store.implLogin.loginstate
	}
}

Container.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired
}

export default connect(mapStateToProps)(withStyles(styles, { withTheme: true })(Container));