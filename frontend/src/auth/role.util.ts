
export const roles = {
    admin: "Admin",
    user: "User"
}


const getRole = () => localStorage.getItem("role");
const getId = () => localStorage.getItem("userId")

export const RoleUtil = {
    isAdmin: getRole() === roles.admin,
    isUser: getRole() === roles.user,
    myId: getId()
}