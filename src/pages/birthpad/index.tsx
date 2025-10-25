import dynamic from 'next/dynamic'

const Birthpad = dynamic(() => import('@/features/Birthpad'))

function BirthpadPage() {
  return <Birthpad />
}

export default BirthpadPage

export async function getStaticProps() {
  return {
    props: { title: 'BirthPad' }
  }
}
