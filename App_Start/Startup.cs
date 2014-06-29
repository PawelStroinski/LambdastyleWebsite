using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using LambdastyleWebsite.App_Start;
using Microsoft.AspNet.SignalR;
using Ninject;
using Owin;

namespace LambdastyleWebsite
{
    public class Startup
    {
        public void Configuration(IAppBuilder app)
        {
            MapSignalR(app);
        }

        void MapSignalR(IAppBuilder app)
        {
            var kernel = DependencyResolver.Current.GetService<IKernel>();
            var resolver = new NinjectSignalRDependencyResolver(kernel);
            var config = new HubConfiguration { Resolver = resolver };
            app.MapSignalR(config);
        }
    }
}