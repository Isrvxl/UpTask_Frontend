import { useForm } from "react-hook-form"
import ErrorMessage from "../ErrorMessage"
import { User, UserProfileFormData } from "@/types/index"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { updateProfile } from "@/api/ProfileAPI"
import { toast } from "react-toastify"

type ProfileFormProps = {
    data: User
}

export default function ProfileForm({data}: ProfileFormProps) {

    const { register, handleSubmit, formState: {errors} } = useForm<UserProfileFormData>({defaultValues: data})

    const queryClient = useQueryClient()

    const { mutate } = useMutation({
        mutationFn: updateProfile,
        onError: (error) => {
            toast.error(error.message)
        },
        onSuccess: (data) => {
            toast.success(data)
            queryClient.invalidateQueries({queryKey: ['user']})
        }
    })

    const handleEditProfile = (formData: UserProfileFormData) => mutate(formData)

    return (
        <>
            <div className="mx-auto max-w-3xl g">
                <h1 className="text-5xl font-black ">Mi Perfil</h1>
                <p className="text-2xl font-light text-gray-500 mt-5">Aquí puedes actualizar tu información</p>
                <form onSubmit={handleSubmit(handleEditProfile)} className=" mt-10 space-y-5  bg-white shadow-lg p-10 rounded-l" noValidate>
                    <div className="mb-5 space-y-3">
                        <label className="text-sm uppercase font-bold" htmlFor="name">Nombre</label>
                        <input id="name" type="text" placeholder="Ingresa el nombre" className="w-full p-3  border border-gray-200" {...register("name", {required: "El nombre es obligatorio"})}/>
                        {errors.name && ( <ErrorMessage>{errors.name.message}</ErrorMessage> )}
                    </div>
                    <div className="mb-5 space-y-3">
                        <label className="text-sm uppercase font-bold" htmlFor="password">Email</label>
                        <input id="text" type="email" placeholder="Ingresa el email" className="w-full p-3  border border-gray-200"
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
                    <input type="submit" value='Guardar Cambios' className="bg-fuchsia-600 w-full p-3 text-white uppercase font-bold hover:bg-fuchsia-700 cursor-pointer transition-colors"/>
                </form>
            </div>
        </>
    )
}