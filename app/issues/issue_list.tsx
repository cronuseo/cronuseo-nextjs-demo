"use client"
import { Box, Callout, Flex, Table } from '@radix-ui/themes';
import React, { useEffect } from 'react'
import IssueCard from '../components/issue_card';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';

export type Issue = {
    id: number;
    title: string;
    description:string;
};

export type Permit = {
    allow: boolean;
    message?: string
};

type Props = {
    issues: Issue[],
    getPermit: Permit,
    deletePermit: Permit
}

const IssueList = ({issues, getPermit, deletePermit}: Props) => {

    const router = useRouter()
    useEffect(() => {
        if (!getPermit.allow) {
            setTimeout(() => {
                toast.error(getPermit.message)
              }, 100)
            
            router.replace('/')
        }
      }, [getPermit]);

    return (
        <Box width="100%" height="max-content" px="9">
            <Flex direction="column" gap="3">
                {issues?.map((issue: Issue) => (
                    <IssueCard issue={issue} permit={deletePermit} key={issue.id}/>
                ))}
            </Flex>
            {issues?.length === 0 && getPermit.allow && (
                <Callout.Root>
                <Callout.Text>
                  There are no issues!
                </Callout.Text>
              </Callout.Root>
            )}
        </Box>
    )
}

export default IssueList
