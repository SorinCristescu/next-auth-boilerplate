import Head from 'next/head'
import styles from '../styles/Home.module.css'
import { dbConnect, jsonify } from '@/middleware/db'
import User from '@/models/User';
import { signIn, signOut, useSession} from 'next-auth/client'


export async function getServerSideProps(context) {
  dbConnect();

  const users = await User.find({}).exec()

  return {
    props: {
      users: jsonify(users)
    }
  }
}
const Home = ({users}) => {
  const [session, loading] = useSession()

  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <header>
          {
            session ? (
            <button onClick={signOut}>Sign out</button>
            ) : (
            <button onClick={signIn}>Sign in</button>
            )
          }
          
        </header>
        <h1>Hi there!</h1>
        <h3>I'm a next.js with next-auth boilerplate</h3>
        <p className={styles.paragraph}>Welcome {users[2].firstName} {users[2].lastName}</p>
      </main>
    </div>
  )
}

export default Home