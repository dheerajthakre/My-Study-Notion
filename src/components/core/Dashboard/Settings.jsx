import React from 'react'
import EditProfile from "./Settings/EditProfile"
import DeleteAccount from "./Settings/DeleteAccount"
import UpdatePassword from "./Settings/UpdatePassword"
import ChangeProfilePicture from "./Settings/ChangeProfilePicture"

export default function Settings() {
  return (
    <div>
        <h1 className='mb-14 text-3xl font-medium text-richblack-5'>
            Edit Profile
        </h1>
        {/* Change Profile Picture */}
        <ChangeProfilePicture />

        {/* Profile */}
        <EditProfile />

        {/* Password */}
        <UpdatePassword />

        {/* Delete Account */}
        <DeleteAccount />
    </div>
  )
}
