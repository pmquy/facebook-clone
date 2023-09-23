import { Link } from "react-router-dom"

export default function UserImage({user}) {
  return (
    <div className="group relative">
      <Link to={`/user/${user._id}`}>
        <img src={user.photoURL} className=" w-12 rounded-full"></img>
      </Link>
      <div className="overflow-hidden duration-200 max-h-0 group-hover:max-h-full translate-y-full rounded-lg -translate-x-1/2  absolute left-1/2 bottom-0 bg-slate-400">
        <p className=" p-3">{user.username}</p>
      </div>
    </div>
  )
}