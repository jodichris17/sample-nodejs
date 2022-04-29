const proc = process.env.PROCESS || 'cron'; // PROCESS = cron | consumer | web
const port = process.env.PORT || 8000;
const sleep = process.env.SLEEP || 1000;
const maxcount = process.env.MAXCOUNT || 10;

const appname = "NodeJS Sample Project";
const version = "v0.0.2";

console.log(`${appname} ${version}`);

if ( ! (proc == "cron" || proc == "consumer" || proc == "web" ) ) {
    console.log(`Unknown process: ${proc}`);
    process.exit(1);
}

console.log(`Running as ${proc} with pid ${process.pid}`);

if (proc == "cron") {
    // cron is short running application which will exit by itself after completing its job
    // this example only do counting until the count reach MAXCOUNT
    const delay = require("delay");
    (async () => {
        var i;
        for (i = 1; i <= maxcount; i++) {
            console.log(`Count: ${i}`);
            await delay(sleep)
        }
    })();

} else if (proc == "consumer") {
    // consumer is long running application with specific job
    // this example only do counting as long as the service is running
    // if the counting reach MAXCOUNT, it will restarted at 0
    const delay = require("delay");
    (async () => {
        var i;
        for (i = 1; i <= maxcount; i++) {
            console.log(`Count: ${i}`);
            if (i == maxcount) {
                console.log(`Process ${proc} with pid ${process.pid} has reached max count, restarted from 1`);
                i = 0;
            }
            await delay(sleep)
        }
    })();

} else if (proc == "web") {
    var express = require("express");
    var app = express();

    app.set('trust proxy', true);

    app.get("/", function (req, res) {
        console.log(`Request from ${req.ip}`);
        res.set("content-type", "text/plain");
        res.send(`${appname} ${version} \nRequest from ${req.ip}\n`);
    })

    app.get("/healthcheck", function (req, res) {
        res.json({"Status": "ok"});
    })

    var server = app.listen(port, function () {
        console.log(`Starting ${proc} server on port ${port}`);
    })

}

process
    .on('SIGTERM', shutdown('SIGTERM'))
    .on('SIGINT', shutdown('SIGINT'))
    .on('uncaughtException', shutdown('uncaughtException'));

process.on('exit', code => {
    console.log(`Process ${proc} with pid ${process.pid} exited with code: ${code}`);
})

function shutdown(signal) {
    return( () =>  {
        console.log(`Received a ${signal} signal`);
        exitcode = (signal == 'uncaughtException') ? 1 : 0;
        if (proc == "web") {
            server.close( () => {
                process.exit(exitcode);
            });
        } else {
            process.exit(exitcode);
        }
    });
}
