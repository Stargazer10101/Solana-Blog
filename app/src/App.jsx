<<<<<<< HEAD
import { FC, useMemo } from "react"
=======
import { useMemo } from "react"
>>>>>>> cli-starter
import { BlogProvider } from "src/context/Blog"
import { Router } from "src/router"
import { ConnectionProvider, WalletProvider } from "@solana/wallet-adapter-react"
import { PhantomWalletAdapter } from "@solana/wallet-adapter-wallets"
import "./App.css"
<<<<<<< HEAD


export const App = () => {
  const endpoint = "https://muddy-aged-panorama.solana-devnet.discover.quiknode.pro/0fe7822c98ade63f96ae1be8e82d17b26d57cacc/"
  const wallets = useMemo(
    () => [
      new PhantomWalletAdapter(),
    ],
    []

  )
=======
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
>>>>>>> cli-starter
  return (
    <ConnectionProvider endpoint={endpoint}>
      <WalletProvider wallets={wallets} autoConnect>
        <BlogProvider>
          <Router />
        </BlogProvider>
      </WalletProvider>
    </ConnectionProvider>
<<<<<<< HEAD

=======
    
>>>>>>> cli-starter
  )
}
