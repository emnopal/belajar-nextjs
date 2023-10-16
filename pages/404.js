import Link from "next/link";
import Layout from "../components/layout";
import Head from "next/head";

// custom 404 pages
export default function Custom404() {
    return (
        <Layout home>
			<Head>
				<title>You're Lost!</title>
			</Head>
            <h1 style={{textAlign: "center"}}>404</h1>
            <h3 style={{textAlign: "center"}}>You're lost, if you afraid you can go to <Link href="/">Home</Link></h3>
		</Layout>
    )
}