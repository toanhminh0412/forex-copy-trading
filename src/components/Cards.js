import { useState } from "react"

export function DisplayCase({children, style=""}) {
  return (
    <div className={`flex flex-row flex-wrap ${style}`}>
      {children}
    </div>
  )
}

export function Card({header="", children, style="", highlighted=false}) {
  return (
    <div className={`bg-white w-full md:w-45% xl:w-30% min-w-[20rem] mt-8 rounded-md ${highlighted ? 'shadow-xl border border-black' : 'shadow-md border border-slate-200'} ${style}`}>
      {header !== "" ?
      <div className="text-center font-semibold text-2xl border-b border-slate-200 py-2">
        {header}
      </div>
      : <div></div>}
      <div>
      <div className="p-4">
        {children}
      </div>
      </div>
    </div>
  )
}

export function ReviewCard({ id, firstName, lastInitial, country, content, comment="", show=false, updateReviewComment= () => {}, toggleReview = () => {}}) {
  const [newComment, setNewComment] = useState(comment);
  const [reviewComment, setReviewComment] = useState(comment);
  const [showReview, setShowReview] = useState(show);
  const [loadComment, setLoadComment] = useState(false);
  const [openComment, setOpenComment] = useState(false);
  const [loadShowReview, setLoadShowReview] = useState(false);
  
  const updateNewComment = e => {
    setNewComment(e.target.value);
  }

  const commentOnReview = () => {
    setLoadComment(true);
    fetch('/api/review', {
      method: "POST",
      mode: "cors",
      credentials: "same-origin",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        reviewId: id,
        comment: newComment
      })
    })
    .then(res => res.json())
    .then(data => {
      console.log(data);
      setLoadComment(false);
      if (data.success) {
        console.log("Posted comment successfully")
        setReviewComment(newComment);
        setOpenComment(false);
        updateReviewComment(id, newComment);
      }
    })
  }

  const toggleShowReview = () => {
    setLoadShowReview(true);
    fetch('/api/review', {
      method: "POST",
      mode: "cors",
      credentials: "same-origin",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        reviewId: id,
        toggleReview: !showReview
      })
    })
    .then(res => res.json())
    .then(data => {
      console.log(data);
      setLoadShowReview(false);
      if (data.success) {
        setShowReview(!showReview);
        toggleReview(id);
        console.log("Toggle review successfully")
      }
    })
  }
  
  return (
    <div className="card bg-white border border-slate-200 shadow-md rounded-md w-96 ml-3 mt-3">
      <div className="card-body">
        <div className='flex flex-row'>
        <h2 className="card-title">
          {firstName} {lastInitial}
        </h2>
        <span className='text-md font-light text-slate-500 mt-auto ml-2'>from {country}</span>
        </div>
        <p>“{content}”</p>
        <button className={`btn ${showReview ? 'btn-secondary text-white' : 'btn-primary'} w-full mt-4 ${loadShowReview ? 'loading' : ''}`} onClick={toggleShowReview}>{showReview ? 'Hide' : 'Show'}</button>
        {reviewComment && !openComment ? (
        <div>
          <p>
            <span className="font-semibold">Your comment:</span>
            <span className="ml-2 font-normal">{reviewComment}</span>
          </p>
          <div className="card-actions justify-end mt-2">
            <button className="btn btn-dark" onClick={() => {setOpenComment(true)}}>Edit</button>
          </div>
        </div>
        ) : (
        <div>
          <textarea className="textarea textarea-bordered w-full mt-4" rows="3" placeholder="Your comment" value={newComment} onChange={updateNewComment}></textarea>
          <div className="card-actions justify-end mt-2">
            {reviewComment ? <button className="btn btn-error" onClick={() => {setOpenComment(false)}}>Close</button> : <div></div>}
            <button className={`btn btn-dark ${loadComment ? 'loading' : ''} ${newComment || reviewComment ? '' : 'btn-disabled'}`} onClick={commentOnReview}>Comment</button>
          </div>
        </div>
        )}
      </div>
    </div>
  )
}