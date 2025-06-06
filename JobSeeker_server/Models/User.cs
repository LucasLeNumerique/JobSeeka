namespace JobSeeker_server.Models
{
    public class User
    {
        public int Id { get; set; }
        public required string Email { get; set; }
        public required string PasswordHash { get; set; }
        public required string Role { get; set; } = "Candidate";

        public int? CompanyId { get; set; }
        public Company? Company { get; set; }
    }
}