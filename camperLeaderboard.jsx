/*jshint esversion: 6 */
/*jshint esnext: true */

class Table extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      data:[],
      sort: 'recent'
    };//set state
  }//constructor function
  loadData() {
    $.get(this.props.source, function(res){
      this.setStatte({
        data:res
      });//set the state to the result of the source
    }.bind(this));
  }//load data function
  componentWillMount() {
    this.loadData();//call the loadData function
  }
  handleClick(sortBy, event) {
    this.setState({
      sort: sortyBy
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
            className={allClass}>Points - All time</button>
          </th>
        </tr>
        <TableContents data={this.state.data} sortBy={this.state.sort}/>
      </table>
    );//return
  }//render
}//table Component

ReactDOM.render(
  <Table source='https://fcctop100.herokuapp.com/api/fccusers/top/recent.' />,
  document.getElementsByClassName('reactContainer')[0]
);
