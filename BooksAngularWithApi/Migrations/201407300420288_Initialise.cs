namespace BooksAngularWithApi.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class Initialise : DbMigration
    {
        public override void Up()
        {
            CreateTable(
                "dbo.Author",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        Name = c.String(nullable: false),
                    })
                .PrimaryKey(t => t.Id);
            
            CreateTable(
                "dbo.Book",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        Title = c.String(nullable: false),
                        Price = c.Decimal(nullable: false, precision: 18, scale: 2),
                        Year = c.Int(nullable: false),
                        Genre = c.String(),
                        AuthorId = c.Int(nullable: false),
                    })
                .PrimaryKey(t => t.Id)
                .ForeignKey("dbo.Author", t => t.AuthorId, cascadeDelete: true)
                .Index(t => t.AuthorId);
            
            CreateTable(
                "dbo.OrderDetail",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        UnitPrice = c.Decimal(nullable: false, precision: 18, scale: 2),
                        Qty = c.Int(nullable: false),
                        lineTotal = c.Decimal(precision: 18, scale: 2),
                        OrderId = c.Int(nullable: false),
                        BookId = c.Int(nullable: false),
                    })
                .PrimaryKey(t => t.Id)
                .ForeignKey("dbo.Book", t => t.BookId, cascadeDelete: true)
                .ForeignKey("dbo.Order", t => t.OrderId, cascadeDelete: true)
                .Index(t => t.OrderId)
                .Index(t => t.BookId);
            
            CreateTable(
                "dbo.Review",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        Comment = c.String(),
                        BookId = c.Int(nullable: false),
                        UserID = c.String(maxLength: 128),
                    })
                .PrimaryKey(t => t.Id)
                .ForeignKey("dbo.AspNetUsers", t => t.UserID)
                .ForeignKey("dbo.Book", t => t.BookId, cascadeDelete: true)
                .Index(t => t.BookId)
                .Index(t => t.UserID);
            
            CreateTable(
                "dbo.AspNetUsers",
                c => new
                    {
                        Id = c.String(nullable: false, maxLength: 128),
                        Email = c.String(maxLength: 256),
                        EmailConfirmed = c.Boolean(nullable: false),
                        PasswordHash = c.String(),
                        SecurityStamp = c.String(),
                        PhoneNumber = c.String(),
                        PhoneNumberConfirmed = c.Boolean(nullable: false),
                        TwoFactorEnabled = c.Boolean(nullable: false),
                        LockoutEndDateUtc = c.DateTime(),
                        LockoutEnabled = c.Boolean(nullable: false),
                        AccessFailedCount = c.Int(nullable: false),
                        UserName = c.String(nullable: false, maxLength: 256),
                    })
                .PrimaryKey(t => t.Id)
                .Index(t => t.UserName, unique: true, name: "UserNameIndex");
            
            CreateTable(
                "dbo.AspNetUserClaims",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        UserId = c.String(nullable: false, maxLength: 128),
                        ClaimType = c.String(),
                        ClaimValue = c.String(),
                    })
                .PrimaryKey(t => t.Id)
                .ForeignKey("dbo.AspNetUsers", t => t.UserId, cascadeDelete: true)
                .Index(t => t.UserId);
            
            CreateTable(
                "dbo.AspNetUserLogins",
                c => new
                    {
                        LoginProvider = c.String(nullable: false, maxLength: 128),
                        ProviderKey = c.String(nullable: false, maxLength: 128),
                        UserId = c.String(nullable: false, maxLength: 128),
                    })
                .PrimaryKey(t => new { t.LoginProvider, t.ProviderKey, t.UserId })
                .ForeignKey("dbo.AspNetUsers", t => t.UserId, cascadeDelete: true)
                .Index(t => t.UserId);
            
            CreateTable(
                "dbo.AspNetUserRoles",
                c => new
                    {
                        UserId = c.String(nullable: false, maxLength: 128),
                        RoleId = c.String(nullable: false, maxLength: 128),
                    })
                .PrimaryKey(t => new { t.UserId, t.RoleId })
                .ForeignKey("dbo.AspNetUsers", t => t.UserId, cascadeDelete: true)
                .ForeignKey("dbo.AspNetRoles", t => t.RoleId, cascadeDelete: true)
                .Index(t => t.UserId)
                .Index(t => t.RoleId);
            
            CreateTable(
                "dbo.Order",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        OrderDate = c.DateTime(nullable: false),
                        OrderAmount = c.Decimal(precision: 18, scale: 2),
                        Address1 = c.String(),
                        Address2 = c.String(),
                        Suburb = c.String(),
                        PostCode = c.Int(nullable: false),
                        State = c.String(),
                        Comment = c.String(),
                        UserId = c.String(maxLength: 128),
                    })
                .PrimaryKey(t => t.Id)
                .ForeignKey("dbo.AspNetUsers", t => t.UserId)
                .Index(t => t.UserId);
            
            CreateTable(
                "dbo.AspNetRoles",
                c => new
                    {
                        Id = c.String(nullable: false, maxLength: 128),
                        Name = c.String(nullable: false, maxLength: 256),
                    })
                .PrimaryKey(t => t.Id)
                .Index(t => t.Name, unique: true, name: "RoleNameIndex");
            
        }
        
        public override void Down()
        {
            DropForeignKey("dbo.AspNetUserRoles", "RoleId", "dbo.AspNetRoles");
            DropForeignKey("dbo.Order", "UserId", "dbo.AspNetUsers");
            DropForeignKey("dbo.OrderDetail", "OrderId", "dbo.Order");
            DropForeignKey("dbo.Review", "BookId", "dbo.Book");
            DropForeignKey("dbo.Review", "UserID", "dbo.AspNetUsers");
            DropForeignKey("dbo.AspNetUserRoles", "UserId", "dbo.AspNetUsers");
            DropForeignKey("dbo.AspNetUserLogins", "UserId", "dbo.AspNetUsers");
            DropForeignKey("dbo.AspNetUserClaims", "UserId", "dbo.AspNetUsers");
            DropForeignKey("dbo.OrderDetail", "BookId", "dbo.Book");
            DropForeignKey("dbo.Book", "AuthorId", "dbo.Author");
            DropIndex("dbo.AspNetRoles", "RoleNameIndex");
            DropIndex("dbo.Order", new[] { "UserId" });
            DropIndex("dbo.AspNetUserRoles", new[] { "RoleId" });
            DropIndex("dbo.AspNetUserRoles", new[] { "UserId" });
            DropIndex("dbo.AspNetUserLogins", new[] { "UserId" });
            DropIndex("dbo.AspNetUserClaims", new[] { "UserId" });
            DropIndex("dbo.AspNetUsers", "UserNameIndex");
            DropIndex("dbo.Review", new[] { "UserID" });
            DropIndex("dbo.Review", new[] { "BookId" });
            DropIndex("dbo.OrderDetail", new[] { "BookId" });
            DropIndex("dbo.OrderDetail", new[] { "OrderId" });
            DropIndex("dbo.Book", new[] { "AuthorId" });
            DropTable("dbo.AspNetRoles");
            DropTable("dbo.Order");
            DropTable("dbo.AspNetUserRoles");
            DropTable("dbo.AspNetUserLogins");
            DropTable("dbo.AspNetUserClaims");
            DropTable("dbo.AspNetUsers");
            DropTable("dbo.Review");
            DropTable("dbo.OrderDetail");
            DropTable("dbo.Book");
            DropTable("dbo.Author");
        }
    }
}
