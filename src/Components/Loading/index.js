import BeatLoader from "react-spinners/BeatLoader";

const Loading = ({size}) => {
  const style = { position: "fixed", top: "50%", left: "50%", transform: "translate(-50%, -50%)" };
  const s = size ? size : 30;
  
  return (

    <div style={style}>
      <BeatLoader
          color={'#076AE0'}
          loading={true}
          margin= {3}
          size={s}
          aria-label="Loading Spinner"
          data-testid="loader"
        />
    </div>
  );
};

export default Loading;