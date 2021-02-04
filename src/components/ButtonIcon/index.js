import './style.scss';

function ButtonIcon({ className, ...props }) {
  return (
    <button className={`button-icon ${className}`} {...props}>
    </button>
  )
}

export {
  ButtonIcon
}