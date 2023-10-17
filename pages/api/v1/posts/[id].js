import { parseISO, format } from "date-fns";
import { getPostData } from "../../../../lib/posts";

export default async function handler(req, res) {

    // api calls can be dynamics too

    // get query of [id]
    const {id} = req.query;
    const postData = await getPostData(id);

    /*
    Next.js use this specs for url:

    http://localhost:3000/api/v1/posts/a?debug=1
    id = a
    debug = 1

    or in the other hand: http://localhost:3000/api/v1/posts/[id]?key=value

    note: if key == [id] it will be ignored
    */

    // to handling request method
    if (req.method === 'GET') {
        const dateParse = postData.date ? parseISO(postData.date) : "Undefined";
        const dateString = postData.date ? format(dateParse, "d LLLL yyyy") : "Undefined";
        res.status(200).json({
            title: postData.title ?? "Undefined",
            date: dateString,
            contents: postData.contentHtml ?? "Undefined",
        });
    } else {
        res.status(405).json({
            text: `Method ${req.method} not allowed`,
        });
    }

}
