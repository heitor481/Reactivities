using System;
using System.Threading;
using System.Threading.Tasks;
using Domain.Entities;
using MediatR;
using Persistence;
using static Application.Activities.Create;

namespace Application.Activities
{
    public class Create
    {
        public class Command : IRequest 
        {
            public Guid Id { get; set; } 

            public string Title { get; set; }

            public string Description { get; set; }

            public string Category { get; set; }

            public DateTime Date { get; set; }

            public string City { get; set; }

            public string Venue { get; set; }
        }
    }

    public class Handler : IRequestHandler<Command>
    {
        private readonly DataContext dataContext;

        public Handler(DataContext dataContext)
        {
            this.dataContext = dataContext;
        }

        public async Task<Unit> Handle(Command request, CancellationToken cancellationToken)
        {
            var activity = new Activity
            {
                Id = request.Id,
                Description = request.Description,
                Title = request.Title,
                Category = request.Category,
                Date = request.Date,
                City = request.City,
                Venue = request.Venue
            };

            this.dataContext.Activities.Add(activity);
            var success = await this.dataContext.SaveChangesAsync() > 0;
            if(success) return Unit.Value;

            throw new Exception("Problem saving changes");
        }
    }
}