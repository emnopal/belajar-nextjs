// Layout component (blueprints) which will be shared across pages whose call it
import Head from "next/head";
import Image from "next/image";
import styles from "./styles/layout.module.scss";
import utilStyles from "../styles/utils.module.scss";
import Link from "next/link";

/*
interface LayoutProps {
	children: React.ReactNode;
	home: boolean;
}

explanation

home is where props.home argument is passing
children is where children of layout

eg.

<Layout home={true}>
	<Head>
		<title>{siteTitle}</title>
	</Head>
	<section className={utilStyles.headingMd}>
		<p>[Your Self Introduction]</p>
		<p>
			(This is a sample website - you'll be building a site like
			this on{" "}
			<a href="https://nextjs.org/learn">our Next.js tutorial</a>
			.)
		</p>
	</section>
</Layout>

home is home={true} arguments or simply just <Layout home></Layout>

children is element inside <Layout>{children}</Layout>

you can write props like this

function Layout(props){}

but the recommendation way is

function Layout({children, home}) {} (using destructuring obj)

*/

const name = "BadHabit";
export const siteTitle = "Next.js Sample Website";

export default function Layout({children, home}) {
	return (
		<div className={styles.container}>
			<Head>
				<link rel="icon" href="/favicon.ico" />
				<meta
					name="description"
					content="Learn how to build a personal website using Next.js"
				/>
				<meta
					property="og:image"
					content={`https://og-image.vercel.app/${encodeURI(
						siteTitle,
					)}.png?theme=light&md=0&fontSize=75px&images=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Ffront%2Fassets%2Fdesign%2Fnextjs-black-logo.svg`}
				/>
				<meta name="og:title" content={siteTitle} />
				<meta name="twitter:card" content="summary_large_image" />
			</Head>
			<header className={styles.header}>
				{home ? (
					<>
						<Image
							priority
							src="/images/profile.jpg"
							className={utilStyles.borderCircle}
							height={144}
							width={144}
							alt="logos"
						/>
						<h1 className={utilStyles.heading2Xl}>{name}</h1>
					</>
				) : (
					<>
						<Link href="/" as={'image'}>
							<Image
								priority
								src="/images/profile.jpg"
								className={utilStyles.borderCircle}
								height={108}
								width={108}
								alt="logos"
							/>
						</Link>
						<h2 className={utilStyles.headingLg}>
							<Link href="/" className={utilStyles.colorInherit}>
								{name}
							</Link>
						</h2>
					</>
				)}
			</header>
			<main>{children}</main>
			{!home && (
				<div className={styles.backToHome}>
					<Link href="/">← Back to home</Link>
				</div>
			)}
		</div>
	);
}
