import { parseISO, format } from "date-fns";

export default function handler(req, res) {

    // to handling request method
    if (req.method === 'GET') {
        const date = "2023-10-16"
        const dateParse = parseISO(date);
        const dateString = format(dateParse, "d LLLL yyyy")
        res.status(200).json({
            title: 'Hello',
            date: dateString,
            contents: "My First Post",
        });
    } else {
        res.status(405).json({
            text: `Method ${req.method} not allowed`,
        });
    }

}
