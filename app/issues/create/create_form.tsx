"use client"
import { Box, Button, Flex, Text, TextArea, TextField } from '@radix-ui/themes'
import { useRouter } from 'next/navigation';
import React, { useEffect } from 'react'
import { Permit } from '../issue_list';
import { toast } from 'sonner';

type Props = {
    permit: Permit
}

const createIssue = async (title: string, description: string) => {

    const res = await fetch('http://localhost:5051/issues', {
        method: 'POST', headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ title: title, description: description })
    });
    return res.json()
}

const CreateForm = ({permit}: Props) => {
    
    useEffect(() => {
        if (!permit.allow) {
            setTimeout(() => {
                toast.error(permit.message)
              }, 100)
            
            router.replace('/')
        }
      }, [permit]);
      
    const router = useRouter()
    const [title, setTitle] = React.useState("");
    const [description, setDescription] = React.useState("");

    const onSubmit = async () => {
        await createIssue(title, description)
        router.push('/issues')
        router.refresh()
    }

    const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setTitle(event.currentTarget.value);
    };

    const handleDescriptionChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        setDescription(event.target.value);
    };

    return (
        <Box style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100%', width: '100%'
        }}>
            <Flex direction="column" justify="center" align="center" gap="6">
                <Box>
                    <Flex direction="column" gap="3" style={{ width: 400 }}>
                        <Text as="label" size="1">Issue title</Text>
                        <TextField.Input variant="soft" placeholder="title" value={title} onChange={handleTitleChange}/>
                        <Text as="label" size="1">Issue description</Text>
                        <TextArea variant="soft" placeholder="description" value={description} onChange={handleDescriptionChange} />
                    </Flex>
                </Box>
                <Box>
                    <Button size="2" variant="soft" onClick={onSubmit}>
                        Add
                    </Button>
                </Box>
            </Flex>
        </Box>
    )
}

export default CreateForm
