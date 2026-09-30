import { useEffect, useState } from 'react'
import './App.css'

function App() {
  const [customerName, setCustomerName] = useState('')
  const [vehicle, setVehicle] = useState('')
  const [repairDescription, setRepairDescription] = useState('')
  const [editingJobId, setEditingJobId] = useState(null)
  const [jobs, setJobs] = useState(() => {
  try {
    const savedJobs = localStorage.getItem('garageflow-jobs')
    const parsedJobs = savedJobs ? JSON.parse(savedJobs) : []
    return Array.isArray(parsedJobs) ? parsedJobs : []
  } catch {
    return []
  }
})
  const [statusFilter, setStatusFilter] = useState('All')
  const [searchTerm, setSearchTerm] = useState('')
  useEffect(() => {
  try {
    localStorage.setItem('garageflow-jobs', JSON.stringify(jobs))
  } catch (error) {
    console.error('Could not save GarageFlow jobs:', error)
  }
}, [jobs])
  const count = jobs.length
  const pendingCount = jobs.filter(
    (job) => job.status === 'Pending'
  ).length
  const completedCount = jobs.filter(
    (job) => job.status === 'Completed'
  ).length
  const visibleJobs = jobs.filter((job) => {
  const matchesStatus =
    statusFilter === 'All' || job.status === statusFilter

  const search = searchTerm.trim().toLowerCase()

  const matchesSearch =
    job.customerName.toLowerCase().includes(search) ||
    job.vehicle.toLowerCase().includes(search)

  return matchesStatus && matchesSearch
})

  function handleAddJob() {
  const name = customerName.trim()
  const vehicleName = vehicle.trim()
  const description = repairDescription.trim()

  if (name === '' || vehicleName === '' || description === '') return

  if (editingJobId !== null) {
    setJobs((previousJobs) =>
      previousJobs.map((job) =>
        job.id === editingJobId
          ? {
              ...job,
              customerName: name,
              vehicle: vehicleName,
              repairDescription: description,
            }
          : job
      )
    )
  } else {
    const newJob = {
      id: crypto.randomUUID(),
      customerName: name,
      vehicle: vehicleName,
      repairDescription: description,
      status: 'Pending',
    }

    setJobs((previousJobs) => [...previousJobs, newJob])
  }

  setEditingJobId(null)
  setCustomerName('')
  setVehicle('')
  setRepairDescription('')
}

function handleRemoveJob(jobId) {
  const confirmed = window.confirm(
    'Delete this repair job? This cannot be undone.'
  )

  if (confirmed) {
    setJobs((previousJobs) =>
      previousJobs.filter((job) => job.id !== jobId)
    )

    if (editingJobId === jobId) {
      handleCancelEdit()
    }
  }
}
function handleCompleteJob(jobId) {
  setJobs((previousJobs) =>
    previousJobs.map((job) =>
      job.id === jobId
        ? { ...job, status: 'Completed' }
        : job
    )
  )
}
function handleReopenJob(jobId) {
  setJobs((previousJobs) =>
    previousJobs.map((job) =>
      job.id === jobId
        ? { ...job, status: 'Pending' }
        : job
    )
  )
}
function handleClearJobs() {
  const confirmed = window.confirm(
    'Delete all repair jobs? This cannot be undone.'
  )

  if (confirmed) {
  setJobs([])
  handleCancelEdit()
  }
}

function handleEditJob(job) {
  setEditingJobId(job.id)
  setCustomerName(job.customerName)
  setVehicle(job.vehicle)
  setRepairDescription(job.repairDescription ?? '')
}
function handleCancelEdit() {
  setEditingJobId(null)
  setCustomerName('')
  setVehicle('')
  setRepairDescription('')
}
  return (
    <>
      <section id="center">
        <div>
          <h1>GarageFlow</h1>
          <p>Manage your garage's repair jobs in one place.</p>
        </div>
         <h2>
  {editingJobId !== null ? 'Edit repair job' : 'Add a repair job'}
</h2>
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
<label>
  Repair description
  <textarea
    value={repairDescription}
    onChange={(event) => setRepairDescription(event.target.value)}
    placeholder="Describe the work needed"
    rows={3}
  />
</label>
        <div  className="job-summary">
        <p>Total jobs: {count}</p>
        <p>Pending jobs: {pendingCount}</p>
        <p>Completed jobs: {completedCount}</p>
        </div>
        {count === 0 && <p>No repair jobs yet. Add your first job below.</p>}
        <button
          type="button"
          className="counter"
          disabled={
            customerName.trim() === '' ||
            vehicle.trim() === '' ||
            repairDescription.trim() === ''}
          onClick={handleAddJob}
        >
          {editingJobId !== null ? 'Save changes' : 'Add repair job'}
        </button>
        {editingJobId !== null && (
  <button type="button" onClick={handleCancelEdit}>
    Cancel editing
  </button>
)}
        <button
  type="button"
  onClick={handleClearJobs}
  disabled={jobs.length === 0}
>
  Clear all jobs
</button>
<label>
  Search jobs
  <input
    type="search"
    value={searchTerm}
    onChange={(event) => setSearchTerm(event.target.value)}
    placeholder="Customer name or vehicle"
  />
</label>
{searchTerm !== '' && (
  <button type="button" onClick={() => setSearchTerm('')}>
    Clear search
  </button>
)}
<label>
  Show jobs
  <select
    value={statusFilter}
    onChange={(event) => setStatusFilter(event.target.value)}
  >
    <option value="All">All</option>
    <option value="Pending">Pending</option>
    <option value="Completed">Completed</option>
  </select>
</label>
{jobs.length > 0 && visibleJobs.length === 0 && (
  <div>
    <p>No jobs match your search and status filter.</p>
    <button
      type="button"
      onClick={() => {
        setSearchTerm('')
        setStatusFilter('All')
      }}
    >
      Clear search and filters
    </button>
  </div>
)}
<p>
  Showing {visibleJobs.length} of {jobs.length} jobs
</p>
<ul className="job-list">
  {visibleJobs.map((job) => (
    <li key={job.id} className="job-card">
      {job.customerName} — {job.vehicle}{' '}
<span
  className={
    job.status === 'Completed'
      ? 'status-badge status-completed'
      : 'status-badge status-pending'
  }
>
  {job.status}
</span>{' '}
      <p>{job.repairDescription}</p>
      <div className="job-actions">
      <button
  type="button"
  onClick={() => handleCompleteJob(job.id)}
  disabled={job.status === 'Completed'}
>
  Complete
</button>{' '}
<button
  type="button"
  onClick={() => handleReopenJob(job.id)}
  disabled={job.status !== 'Completed'}
>
  Reopen
</button>{' '}
<button type="button" onClick={() => handleEditJob(job)}>
  Edit
</button>{' '}
      <button
        type="button"
        onClick={() => handleRemoveJob(job.id)}
      >
        Remove
      </button>
      </div>
    </li>
  ))}
</ul>
      </section>
    </>
  )
}

export default App
