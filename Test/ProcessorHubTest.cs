using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using LambdastylePrototype;
using LambdastyleWebsite.Hubs;
using LambdastyleWebsite.Models;
using NUnit.Framework;
using StreamUtils;

namespace Test
{
    class ProcessorHubTest
    {
        [Test]
        public void Positive()
        {
            var facade = new PositiveFacadeSpy();
            var sut = new ProcessorHub(facade);
            var output = sut.Process(new Input { input = "foo", style = "bar" });
            Assert.AreEqual("foo", facade.gotInput);
            Assert.AreEqual("bar", facade.gotStyle);
            Assert.AreEqual("some positive output", output.body);
            Assert.IsTrue(output.success);
        }

        [Test]
        public void Negative()
        {
            var facade = new NegativeFacadeStub();
            var sut = new ProcessorHub(facade);
            var output = sut.Process(new Input { input = "foo", style = "bar" });
            Assert.IsTrue(output.body.Contains("something got wrong"));
            Assert.IsFalse(output.success);
        }
    }

    class PositiveFacadeSpy : IFacade
    {
        public string gotInput;
        public string gotStyle;

        public void ProcessFile(string inputPath, string stylePath, string outputPath) { }
        public void ProcessStream(Stream input, Stream style, EditableStream output) { }

        public string ProcessString(string input, string style)
        {
            gotInput = input;
            gotStyle = style;
            return "some positive output";
        }
    }

    class NegativeFacadeStub : IFacade
    {
        public void ProcessFile(string inputPath, string stylePath, string outputPath) { }
        public void ProcessStream(Stream input, Stream style, EditableStream output) { }

        public string ProcessString(string input, string style)
        {
            throw new OtherFacadeException(new Exception("something got wrong"));
        }
    }
}
