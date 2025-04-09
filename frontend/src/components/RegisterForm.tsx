import { useForm } from 'react-hook-form'
import {useState} from 'react'

type FormValues = {
  username: string
  email: string
  password: string
  confirmPassword: string
};

type RegisterFormProp = {
  switchToLogin: () => void;
}

const RegisterForm: React.FC<RegisterFormProp> = ({switchToLogin}) => {
  const { register, handleSubmit, watch,  formState: { errors } } = useForm<FormValues>()
  const [error, setError] = useState({message: ""})

  const onSubmit = async(data: FormValues) => {
    try{
      const res = await fetch('http://localhost:3000/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })
      const result = await res.json()
      console.log(result)
      if (res.ok) {
        alert("Registrácia bola úspešná!")
        switchToLogin()
      } else {
        setError({message: result.message})
      }
    }
    catch (error) {
      if (error instanceof Error) {
        console.error(error.message);
      }
    }
    
  }

  return (
    <div className="min-h-screen flex items-center justify-center  text-pink-400">
      <form 
        onSubmit={handleSubmit(onSubmit)} 
        className=" p-8 w-full max-w-md space-y-4"
      >
        <h1 className="text-2xl font-bold mb-4 text-center">Registrácia</h1>

        {/* Username */}
        <div>
          <label htmlFor="username" className="block mb-1 font-medium">Meno / Prezývka</label>
          <input 
            {...register("username", {
              required: "Meno je povinné",
              minLength: { value: 5, message: "Meno musí mať aspoň 5 znakov" },
              maxLength: { value: 15, message: "Meno môže mať maximálne 15 znakov" },
            })} 
            type="text"
            id="username"
            className="w-full p-2 rounded bg-[#6272a4] text-[#f8f8f2] focus:outline-none focus:ring-2 focus:ring-[#bd93f9]"
          />
          {errors.username && <p className="text-violet-400 mt-1 text-sm">{errors.username.message}</p>}
        </div>

        {/* Email */}
        <div>
          <label htmlFor="email" className="block mb-1 font-medium">Email</label>
          <input 
            {...register("email", {
              required: "Email je povinný",
              pattern: {
                value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                message: "Zadajte platný email",
              },
            })} 
            type="email"
            id="email"
            className="w-full p-2 rounded bg-[#6272a4] text-[#f8f8f2] focus:outline-none focus:ring-2 focus:ring-[#bd93f9]"
          />
          {errors.email && <p className="text-violet-400 mt-1 text-sm">{errors.email.message}</p>}
        </div>

        {/* Password */}
        <div>
          <label htmlFor="password" className="block mb-1 font-medium">Heslo</label>
          <input 
            {...register("password", {
              required: "Heslo je povinné",
              minLength: { value: 6, message: "Heslo musí mať aspoň 6 znakov" },
              maxLength: { value: 20, message: "Heslo môže mať maximálne 20 znakov" },
            })}
            type="password"
            id="password"
            className="w-full p-2 rounded bg-[#6272a4] text-[#f8f8f2] focus:outline-none focus:ring-2 focus:ring-[#bd93f9]"
          />
          {errors.password && <p className="text-violet-400 mt-1 text-sm">{errors.password.message}</p>}
        </div>

        {/* Confirm Password */}
        <div>
          <label htmlFor="confirmPassword" className="block mb-1 font-medium">Potvrdenie hesla</label>
          <input 
            {...register("confirmPassword", {
              required: "Potvrdenie hesla je povinné",
              validate: (value) => value === watch("password") || "Heslá sa musia zhodovať",
            })}
            type="password" 
            id="confirmPassword"
            className="w-full p-2 rounded bg-[#6272a4] text-[#f8f8f2] focus:outline-none focus:ring-2 focus:ring-[#bd93f9]"
          />
          {errors.confirmPassword && <p className="text-violet-400 mt-1 text-sm">{errors.confirmPassword.message}</p>}
        </div>

        {/* Submit Button */}
        <button 
          type="submit" 
          className="w-full bg-pink-400 text-[#282a36] py-2 px-4 rounded font-semibold hover:bg-pink-300 transition duration-200"
        >
          Potvrdiť
        </button>

        <h2 className='text-center text-2xl'>{error.message}</h2>

        <p className="text-sm mt-4 text-center">
        Máš účet?{" "}
        <button
          type="button"
          onClick={switchToLogin}
          className="text-violet-400 hover:underline"
        >
          Prihlásiť sa
        </button>
      </p>
      </form>
      
    </div>
  )
}

export default RegisterForm
