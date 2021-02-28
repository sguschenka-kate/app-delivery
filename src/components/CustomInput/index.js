import './style.scss';

function CustomInput({ placeholder, className, ariaLabel, type, value, ...props }) {

  return (
    <input
      type={type}
      placeholder={placeholder}
      className={`input ${className || ''}`}
      aria-label={ariaLabel}
      value={value}
      {...props}
    />
  )
}

export {
  CustomInput
}