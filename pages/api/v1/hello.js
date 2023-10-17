export default function handler(req, res) {

    /*
    req is an instance of http.IncomingMessage (https://nodejs.org/api/http.html#http_class_http_incomingmessage),
    plus some pre-built middlewares (https://nextjs.org/docs/api-routes/api-middlewares).

    res is an instance of http.ServerResponse (https://nodejs.org/api/http.html#http_class_http_serverresponse),
    plus some helper functions (https://nextjs.org/docs/api-routes/response-helpers).
    */

    // to handling request method
    if (req.method === 'GET') {
        res.status(200).json({
            text: 'Hello',
            method: req.method
        });
    }
    else if (req.method === 'POST') {
        // get body from json request
        // eg. email
        // const {email} = req.body
        // or
        // const email = req.body.email
        res.status(200).json({
            text: 'Hello',
            method: req.method
        });
    } else {
        res.status(405).json({
            text: `Method ${req.method} not allowed`,
        });
    }

    /*

    Notes:

    Do Not Fetch an API Route from getStaticProps or getStaticPaths
    You should not fetch an API Route from getStaticProps or getStaticPaths.
    Instead, write your server-side code directly in getStaticProps or getStaticPaths (or call a helper function).

    Here’s why: getStaticProps and getStaticPaths run only on the server-side and will never
    run on the client-side. Moreover, these functions will not be included in the JS bundle for the browser.
    That means you can write code such as direct database queries without sending them to browsers.

    Explanation:

    - write api in pages/api/version
    - write pages inside pages
    - use [params] for dynamic route
    - fetch database or api calls inside lib, do not fetch it from getStaticProps and getStaticPaths

    see here: https://nextjs.org/docs/pages/building-your-application/data-fetching/get-static-props#write-server-side-code-directly

    note: API Route code will not be part of your client bundle, so you can safely write server-side code.

     */

}