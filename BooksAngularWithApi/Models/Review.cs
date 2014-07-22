using System;
using System.Collections.Generic;
using System.Collections.ObjectModel;
using System.Linq;
using System.Web;

namespace BooksAngularWithApi.Models
{
    public class Review
    {
        public int Id { get; set; }
        public string Comment { get; set; }

        public int BookId { get; set; }

        public string UserID { get; set; }
        public ApplicationUser User { get; set; }
    }

    public class ReviewUserModel
    {
        public string Comment { get; set; }
        public string UserName { get; set; }
    }
}