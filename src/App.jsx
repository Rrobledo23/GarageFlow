import { useState } from 'react'
import heroImg from './assets/hero.png'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import './App.css'

function App() {
  const [customerName, setCustomerName] = useState('')
  const [vehicle, setVehicle] = useState('')
  const [jobs, setJobs] = useState([])
  const count = jobs.length

  function handleAddJob() {
  const name = customerName.trim()
  if (name === '') return

  const newJob = {
    id: crypto.randomUUID(),
    customerName: name,
    vehicle: vehicle.trim(),
  }

  setJobs((previousJobs) => [...previousJobs, newJob])
  setCustomerName('')
  setVehicle('')
}

function handleRemoveJob(jobId) {
  setJobs((previousJobs) =>
    previousJobs.filter((job) => job.id !== jobId)
  )
}

  return (
    <>
      <section id="center">
        <div className="hero">
          <img src={heroImg} className="base" width="170" height="179" alt="" />
          <img src={reactLogo} className="framework" alt="React logo" />
          <img src={viteLogo} className="vite" alt="Vite logo" />
        </div>
        <div>
          <h1>GarageFlow</h1>
          <p>Manage your garage's repair jobs in one place.</p>
        </div>
        <label>
  Customer name
  <input
    type="text"
    value={customerName}
    onChange={(event) => setCustomerName(event.target.value)}
  />
</label>
<label>
  Vehicle
  <input
    type="text"
    placeholder="2018 Toyota Corolla"
    value={vehicle}
    onChange={(event) => setVehicle(event.target.value)}
  />
</label>
<p>Customer: {customerName}</p>
        <p>Repair jobs added: {count}</p>
        {count === 0 && <p>No repair jobs yet. Add your first job below.</p>}
        <button
          type="button"
          className="counter"
          disabled={customerName.trim() === ''}
          onClick={handleAddJob}
        >
          Add repair job
        </button>
        <button type="button" onClick={() => setJobs([])}>
  Clear all jobs
</button>
<ul>
  {jobs.map((job) => (
    <li key={job.id}>
      {job.customerName} — {job.vehicle}{' '}
      <button
        type="button"
        onClick={() => handleRemoveJob(job.id)}
      >
        Remove
      </button>
    </li>
  ))}
</ul>
      </section>

      <div className="ticks"></div>

      <section id="next-steps">
        <div id="docs">
          <svg className="icon" role="presentation" aria-hidden="true">
            <use href="/icons.svg#documentation-icon"></use>
          </svg>
          <h2>Documentation</h2>
          <p>Your questions, answered</p>
          <ul>
            <li>
              <a href="https://vite.dev/" target="_blank">
                <img className="logo" src={viteLogo} alt="" />
                Explore Vite
              </a>
            </li>
            <li>
              <a href="https://react.dev/" target="_blank">
                <img className="button-icon" src={reactLogo} alt="" />
                Learn more
              </a>
            </li>
          </ul>
        </div>
        <div id="social">
          <svg className="icon" role="presentation" aria-hidden="true">
            <use href="/icons.svg#social-icon"></use>
          </svg>
          <h2>Connect with us</h2>
          <p>Join the Vite community</p>
          <ul>
            <li>
              <a href="https://github.com/vitejs/vite" target="_blank">
                <svg
                  className="button-icon"
                  role="presentation"
                  aria-hidden="true"
                >
                  <use href="/icons.svg#github-icon"></use>
                </svg>
                GitHub
              </a>
            </li>
            <li>
              <a href="https://chat.vite.dev/" target="_blank">
                <svg
                  className="button-icon"
                  role="presentation"
                  aria-hidden="true"
                >
                  <use href="/icons.svg#discord-icon"></use>
                </svg>
                Discord
              </a>
            </li>
            <li>
              <a href="https://x.com/vite_js" target="_blank">
                <svg
                  className="button-icon"
                  role="presentation"
                  aria-hidden="true"
                >
                  <use href="/icons.svg#x-icon"></use>
                </svg>
                X.com
              </a>
            </li>
            <li>
              <a href="https://bsky.app/profile/vite.dev" target="_blank">
                <svg
                  className="button-icon"
                  role="presentation"
                  aria-hidden="true"
                >
                  <use href="/icons.svg#bluesky-icon"></use>
                </svg>
                Bluesky
              </a>
            </li>
          </ul>
        </div>
      </section>

      <div className="ticks"></div>
      <section id="spacer"></section>
    </>
  )
}

export default App
