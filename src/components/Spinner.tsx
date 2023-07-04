import GridLoader from 'react-spinners/GridLoader'

function Spinner() {
  return (
    <div className='loading fixed z-50 top-0 left-0 w-full h-full bg-[rgba(0,0,0,0.5] grid place-items-center'>
      <GridLoader size={20} margin={5} color={'#4ca1af'} />
    </div>
  )
}

export default Spinner
