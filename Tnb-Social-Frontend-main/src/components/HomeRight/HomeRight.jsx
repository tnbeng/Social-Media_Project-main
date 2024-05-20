import React, { useEffect, useState } from "react";
import PopularUserCard from "./PopularUserCard";
import { Avatar, Button, Card, CardHeader, IconButton } from "@mui/material";
import { red } from "@mui/material/colors";
import SearchUser from "../SearchUser/SearchUser";
import { useNavigate } from "react-router-dom";
import {story} from "../Story/StoryData.js"
import { useDispatch, useSelector } from "react-redux";
import { getAllUser } from "../../Redux/Auth/auth.action.js";

const popularUser = [1, 1, 1, 1];
const HomeRight = () => {
  const navigate = useNavigate()
  const dispatch =useDispatch()
  const {auth}=useSelector(store=>store)

  const handleUserClick = (userId) => {
    navigate(`/profile/${userId}`)
  }

  const [showAll, setShowAll] = useState(false);
  const displayedUsers = showAll ? auth.AllUsers : auth.AllUsers.slice(0, 4);

  const handleToggle = () => {
    setShowAll(!showAll);
  };
  
  useEffect(()=>{
    dispatch(getAllUser())
  },[])
  return (
    <div className="pr-5">
      <SearchUser handleClick={handleUserClick} />
      <div className="card p-5">

        <div className="flex justify-between py-5 items-center">
          <p className="font-semibold opacity-70">Suggestions for you</p>
          <button className="text-xs font-semibold opacity-95" onClick={handleToggle}>{showAll ? 'Show Less' : 'View All'}</button>
        </div>

        <div className="space-y-5">
          {displayedUsers.map((item, index) => (
            <PopularUserCard
              key={index}
              image={
                item.image
              }
              username={item.firstName+" "+item.lastName}
              description={"Follows you"}
              userid={item.id}
            />
          ))}

        </div>
      </div>
    </div>
  );
};

export default HomeRight;
