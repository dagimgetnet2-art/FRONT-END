import { useState } from 'react'
import { Link, useNavigate } from 'react-router'
import axios from 'axios'
import toast from 'react-hot-toast'

const Createpage = () => {
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!title.trim() || !content.trim()) {
      toast.error('Please fill in both title and content')
      return
    }

    setLoading(true)
    try {
      const apiUrl = import.meta.env.VITE_RENDER_URL || 'http://localhost:5001/api/notes'
      await axios.post(apiUrl, { title, content })
      toast.success('Note created successfully!')
      navigate('/')
    } catch (error) {
      if (error.response?.status === 429) {
        toast.error('Rate limit reached. Please wait before creating another note.')
      } else {
        toast.error('Failed to create note')
        console.error('Error creating note:', error)
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-lg">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Create Note</h1>
        <Link to="/" className="btn btn-sm btn-ghost">
          Cancel
        </Link>
      </div>

      <div className="card bg-base-200 shadow-md">
        <form className="card-body space-y-4" onSubmit={handleSubmit}>
          <div className="form-control">
            <label htmlFor="title" className="label">
              <span className="label-text font-medium">Title</span>
            </label>
            <input
              type="text"
              id="title"
              name="title"
              className="input input-bordered w-full"
              placeholder="Enter note title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              disabled={loading}
              required
            />
          </div>

          <div className="form-control">
            <label htmlFor="content" className="label">
              <span className="label-text font-medium">Content</span>
            </label>
            <textarea
              id="content"
              name="content"
              rows={4}
              className="textarea textarea-bordered w-full"
              placeholder="Enter note content"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              disabled={loading}
              required
            ></textarea>
          </div>

          <div className="card-actions justify-end pt-2">
            <Link to="/" className="btn btn-outline" disabled={loading}>
              Cancel
            </Link>
            <button
              type="submit"
              className="btn btn-primary"
              disabled={loading}
            >
              {loading ? (
                <>
                  <span className="loading loading-spinner loading-sm"></span>
                  Creating...
                </>
              ) : (
                'Create Note'
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Createpage
