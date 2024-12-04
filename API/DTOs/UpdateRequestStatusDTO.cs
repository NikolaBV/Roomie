using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Domain.Enums;

namespace API.DTOs
{
    public class UpdateRequestStatusDTO
    {
        public Guid RequestId { get; set; }
        public RequestStatus NewStatus { get; set; }
    }
}