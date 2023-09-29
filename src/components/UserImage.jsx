import { Link } from "react-router-dom"
import ImageComponent from './ImageComponent'

export default function UserImage({user}) {
  return (
    <div className="group relative">
      <Link to={`/user/${user._id}`}>
        <div className="w-12 rounded-full h-12 overflow-hidden">
          <ImageComponent id={user.avt} isRound={true}></ImageComponent>      
        </div>                      
      </Link>
      <div className="overflow-hidden duration-200 max-h-0 group-hover:max-h-full translate-y-full rounded-lg -translate-x-1/2  absolute left-1/2 bottom-0 bg-slate-400">
        <p className=" p-3">{user.username}</p>
      </div>
    </div>
  )
}