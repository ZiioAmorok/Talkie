import { useForm } from "react-hook-form";

type FormValues = {
  email: string;
  password: string;
  rememberMe: boolean;
};

type LoginFormProps = {
  switchToRegister: ()  => void;
}

const LoginForm: React.FC<LoginFormProps> = ({switchToRegister}) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm<FormValues>();

  const onSubmit = (data: FormValues) => {
    console.log(data);
    reset();
  };

  return (
    <div className="min-h-screen flex items-center justify-center text-pink-400">
      <form
        onSubmit={handleSubmit(onSubmit)}
        noValidate
        className="p-8 w-full max-w-md space-y-4"
      >
        <h1 className="text-2xl font-bold mb-4 text-center">Prihlásenie</h1>

        {/* Email */}
        <div>
          <label htmlFor="email" className="block mb-1 font-medium">
            Email
          </label>
          <input
            {...register("email", {
              required: "Email je povinný",
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: "Neplatný formát emailu"
              }
            })}
            type="email"
            id="email"
            className="w-full p-2 rounded bg-[#6272a4] text-[#f8f8f2] focus:outline-none focus:ring-2 focus:ring-[#bd93f9]"
          />
          {errors.email && (
            <p className="text-violet-400 mt-1 text-sm">{errors.email.message}</p>
          )}
        </div>

        {/* Password */}
        <div>
          <label htmlFor="password" className="block mb-1 font-medium">
            Heslo
          </label>
          <input
            {...register("password", { required: "Heslo je povinné" })}
            type="password"
            id="password"
            className="w-full p-2 rounded bg-[#6272a4] text-[#f8f8f2] focus:outline-none focus:ring-2 focus:ring-[#bd93f9]"
          />
          {errors.password && (
            <p className="text-violet-400 mt-1 text-sm">{errors.password.message}</p>
          )}
        </div>

        {/* Remember Me */}
        <div className="flex items-center space-x-2">
          <input
            {...register("rememberMe")}
            type="checkbox"
            id="rememberMe"
            className="accent-pink-400 w-4 h-4"
          />
          <label htmlFor="rememberMe" className="font-medium">
            Zapamätať si ma 
          </label>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-pink-400 text-[#282a36] py-2 px-4 rounded font-semibold hover:bg-pink-300 transition duration-200"
        >
          Prihlásiť sa
        </button>

        <p className="text-center mt-4 text-sm">
          Nemáš účet?{" "}
          <button
            type="button"
            onClick={switchToRegister}
            className="text-violet-400 hover:underline"
          >
            Zaregistruj sa
          </button>
        </p>
      </form>
    </div>
  );
};

export default LoginForm;
