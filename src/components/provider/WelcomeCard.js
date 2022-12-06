function WelcomeCard() {
  const user = sessionStorage.getItem("name") || null
  return (
    <div className="card">
      <div className="card-body">
        <div className="jumbotron mb-0 bg-light">
          <h1 className="display-4">Good Morning{user ? `, ${user}` : null}</h1>
          <p className="lead">Have a nice day at work!</p>
          {/* <hr className="my-4" /> */}
        </div>
      </div>
    </div>
  )
}

export default WelcomeCard
