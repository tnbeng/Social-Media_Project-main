import { Avatar, Box, Button, Card, Tab, Tabs } from "@mui/material";
import React, { useEffect, useState } from "react";
import PostCard from "../../components/Users Post/PostCard";
import ProfileModel from "./ProfileModel";
import { useDispatch, useSelector } from "react-redux";
import { FollowUserAction, findUserById } from "../../Redux/Auth/auth.action";
import { useParams } from "react-router-dom";
import { getUsersPost } from "../../Redux/Post/post.action";
import UsersReelCard from "../Reels/UsersReelCard";
import { getUsersReels } from "../../Redux/Reels/reels.acton";


const tabs = [
  { value: "post", name: "Post" },
  { value: "reels", name: "Reels" },
  { value: "saved", name: "Saved" },
  { value: "repost", name: "Repost" },
];

const Profile = () => {

  const [value, setValue] = React.useState("post");
  const [openModel, setOpenModal] = useState(false);
  const dispatch = useDispatch();
  const { id } = useParams();

  const { auth, post, reel } = useSelector((store) => store);

  const handleCloseProfileModal = () => setOpenModal(false);
  const handleOpenProfileModal = () => setOpenModal(true);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const handleFollowUser = () => {
    dispatch(FollowUserAction(id));
  }
  useEffect(() => {
    dispatch(findUserById(id));
    dispatch(getUsersPost(id))
    dispatch(getUsersReels(id))
  }, [id,auth.user]);
  return (
    <div className="py-10  w-[70%] ">
      <div className="rounded-md  bg-[#191c29]">
        <div className=" h-[15rem]">
          <img
            className="w-full h-full rounded-t-md"
            src="https://cdn.pixabay.com/photo/2014/01/13/20/01/pebbles-243910_640.jpg"
            alt=""
          />
        </div>
        <div className="px-5 flex justify-between items-start mt-5 h-[5rem]">
          <Avatar
            alt="Avatar"
            src={auth.findUser?.image}
            className="transform -translate-y-24 "
            sx={{ width: "10rem", height: "10rem", bgcolor: "#212534", color: "rgb(88,199,250)" }}
            color="primary"
          />
          {auth.user?.id === auth.findUser?.id ? (
            <Button
              onClick={handleOpenProfileModal}
              sx={{ borderRadius: "20px" }}
              variant="outlined"
              className="rounded-full"
            >
              Edit Profile
            </Button>
          ) : (
            <Button
              onClick={handleFollowUser}
              sx={{ borderRadius: "20px" }}
              variant="outlined"
              className="rounded-full"
            >
              {auth.user.followings.includes(parseInt(id)) ? "Unfollow" : "follow"}
            </Button>
          )}
        </div>
        <div className="p-5">
          <div>
            <h1 className="py-1 font-bold text-xl">{auth.findUser?.firstName + " " + auth.findUser?.lastName}</h1>
            <p>
              @
              {auth.findUser?.firstName?.toLowerCase() +
                "_" +
                auth.findUser?.lastName?.toLowerCase()}
            </p>
          </div>

          {(auth.user?.id === auth.findUser?.id) ?
            (<div className="flex space-x-5 items-center py-3">
              <span>{post.posts.map((item)=>item.user?.id==auth.user?.id).length} posts</span>
              <span>{auth.user?.followers?.length} followers</span>
              <span>{auth.user?.followings?.length} following</span>
            </div>) :
            (<div className="flex space-x-5 items-center py-3">
              <span>{post.posts.map((item)=>item.user.id==auth.findUser?.id).length} posts</span>
              <span>{auth.findUser?.followers?.length} followers</span>
              <span>{auth.findUser?.followings?.length} following</span>
            </div>)
          }
          {(auth.user?.id === auth.findUser?.id) ?
            <div className="">
              <p>{auth.user?.bio} </p>
            </div> :
            <div className="">
              <p>{auth.findUser?.bio} </p>
            </div>
          }

        </div>
        <section>
          <Box sx={{ width: "100%", borderBottom: 1, borderColor: "divider" }}>
            <Tabs
              value={value}
              onChange={handleChange}
              aria-label="wrapped label tabs example"
            >
              {tabs.map((item) => (
                <Tab value={item.value} label={item.name} wrapped />
              ))}
            </Tabs>
          </Box>
          <div className="flex justify-center">
            {value === "post" ? (
              <div className="space-y-5 w-[70%] my-10">
                {post.posts.map((item) => (
                  <div className="border border-[#3b4054] rounded-md">
                    <PostCard item={item} />{" "}
                  </div>
                ))}
              </div>
            ) : value === "repost" ? (
              <div>Repost</div>
            ) : value === "reels" ? (
              <div className="flex flex-wrap py-5">

                {reel.reels.map((reel) => (
                  <UsersReelCard reel={reel} />
                ))}
              </div>
            ) : (
              <div>{auth.findUser?.savedPosts.map((item) => <PostCard item={item} />)}</div>
            )}
          </div>
        </section>
      </div>
      <section>
        <ProfileModel open={openModel} handleClose={handleCloseProfileModal} />
      </section>
    </div>
  );
};

export default Profile;
