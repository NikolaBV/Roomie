using System;
using System.Collections.Generic;
using System.Linq;
using System.Text.Json.Serialization;
using System.Threading.Tasks;
using Domain.Enums;

namespace Domain
{
    public class Property
    {
        public Guid Id { get; set; }
        public string Address { get; set; }
        public ApartmentType ApartmentType { get; set; }
        public int NumberOfRooms { get; set; }
        public bool Furnished { get; set; }
        public decimal Rent { get; set; }
        public string AdditionalNotes { get; set; }

        public Guid PostId { get; set; }

        [JsonIgnore]
        public Post Post { get; set; }
        public string UserId { get; set; }

        [JsonIgnore]
        public User User { get; set; }
    }
}
