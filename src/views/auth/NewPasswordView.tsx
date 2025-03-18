import { useState } from "react"
import NewPasswordForm from "@/components/auth/NewPasswordForm"
import NewPasswordToken from "@/components/auth/NewPasswordToken"
import { ConfirmTokenFormData } from "@/types/index"

export default function NewPasswordView() {

    const [token, setToken] = useState<ConfirmTokenFormData['token']>('')
    const [isValidToken, setIsValidToken] = useState(false)

    return (
        <>
            <h1 className="text-5xl font-black text-white">Reestablecer contraseña</h1>
            <p className="text-2xl font-light text-white mt-5">Ingresa el código que recibiste {''}<span className=" text-fuchsia-500 font-bold">por email</span></p>
            {!isValidToken ? <NewPasswordToken token={token} setToken={setToken} setIsValidToken={setIsValidToken}/> : <NewPasswordForm token={token} />}
        </>
    )
}
