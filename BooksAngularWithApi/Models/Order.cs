using System;
using System.Collections.Generic;
using System.Collections.ObjectModel;
using System.Linq;
using System.Web;

namespace BooksAngularWithApi.Models
{
    public class Order
    {
        public int Id { get; set; }
        public DateTime OrderDate { get; set; }
        public decimal? OrderAmount { get; set; }
        public string Comment { get; set; }
        
        public string UserId { get; set; }
        public ApplicationUser User { get; set; }

        public ICollection<OrderDetail> OrderDetails { get; set; }
    }
}