using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Optimization;

namespace LambdastyleWebsite
{
    public static class BundleConfig
    {
        public static void RegisterBundles(BundleCollection bundles)
        {
            bundles.Add(new StyleBundle("~/Content/bundle").Include(
                "~/Content/bootstrap.css",
                "~/Content/bootswatch.min.css",
                "~/Content/app.css"));
            bundles.Add(new ScriptBundle("~/Scripts/bundle-of-bundles").Include(
                "~/Scripts/jquery-{version}.js",
                "~/Scripts/jquery.signalR-{version}.js",
                "~/Scripts/bootstrap.js",
                "~/Scripts/app/bundle.js",
                "~/Scripts/app/nav.js"));
        }
    }
}