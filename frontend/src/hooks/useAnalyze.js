import { useState } from 'react'
import axios from 'axios'

const API_URL = 'http://localhost:8000'

export default function useAnalyze() {
  const [image,   setImage]   = useState(null)
  const [preview, setPreview] = useState(null)
  const [result,  setResult]  = useState(null)
  const [loading, setLoading] = useState(false)
  const [error,   setError]   = useState(null)

  const handleImage = (file) => {
    if (!file) return
    setImage(file)
    setPreview(URL.createObjectURL(file))
    setResult(null)
    setError(null)
  }

  const analyze = async () => {
    if (!image) return
    setLoading(true)
    setError(null)
    setResult(null)

    try {
      const formData = new FormData()
      formData.append('file', image)
      const res  = await axios.post(`${API_URL}/analyze`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      })
      const data = res.data
      if (data.message === 'NO_FOOD') {
        setError('NO_FOOD')
        return
      }
      setResult(data)
    } catch (err) {
      setError('API_ERROR')
    } finally {
      setLoading(false)
    }
  }

  const reset = () => {
    setImage(null)
    setPreview(null)
    setResult(null)
    setError(null)
  }

  return { image, preview, result, loading, error, handleImage, analyze, reset }
}