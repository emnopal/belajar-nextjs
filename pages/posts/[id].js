import { getPostData, getAllPostIds } from "../../lib/posts";
import Layout from "../../components/layout";
import Head from "next/head";
import DateParse from "../../components/date";
import Alert from "../../components/alert";
import utilStyles from "../../styles/utils.module.scss";

// get all markdown (post) to be converted to paths
export async function getStaticPaths() {
	const paths = getAllPostIds();
	return {
		paths,
		fallback: false,
	};
}

// passing markdown metadata to props
export async function getStaticProps({ params }) {
	const postData = await getPostData(params.id);
	return {
		props: {
			postData,
		},
	};
}

export default function Post({ postData }) {
	return (
		<Layout>
			<Head>
				<title>{postData.title ?? "Undefined Title"}</title>
			</Head>
			{postData.title ? (
				<h1 className={utilStyles.headingXl}>{postData.title}</h1>
			) : (
				<h1 className={utilStyles.headingXl}>
					<Alert type="error">Undefined Title</Alert>
				</h1>
			)}
			{postData.date ? (
                <div className={utilStyles.lightText}>
                    <DateParse dateString={postData.date}>
                        <br />
                        <br />
                    </DateParse>
                </div>
			) : (
				<Alert type="error">Undefined Date</Alert>
			)}
			{postData.contentHtml ? (
				<div dangerouslySetInnerHTML={{ __html: postData.contentHtml }} />
			) : (
				<Alert type="warn">
					<br />
					No Contents
				</Alert>
			)}
		</Layout>
	);
}
