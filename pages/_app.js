// add global css (global means all styles will be applied to all pages)
// format must be global.css or global.scss
import '../styles/global.scss';

// override default <App></App> tag in react
export default function App({ Component, pageProps }) {
    return <Component {...pageProps} />;
}