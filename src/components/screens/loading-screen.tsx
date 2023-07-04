const LoadingScreen = () => {
  return (
    <section
      aria-label='Loading screen'
      role='presentation'
      className='grid w-full min-h-screen px-4 max-w-screen-2xl place-items-center'
    >
      <div
        role='progressbar'
        className='w-20 border-red-600 border-solid rounded-full aspect-square animate-spin border-y-4 border-t-transparent'
      />
    </section>
  )
}

export default LoadingScreen
