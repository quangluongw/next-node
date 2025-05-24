"use client";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub, faGoogle } from "@fortawesome/free-brands-svg-icons";
import { SubmitHandler, useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { loginWithEmail } from "@/app/actions/auth/login";
import { toast } from "sonner";
import { User } from "@/types/user";
export default function Login() {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<User>();
  const onSubmit: SubmitHandler<User> = async (values: {
    email: string;
    password: string;
  }) => {
    try {
      
      await loginWithEmail(values);
      router.refresh();
      router.push("/");
      toast.success("Đăng nhập thành công")
    } catch (error) {
      console.log(error);
      
    }
  };
  return (
    <>
      <div className="form-container mx-auto my-10">
        <p className="title dark:text-black">Welcome back</p>
        <form className="form" onSubmit={handleSubmit(onSubmit)}>
          <input
            type="email"
            className="input dark:text-black"
            placeholder="Email"
            {...register("email", { required: "Email is required" })}
          />
          {errors.email && (
            <span className="text-red-500">{errors.email.message}</span>
          )}
          <input
            type="password"
            className="input dark:text-black"
            placeholder="Password"
            {...register("password", { required: "Password is required" })}
          />
          {errors.password && (
            <span className="text-red-500">{errors.password.message}</span>
          )}
          <Link href="forgotPassword" className="page-link">
            <span className="page-link-label">Forgot Password?</span>
          </Link>
          <button className="form-btn" type="submit">
            Log in
          </button>
        </form>
        <p className="sign-up-label">
          have an account?<span className="sign-up-link">Sign up</span>
        </p>
        <div className="buttons-container">
          <div className="apple-login-button">
            <FontAwesomeIcon icon={faGithub} className="text-xl" />
            <span>Log in with Github</span>
          </div>
          <div className="google-login-button">
            <FontAwesomeIcon
              icon={faGoogle}
              className="dark:text-black text-xl"
            />
            <span className="dark:text-black">Log in with Google</span>
          </div>
        </div>
      </div>
    </>
  );
}
