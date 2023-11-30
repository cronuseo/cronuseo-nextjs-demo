import React from 'react'
import IssueList from './issue_list'
import { getServerSession } from "next-auth";
import { redirect } from 'next/navigation';
import { options } from '../api/auth/[...nextauth]/options';
import { Box, Button, Flex, Link } from '@radix-ui/themes';
import { PlusIcon } from '@radix-ui/react-icons'
import Check, { CheckRequest } from '@/cronuseo/check';


const getIssues = async () => {
    const res = await fetch('http://localhost:5051/issues', { method: 'GET' });
    return res.json()
}

const Issues = async () => {
    const session = await getServerSession(options);
    if (!session) {
        redirect("/api/auth/signin?callbackUrl=/")
    }
    const checkReq : CheckRequest = {
        resource: "issues",
        action: "GET",
      }
    const allow = await Check(checkReq)

    const checkPOSTReq : CheckRequest = {
        resource: "issues",
        action: "POST",
      }
    const allowPOST = await Check(checkPOSTReq)

    const checkDELETEReq : CheckRequest = {
        resource: "issues",
        action: "POST",
      }
    const allowDELETE = await Check(checkDELETEReq)

    var issues;
    var permit;
    if (allow) {
        issues =  await getIssues()
        permit = {
            allow: true
        }
    } else {
        issues = []
        permit = {
            allow: false,
            message: "You are not permitted to view issues"
        }
    }
    var deletePermit;
    if (allowDELETE) {
        deletePermit = {
            allow: true
        }
    } else {
        deletePermit = {
            allow: false,
            message: "You are not permitted to delete issues"
        }
    }
    return (
        <div>
            <Flex direction="column" gap="4">
                {allowPOST ? (                <Box px="9" pt="4" style={{
                    flexGrow: 1,
                    display: 'flex',
                    justifyContent: 'end',
                    alignItems: 'center',
                }}>
                    <Link href="/issues/create">
                        <Button variant="soft">
                            <PlusIcon/>
                            Add Issue
                            </Button>
                    </Link>
                </Box>) : null}

                <Box>
                    <IssueList issues={issues} getPermit={permit} deletePermit={deletePermit}/>
                </Box>
            </Flex>
        </div>
    )
}

export default Issues
