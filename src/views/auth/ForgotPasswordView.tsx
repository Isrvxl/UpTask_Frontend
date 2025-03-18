import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { ForgotPasswordFormData } from "../../types";
import { forgotPassword } from "@/api/AuthAPI";
import { useMutation } from "@tanstack/react-query";
import ErrorMessage from "@/components/ErrorMessage";

export default function ForgotPasswordView() {

    const initialValues: ForgotPasswordFormData = {email: ''}
     
    const { register, handleSubmit, reset, formState: { errors } } = useForm({ defaultValues: initialValues });

    const { mutate } = useMutation({
        mutationFn: forgotPassword,
        onError: (error) => {
            toast.error(error.message)
        },
        onSuccess: (data) => {
            toast.success(data)
            reset()
        }
    })
    
    const handleForgotPassword = (formData: ForgotPasswordFormData) => mutate(formData)


    return (
        <>
            <h1 className="text-5xl font-black text-white">Reestablecer contraseña</h1>
            <p className="text-2xl font-light text-white mt-5">¿Olvidaste tu contraseña? ingresa tu email {''}<span className=" text-fuchsia-500 font-bold">y reestablece tu contraseña</span></p>
            <form onSubmit={handleSubmit(handleForgotPassword)} className="space-y-8 mt-10 p-10  bg-white" noValidate>
                <div className="flex flex-col gap-5">
                    <label className="font-normal text-2xl" htmlFor="email">Email</label>
                    <input id="email" type="email" placeholder="Ingresa tu email" className="w-full p-3  border-gray-300 border"
                        {...register("email", {
                            required: "El email es obligatorio",
                            pattern: {
                                value: /\S+@\S+\.\S+/,
                                message: "Email no válido",
                            },
                        })}
                    />
                    {errors.email && ( <ErrorMessage>{errors.email.message}</ErrorMessage> )}
                </div>
                <input type="submit" value='Enviar Email' className="bg-fuchsia-600 hover:bg-fuchsia-700 w-full p-3  text-white font-black  text-xl cursor-pointer" />
            </form>
            <nav className="mt-10 flex flex-col space-y-4">
                <Link to={'/auth/login'} className="text-center text-gray-300 font-normal">¿Ya tienes cuenta? Iniciar Sesión</Link>
                <Link to={'/auth/register'} className="text-center text-gray-300 font-normal">¿No tienes cuenta? Crear Una</Link>
            </nav>
        </>
    )
}