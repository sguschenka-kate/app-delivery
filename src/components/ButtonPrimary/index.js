import './style.scss';

function ButtonPrimary({ className, children, type, ...props }) {
  return (
    <button type={type} className={`btn-primary ${className}`} {...props}>
      {children}
    </button>
  )
}

export {
  ButtonPrimary
}