import '../styles/globals.css'
import 'antd/dist/antd.css'
import { StyleSheetManager } from 'styled-components';

function MyApp({ Component, pageProps }) {
  return (
    <StyleSheetManager>
      <Component {...pageProps} />
    </StyleSheetManager>
  )
}

export default MyApp
