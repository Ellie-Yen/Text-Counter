import React from 'react';
import CountText from './CountText';
import LengthContainer from './templates/LengthContainer';
import TypeCountContainer from './templates/TypeCountContainer';
import TextContainer from './templates/TextContainer';
import SettingContainer from './templates/SettingContainer';

import {default as dState} from './AppDefaultSetting.json';
import './App.css';


function App() {
  // text settings
  const [content, setContent] = React.useState(dState.content);
  const [cur_length, setCurLength] = React.useState(dState.cur_length);
  const [each_counts, setEachCounts] = React.useState(dState.each_counts);
  
  // editor settings
  const [limit, setLimit] = React.useState(dState.limit);
  const [symbol_list, setsymbol_list] = React.useState(dState.symbol_list);
  const [include_symbol, setIncludeSymbol] = React.useState(dState.include_symbol);
  const [include_enter, setIncludeEnter] = React.useState(dState.include_enter);
  const [include_space, setIncludeSpace] = React.useState(dState.include_space);
  
  // color theme settings 
  const [theme_is_light, setTheme] = React.useState(true);

  const RecountText = (cur_content, cur_limit, cur_symbol_list, cur_include_list) => {
    // because state update is async, the include setting is input manually
    const [newCounts, newLength, newSafe, newOverflow] = 
      CountText(cur_content, cur_limit, cur_symbol_list, ...cur_include_list);
    setEachCounts(newCounts);
    setCurLength(newLength);
    setContent({
      "all": cur_content, 
      "safe": newSafe, 
      "overflow": newOverflow
    });
  };
  const handleTextInput = (event)=>{
    RecountText(event.target.value, limit, symbol_list, [include_symbol, include_enter, include_space]);
  };
  const handleSwitch = (val, setVal) => {
    // return a function that switch the state to true/false
    // and update count if necessary
    return()=>{
      const new_val = !val;
      setVal(new_val);
      let includes = [include_symbol, include_enter, include_space];
      [setIncludeSymbol, setIncludeEnter, setIncludeSpace].forEach((func, i) => {
        if (func === setVal){
          includes[i] = new_val;
          RecountText(content.all, limit, symbol_list, includes);
        }
      });
    }
  }
  const handleLimit = (val)=>{
    if (/[0123456789]+/.test(val)){
      const new_limit = Math.min(Math.max(parseInt(val), 1), 1000);
      if (new_limit !== limit){
        setLimit(new_limit);
        RecountText(content.all, new_limit, symbol_list, [include_symbol, include_enter, include_space]);
      }
    }
  }
  const handleSymbolList = (input_content) => {
    if (input_content === ""){
      const valid = window.confirm("are you sure no symbol ?");
      if (! valid){
        return;
      }
    }
    const new_symbol_list = input_content.substring(0, 50);
    if (new_symbol_list !== symbol_list){
      setsymbol_list(new_symbol_list);
      RecountText(content.all, limit, new_symbol_list, [include_symbol, include_enter, include_space]);
    }
  }
  const ClearContent = () => {
    RecountText("", limit, symbol_list, [include_symbol, include_enter, include_space]);
  }
  const CopyContent = (event) =>{
    event.preventDefault()
    event.stopPropagation();
    event.nativeEvent.stopImmediatePropagation();
    const promise = navigator.clipboard.writeText(content.all);
    promise.then(()=>{
      window.alert("copy successfully");
    }, ()=>{
      window.alert("copy failed :( your browser seems not support this function");
    });
  }
  return (
    <div className="App" style={dState[theme_is_light ? "lighttheme": "darktheme"]}>
      <header id="App_header"
        className="container"
      >
        <h1>{dState.project_title}</h1>
        <SettingContainer
          operation={[
            {title: "copy", func: CopyContent},
            {title: "clear", func: ClearContent, btn_style: "danger"}
          ]}
          more_setting={[
            {state: [limit, handleLimit], title: "limit length:", input_type: "number", reset_val: dState.limit},
            {state: [symbol_list, handleSymbolList], title: "symbol list:", reset_val: dState.symbol_list}
          ]}
          theme={{
            state: [theme_is_light, handleSwitch(theme_is_light, setTheme)], 
            title: theme_is_light ? "light mode": "dark mode"
          }}
        />
        <LengthContainer
          cur_length={cur_length}
          limit={limit}
        />
        <TypeCountContainer
          each_counts={each_counts}
          include_list={[
            {state: [include_space, handleSwitch(include_space, setIncludeSpace)], title: "space"},
            {state: [include_enter, handleSwitch(include_enter, setIncludeEnter)], title: "enter"},
            {state: [include_symbol, handleSwitch(include_symbol, setIncludeSymbol)], title: "symbol"}
          ]}
        />
      </header>
      <TextContainer
        content={content}
        input_func={handleTextInput}
      />
      <footer>
        {dState.author_info}
      </footer>
    </div>
  );
}

export default App;
