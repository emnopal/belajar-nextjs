// this index.js act like App.jsx in react

import Head from "next/head";
import Layout, { siteTitle } from "../components/layout";
import utilStyles from "../styles/utils.module.scss";
import Alert from "../components/alert";
import Link from "next/link";
import { getSortedPostsData } from "../lib/posts";
import DateParse from "../components/date";

/*

When to Use Static Generation v.s. Server-side Rendering

We recommend using Static Generation (with and without data) whenever possible because your page can be built once and served by CDN,
which makes it much faster than having a server render the page on every request.

You can use Static Generation for many types of pages, including:

Marketing pages
Blog posts
E-commerce product listings
Help and documentation
You should ask yourself: "Can I pre-render this page ahead of a user's request?" If the answer is yes, then you should choose Static Generation.

On the other hand, Static Generation is not a good idea if you cannot pre-render a page
ahead of a user's request. Maybe your page shows frequently updated data, and the page content changes on every request.

In that case, you can use Server-side Rendering. It will be slower, but the pre-rendered page will
always be up-to-date. Or you can skip pre-rendering and use client-side JavaScript to populate frequently updated data.

intinya klo butuh realtime banget, contoh kaya dashboard, atau csv atau chat app, atau table gunakan server side rendering

selain itu, jika statik seperti blog, documentation dll gunakan static rendering

diatas tadi itu static generation without fetching data jadi gaperlu buat ambil data

nah klo harus fetching data gimana? ini mirip kaya axios gitu ya, jadi di wrap si axios nya ini
di function yg namanya getStaticProps, jadi nanti dikirim data dari getStaticProps nya ke props yg ada di dalam components

Static Rendering: getStaticProps()

export async function getStaticProps() {
	const data = ...
	return {
		props: ...
	}
}

Server Rendering: getServerSideProps()

export async function getServerSideProps(context) {
	return {
		props: {
			// props for your component
		},
	};
}

Note:
Server-side rendering: general, SEO relevant, Performance
Client-side rendering: private, not SEO relevant, user-specific pages

Development vs. Production
In development (npm run dev or yarn dev), getStaticProps runs on every request.

In production, getStaticProps runs at build time.
However, this behavior can be enhanced using the fallback key returned by getStaticPaths
Because it's meant to be run at build time, you won't be able to use data that's only available during request time, such as query parameters or HTTP headers.

What If I Need to Fetch Data at Request Time?
Since Static Generation happens once at build time, it's not suitable for data that updates frequently or changes on every user request.
In cases like this, where your data is likely to change, you can use Server-side Rendering.

There is another strategy for dynamic data called: Client-side rendering
it means:

If you do not need to pre-render the data, you can also use the following strategy (called Client-side Rendering):

Statically generate (pre-render) parts of the page that do not require external data.
When the page loads, fetch external data from the client using JavaScript and populate the remaining parts.

use case:
This approach works well for user dashboard pages, for example. Because a dashboard is a private,
user-specific page, SEO is not relevant, and the page doesn't need to be pre-rendered. The data is frequently updated,
which requires request-time data fetching.
*/

export async function getStaticProps() {
	const allPostsData = getSortedPostsData();
	return {
		props: {
			allPostsData,
		},
	};
}

/*
Note: for StaticProps or ServerSideProps you need to put it in one file with components/pages
*/

export default function Home({ allPostsData }) {
	return (
		<Layout home={true}>
			<Head>
				<title>{siteTitle}</title>
			</Head>
			<Alert type="success">Example of Success Alert</Alert>
			<Alert type="error">Example of Error Alert</Alert>
			<Alert type="warn">Example of Warning Alert</Alert>
			<section className={utilStyles.headingMd}>
				<p>
					Test
					<Link href="/willbe404"> 404 </Link>
					Here
				</p>
			</section>
			<section className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}>
				<h2 className={utilStyles.headingLg}>Blog</h2>
				<ul className={utilStyles.list}>
					<li className={utilStyles.listItem} key="first-post">
						<Link href="/posts/first-post">First Post</Link>
						<br />
						<small className={utilStyles.lightText}>
							<DateParse dateString="2023-10-16" />
						</small>
					</li>
					{allPostsData.map(({ id, date, title }) => (
						<li className={utilStyles.listItem} key={id}>
							{title ? (
								<Link href={`/posts/${id}`}>
									{title}
									<br />
								</Link>
							) : (
								<Link href={`/posts/${id}`}>
									<Alert type="error">Undefined Title</Alert>
								</Link>
							)}
							{date ? (
								<small className={utilStyles.lightText}>
									<DateParse dateString={date} />
								</small>
							) : (
								<Alert type="error">Undefined Date</Alert>
							)}
						</li>
					))}
				</ul>
			</section>
		</Layout>
	);
}
