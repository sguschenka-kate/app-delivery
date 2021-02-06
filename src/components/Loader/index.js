import "./style.scss";

function Loader() {
  return (
    <div className="loader">
      <img src="./img/loader-man.png" alt="logo" className="loader__img" />
      <progress className="loader__progress matter-progress-circular"></progress>
    </div>
  )
}

export {
  Loader
}