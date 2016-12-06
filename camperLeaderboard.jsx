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
    );//return a user table row
  }//render
}//UserRow Component

class TableContents extends React.Component {
  render(){
    let dataArr = this.props.data;
    let users = '';
    if(dataArr.length>0){
      users = dataArr.map((userObj, count) =>
        (<UserRow
          userNum={count+1}
          image={userObj.img}
          userName={userObj.username}
          pointsRecent={userObj.recent}
          pointsAll={userObj.alltime}
        />)//render the UserRow Component and set the properties to the data properties
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
    };//set state with empty data and the sort key on recent
  }//constructor function as default
  fetchData() {
    $.get(this.props.source1, function(res){
      this.setState({
        data:res
      });//set the state to the response object of the source
    }.bind(this));
  }//fetchData function to load the data from the link
  componentWillMount() {
    this.fetchData();//call the fetchData function
  }//mount component before rendering
  handleClick(sortBy, event) {
    this.setState({
      sort: sortBy
    });//add a state with sorted output after click
  }//click handler for sorting
  render(){
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
            <th>User</th>
            <th><button onClick={this.handleClick.bind(this, 'recent')}>
              Points-Last 30 days</button>
            </th>
            <th><button onClick={this.handleClick.bind(this, 'all')}>
              Points-All time</button>
            </th>
          </tr>
          <TableContents data={this.state.data} sortBy={this.state.sort}/>
        </table>
      </div>
    );//return
  }//render
}//table Component

ReactDOM.render(
  <Table source1='https://fcctop100.herokuapp.com/api/fccusers/top/recent'  source2='https://fcctop100.herokuapp.com/api/fccusers/top/alltime' />,
  document.getElementsByClassName('reactContainer')[0]
);
