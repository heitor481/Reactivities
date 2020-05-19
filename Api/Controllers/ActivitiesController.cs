using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Application.Activities;
using Domain.Entities;
using MediatR;
using Microsoft.AspNetCore.Mvc;

namespace Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ActivitiesController : ControllerBase
    {
        private readonly IMediator mediator;

        public ActivitiesController(IMediator mediator)
        {
            this.mediator = mediator;
        }

        [HttpGet]
        public async Task<ActionResult<List<Activity>>> List() 
        {
            return await this.mediator.Send(new List.Query());
        } 

        [HttpGet("{id}")]
        public async Task<ActionResult<Activity>> Details(Guid id) 
        {
            return await this.mediator.Send(new Details.Query{Id = id});
        }

        [HttpPost]
        public async Task<ActionResult<Unit>> Create(Create.Command command) 
        {
            return await mediator.Send(command);
        }
    }
}