import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { updatePassword } from "@/api/AuthAPI";
import { useMutation } from "@tanstack/react-query";
import ErrorMessage from "@/components/ErrorMessage";
import type { ConfirmTokenFormData, NewPasswordFormData } from "../../types";

type NewPasswordFormProps = {
    token: ConfirmTokenFormData['token']
}


export default function NewPasswordForm({token}: NewPasswordFormProps) {

    const navigate = useNavigate()

    const initialValues: NewPasswordFormData = {
        password: '',
        password_confirmation: '',
    }

    const { register, handleSubmit, watch, reset, formState: { errors } } = useForm({ defaultValues: initialValues });

    const { mutate } = useMutation({
        mutationFn: updatePassword,
        onError: (error) => {
            toast.error(error.message)
        },
        onSuccess: (data) => {
            toast.success(data)
            reset()
            navigate('/auth/login')
        }
    })

    const handleNewPassword = (formData: NewPasswordFormData) => {
        const data = {
            formData,
            token
        }
        mutate(data)
    }

    const password = watch('password');

    return (
        <>
            <form onSubmit={handleSubmit(handleNewPassword)} className="space-y-8 p-10  bg-white mt-10" noValidate>
                <div className="flex flex-col gap-5">
                    <label className="font-normal text-2xl">Contraseña</label>
                    <input type="password" placeholder="Ingresa tu contraseña" className="w-full p-3  border-gray-300 border"
                        {...register("password", {
                            required: "La contraseña es obligatoria",
                            minLength: {
                                value: 8,
                                message: 'La contraseña debe ser mínimo de 8 caracteres'
                            }
                        })}
                    />
                    {errors.password && ( <ErrorMessage>{errors.password.message}</ErrorMessage> )}
                </div>
                <div className="flex flex-col gap-5">
                    <label className="font-normal text-2xl">Repetir Contraseña</label>
                    <input id="password_confirmation" type="password" placeholder="Repite la contraseña" className="w-full p-3  border-gray-300 border"
                        {...register("password_confirmation", {
                            required: "Repetir la contraseña es obligatorio",
                            validate: value => value === password || 'Las contraseñas no son iguales'
                        })}
                    />
                    {errors.password_confirmation && ( <ErrorMessage>{errors.password_confirmation.message}</ErrorMessage> )}
                </div>
                <input type="submit" value='Guardar Contraseña' className="bg-fuchsia-600 hover:bg-fuchsia-700 w-full p-3  text-white font-black  text-xl cursor-pointer"/>
            </form>
        </>
    )
}