using API.Entities;
using API.Data;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Authorization;

namespace API.Controllers
{

    // [Authorize]
    public class UsersController : BaseApiController
    {
        DataContext _context;
        public UsersController(DataContext dataContext)
        {
            this._context = dataContext;
        }


        [HttpGet]
        public async Task<ActionResult<IEnumerable<AppUser>>> get()
        {
            return _context.AppUsers.ToList();
        }

        
    }
}