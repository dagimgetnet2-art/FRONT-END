const Ratelimit = () => {
  return (
    <div className="card bg-warning text-warning-content shadow-md max-w-md mx-auto my-6">
      <div className="card-body items-center text-center">
        <h2 className="card-title text-xl font-bold">Rate Limit Reached</h2>
        <p>You have reached the rate limit for this API endpoint. Please wait a moment before trying again.</p>
      </div>
    </div>
  )
}

export default Ratelimit
