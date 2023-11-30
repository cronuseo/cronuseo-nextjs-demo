"use client"
import { Card, Flex, Avatar, Box, Text, Button, DropdownMenu } from '@radix-ui/themes'
import React, { useEffect } from 'react'
import { Issue, Permit } from '../issues/issue_list'
import { DotsHorizontalIcon } from '@radix-ui/react-icons'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'

type Props = {
    issue: Issue,
    permit: Permit
}

const deleteIssue = async (id: string) => {
    const res = await fetch(`http://localhost:5051/issues/${id}`, { method: 'DELETE' });
    return res.json()
}

const IssueCard = ({ issue, permit }: Props) => {

    const router = useRouter()
    const handleDelete = async () => {
        if (!permit.allow) {
            setTimeout(() => {
                toast.error(permit.message)
              }, 100)
            
            router.replace('/issues')
        } else {
            await deleteIssue(issue.id.toString())
            router.push('/issues')
            router.refresh()
        }
    }
    const handleEdit = async () => {
        router.push(`/issues/update/${issue.id.toString()}`)
    }
    return (
        <Card variant="surface">
            <Flex justify="between">
                <Box>
                    <Text as="div" size="2" weight="bold">
                        {issue.title}
                    </Text>
                    <Text as="div" color="gray" size="2">
                        {issue.description}
                    </Text>
                </Box>
                <Box>
                    <DropdownMenu.Root>
                        <DropdownMenu.Trigger>
                            <Button variant="ghost">
                                <DotsHorizontalIcon />
                            </Button>
                        </DropdownMenu.Trigger>
                        <DropdownMenu.Content>
                            <DropdownMenu.Item>
                                <button onClick={handleEdit}>Edit</button>
                            </DropdownMenu.Item>
                            <DropdownMenu.Item color="red">
                                <button onClick={handleDelete}>Delete</button>
                            </DropdownMenu.Item>
                        </DropdownMenu.Content>
                    </DropdownMenu.Root>
                </Box>
            </Flex>

        </Card>
    )
}

export default IssueCard
