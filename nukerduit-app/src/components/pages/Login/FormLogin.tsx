import { useForm } from "react-hook-form";
import InputLabel from "@/components/ui/Input/InputLabel";
import { useEffect, useState } from "react";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import Button from "@/components/ui/Button/Button";
import { useAuthStore, useSessionAuth } from "@/stores/useAuthStore";
import { FaTimes } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

type InputFormLogin = {
  username: string;
  password: string;
};

type Error = {
  message: string;
};

export default function FormLogin() {
  const Navigate = useNavigate();
  const { signIn, process } = useAuthStore();
  const { setSessionUser } = useSessionAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<Error>({
    message: "",
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<InputFormLogin>();

  useEffect(() => {
    console.log(process?.status);
    const handleProcessStatus = () => {
      if (process?.status === "error")
        setError({ message: process?.message || "" });
      if (process?.status === "success" && process?.data) {
        setSessionUser(process?.data);
        Navigate("/admin/dashboard");
      }
        
    };
    handleProcessStatus();
    return () => {
      handleProcessStatus();
      setError({ message: "" });
    };
  }, [process]);

  const onSubmit = async (data: InputFormLogin) => {
    await signIn(data);
  };
  
  return (
    <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit(onSubmit)}>
      {error?.message && (
        <div
          className="p-4 mb-4 text-sm text-red-600 rounded-lg bg-red-100 relative"
          role="alert"
        >
          {error?.message}
          <FaTimes
            className="absolute top-4 right-4 cursor-pointer"
            onClick={() => setError({ message: "" })}
          />
        </div>
      )}
      <InputLabel
        label="Username"
        className="mb-4"
        error={errors.username?.message}
        type="text"
        {...register("username", {
          required: "Username is required",
        })}
    
      />
      <div className="relative">
        <InputLabel
          label="Password"
          className="mb-3"
          error={errors.password?.message}
          type={showPassword ? "text" : "password"}
          {...register("password", {
            required: "Password is required",
          })}
        />
        <button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          className="absolute top-[40px] right-[12px]"
        >
          {showPassword ? (
            <AiFillEyeInvisible size={20} />
          ) : (
            <AiFillEye size={20} />
          )}
        </button>
      </div>
      <Button className="w-full" variant="blue" isLoading={process?.status == 'loading'}>
        Sign in
      </Button>
    </form>
  );
}
