import './style.scss';

function ButtonSecondary({ className, children, ...props }) {
  return (
    <button className={`btn-secondary ${className}`} {...props}>
      {children}
    </button>
  )
}

export {
  ButtonSecondary
}