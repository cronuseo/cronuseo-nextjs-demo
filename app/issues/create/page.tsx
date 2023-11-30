import React from 'react'
import CreateForm from './create_form'
import { Box, Flex, Button } from '@radix-ui/themes'

const IssueCreate = async () => {
  return (

    <Box style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100%', width: '100%', backgroundColor: 'var(--gray-a2)', borderRadius: 'var(--radius-3)'
    }}>
      <Flex justify="center">
        <CreateForm />
      </Flex>
    </Box>
  )
}

export default IssueCreate