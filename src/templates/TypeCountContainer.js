import {CheckboxBtn} from './ButtonComponent';

function TypeCountContainer(props){
  // props: each_counts, include_list
  // each_counts: object of {string: int}
  // include_list: array of {title: string, state: React.useState array}

  return (
    <div id="count_container"
      className="container"
    >
      <span className="count">
        {`char : ${props.each_counts.char}`}
      </span>
      {props.include_list.map((item, i)=>
        <span className="count"
          key={`include-${i}`}
        >
          <CheckboxBtn
            is_checked={item.state[0]}
            func={item.state[1]}
            content={`${item.title}: ${props.each_counts[item.title]}`}
          />
        </span>
      )}
  </div>
  );
}

export default TypeCountContainer;