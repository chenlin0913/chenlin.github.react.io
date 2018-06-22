import { connect } from 'react-redux';
import {Table,TableBody,TableCell,TableHead,TableRow,Paper,Checkbox,Button,IconButton,Tooltip,Typography,Toolbar} from '@material-ui/core';
import {DeleteIcon,FilterListIcon,Search} from '@material-ui/icons';
import { withStyles } from '@material-ui/core/styles';
import { lighten } from '@material-ui/core/styles/colorManipulator';
import classNames from 'classnames';
import store from '@/redux/store';

const toolbarstyles = theme =>({
	root:{
		paddingRight: theme.spacing.unit,
	},
	highlight: theme.palette.type === 'light'
      ? {
          color: theme.palette.secondary.main,
          backgroundColor: lighten(theme.palette.secondary.light, 0.85),
        }
      : {
          color: theme.palette.text.primary,
          backgroundColor: theme.palette.secondary.dark,
        },
	spacer: {
	    flex: '1 1 100%',
	},
  	actions: {
  	  	color: theme.palette.text.secondary,
  	},
  	title: {
    	flex: '0 0 auto',
  	},
})

let EnhancedTableToolbar = props =>{
	const {numSelected,classes} = props;
	return(
		<Toolbar className={classNames(classes.root, {[classes.highlight]: numSelected > 0})}>
	      <div className={classes.title}>
	        {numSelected > 0 ? (<Typography color="inherit" variant="subheading">{numSelected} selected</Typography>):(
	          <Typography variant="title" id="tableTitle">
	            Nutrition
	          </Typography>
	        )}
	      </div>
	    </Toolbar>
	)
}

EnhancedTableToolbar.propTypes={
	classes: PropTypes.object.isRequired,
  	numSelected: PropTypes.number.isRequired
}

EnhancedTableToolbar = withStyles(toolbarstyles)(EnhancedTableToolbar);

const styles = theme =>({
	root:{
		width:'100%',
		marginTop: theme.spacing.unit * 3,
		overflowX: 'auto',
	},
	table:{
		minWidth:700,
	},
	row: {
	    '&:nth-of-type(odd)': {
	      // backgroundColor: theme.palette.background.default,
	    },
  	},
  	bottons:{
  		margin: theme.spacing.unit
  	},
  	leftIcon:{
  		marginRight: theme.spacing.unit
  	},
  	iconSearch:{
  		fontSize:20
  	}
})

class Plan extends React.Component{

	constructor(props){
		super(props)
		this.state={
			selected: [],
		}
	}

	componentWillMount(){
		console.log(this.props);
		console.log("进入Plan");
	}

	handleClick = (event,id) =>{
		const {selected} = this.state;
		const selectedIndex = selected.indexOf(id);
		let newSelected = [];
		if(selectedIndex === -1){
			console.log(selectedIndex);
			newSelected = newSelected.concat(selected, id);
		}else if(selectedIndex === 0){
			console.log(selectedIndex);
			newSelected = newSelected.concat(selected.slice(1));
		}else if(selectedIndex === selected.length - 1){
			console.log("相减等于："+selectedIndex);
			console.log(selectedIndex);
			newSelected = newSelected.concat(selected.slice(0, -1));
		}else if(selectedIndex > 0){
			console.log("大于0");
			console.log(selectedIndex);
			newSelected = newSelected.concat(
				selected.slice(0, selectedIndex),
				selected.slice(selectedIndex + 1)
			);
		}
		this.setState({ selected: newSelected });
		console.log(this.state.selected);
	}

	handleSelectAllClick = (event, checked) =>{
		if(checked){
			this.setState({ selected: this.state.data.map(n => n.id) });
			return;
		}
		this.setState({ selected: [] });
	}

	handleSearch = (event,id) =>{
		console.log("查询");
		event.stopPropagation();
		store.dispatch({
			type:'DELECT',
			id:id
		});
	}

	isSelected = id => this.state.selected.indexOf(id) !== -1;

	

	render(){
		const { classes } = this.props;
		const { data, order, orderBy, selected, rowsPerPage, page } = this.state;
		return(
			<div id="plan">
				<EnhancedTableToolbar numSelected={selected.length} />
				<Paper className={classes.root}>
      				<Table className={classes.table}>
				        <TableHead>
				          <TableRow>
				          	<TableCell></TableCell>
				            <TableCell>TITLE</TableCell>
				            <TableCell numeric>CONTENT</TableCell>
				            <TableCell numeric>RARTNER</TableCell>
				            <TableCell numeric>OPERATING</TableCell>
				          </TableRow>
				        </TableHead>
				        <TableBody>
				          {this.props.implPlanlist.planlist.map(n => {
				          	const isSelected = this.isSelected(n.id);
				            return (
				              <TableRow hover className={classes.row} key={n.id} selected={isSelected} role="checkbox" aria-checked={isSelected} tabIndex={n.id} onClick={event => this.handleClick(event, n.id)}>
				              	<TableCell padding="checkbox">
			                      <Checkbox checked={isSelected} />
			                    </TableCell>
				                <TableCell component="th" scope="row" padding="none">
				                  {n.title}
				                </TableCell>
				                <TableCell numeric>{n.content}</TableCell>
				                <TableCell numeric>{n.partner}</TableCell>
				                <TableCell numeric>
									<Button className={classes.button} variant="raised" size="small" onClick={event=>this.handleSearch(event,n.id)}>
								        <Search className={classNames(classes.leftIcon, classes.iconSearch)} />
								        Search
								    </Button>
				                </TableCell>
				              </TableRow>
				            );
				          })}
				        </TableBody>
      				</Table>
    			</Paper>
			</div>
		)
	}
}

const mapStateToProps = (store) =>{
	return{
		implPlanlist:store.implPlanlist
	}
}
Plan.propTypes = {
  classes: PropTypes.object.isRequired
}

export default connect(mapStateToProps)(withStyles(styles)(Plan));