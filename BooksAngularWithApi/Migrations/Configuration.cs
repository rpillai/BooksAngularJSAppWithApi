using System.Collections.Generic;
using System.Net.Mime;
using System.Threading;
using System.Web.UI;
using BooksAngularWithApi.Models;
using Microsoft.AspNet.Identity;
using Microsoft.AspNet.Identity.EntityFramework;

namespace BooksAngularWithApi.Migrations
{
    using System;
    using System.Data.Entity;
    using System.Data.Entity.Migrations;
    using System.Linq;

    internal sealed class Configuration : DbMigrationsConfiguration<ApplicationDbContext>
    {
        public Configuration()
        {
            AutomaticMigrationsEnabled = false;
            ContextKey = "BooksAngularWithApi.Models.ApplicationDbContext";
        }


        
        protected override void Seed(ApplicationDbContext context)
        {

            var userManager = new ApplicationUserManager(new UserStore<ApplicationUser>(new ApplicationDbContext()));

            var newUser = userManager.FindByName("ramesh.pillai@gmail.com");



            if (newUser == null)
            {
                newUser = new ApplicationUser
                {
                    Email = "ramesh.pillai@gmail.com",
                    UserName = "ramesh.pillai@gmail.com"
                };

                userManager.Create(newUser, "password1");
            }

            context.Authors.AddOrUpdate(a => a.Name,
                    new Author { Id = 1, Name = "Jane Austen" },
                    new Author { Id = 2, Name = "Charles Dickens" },
                    new Author { Id = 3, Name = "Migule de Cervantes" }
            );

            context.Books.AddOrUpdate(x => x.Id,
                    new Book { Id = 1, Title = "Pride and Prejudice", Year = 1813, AuthorId = 1, Price = 9.99m, Genre = "Comedy of manners" },
                    new Book { Id = 2, Title = "Northanger Abbey", Year = 1817, AuthorId = 1, Price = 12.95m, Genre = "gothic Parody" },
                    new Book { Id = 3, Title = "David Copperfield", Year = 1850, AuthorId = 2, Price = 15m, Genre = "Bildungsroman" },
                    new Book { Id = 4, Title = "Don Quixote", Year = 1617, AuthorId = 3, Price = 8.95m, Genre = "Picaresque" }
                );

            context.Reviews.AddOrUpdate(x => x.Id,
                new Review { BookId = 1, Comment = "This is a awesome book", UserID = newUser.Id },
                new Review { BookId = 2, Comment = "This is a awesome book 2", UserID = newUser.Id },
                new Review { BookId = 3, Comment = "This is a awesome book 3", UserID = newUser.Id },
                new Review { BookId = 1, Comment = "This is a awesome book 1.1", UserID = newUser.Id },
                new Review { BookId = 2, Comment = "This is a awesome book 2.1", UserID = newUser.Id },
                new Review { BookId = 3, Comment = "This is a awesome book 3.1", UserID = newUser.Id },
                new Review { BookId = 3, Comment = "This is a awesome book 3.2", UserID = newUser.Id });

            //  This method will be called after migrating to the latest version.

            //  You can use the DbSet<T>.AddOrUpdate() helper extension method 
            //  to avoid creating duplicate seed data. E.g.
            //
            //    context.People.AddOrUpdate(
            //      p => p.FullName,
            //      new Person { FullName = "Andrew Peters" },
            //      new Person { FullName = "Brice Lambson" },
            //      new Person { FullName = "Rowan Miller" }
            //    );
            //
        }
    }
}
