import "./LoadingAnimation.scss";
import classNames from "classnames";

const LoadingAnimation = ({ center = false }) => {
  return (
    <div
      className={classNames("lds-ellipsis", { "lds-ellipsis-center": center })}
    >
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>
  );
};

export default LoadingAnimation;
