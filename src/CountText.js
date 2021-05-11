import {default as dState} from './AppDefaultSetting.json';

function CountText(content, max_length, symbolList,
include_symbol, include_enter, include_space){

    const each_counts = Object.assign({}, dState.each_counts);
    let cur_length = 0;
    const cnt_symbol = include_symbol ? 1: 0;
    const cnt_space = include_space ? 1: 0;
    const cnt_enter = include_enter ? 1: 0;

    // record from where is overflow
    // and add <br> for newline or "_" for spaceholder if necessary
    const safe_content = [""];
    const overflow_content = [""];

    function Helper(i, store){
        let addChar = content[i];
        if (symbolList.includes(content[i])){
            each_counts.symbol ++;
            cur_length += cnt_symbol;
        }
        else {
            switch (content.charCodeAt(i)){
                case 10: // enter
                    each_counts.enter ++;
                    cur_length += cnt_enter;
                    store.push(<br/>);
                    store.push("");
                    addChar = "";
                    break;
                case 32:
                    each_counts.space ++;
                    cur_length += cnt_space;
                    addChar = "_";
                    break;
                default:
                    each_counts.char ++; 
                    cur_length ++;
            }
        }
        store[store.length - 1] += addChar;
    }

    let i = 0;
    while (i < content.length && cur_length < max_length){
        Helper(i, safe_content);
        i ++;
    }
    while (i < content.length){
        Helper(i, overflow_content);
        i ++;
    }

    return [each_counts, cur_length, safe_content, overflow_content];
}


export default CountText;