type ButtonCloseProps = {
  ariaLabel?: string;
  blockName?: string;
  classes?: string;
  handleClick?: () => void;
};

export default function ButtonClose(props: ButtonCloseProps) {
  const {
    ariaLabel = "Close",
    blockName = "",
    classes = "",
    handleClick = () => {},
  } = props;
  const buttonClass = `${blockName}__button-close button ${classes}`;
  return (
    <button
      className={buttonClass}
      onClick={handleClick}
      aria-label={ariaLabel}
    >
      <span className={`${buttonClass}__stroke`}></span>
      <span className={`${buttonClass}__stroke`}></span>
    </button>
  );
}
