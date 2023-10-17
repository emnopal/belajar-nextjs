import { getSortedPostsData } from "../../../../lib/posts";

export default async function handler(req, res) {

    const allPostData = getSortedPostsData();

    if (req.method === 'GET') {
        res.status(200).json(allPostData);
    } else {
        res.status(405).json({
            text: `Method ${req.method} not allowed`,
        });
    }

}
