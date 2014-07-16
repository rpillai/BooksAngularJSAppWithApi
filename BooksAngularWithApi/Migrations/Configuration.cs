using System.Collections.Generic;
using BooksAngularWithApi.Models;

namespace BooksAngularWithApi.Migrations
{
    using System;
    using System.Data.Entity;
    using System.Data.Entity.Migrations;
    using System.Linq;

    internal sealed class Configuration : DbMigrationsConfiguration<BooksAngularWithApi.Models.ApplicationDbContext>
    {
        public Configuration()
        {
            AutomaticMigrationsEnabled = false;
            ContextKey = "BooksAngularWithApi.Models.ApplicationDbContext";
        }

        protected override void Seed(BooksAngularWithApi.Models.ApplicationDbContext context)
        {
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
