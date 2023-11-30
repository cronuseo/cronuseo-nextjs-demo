import Link from "next/link";
import { getServerSession } from "next-auth";
import { Box, Button, Flex, Text } from "@radix-ui/themes";
import { options } from "../api/auth/[...nextauth]/options";

const Navbar = async () => {
  const session = await getServerSession(options);

  return (
    <Flex gap="3" direction="row" justify="between" align="center">
      <Text size="5" weight="bold">Issues Manager</Text>
      <Box>
        <div>
          {session ? (
            <Link href="/api/auth/signout?callbackUrl=/">
              <Button>Logout</Button>
            </Link>
          ) : (
            <div>
              <Link href="/api/auth/signin">
                <Button>Sign In</Button>
              </Link>
            </div>
          )}
        </div>
      </Box>
    </Flex>
  );
};

export default Navbar;
