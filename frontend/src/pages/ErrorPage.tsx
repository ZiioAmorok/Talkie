import { Link } from 'react-router-dom'

const ErrorPage: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4">
    <h1 className="text-4xl font-bold text-pink-400 mb-4">Oops!</h1>
    <p className="text-lg text-center">
      Niečo sa pokazilo. Skús to prosím znova. 😵
    </p>
    <Link to="/" className="mt-4 bg-pink-400 text-white px-4 py-2 rounded-full">Naspäť na úvod</Link>
      
  </div>
  )
}

export default ErrorPage