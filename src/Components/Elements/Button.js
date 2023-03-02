const Button = ({ text, disabled, handler, icon }) => (
    <button
      type="button"
      onClick={handler}
      disabled={disabled}
      className="btn btn-outline-primary rounded-pill mx-3 p-3 my-2"
    >
      {text}
      <i className={icon}></i> 
    </button>
  );
  
  export default Button;