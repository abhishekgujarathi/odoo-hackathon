namespace backend.Models.Enums
{
    public enum UserRole
    {
        Admin = 1,
        ProcurementOfficer = 2,
        Vendor = 3,
        Manager = 4,
    }

    public enum UserStatus
    {
        Active = 1,
        Inactive = 2,
        Suspended = 3,
        PendingVerification = 4,
    }
}
