import { useState, useEffect } from 'react'
import Ratelimit from '../components/ratelimit.jsx'
import axios from 'axios'
import toast from 'react-hot-toast'
import { Link } from 'react-router'
import { formatDate } from '../../utility/timeformat.js'

const Homepage = () => {
  const [isratelimited, setisratelimited] = useState(false)
  const [notes, setNotes] = useState([])
  const [loading, setLoading] = useState(true)

  const apiUrl = import.meta.env.VITE_RENDER_URL 

  useEffect(() => {
    let ignore = false

    const fetchNotes = async () => {
      try {
        const res = await axios.get(apiUrl)
        if (!ignore) {
          console.log("Notes fetched successfully:", res.data)
          const notesData = Array.isArray(res.data)
            ? res.data
            : (res.data?.notes || res.data?.data || [])
          setNotes(notesData)
          setisratelimited(false)
        }
      } catch (error) {
        if (!ignore) {
          if (error.response?.status === 429) {
            setisratelimited(true)
          } else {
            toast.error("Failed to load notes")
            console.error("Error fetching notes:", error)
          }
        }
      } finally {
        if (!ignore) {
          setLoading(false)
        }
      }
    }

    fetchNotes()

    return () => {
      ignore = true
    }
  }, [apiUrl])

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${apiUrl}/${id}`)
      setNotes((prev) => prev.filter((n) => (n._id || n.id) !== id))
      toast.success("Note deleted successfully")
    } catch (error) {
      toast.error("Failed to delete note")
      console.error("Error deleting note:", error)
    }
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {isratelimited && <Ratelimit />}

      {loading ? (
        <div className="flex justify-center items-center py-20">
          <span className="loading loading-spinner loading-lg text-cyan-500"></span>
        </div>
      ) : notes.length === 0 ? (
        <div className="text-center py-16">
          <h2 className="text-2xl font-bold mb-2">No Notes Found</h2>
          <p className="text-base-content/70 mb-6">You don't have any notes yet. Create your first note!</p>
          <Link to="/create" className="btn btn-primary">
            Create Note
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {notes.map((note) => {
            const noteId = note._id || note.id
            return (
              <div key={noteId} className="card bg-base-200 shadow-md hover:shadow-lg transition-shadow">
                <div className="card-body">
                  <div className="flex justify-between items-start">
                    <h3 className="card-title text-lg font-semibold">
                      {note.title || "Untitled"}
                    </h3>
                    {note.createdAt && (
                      <span className="text-xs text-base-content/60">
                        cretedAt {formatDate(note.createdAt)}
                      </span>
                    )}
                  </div>
                  <p className="text-base-content/80 line-clamp-3">
                    {note.content || note.description || note.body || "No content"}
                  </p>

                  <div className="card-actions justify-end mt-4">
                     {note.updatedAt && (
                      <span className="text-xs text-base-content/60 m-4">
                        updated at {formatDate(note.updatedAt)}
                      </span>
                    )}
                    <Link to={`/note/${noteId}`} className="btn btn-sm btn-outline">
                      Edit
                    </Link>
                    <button
                      className="btn btn-sm btn-error btn-outline"
                      onClick={() => handleDelete(noteId)}
                    >
                      Delete
                    </button>
                    
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}

export default Homepage
