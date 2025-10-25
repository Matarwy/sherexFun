import dynamic from 'next/dynamic'
const Profile = dynamic(() => import('@/features/Birthpad/Profile'))

function ProfilePage() {
  return <Profile />
}

export default ProfilePage
