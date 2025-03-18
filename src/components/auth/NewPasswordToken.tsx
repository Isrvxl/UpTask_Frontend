import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Dispatch, SetStateAction } from 'react';
import { vaidateToken } from '@/api/AuthAPI';
import { useMutation } from '@tanstack/react-query';
import { ConfirmTokenFormData } from "@/types/index"
import { PinInput, PinInputField } from '@chakra-ui/pin-input';

type NewPasswordTokenProps = {
    token: ConfirmTokenFormData['token']
    setToken: Dispatch<SetStateAction<string>>
    setIsValidToken: Dispatch<SetStateAction<boolean>>
}

export default function NewPasswordToken({token, setToken, setIsValidToken}: NewPasswordTokenProps) {

    const handleChange = (token: ConfirmTokenFormData['token']) => setToken(token)

   const { mutate } = useMutation({
        mutationFn: vaidateToken,
        onError: (error) => {
            toast.error(error.message)
        },
        onSuccess: (data) => {
            toast.success(data)
            setIsValidToken(true)
        }
    })

    const handleComplete = (token: ConfirmTokenFormData['token']) => mutate({token})

    return (
        <>
            <form className="space-y-8 p-10 rounded-lg bg-white mt-10">
                <label className="font-normal text-2xl text-center block">Código de 6 dígitos</label>
                <div className="flex justify-center gap-5">
                    <PinInput value={token} onChange={handleChange} onComplete={handleComplete}>
                        <PinInputField className="h-10 w-10 p-3 rounded-lg border-gray-300 border placeholder-white" />
                        <PinInputField className="h-10 w-10 p-3 rounded-lg border-gray-300 border placeholder-white" />
                        <PinInputField className="h-10 w-10 p-3 rounded-lg border-gray-300 border placeholder-white" />
                        <PinInputField className="h-10 w-10 p-3 rounded-lg border-gray-300 border placeholder-white" />
                        <PinInputField className="h-10 w-10 p-3 rounded-lg border-gray-300 border placeholder-white" />
                        <PinInputField className="h-10 w-10 p-3 rounded-lg border-gray-300 border placeholder-white" />
                    </PinInput>
                </div>
            </form>
            <nav className="mt-10 flex flex-col space-y-4">
                <Link to='/auth/forgot-password' className="text-center text-gray-300 font-normal">Solicitar un nuevo código</Link>
            </nav>
        </>
    )
}