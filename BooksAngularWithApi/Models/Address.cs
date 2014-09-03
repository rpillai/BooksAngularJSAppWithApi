using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace BooksAngularWithApi.Models
{
    public class Address
    {
        public int AddressID { get; set; }
        public string Address1 { get; set; }
        public string Address2 { get; set; }
        public string Suburb { get; set; }
        public int PostCode { get; set; }
        public string State { get; set; }
        public AddressType AddressType { get; set; }

        public ICollection<ApplicationUser> Users { get; set; } 
    }

    public enum AddressType
    {
        contact = 1,
        shipping = 2
    }
}