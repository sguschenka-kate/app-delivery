import "./style.scss"

function Layout(props) {

  return (
    <div className="layout">
      {props.children}
    </div>
  )
}

export {
  Layout
}