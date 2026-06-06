import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { jwtDecode } from "jwt-decode";

interface AuthSlice {
	isAuthenticated: boolean;
	jwtToken: string;
	role: string;
}

const initialState: AuthSlice = {
	isAuthenticated: false,
	jwtToken: "",
	role: "",
};

const authSlice = createSlice({
	name: "auth",
	initialState,
	reducers: {
		authenticate(state, action: PayloadAction<string>) {
			try {
				if (action.payload.status !== "SUCCESS") {
					console.error("error in login");
					return;
				}

				const data = action.payload.data;
				const jwtToken = data.jwtToken;
				const decoded = jwtDecode(jwtToken);

				state.isAuthenticated = true;
				state.role = decoded.role;
				state.jwtToken = decoded.jwtToken;
				// console.log("authSlice", { ...state })
			} catch (ex) {
				console.error(ex);
			}
		},
	},
});

export const authActions = authSlice.actions;
export const authReducer = authSlice.reducer;
