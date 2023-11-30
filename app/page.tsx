import { Flex, Button, Link, Box } from '@radix-ui/themes'
import { getServerSession } from "next-auth";
import { redirect } from 'next/navigation';
import { options } from './api/auth/[...nextauth]/options';

const Home = async () => {
  const session = await getServerSession(options);
  if (!session) {
    redirect("/api/auth/signin?callbackUrl=/")
  }
  return (

    <Box style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100%', width: '100%'
    }}>
      <Flex justify="center">
        <Link href="/issues">
          <Button size="2" variant="soft">
            View issues
          </Button>
        </Link>
      </Flex>
    </Box>
  )
}

export default Home
