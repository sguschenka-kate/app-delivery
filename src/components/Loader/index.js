import "./style.scss";

function Loader() {
  return (
    <div className="loader">
      <img src="/img/loader-man.png" alt="delivery-app logo" className="loader__image" />
      <progress className="loader__progress matter-progress-circular"></progress>
    </div>
  )
}

export {
  Loader
}