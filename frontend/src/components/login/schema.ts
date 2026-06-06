import { min } from "date-fns";
import * as z from "zod";
import { RoleUtil } from "../../auth/role.util";

const fileSchema = z.custom<File>();



// used in login form
export const LoginFormSchema = z.object({
	email: z.email({ message: "Please enter valid email" }),
	password: z.string().min(1, { message: "Please enter valid password" }),
});
// used in login form


export type LoginFormSchemaType = z.infer<typeof LoginFormSchema>;
