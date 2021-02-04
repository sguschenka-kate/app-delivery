import './style.scss';

function ButtonPrimary({ className, children, ...props }) {
  return (
    <button className={`btn-primary ${className}`} {...props}>
      {children}
    </button>
  )
}

export {
  ButtonPrimary
}