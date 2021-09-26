# html2pdf for NodeJS
<a href="https://travis-ci.org/bauhausjs/phantom-html2pdf"><img src="https://travis-ci.org/bauhausjs/phantom-html2pdf.svg"/></a>

Simple and lightweight HTML to text conversion using NodeJs.
- highly customize  interactive PDF creation with dynamic design with dynamic JSON. 
- can convert any string (HTML or simple) pdf.

## Installation

````
npm install html2pdf
````

## Conversion API
The API exposes a single function 'convertPdf'. Using this function, you can input a multitude of settings, which are further specified below:
```` javascript
var pdf = require('html2pdf');

convertPdf(options).then((pdfPath)=>{
	/* return new created pdf path */

}).catch((error)=>{
    console.error("Error in create Pdf");
})
````


## Options

Calling convert() requires an options object, which includes the following definitions:

```` json
{
	"htmlString" : "HTML string for pdf with liquidJs string if need",
	"externalCss" : "string to additional CSS file",
	"inputJson" : "JSON data to make dynamic string",
	"filePath" : "Path to save file",
	"fileName" : "Pdf file name",
	"displayHeaderFooter" : true or false If you want to add header or footer in pdf,
        "headerTemplate": HTML string for header,
        "footerTemplate": HTML string for footer
}
````


## Code example
- JSON data which I need to show in table
```JSON
{
    employees: [
        {
            firstName: "John",
            lastName: "Smith",
            email: "jsmith@gmail.com",
            due: "50",
            website: "http://www.jsmith.com"
        },
        {
            firstName: "Frank",
            lastName: "Bach",
            email: "fbach@yahoo.com",
            due: "50",
            website: "http://www.frank.com"
        },
        {
            firstName: "Jason",
            lastName: "Doe",
            email: "jdoe@hotmail.com",
            due: "100",
            website: "http://www.jdoe.com"
        },
        {
            firstName: "Tim",
            lastName: "Conway",
            email: "tconway@earthlink.net",
            due: "50",
            website: "http://www.timconway.com"
        }
    ]
}
```
- HTML for display data into table with template language
```html
const htmlString = `<html>
                    <head>
                        <style>
                            body {
                                font: normal medium/1.4 sans-serif;
                            }
                    
                            table {
                                border-collapse: collapse;
                                width: 100%;
                            }
                    
                            th, td {
                                padding: 0.25rem;
                                text-align: left;
                                border: 1px solid #ccc;
                            }
                    
                            tbody tr:nth-child(odd) {
                                background: #eee;
                            }
                        </style>
                    </head>
                    <body>
                    <table class="zebra">
                        <thead>
                        <tr>
                            <th>Last Name</th>
                            <th>First Name</th>
                            <th>Email</th>
                            <th>Due</th>
                            <th>WebSite</th>
                        </tr>
                        </thead>
                        <tbody>
                        {% for employee in employees %}
                        <tr>
                            <td> {{ employee.lastName }}</td>
                            <td> {{ employee.firstName }}</td>
                            <td> {{ employee.email }}</td>
                            <td> {{ employee.due }}</td>
                            <td> {{ employee.website }}</td>
                        </tr>
                        {% endfor %}
                        </tbody>
                    </table>
                    </body>
                    </html>
`
```
- Final code
```javascript
var pdf = require('html2pdf');
const companyData = {
    employees: [
        {
            firstName: "John",
            lastName: "Smith",
            email: "jsmith@gmail.com",
            due: "50",
            website: "http://www.jsmith.com"
        },
        {
            firstName: "Frank",
            lastName: "Bach",
            email: "fbach@yahoo.com",
            due: "50",
            website: "http://www.frank.com"
        },
        {
            firstName: "Jason",
            lastName: "Doe",
            email: "jdoe@hotmail.com",
            due: "100",
            website: "http://www.jdoe.com"
        },
        {
            firstName: "Tim",
            lastName: "Conway",
            email: "tconway@earthlink.net",
            due: "50",
            website: "http://www.timconway.com"
        }
    ]
}

var options = { 
    htmlString,
    inputJson:companyData,
    filePath:'./',
    fileName:'employee_report.pdf',
    externalCss:null,
    displayHeaderFooter:false,
    headerTemplate:null,
    footerTemplate:null
 };

convertPdf(options).then((pdfPath)=>{
	/* return new created pdf path */
    console.log(pdfPath)
}).catch((error)=>{
    console.error("Error in create Pdf");
})
```

## Reference
- [liquidJS](https://shopify.github.io/liquid/tags/iteration/)
- [puppeteer](https://github.com/puppeteer/puppeteer)


## License

[MIT](LICENSE)

