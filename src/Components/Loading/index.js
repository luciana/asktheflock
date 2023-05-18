
import BeatLoader from "react-spinners/BeatLoader";

const Loading = () => {
  const style = { position: "fixed", top: "50%", left: "50%", transform: "translate(-50%, -50%)" };
  return (

    <div style={style}>
      <BeatLoader
          color={'#076AE0'}
          loading={true}
          margin= {3}
          size={30}
          aria-label="Loading Spinner"
          data-testid="loader"
        />
    </div>
  );
};

export default Loading;