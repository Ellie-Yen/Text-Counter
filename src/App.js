import React from 'react';
import {default as dState} from './AppDefaultSetting.json';
import CountText from './CountText';
import LengthComponent from './templates/LengthComponent';
import TextContainer from './templates/TextContainer';
import {DetailBtn, CheckBoxBtn, EditBtn} from './templates/ButtonComponent';
import './App.css';


function App() {
  // text settings
  const [content, setContent] = React.useState(dState.content);
  const [cur_length, setCurLength] = React.useState(dState.cur_length);
  const [each_counts, setEachCounts] = React.useState(dState.each_counts);
  
  // editor settings
  const [restrict, setRestrict] = React.useState(dState.restrict);
  const [symbolList, setSymbolList] = React.useState(dState.symbolList);
  const [include_symbol, setIncludeSymbol] = React.useState(dState.include_symbol);
  const [include_enter, setIncludeEnter] = React.useState(dState.include_enter);
  const [include_space, setIncludeSpace] = React.useState(dState.include_space);
  
  // color theme settings 
  const [theme, setTheme] = React.useState(dState.lighttheme);

  const RecountText = (newcontent) => {
    const [newCounts, newLength, newSafe, newOverflow] = 
      CountText(newcontent, restrict, symbolList, 
        include_symbol, include_enter, include_space);
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
  const handleRestrict = (val)=>{
    if (/[0123456789]+/.test(val)){
      const res = Math.min(Math.max(parseInt(val), 1), 1000);
      setRestrict(res);
    }
  }
  const handleSymbolList = (s) => {
    if (s === ""){
      const valid = window.confirm("are you sure no symbol ?");
      if (! valid){
        return;
      }
    }
    setSymbolList(s.substring(0, 50));
  }
  const Refresh = () => {
    RecountText(content.all);
  }
  const ClearContent = () => {
    RecountText("");
  }
  const SwitchColorTheme = () => {
    if (theme === dState.lighttheme){
      setTheme(dState.darktheme);
    }
    else {
      setTheme(dState.lighttheme);
    }
  }
  return (
    <div className="App" style={theme}>
      <header id="App_header"
        className="container"
      >
        <h1>{dState.project_title}</h1>
        <p>{dState.project_description}</p>
      </header>
      <div id="length_container"
        className="container"
      >
        {LengthComponent("current", cur_length)}
        {LengthComponent("remain", restrict - cur_length)}
        {LengthComponent(
          EditBtn("restrict", restrict, dState.restrict, handleRestrict), 
          restrict
        )}
      </div>
      {TextContainer(content, handleTextInput, theme.color)}
      <div id="count_container"
        className="container"
      >
        {Object.keys(each_counts).map(x =>
          <span
            className="count"
            key={x}
          >
            {`${x} : ${each_counts[x]}`}
          </span>
        )}
        {EditBtn("symbol list", symbolList, dState.symbolList, handleSymbolList)}
      </div>
      <div id="setting_container"
        className="container"
      >
        {CheckBoxBtn("space", include_space, setIncludeSpace)}
        {CheckBoxBtn("enter", include_enter, setIncludeEnter)}
        {CheckBoxBtn("symbol", include_symbol, setIncludeSymbol)}
        {DetailBtn(
          theme === dState.darktheme ? "dark": "light", 
          SwitchColorTheme
        )}
        {DetailBtn("refresh", Refresh, "btn_primary")}
        {DetailBtn("clear", ClearContent, "btn_danger")}
      </div> 
    </div>
  );
}

export default App;
