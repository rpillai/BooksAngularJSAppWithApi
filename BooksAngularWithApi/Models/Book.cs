using System;
using System.Collections.Generic;
using System.Collections.ObjectModel;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace BooksAngularWithApi.Models
{
    public class Book
    {
        public int Id { get; set; }

        [Required]
        public string Title { get; set; }
        public decimal Price { get; set; }
        public int Year { get; set; }
        public string Genre { get; set; }

        public int AuthorId { get; set; }
        public Author Author { get; set; }

        public ICollection<Review> Reviews { get; set; } 
    }

    public class BookReviewModel
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public int Year { get; set; }
        public string Genre { get; set; }
        public string AuthorName { get; set; }
        public decimal Price { get; set; }

        public IEnumerable<ReviewUserModel> Reviews { get; set; }
    }



}