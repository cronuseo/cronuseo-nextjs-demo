import React from 'react'
import CreateForm from './create_form'
import { Box, Flex, Button } from '@radix-ui/themes'
import Check, { CheckRequest } from '@/cronuseo/check'

const IssueCreate = async () => {

  const checkReq: CheckRequest = {
    resource: "issues",
    action: "POST",
  }
  const allow = await Check(checkReq)
  var permit;
  if (allow) {
      permit = {
          allow: true
      }
  } else {
      permit = {
          allow: false,
          message: "You are not permitted to create issues"
      }
  }
  return (

    <Box style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100%', width: '100%', backgroundColor: 'var(--gray-a2)', borderRadius: 'var(--radius-3)'
    }}>
      <Flex justify="center">
        <CreateForm permit={permit}/>
      </Flex>
    </Box>
  )
}

export default IssueCreate