import './style.scss';

function CustomInput({ placeholder, className, ariaLabel, type, ...props }) {
  return (
    <input
      type={type}
      placeholder={placeholder}
      className={`search__input ${className}`}
      aria-label={ariaLabel}
      {...props}
    />
  )
}

export {
  CustomInput
}