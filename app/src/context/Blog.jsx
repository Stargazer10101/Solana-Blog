<<<<<<< HEAD
import * as anchor from '@project-serum/anchor'
import { useAnchorWallet, useConnection, useWallet } from '@solana/wallet-adapter-react'
import { PublicKey, SystemProgram } from "@solana/web3.js";
import {
  createContext,
  useContext,
  useEffect,
  useState,
  useMemo,
} from "react";
import { getAvatarUrl } from "src/functions/getAvatarUrl";
import { getRandomName } from "src/functions/getRandomName";
import idl from "src/idl.json";
import { findProgramAddressSync } from '@project-serum/anchor/dist/cjs/utils/pubkey'
import { utf8 } from '@project-serum/anchor/dist/cjs/utils/bytes'
=======
import { createContext,
        useContext,
        useMemo, 
        useEffect,
        useState,
      } from "react";
import * as anchor from '@project-serum/anchor'
import {useAnchorWallet, useConnection, useWallet} from"@solana/wallet-adapter-react";
import {PublicKey, SystemProgram} from "@solana/web3.js";
import { getAvatarUrl } from "src/functions/getAvatarUrl";
import { getRandomName } from "src/functions/getRandomName";
import idl from "src/idl.json";
import { findProgramAddressSync } from "@project-serum/anchor/dist/cjs/utils/pubkey";
import { utf8 } from "@project-serum/anchor/dist/cjs/utils/bytes";
>>>>>>> cli-starter

const BlogContext = createContext();
//get program key
const PROGRAM_KEY = new PublicKey(idl.metadata.address);

<<<<<<< HEAD
const BlogContext = createContext();
=======
>>>>>>> cli-starter

export const useBlog = () => {
  const context = useContext(BlogContext);
  if (!context) {
    throw new Error("Parent must be wrapped inside PostsProvider");
  }

  return context;
};

