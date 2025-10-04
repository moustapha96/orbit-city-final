/* eslint-disable react/prop-types */


import { useState } from "react"
import Star from "../Helpers/icons/Star"
import InputCom from "../Helpers/InputCom"
import StarRating from "../Helpers/StarRating"
import { Loader2 } from "lucide-react"
import { Button } from "flowbite-react"


export default function Reviews({
  comments,
  rating,
  ratingHandler,
  author,
  authorHandler,
  message,
  messageHandler,
  reviewAction,
  hoverRating,
  hoverHandler,
  reviewLoading,
}) {
  const [visibleComments, setVisibleComments] = useState(3)

  const loadMoreComments = () => {
    setVisibleComments((prev) => prev + 3)
  }

  return (
    <div className="review-wrapper w-full max-w-4xl mx-auto">
      <div className="w-full reviews mb-12">
        <h2 className="text-2xl font-semibold mb-6">Avis des clients</h2>
        {comments && comments.length > 0 ? (
          comments.slice(0, visibleComments).map((comment) => (
            <div key={comment.id} className="comment-item bg-white rounded-lg shadow-md p-6 mb-4">
              <div className="comment-header flex justify-between items-center mb-4">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 rounded-full overflow-hidden">
                    <img
                      src={`/images/comment-user-1.png`}
                      alt={`${comment.author}'s avatar`}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <p className="text-lg font-medium text-gray-800">{comment.author}</p>
                    {/* <p className="text-sm text-gray-500">London, UK</p> */}
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="flex">
                    {Array.from({ length: 5 }, (_, index) => (
                      <Star
                        key={index}
                        className={`w-5 h-5 ${index < comment.review ? "text-yellow-400" : "text-gray-300"}`}
                      />
                    ))}
                  </div>
                  <span className="text-sm text-gray-600">({comment.review}.0)</span>
                </div>
              </div>
              <p className="text-gray-700 leading-relaxed mb-4">{comment.text}</p>
              {comment.replys && comment.replys.length > 0 && (
                <div className="replies pl-8 border-l-2 border-gray-200">
                  {comment.replys.map((reply) => (
                    <div key={reply.id} className="reply-item mt-4">
                      <div className="flex items-center space-x-3 mb-2">
                        <div className="w-8 h-8 rounded-full overflow-hidden">
                          <img
                            src={`/images/comment-user-2.png`}
                            alt={`${reply.author}'s avatar`}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <p className="text-md font-medium text-gray-800">{reply.author}</p>
                      </div>
                      <p className="text-gray-700 text-sm">{reply.text}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))
        ) : (
          <p className="text-gray-500">Il n'y a pas encore de commentaires. Soyez le premier à commenter !</p>
        )}
        {comments.length > visibleComments && (
          <div className="w-full flex justify-center mt-6">
            <button
              type="button"
              onClick={loadMoreComments}
              className="bg-bleu-logo hover:bg-qyellow text-white px-6 py-2 rounded-md text-sm font-semibold  transition-colors"
            >
              Afficher plus
            </button>
          </div>
        )}
      </div>
      <div className="write-review w-full bg-white rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-semibold mb-6">Rédigez votre commentaire</h2>
        <div className="flex items-center space-x-2 mb-6">
          <StarRating
            hoverRating={hoverRating}
            hoverHandler={hoverHandler}
            rating={rating}
            ratingHandler={ratingHandler}
          />
          <span className="text-gray-600 text-sm">({rating}.0)</span>
        </div>
        <form className="space-y-4">
          <InputCom
            label="Nom complet*"
            placeholder="Votre nom"
            type="text"
            name="name"
            inputClasses="w-full p-2 border rounded-md"
            value={author}
            disabled={author !== "" ? true : false}
            inputHandler={authorHandler}
          />
          <div>
            <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
              Message*
            </label>
            <textarea
              id="message"
              rows={4}
              value={message}
              onChange={messageHandler}
              className="w-full p-2 border rounded-md resize-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Rédigez votre commentaire ici..."
            ></textarea>
          </div>
          <div className="flex justify-end">
            <Button
              onClick={reviewAction}
              type="submit"
              className="bg-bleu-logo text-white px-1 py-1 rounded-md text-sm font-semibold hover:bg-bleu-claire transition-colors flex items-center space-x-2"
              disabled={reviewLoading || author === "" || message === "" ? true : false}
            >

              {reviewLoading ? <Loader2 className="w-2 h-2" /> : <span>Envoyer</span>}
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}

