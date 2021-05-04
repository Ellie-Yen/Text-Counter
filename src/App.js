import logo from './logo.svg';
import React from 'react';
import {default as dState} from './AppDefaultSetting.json';
import './App.css';
import CountText from './CountText';
import EditorContainer from './EditorContainer';
import {DetailButton, CheckBoxButton} from './SettingButton';


function App() {
  
  const [content, setContent] = React.useState(dState.content);
  const [cur_length, setCurLength] = React.useState(dState.cur_length);
  const [each_counts, setEachCounts] = React.useState(dState.each_counts);
  
  // editor settings
  const [max_length, setMaxLength] = React.useState(dState.max_length);
  const [puncList, setPuncList] = React.useState(dState.punctuationList);
  const [includePunctuation, setIncludePunc] = React.useState(dState.includePunctuation);
  const [includeSpace, setIncludeSp] = React.useState(dState.includeSpace);
  const [includeEnter, setIncludeEn] = React.useState(dState.includeEnter);
  
  
  const RecountText = (newcontent) => {
    const [newCounts, newLength, newSafe, newOverflow] = 
      CountText(newcontent, max_length, puncList,
                 includePunctuation, includeSpace, includeEnter);
    setEachCounts(newCounts);
    setCurLength(newLength);
    setContent({
      "all": newcontent, 
      "safe": newSafe, 
      "overflow": newOverflow
    });
  };
  const handleTextInput = (event)=>{
    RecountText(event.target.value);
  };
  const handleMaxLength = (val)=>{
    if (/[0123456789]+/.test(val)){
      const res = Math.min(Math.max(parseInt(val), 1), 1000);
      setMaxLength(res);
    }
  }
  const handlePuncList = (s) => {
    if (s === ""){
      return;
    }
    setPuncList(s.substring(50));
  }
  const Reset = () => {
    setMaxLength(dState.max_length);
    setPuncList(dState.punctuationList);
    setIncludeSp(dState.includeSpace);
    setIncludePunc(dState.includePunctuation);
    setIncludeEn(dState.includeEnter);
  }
  const Refresh = () => {
    RecountText(content.all);
  }
  const ClearContent = () => {
    RecountText("");
  }

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          build by React
        </a>
      </header>
      <div className="setting">
        <span onClick={Reset}>
          Reset
        </span>
        <span onClick={Refresh}>
          Refresh
        </span>
        {CheckBoxButton("space", includeSpace, setIncludeSp)}
        {CheckBoxButton("enter", includeEnter, setIncludeEn)}
        {CheckBoxButton("punctuation", includePunctuation, setIncludePunc)}
        {DetailButton("max_length", max_length, handleMaxLength)}
        {DetailButton("punctuation list", puncList, handlePuncList)}
      </div>
      {EditorContainer(content, handleTextInput)}
      <div className="each_counts">
        <span>{`current: ${cur_length}`}</span>
        {Object.keys(each_counts).map(x =>
          <span key={x}>{x} : {each_counts[x]}</span>
        )}
      </div>
      <span onClick={ClearContent}>
          ClearAll
      </span>
    </div>
  );
}

export default App;