export const BlogProvider = ({ children }) => {
<<<<<<< HEAD
  const [user, setUser] = useState();
  const [initialized, setInitialized] = useState(false);
  const [posts, setPosts] = useState([])
  const [transactionPending, setTransactionPending] = useState(false)
  const [showModal, setShowModal] = useState(false)
  const [lastPostId, setLastPostId] = useState()

  const anchorWallet = useAnchorWallet();
  const { connection } = useConnection();
  const { publicKey } = useWallet()

  const program = useMemo(() => {
    if (anchorWallet) {
      const provider = new anchor.AnchorProvider(connection, anchorWallet, anchor.AnchorProvider.defaultOptions())
      return new anchor.Program(idl, PROGRAM_KEY, provider)
    }
  }, [connection, anchorWallet])

  useEffect(() => {

    const start = async () => {
      if (program && publicKey) {
        try {
          const [userPda] = await findProgramAddressSync([utf8.encode('user'), publicKey.toBuffer()], program.programId)
          const user = await program.account.userAccount.fetch(userPda)
          if (user) {
            setInitialized(true)
            setUser(user)
            setLastPostId(user.lastPostId)
            const postAccounts = await program.account.postAccount.all(publicKey.toString())
            setPosts(postAccounts)
          }
        } catch (error) {
          console.log(error)
          setInitialized(false)
        }
      }
    }

    start()

  }, [program, publicKey, transactionPending]);


  const initUser = async () => {
    if (program && publicKey) {
      try {
        setTransactionPending(true)
        const [userPda] = findProgramAddressSync([utf8.encode('user'), publicKey.toBuffer()], program.programId)
        const name = getRandomName();
        const avatar = getAvatarUrl(name);

        await program.methods
          .initUser(name, avatar)
          .accounts({
            userAccount: userPda,
            authority: publicKey,
            systemProgram: SystemProgram.programId,
          })
          .rpc()
        setInitialized(true)
      } catch (error) {
        console.log(error)
      } finally {
=======
  const [user, setUser] = useState()
  const[initialized, setInitialized]= useState(false)
  const[transactionPending, setTransactionPending] = useState(false)
  const[showModal, setShowModal]= useState(false)
  const[lastPostId, setLastPostId] = useState(0)
  const[posts, setPosts] = useState([])

const anchorWallet = useAnchorWallet();
const {connection}= useConnection();
const {publicKey}= useWallet();

const program = useMemo(()=> {
  if(anchorWallet){
    const provider = new anchor.AnchorProvider(connection,anchorWallet, anchor.AnchorProvider)
    return new anchor.Program(idl, PROGRAM_KEY, provider)
  }
}, [connection, anchorWallet])

useEffect(()=> {
  const start = async() => {
    if (program && publicKey){
      try{
          // check ifthere is a user account
          //setTransactionPending(true)
          const [userPda] = await findProgramAddressSync([utf8.encode('user'), publicKey.toBuffer()], program.programId)
          const user= await program.account.userAccount.fetch(userPda)
          if(user){
              setInitialized(true)// create post
              setUser(user)
              setLastPostId(user.lastPostId)

              const postAccounts = await program.account.postAccount.all()
              setPosts(postAccounts)
              console.log(postAccounts)
          }
      } catch (err){
        console.log("No user")
        setInitialized(false)// Initialize user
      } finally {
        //setTransactionPending(false)
      }
    }
  }

  start()
}, [program,transactionPending, publicKey])

  const initUser = async ()=> {
    if(program && publicKey){
      try{
        setTransactionPending(true)
        const name = getRandomName()
        const avatar = getAvatarUrl(name)
        const [userPda] = await findProgramAddressSync([utf8.encode('user'), publicKey.toBuffer()], program.programId)

        await program.methods
        .initUser(name, avatar)
        .accounts({
          userAccount: userPda,
          authority: publicKey,
          systemProgram: SystemProgram.programId
        })
        .rpc()
        setInitialized(true)


      } catch(err){
        console.log(err)
      }finally {
>>>>>>> cli-starter
        setTransactionPending(false)
      }
    }
  }

<<<<<<< HEAD
  const createPost = async (title, content) => {
    if (program && publicKey) {
      setTransactionPending(true)
      try {
        const [userPda] = findProgramAddressSync([utf8.encode('user'), publicKey.toBuffer()], program.programId)
        const [postPda] = findProgramAddressSync([utf8.encode('post'), publicKey.toBuffer(), Uint8Array.from([lastPostId])], program.programId)

        await program.methods
          .createPost(title, content)
          .accounts({
            userAccount: userPda,
            postAccount: postPda,
            authority: publicKey,
            systemProgram: SystemProgram.programId,
          })
          .rpc()

        setShowModal(false)
      } catch (error) {
        console.error(error)
      } finally {
=======
  const createPost= async (title, content)=> {
    if(program && publicKey){
      setTransactionPending(true)
      try{
        const [userPda] = await findProgramAddressSync([utf8.encode('user'), publicKey.toBuffer()], program.programId)
        const[postPda]=  findProgramAddressSync([utf8.encode('post'),publicKey.toBuffer(), 
        Uint8Array.from([lastPostId])], program.programId)
        await program.methods
        .createPost(title, content)
        .accounts({
          postAccount: postPda,
          userAccount: userPda,
          authority: publicKey,
          systemProgram: SystemProgram.programId,
        })
        .rpc()

        setShowModal(false)

      } catch(err){
        console.log(err)
      } finally{
>>>>>>> cli-starter
        setTransactionPending(false)
      }
    }
  }

  return (
    <BlogContext.Provider
      value={{
        user,
<<<<<<< HEAD
        posts,
        initialized,
        initUser,
        createPost,
        showModal,
        setShowModal,
=======
        initialized,
        initUser,
        showModal,
        setShowModal,
        createPost,
        posts


>>>>>>> cli-starter
      }}
    >
      {children}
    </BlogContext.Provider>
  );
};
