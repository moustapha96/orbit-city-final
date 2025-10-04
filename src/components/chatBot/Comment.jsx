/* eslint-disable react/prop-types */
import { memo } from "react"



const Comment = memo(({ author, text, date }) => (
    <div className="bg-white rounded-lg shadow-md p-4 mb-4">
        <div className="flex items-center space-x-2 mb-2">
            <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white font-semibold">
                {author[0].toUpperCase()}
            </div>
            <span className="font-medium">{author}</span>
        </div>
        <p className="text-gray-700 mb-2">{text}</p>
        <p className="text-xs text-gray-500">{new Date(date).toLocaleString()}</p>
    </div>
))

Comment.displayName = "Comment"

export default Comment
