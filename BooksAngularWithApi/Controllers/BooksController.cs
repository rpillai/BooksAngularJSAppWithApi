using System;
using System.Collections.Generic;
using System.Collections.ObjectModel;
using System.Data;
using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Threading.Tasks;
using System.Web.Http;
using System.Web.Http.Description;
using BooksAngularWithApi.Models;
using Microsoft.Ajax.Utilities;
using WebGrease.Css.Extensions;

namespace BooksAngularWithApi.Controllers
{
    [Authorize]
    public class BooksController : ApiController
    {
        private ApplicationDbContext db = new ApplicationDbContext();

        // GET: api/Books
        [AllowAnonymous]
        public IQueryable<Book> GetBooks()
        {
            return db.Books.Include(b => b.Author).Include(b => b.Reviews);
        }

        // GET: api/Books/5
        [ResponseType(typeof(BookReviewModel))]
        public async Task<IHttpActionResult> GetBook(int id)
        {
            var book =
                await
                    db.Books.Include(br => br.Reviews.Select(r => r.User))
                            .Include(ba => ba.Author)
                            .Select(b1 => new BookReviewModel
                            {
                                Id = b1.Id,
                                AuthorName = b1.Author.Name,
                                Reviews = b1.Reviews.Select(r => new ReviewUserModel
                                {
                                    Comment = r.Comment,
                                    UserName = r.User.UserName
                                }),
                                Price = b1.Price,
                                Genre = b1.Genre,
                                Title = b1.Title,
                                Year = b1.Year
                            })
                            .Where(b => b.Id == id)
                            .FirstOrDefaultAsync();


            if (book == null)
            {
                return NotFound();
            }



            return Ok(book);
        }

        // PUT: api/Books/5
        [ResponseType(typeof(void))]
        public async Task<IHttpActionResult> PutBook(int id, Book book)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != book.Id)
            {
                return BadRequest();
            }

            db.Entry(book).State = EntityState.Modified;

            try
            {
                await db.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!BookExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return StatusCode(HttpStatusCode.NoContent);
        }

        // POST: api/Books
        [ResponseType(typeof(Book))]
        public async Task<IHttpActionResult> PostBook(Book book)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.Books.Add(book);
            await db.SaveChangesAsync();

            return CreatedAtRoute("DefaultApi", new { id = book.Id }, book);
        }

        // DELETE: api/Books/5
        [ResponseType(typeof(Book))]
        public async Task<IHttpActionResult> DeleteBook(int id)
        {
            Book book = await db.Books.FindAsync(id);
            if (book == null)
            {
                return NotFound();
            }

            db.Books.Remove(book);
            await db.SaveChangesAsync();

            return Ok(book);
        }


        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool BookExists(int id)
        {
            return db.Books.Count(e => e.Id == id) > 0;
        }
    }
}