import { Avatar, Button } from '@mui/material'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { FollowUserAction } from '../../Redux/Auth/auth.action'

const PopularUserCard = ({ image, username, description,userid}) => {
  const id=userid
  const { auth } = useSelector(store => store)
  const dispatch=useDispatch()
  const handleFollowUser = () => {
    dispatch(FollowUserAction(id));
  }
  return (
    <div className='flex justify-between items-center'>
      <div className='flex items-center'>
        <Avatar sx={{ bgcolor: "#212534", color: "rgb(88,199,250)" }} className='w-9 h-9 rounded-full' src={image} alt="" />
        <div className='ml-2'>
          <p className='text-sm font-semibold'>{username}</p>
          <p className='text-sm font-semibold opacity-70'>{description}</p>
        </div>
      </div>
      <button className='text-blue-700 text-sm font-semibold' onClick={handleFollowUser} >{auth.user.followings.includes(parseInt(id)) ? "Unfollow" : "follow"}</button>
      {/* <Button
        onClick={handleFollowUser}
        sx={{ borderRadius: "20px" }}
        variant="outlined"
        className="rounded-full"
      >
        {auth.followings.includes(parseInt(id)) ? "Unfollow" : "follow"}
      </Button> */}
    </div>
  )
}

export default PopularUserCard