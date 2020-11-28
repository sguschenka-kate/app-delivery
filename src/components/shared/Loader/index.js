import "./style.scss";

function Loader() {
  return (
    <div className="loader">
      <progress className="loader__progress matter-progress-circular"></progress>
    </div>
  )
}

export {
  Loader
}