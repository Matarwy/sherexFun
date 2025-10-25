import dynamic from 'next/dynamic'
const Create = dynamic(() => import('@/features/Birthpad/create'))

function CreatePage() {
  return <Create />
}

export default CreatePage

export async function getStaticProps() {
  return {
    props: { title: 'Create new token' }
  }
}
