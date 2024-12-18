'use client' //
import { messagesApi } from '@/api'
import React, { useEffect, useState } from 'react'
interface Comment {
  id: number
  accountId: string
  content: string
}

const CommentList: React.FC = () => {
  const [comments, setComments] = useState<Comment[]>([])

  const [newComment, setNewComment] = useState('')

  useEffect(() => {
    messagesApi.getMessages().then((resp) => {
      setComments(resp.data.records as Comment[])
    })
  }, [])

  const handleAddComment = (e: React.FormEvent) => {
    e.preventDefault()
    if (newComment.trim()) {
      const newId = comments.length ? comments[comments.length - 1].id + 1 : 1
      setComments([...comments, { id: newId, accountId: '匿名用户', content: newComment }])
      setNewComment('')
    }
  }

  return (
    <div className="flex flex-col items-center min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">留言列表</h1>
      <div className="w-full max-w-2xl bg-white rounded-lg shadow dark:bg-gray-800 p-6">
        <ul className="space-y-4">
          {comments.map((comment) => (
            <li key={comment.id} className="p-4 bg-gray-50 rounded-lg shadow dark:bg-gray-700">
              <div className="flex justify-between items-center mb-2">
                <span className="font-semibold text-gray-900 dark:text-white">
                  {comment.accountId}
                </span>
              </div>
              <p className="text-gray-700 dark:text-gray-300">{comment.content}</p>
            </li>
          ))}
        </ul>
        <form className="mt-8 space-y-4" onSubmit={handleAddComment}>
          <textarea
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            className="w-full p-4 text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="留下你的评论..."
            rows={4}
            required
          ></textarea>
          <button
            type="submit"
            className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            发表评论
          </button>
        </form>
      </div>
    </div>
  )
}

export default CommentList
