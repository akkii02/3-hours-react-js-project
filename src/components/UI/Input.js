import classes from './Input.module.css'

const Input = (props) => {
      return (
        <div className={classes.main}>
          <label className={classes.label} htmlFor={props.id}>{props.label}</label>
          <input className={classes.input} type={props.type} id={props.id} value={props.value} onChange={props.onChange} />
        </div>
      );
    };
    
    export default Input;
    