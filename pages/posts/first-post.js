import Head from "next/head";
import Script from "next/script"; // add third party script eg. from cdn
import Layout from '../../components/layout'; // add components
import DateParse from "../../components/date";
import utilStyles from "../../styles/utils.module.scss";

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
			<h1 className={utilStyles.headingXl}>My First Post</h1>
			<div className={utilStyles.lightText}>
				<DateParse dateString="2023-10-16"/>
			</div>
			<br/>
			<div>
				This is my first post
			</div>
		</Layout>
	);
}
