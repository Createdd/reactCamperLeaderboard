/*jshint esversion: 6 */
/*jshint esnext: true */

class Table extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      data:[],
      sort: 'recent'
    };//set state
  }//constructor
}

ReactDOM.render(
  <Table source='https://fcctop100.herokuapp.com/api/fccusers/top/recent.' />,
  document.getElementsByClassName('reactContainer')[0]
);
