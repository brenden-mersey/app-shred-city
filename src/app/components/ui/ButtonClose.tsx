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
  const buttonClass =
    `${blockName}__button-close button button--close ${classes}`.trim();
  return (
    <button
      className={buttonClass}
      onClick={handleClick}
      aria-label={ariaLabel}
    >
      <span className={`${blockName}__button-stroke button__stroke`}></span>
      <span className={`${blockName}__button-stroke button__stroke`}></span>
    </button>
  );
}
