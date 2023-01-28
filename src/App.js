// eslint-disable-next-line
import logo from './logo.svg';
import './App.css';
import {useState} from 'react';

function Header(props){
  console.log('props',props,props.title)
  return <header>
       <h1><a href="/" onClick={(event)=>{
        event.preventDefault();
        props.onChangeMode();
       }}>{props.title}</a></h1>
      </header>
}
function Nav(props){
  const lis=[]
  for(let i=0;i<props.topics.length;i++){
    let t=props.topics[i];
    lis.push(<li key={t.id}>
      <a id={t.id} href={'/read'+t.id} onClick={event=>{
        event.preventDefault();
        props.onChangeMode(Number(event.target.id));
      }}>{t.title}</a>
      </li>)
  }
  return <nav>
        <ol>
          {lis}
        </ol>
      </nav>
}
function Article(props){
    return <article>
        <h2>{props.title}</h2>
        {props.body}
      </article>

}
function App() {
//  const _mode=useState('WELCOME');
//  const mode=_mode[0]; //이 모드의 값을 통해 상태값을 읽을 수 있다.
//  const setMode=_mode[1]; //모드의 값을 바꿀 수 있다.
  //useState의 인자는 state의 초기값 값은0번째 바꿀때는 1번째 인덱스의 함수로
  const[mode,setMode]=useState('WELCOME'); //과 같다. 중요!
  const [id,setId]=useState(null);
  const topics=[
    {id:1,title:'html',body:'html is...'},
    {id:2,title:'css',body:'css is...'},
    {id:3,title:'JS',body:'JS is...'}
  ]
  let content=null;
  if(mode ==='WELCOME'){
    content=<Article title="Welcome" body="Hello,WEB"></Article>
  }else if(mode ==='READ'){
    let title,body =null;

    for(let i=0;i<topics.length;i++){
      if(topics[i].id === id){
        // eslint-disable-next-line
          title=topics[i].title; 
          // eslint-disable-next-line
          body=topics[i].body; 
      }
    }
    // eslint-disable-next-line
    content=<Article title={title} body={body}></Article> 
  }
  return (
    <div className="App">
      <Header title="WEB" onChangeMode={()=>{
        setMode('WELCOME');
      }}></Header>
      <Nav topics={topics} onChangeMode={(_id)=>{
        setMode('READ');
        setId(_id);
      }}></Nav>
      {content}
    </div> 
  );
}

export default App;
