using Application.Core;
using Application.Interfaces;
using Application.Profiles;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using MediatR;
using Microsoft.AspNetCore.Mvc.RazorPages.Infrastructure;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Events
{
    public class List
    {
        public class Query : IRequest<Result<List<UserActivityDto>>>
        {
            public string Username { get; set; }
            public string Predicate { get; set; }
        }

        public class Handler : IRequestHandler<Query, Result<List<UserActivityDto>>>
        {
            private readonly DataContext _context;
            private readonly IMapper _mapper;
            public Handler(DataContext context, IMapper mapper)
            {
                _mapper = mapper;
                _context = context;

            }
            public async Task<Result<List<UserActivityDto>>> Handle(Query request, CancellationToken cancellationToken)
            {
                var activities = new List<UserActivityDto>();

                switch (request.Predicate)
                {
                    case "past":
                        activities = await _context.ActivityAttendees
                            .Where(x => x.AppUser.UserName == request.Username &&
                                        x.Activity.Date < DateTime.UtcNow)
                            .ProjectTo<UserActivityDto>(_mapper.ConfigurationProvider)
                            .ToListAsync();
                        break;
                    case "future":
                        activities = await _context.ActivityAttendees
                            .Where(x => x.AppUser.UserName == request.Username &&
                                        x.Activity.Date > DateTime.UtcNow)
                            .ProjectTo<UserActivityDto>(_mapper.ConfigurationProvider)
                            .ToListAsync();
                        break;
                    case "hosting":
                        activities = await _context.ActivityAttendees
                            .Where(x => x.AppUser.UserName == request.Username &&
                                        x.IsHost)
                            .ProjectTo<UserActivityDto>(_mapper.ConfigurationProvider)
                            .ToListAsync();
                        break;
                }

                return Result<List<UserActivityDto>>.Success(activities);
            }
        }
    }
}