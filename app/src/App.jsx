import { useMemo } from "react"
import { BlogProvider } from "src/context/Blog"
import { Router } from "src/router"
import "./App.css"
import { ConnectionProvider, WalletProvider } from "@solana/wallet-adapter-react"
import { PhantomWalletAdapter } from "@solana/wallet-adapter-wallets"
import "./App.css"

export const App = () => {
const endpoint= "https://tame-light-dream.solana-devnet.quiknode.pro/37c7908dfddddc8873e0a4c0ff374ff3899ab515/"
const wallets = useMemo(
  ()=> [
    new PhantomWalletAdapter(),
  ],
  []
)
  return (
    <ConnectionProvider endpoint={endpoint}>
      <WalletProvider wallets={wallets} autoConnect>
        <BlogProvider>
          <Router />
        </BlogProvider>
      </WalletProvider>
    </ConnectionProvider>
    
  )
}
