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
			localStorage.setItem("token", data.data.token)
			localStorage.setItem("role", data.data.role)
			localStorage.setItem("employeeId", data.data.employeeId)
			showSuccess("Login successfull");
		},
		onError: () => {
			showError("Error logging in");
		},
	});
};

