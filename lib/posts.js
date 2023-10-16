import fs from "fs";
import path from "path";
import matter from "gray-matter";

const postsDirectory = path.join(process.cwd(), "posts");

export function getSortedPostsData() {
	// Get file names under /posts
	const fileNames = fs.readdirSync(postsDirectory);
	const allPostsData = fileNames.map((fileName) => {
		// Remove ".md" from file name to get id
		const id = fileName.replace(/\.md$/, "");

		// Read markdown file as string
		const fullPath = path.join(postsDirectory, fileName);
		const fileContents = fs.readFileSync(fullPath, "utf8");

		// Use gray-matter to parse the post metadata section
		const matterResult = matter(fileContents);

		// Combine the data with the id
		return {
			id,
			...matterResult.data,
		};
	});
	// Sort posts by date
	return allPostsData.sort((a, b) => {
		if (a.date < b.date) {
			return 1;
		} else {
			return -1;
		}
	});
}

/*
Fetch external API:
export async function getSortedPostsData() {
  	// Instead of the file system,
  	// fetch post data from an external API endpoint
	const res = await fetch('..');
	return res.json();

	// or using axios
	const res = await axios('..')
	return res.json()
}

Fetch Database:
import someDatabaseSDK from 'someDatabaseSDK'
const databaseClient = someDatabaseSDK.createClient(...)
export async function getSortedPostsData() {
  	// Instead of the file system,
  	// fetch post data from a database
	return databaseClient.query('SELECT posts...')
}

Development vs. Production
In development (npm run dev or yarn dev), getStaticProps runs on every request.

In production, getStaticProps runs at build time.
However, this behavior can be enhanced using the fallback key returned by getStaticPaths
Because it's meant to be run at build time, you won't be able to use data that's only available during request time, such as query parameters or HTTP headers.

What If I Need to Fetch Data at Request Time?
Since Static Generation happens once at build time, it's not suitable for data that updates frequently or changes on every user request.
In cases like this, where your data is likely to change, you can use Server-side Rendering.

Static Rendering: getStaticProps()
Server Rendering: getServerSideProps()

*/

// this is example of server side rendering
// it just example, don't call the function
export async function getServerSideProps(context) {
	return {
		props: {
			// props for your component
		},
	};
}

/*
There is another strategy for dynamic data called: Client-side rendering
it means:

If you do not need to pre-render the data, you can also use the following strategy (called Client-side Rendering):

Statically generate (pre-render) parts of the page that do not require external data.
When the page loads, fetch external data from the client using JavaScript and populate the remaining parts.

use case:
This approach works well for user dashboard pages, for example. Because a dashboard is a private,
user-specific page, SEO is not relevant, and the page doesn't need to be pre-rendered. The data is frequently updated,
which requires request-time data fetching.

or there is another lib which created by nextjs team called swr
this is example for swr

import useSWR from 'swr';

function Profile() {
	const { data, error } = useSWR('/api/user', fetch);

	if (error) return <div>failed to load</div>;
	if (!data) return <div>loading...</div>;
	return <div>hello {data.name}!</div>;
}

Note:
Server-side rendering: general, SEO relevant, Performance
Client-side rendering: private, not SEO relevant, user-specific pages

*/
