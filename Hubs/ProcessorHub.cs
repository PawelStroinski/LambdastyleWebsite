using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using LambdastylePrototype;
using LambdastyleWebsite.Models;
using Microsoft.AspNet.SignalR;

namespace LambdastyleWebsite.Hubs
{
    public class ProcessorHub : Hub
    {
        readonly IFacade facade;

        public ProcessorHub(IFacade facade)
        {
            this.facade = facade;
        }

        public Output Process(Input input)
        {
            try
            {
                return CarefreeProcess(input);
            }
            catch (FacadeException exception)
            {
                return new Output { success = false, body = exception.ToString() };
            }
        }

        Output CarefreeProcess(Input input)
        {
            var output = facade.ProcessString(input: input.input, style: input.style);
            return new Output { success = true, body = output };
        }
    }
}