import Link from "next/link";
import Head from "next/head";
import Script from "next/script"; // add third party script eg. from cdn
import Layout from '../../components/layout'; // add components

export default function FirstPost() {
	return (
		<Layout>
			<Head>
				<title>First Post</title>
			</Head>
			{/* Third Party Script */}
			<Script
				src="https://connect.facebook.net/en_US/sdk.js"
				strategy="lazyOnload"
				onLoad={() =>
					console.log(
						`script loaded correctly, window.FB has been populated`,
					)
				}
			/>
			<h1>First Post</h1>
			<h2>
				<Link href="/">Back to home</Link>
			</h2>
		</Layout>
	);
}
