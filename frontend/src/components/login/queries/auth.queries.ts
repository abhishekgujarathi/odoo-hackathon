import { useMutation, useQuery } from "@tanstack/react-query";
import { AuthService } from "../services/auth.service";
import { showError, showSuccess } from "../../ui/toast";

export const useLogin = () => {
	return useMutation({
		mutationFn: async ({
			email,
			password,
		}: {
			email: string;
			password: string;
		}) => {
			const response = await AuthService.login(email, password);
			console.log(response)
			return response.data;
		},
		onSuccess: (data) => {
			localStorage.setItem("jwtToken", data.jwtToken)
			localStorage.setItem("role", data.role)
			showSuccess("Login successfull");
		},
		onError: () => {
			showError("Error logging in");
		},
	});
};

