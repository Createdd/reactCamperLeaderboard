/*jshint esversion: 6 */
/*jshint esnext: true */

class UserRow extends React.Component {
  render(){
    const preUrl = 'https://www.freecodecamp.com/';
    return (
      <tr>
        <td>{this.props.userNum}</td>
        <td>
          <a href={preUrl + this.props.userName} target='_blank'>
            <img src={this.props.image} className='image'/>
              {this.props.userName}
          </a>
        </td>
        <td>{this.props.pointsRecent}</td>
        <td>{this.props.pointsAll}</td>
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
        });//sort by biggest
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
    var recentClass = 'button';
    var allClass = 'button';
    if(this.state.sort == 'recent'){
      recentClass = 'button sorted';
    } else {
      allClass = 'button sorted';
    }
    return (
      <div>
        <header>
        <div className="container">
          <p>*** By <a href="https://github.com/DDCreationStudios" target='_blank'>Daniel Deutsch</a> ***</p>
        </div>
        </header>
        <table>
          <caption className='title'>Build a Camper Leaderboard</caption>
          <tr>
            <th>Nr.</th>
            <th>Name</th>
            <th><button
              onClick={this.handleClick.bind(this, 'recent')}
              className={recentClass}>Points - Last 30 days</button>
            </th>
            <th><button
              onClick={this.handleClick.bind(this, 'all')}
              className={allClass}>Points - All time</button>
            </th>
          </tr>
          <TableContents data={this.state.data} sortBy={this.state.sort}/>
        </table>
      </div>
    );//return
  }//render
}//table Component

var source1=<Table source='https://fcctop100.herokuapp.com/api/fccusers/top/recent' />;
var source2=<Table source='https://fcctop100.herokuapp.com/api/fccusers/top/alltime' />;


ReactDOM.render(
  source1,
  document.getElementsByClassName('reactContainer')[0]
);
