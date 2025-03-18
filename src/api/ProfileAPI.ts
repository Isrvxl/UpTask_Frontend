import api from "@/lib/axios"
import { isAxiosError } from "axios"
import { UpdateCurrentPasswordFormData, UserProfileFormData } from "../types"

export async function updateProfile(formData: UserProfileFormData) {
    try {
        const url = '/auth/profile'
        const { data } = await api.put<string>(url, formData)
        return data
    } catch (error) {
        if(isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error)
        }
    }
}

export async function updatePassword(formData: UpdateCurrentPasswordFormData) {
    try {
        const url = '/auth/update-password'
        const { data } = await api.post<string>(url, formData)
        return data
    } catch (error) {
        if(isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error)
        }
    }
}