using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.Errors
{
    public class ApiException
    {       
        ApiException(int statusCode, string Message = null ,string details = null) 
        {
            this.StatusCode = statusCode;
            this.Details = details;
            this.Message = Message;
        }
        public int StatusCode {get;set;}
        public string Message { get; set; }
        public string Details { get; set; }
    }
}