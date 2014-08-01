using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace BooksAngularWithApi.Models
{
    public class OrderDetail
    {
        public int Id { get; set; }
        public decimal UnitPrice { get; set; }
        public int Qty { get; set; }
        public decimal? lineTotal { get; set; }

        public int OrderId { get; set; }
        public int BookId { get; set; }
        public Book Book { get; set; }

    }
}