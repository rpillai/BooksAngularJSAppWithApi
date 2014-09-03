using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Threading.Tasks;
using System.Web;
using System.Web.Http;
using System.Web.Http.Description;
using BooksAngularWithApi.Models;
using Microsoft.AspNet.Identity;

namespace BooksAngularWithApi.Controllers
{
    [RoutePrefix("api/Address")]
    public class AddressController : ApiController
    {
        private ApplicationDbContext context = new ApplicationDbContext();

        [ResponseType(typeof(IQueryable<Address>))]
        public async Task<IHttpActionResult> GetAddress()
        {
            var address = await context.Addresses.ToListAsync();
            return Ok(address);
        }

        [ResponseType(typeof(Address))]
        public async Task<IHttpActionResult> PostAddress(Address address)
        {
            context.Addresses.Add(address);
            await context.SaveChangesAsync();
            return CreatedAtRoute("DefaultApi", new { id = address.AddressID }, address);
        }

        //[ResponseType(typeof(Address))]
        //[HttpPost]
        //[Route("{username}")]
        //public async Task<IHttpActionResult> SaveAddressforUser(string userName)
        //{
        //    await context.SaveChangesAsync();
        //    return Ok();
        //}

        //[Route("/user/{AddressType}")]
        //[ResponseType(typeof(Address))]
        //public async Task<IHttpActionResult> GetAddressByUserByType(string addressType)
        //{
        //    var userId = HttpContext.Current.User.Identity.GetUserId();
        //    var address  = await context.Addresses.Include(a => a.Users.Where(u => u.Id == userId))
        //        .Where(ad => Enum.Parse(typeof (AddressType), addressType).Equals(ad.AddressType)).ToListAsync();

        //    return Ok(address);
        //}

    }


}
