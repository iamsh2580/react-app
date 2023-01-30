// eslint-disable-next-line
import logo from './logo.svg';
import './App.css';
import {useState} from 'react';
//import Update from 'tar/lib/update';

function Header(props){
  //console.log('props',props,props.title)
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
function Create(props){
  return <article>
    <h2>Create</h2>
    {/* 입력창 폼 */}
    <form onSubmit={event=>{
      event.preventDefault();
      // value값 가지고 오기
      const title=event.target.title.value; //발생한 태그를 가르킨다 submit클릭했을때 생긴 이벤트는 form태그에서 발생 -> event target은 form 태그
      const body= event.target.body.value;
      // 가지고 온 title,body는 사용자에게 공급하면 됨
      props.onCreate(title,body);
    }}>
      <p><input type="text" name="title" placeholder='title'/></p>
      <p><textarea name="body" placeholder="body"></textarea></p>
      {/* create 버튼 */}
      <p><input type="submit" value="Create"></input></p>
    </form>

  </article>
}
function Update(props){
  // eslint-disable-next-line
  const [title,setTitle] = useState(props.title);
  // eslint-disable-next-line
  const [body,setBody] = useState(props.body);
  return <article>
    <h2>Update</h2>
    {/* 입력창 폼 */}
    <form onSubmit={event=>{
      event.preventDefault();
      // value값 가지고 오기
      const title=event.target.title.value; //발생한 태그를 가르킨다 submit클릭했을때 생긴 이벤트는 form태그에서 발생 -> event target은 form 태그
      const body= event.target.body.value;
      // 가지고 온 title,body는 사용자에게 공급하면 됨
      props.onUpdate(title,body);
    }}>
      <p><input type="text" name="title" placeholder='title' value={title} onChange={event=>{
        setTitle(event.target.value);
      }}/></p>
      <p><textarea name="body" placeholder="body" value={body} onChange={event=>{
        setBody(event.target.value);
      }}></textarea></p>
      <p><input type="submit" value="Update"></input></p>
    </form>
  </article>
  
}
function App() {
//  const _mode=useState('WELCOME');
//  const mode=_mode[0]; //이 모드의 값을 통해 상태값을 읽을 수 있다.
//  const setMode=_mode[1]; //모드의 값을 바꿀 수 있다.
  //useState의 인자는 state의 초기값 값은0번째 바꿀때는 1번째 인덱스의 함수로
  const[mode,setMode]=useState('WELCOME'); //과 같다. 중요!
  const [id,setId]=useState(null);
  // eslint-disable-next-line
  const [nextId,setNextId] = useState(4);
  const [topics,setTopics]=useState([
    {id:1,title:'html',body:'html is...'},
    {id:2,title:'css',body:'css is...'},
    {id:3,title:'JS',body:'JS is...'}
  ])
  let content=null;
  // eslint-disable-next-line
  let contextControl = null;
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
    contextControl=<>
    <li><a href={'/update/'+id} onClick={event=>{
      event.preventDefault();
      setMode('UPDATE');
    }}>Update</a></li>
    <li><input type="button" value="Delete" onClick={()=>{
      const newTopics =[]
      for(let i=0;i<topics.length;i++){
        if(topics[i].id !== id){
          newTopics.push(topics[i]);
        }
      }
      setTopics(newTopics);
      setMode('WELCOME');
    }}></input></li>
    </>
  }
      else if(mode === 'CREATE'){
        content = <Create onCreate={(_title,_body)=>{
          //이제 topics변수에 새로운 원소를 추가하고 목록 추가
          const newTopic={id:nextId,title:_title,body:_body}
          const newTopics= [...topics]; //복제본이 만들어 짐 이후복제본을 이용해 바꿔줄것
          newTopics.push(newTopic);
          setTopics(newTopics);
          setMode('Read');
          setId(nextId);
          setNextId(nextId+1);
        }
        }></Create>
      } else if(mode === 'UPDATE'){

        let title,body =null;
    
        for(let i=0;i<topics.length;i++){
          if(topics[i].id === id){
            // eslint-disable-next-line
            title=topics[i].title; 
            // eslint-disable-next-line
            body=topics[i].body; 
          }
        }
        content =<Update title={title} body={body} onUpdate={(title,body)=>{
          console.log(title,body);
          const newTopics=[...topics]
          const updatedTopic={id:id,title:title,body:body}
          for(let i=0; i<newTopics.length;i++){
            if(newTopics[i].id === id){
              newTopics[i] = updatedTopic;
              break;
            }
          }
          setTopics(newTopics);
          setMode('READ');
        }}></Update>
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

      <ul>
      <li><a href="/create" onClick={event=>{
        event.preventDefault();
        setMode('CREATE');
      }}>Create</a></li>
      {contextControl}
      
      </ul>
    </div> 
  );
}

export default App;
