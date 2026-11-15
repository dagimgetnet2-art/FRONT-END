import { useState, useEffect } from 'react'
import { useParams, Link, useNavigate } from 'react-router'
import axios from 'axios'
import toast from 'react-hot-toast'
import { formatDate } from '../../utility/timeformat.js'

const Notedetails = () => {
  const { id } = useParams()
  const navigate = useNavigate()

  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [createdAt, setCreatedAt] = useState(null)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)

  const apiUrl = import.meta.env.VITE_RENDER_URL || "http://localhost:5001/api/notes"

  useEffect(() => {
    let ignore = false

    const fetchNote = async () => {
      try {
        const res = await axios.get(`${apiUrl}/${id}`)
        if (!ignore) {
          const noteData = res.data?.note || res.data
          setTitle(noteData.title || '')
          setContent(noteData.content || noteData.description || noteData.body || '')
          setCreatedAt(noteData.createdAt || null)
        }
      } catch (error) {
        if (!ignore) {
          toast.error("Failed to load note details")
          console.error("Error fetching note:", error)
        }
      } finally {
        if (!ignore) {
          setLoading(false)
        }
      }
    }

    if (id) {
      fetchNote()
    }

    return () => {
      ignore = true
    }
  }, [apiUrl, id])

  const handleUpdate = async (e) => {
    e.preventDefault()

    if (!title.trim() || !content.trim()) {
      toast.error('Title and content cannot be empty')
      return
    }

    setSaving(true)
    try {
      await axios.put(`${apiUrl}/${id}`, { title, content })
      toast.success('Note updated successfully!')
      navigate('/')
    } catch (error) {
      toast.error('Failed to update note')
      console.error('Error updating note:', error)
    } finally {
      setSaving(false)
    }
  }

  const handleDelete = async () => {
    if (!window.confirm('Are you sure you want to delete this note?')) return

    try {
      await axios.delete(`${apiUrl}/${id}`)
      toast.success('Note deleted')
      navigate('/')
    } catch (error) {
      toast.error('Failed to delete note')
      console.error('Error deleting note:', error)
    }
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center py-24">
        <span className="loading loading-spinner loading-lg text-cyan-500"></span>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-lg">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Edit Note</h1>
        <Link to="/" className="btn btn-sm btn-ghost">
          Back to Notes
        </Link>
      </div>

      <div className="card bg-base-200 shadow-md">
        <form className="card-body space-y-4" onSubmit={handleUpdate}>
          <div className="flex justify-between items-center text-xs text-base-content/60">
            <span>ID: {id}</span>
            {createdAt && <span>Created: {formatDate(createdAt)}</span>}
          </div>

          <div className="form-control">
            <label htmlFor="title" className="label">
              <span className="label-text font-medium">Title</span>
            </label>
            <input
              type="text"
              id="title"
              name="title"
              className="input input-bordered w-full"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              disabled={saving}
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
              rows={6}
              className="textarea textarea-bordered w-full"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              disabled={saving}
              required
            ></textarea>
          </div>

          <div className="card-actions justify-between pt-2">
            <button
              type="button"
              className="btn btn-error btn-outline"
              onClick={handleDelete}
              disabled={saving}
            >
              Delete Note
            </button>
            <div className="flex gap-2">
              <Link to="/" className="btn btn-outline" disabled={saving}>
                Cancel
              </Link>
              <button
                type="submit"
                className="btn btn-primary"
                disabled={saving}
              >
                {saving ? (
                  <>
                    <span className="loading loading-spinner loading-sm"></span>
                    Saving...
                  </>
                ) : (
                  'Save Changes'
                )}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Notedetails
