/*jshint esversion: 6 */
/*jshint esnext: true */

class UserRow extends React.Component {
  render(){
    var baseURL = 'https://www.freecodecamp.com/';
    return (
      <tr className='camper'>
        <td>{this.props.userNum}</td>
        <td className='camper-name'>
          <a href={baseURL + this.props.userName} target='_blank' className='camper-name-link'>
            <img src={this.props.image} className='camper-name-image'/>
              {this.props.userName}
          </a>
        </td>
        <td className='camper-points'>{this.props.pointsRecent}</td>
        <td className='camper-points'>{this.props.pointsAll}</td>
      </tr>
    );//return
  }//render
}//UserRow Component

class TableContents extends React.Component {
  render(){
    var dataArr = this.props.data;
    var users = '';
    if(dataArr.length>0){
      users = dataArr.map((userObj, userID) =>
        (<UserRow userNum={userID+1} image={userObj.img} userName={userObj.username} pointsRecent={userObj.recent} pointsAll={userObj.alltime}/>)//map function
      );//map the array
      if(this.props.sortBy == 'all') {
        users.sort(function(a,b) {
          return b.props.pointsAll - a.props.pointsAll;
        });
      }//if sortBy all
    }//if array is >0
    return(
      <tbody>{users}</tbody>
    );//return users
  }//render
}//TableContents Component

class Table extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      data:[],
      sort: 'recent'
    };//set state
  }//constructor function
  loadData() {
    $.get(this.props.source, function(result){
      this.setState({
        data:result
      });//set the state to the result of the source
    }.bind(this));
  }//load data function
  componentWillMount() {
    this.loadData();//call the loadData function
  }
  handleClick(sortBy, event) {
    this.setState({
      sort: sortBy
    });//add a state with sorted output after click
  }//click handler
  render(){
    var recentClass = 'sort-button';
    var allClass = 'sort-button';
    if(this.state.sort == 'recent'){
      recentClass = 'sort-button sorted';
    } else {
      allClass = 'sort-button sorted';
    }
    return (
      <table className='leaderboard'>
        <caption className='title'>Leading FreeCodeCampers</caption>
        <tr>
          <th className='table-head'>Nr.</th>
          <th className='table-head'>Name</th>
          <th><button
            onClick={this.handleClick.bind(this, 'recent')}
            className={recentClass}>Points - Last 30 day</button>
          </th>
          <th><button
            onClick={this.handleClick.bind(this, 'all')}
            className={allClass}>Points All time</button>
          </th>
        </tr>
        <TableContents data={this.state.data} sortBy={this.state.sort}/>
      </table>
    );//return
  }//render
}//table Component

ReactDOM.render(
  <Table source='https://fcctop100.herokuapp.com/api/fccusers/top/recent' />,
  document.getElementsByClassName('reactContainer')[0]
);
