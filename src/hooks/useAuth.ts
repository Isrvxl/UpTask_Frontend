import { useQuery } from "@tanstack/react-query";
import { getUser } from "@/api/AuthAPI";

export const useAuth = () => {

    const { data, isLoading, isError } = useQuery({
        queryKey: ['user'],
        queryFn: getUser,
        retry: false,
        refetchOnWindowFocus: false,
    })

    return { data, isLoading, isError }

}