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

    public enum VendorCategory
    {
        ITHardware = 1,
        ITSoftware = 2,
        Furniture = 3,
        Stationery = 4,
        Logistics = 5,
        Maintenance = 6,
        Catering = 7,
        Consulting = 8,
        Construction = 9,
        Other = 99,
    }

    public enum GstType
    {
        Regular = 1,
        Composition = 2,
        Unregistered = 3,
        Consumer = 4,
    }
}
