namespace backend.Models.Enums
{
    public enum VendorStatus
    {
        Pending = 1,
        Approved = 2,
        Rejected = 3,
        Blacklisted = 4,
        Inactive = 5,
    }

    public enum GstType
    {
        Regular = 1,
        Composition = 2,
        Unregistered = 3,
        Consumer = 4,
    }
}
