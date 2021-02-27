import './style.scss';

function Modal({ message, className, ...otherProps }) {
  return (
    <div className={`modal ${className}`} {...otherProps}>
      {message}
    </div>
  )
}

export {
  Modal
}