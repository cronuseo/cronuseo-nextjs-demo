import React from 'react'
import CreateForm from './update_form'
import { Box, Flex, Button } from '@radix-ui/themes'
import Check, { CheckRequest } from '@/cronuseo/check';

const getIssue = async (id: string) => {
  const res = await fetch(`http://localhost:5051/issues/${id}`, { method: 'GET' });
  return res.json()
}

const IssueUpdate = async ({ params: { id } }: { params: { id: string } }) => {

  const checkReq: CheckRequest = {
    resource: "issues",
    action: "PUT",
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
          message: "You are not permitted to update issues"
      }
  }
  const issue = await getIssue(id)
  return (
    <Box style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100%', width: '100%', backgroundColor: 'var(--gray-a2)', borderRadius: 'var(--radius-3)'
    }}>
      <Flex justify="center">
        <CreateForm issue={issue} permit={permit}/>
      </Flex>
    </Box>
  )
}

export default IssueUpdate