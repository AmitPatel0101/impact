const http = require('http');
const fs = require('fs');
const path = require('path');
const url = require('url');
const PORT = 3032;

const homePage = path.join(__dirname, "task.html")
const stylePage = path.join(__dirname, "task.css")
const form = path.join(__dirname, "form.html")
const formStyle = path.join(__dirname, "form.css")

const app = http.createServer((req, res) => {
    console.log(req.url)
    const parsedUrl = url.parse(req.url, true);

    if (req.url === "/") {
        fs.readFile(homePage, "utf-8", (err, data) => {
            if (err) console.log(err);
            else {
                // res.write(data);
                // res.end();
                res.end(data);
            }
        })
    } else if (req.url === "/task.css") {
        fs.readFile(stylePage, "utf-8", (err, data) => {
            if (err) console.log(err);
            else {
                // res.write(data);
                // res.end();
                res.end(data);
            }
        })
    } else if (req.url === "/contact") {
        fs.readFile(form, "utf-8", (err, data) => {
            if (err) console.log(err);
            else {
                // res.write(data);
                // res.end();
                res.end(data);
            }
        })
    } else if (req.url === "/form.css") {
        fs.readFile(formStyle, "utf-8", (err, data) => {
            if (err) console.log(err);
            else {
                // res.write(data);
                // res.end();
                res.end(data);
            }
        })
    } else if (parsedUrl.pathname === "/formSubmit") {
        console.log(parsedUrl.query)
        let parsedObj = parsedUrl.query;
        fs.readFile("users.json", "utf-8", (err, data) => {
            if (data == "") {
                parsedObj = [parsedObj];
                fs.writeFile("users.json", JSON.stringify(parsedObj), (err) => {
                    if (err) console.log(err);
                })
            } else {
                let userData = JSON.parse(data);
                let newUserData = parsedUrl.query
                console.log(typeof newUserData)
                userData.push(newUserData)
                fs.writeFile("users.json", JSON.stringify(userData), (err) => {
                    if(err) console.log(err)
                })
            }

        })
        res.end("Form submitted");
    }
}
)

app.listen(PORT, () => {
    console.log(`http://localhost:${PORT}`)
})