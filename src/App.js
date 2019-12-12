import React,{ Component } from 'react';
import './App.css';

class App extends Component {
 
   constructor(props){
     super(props);
     this.state={
       item:[],
       isloaded:false,
      searchquery: '',
        
     };
   }

   componentDidMount(){

    fetch("https://api.nytimes.com/svc/topstories/v2/home.json?api-key=XmeVIb9IQEemFqMd0haT71XHfmFHPgo6")
        .then(res=>res.json())
        .then(json=>{
          this.setState({
            isloaded:true,
            item:json
          })
        })
   }
   handleinput=(e)=>{
            this.setState({searchquery:e.target.value})
   }
   sorthandle1=()=>{
     const it=this.state.item.results
     it.sort((a,b)=>{
           return new Date(b.created_date) - new Date(a.created_date)
     })
     const i =this.state.item
     i.results=it
     this.setState({
          item:i
     })
   }
   sorthandle2=()=>{
    const it=this.state.item.results
    it.sort((a,b)=>{
          return new Date(b.updated_date) - new Date(a.updated_date)
    })
    const i =this.state.item
    i.results=it
    this.setState({
         item:i
    })
  }
  sorthandle3=()=>{
    const it=this.state.item.results
    it.sort((a,b)=>{
          return new Date(b.published_date) - new Date(a.published_date)
    })
    const i =this.state.item
    i.results=it
    this.setState({
         item:i
    })
  }
 
  render(){
    var {isloaded,item} =this.state
    if(!isloaded){
      return <div>loading...</div>
    }
    else{
      let filter=item.results.filter((topstory)=>{
        return topstory.section.toLowerCase().includes(this.state.searchquery.toLowerCase())
      })

  
    return(
      <div>
       <h4>Filter</h4>
       <input onChange={this.handleinput} type="text" /> 
      <button onClick={this.sorthandle1}>sortc</button>
      <button onClick={this.sorthandle2}>sortu</button>
      <button onClick={this.sorthandle3}>sortp</button>


          {filter.map(result=>{
             return (<div className="s1">
                         <h2>{result.title}</h2>
                         {  result.multimedia.length ?
                            <img src={result.multimedia[0].url}></img>:null
                         }
                          <h3>{result.abstract}</h3>
                          {result.des_facet.map(des=>{
                            return(
                              <ul>
                                <li> {des} </li>
                                </ul>
                            )
                          })}                        
                          </div> )
          })}
          
          
         
           </div>
    )
    }
  }
}

export default App;
