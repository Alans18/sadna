import { setSessionStorage } from "@/lib/session-storage"
import { Box, Heading, VStack, Image, Card, Stack, FormControl, FormLabel, Input, Text, Button, CardBody, Center } from "@chakra-ui/react"
import { Tenor_Sans } from "next/font/google"
import { Router, useRouter } from "next/router"
import React  from "react"

const Login = function(){

    const emailRef = React.useRef<any>()
    const authKeyRef = React.useRef<any>()
    const [error,setError] = React.useState("")
    const router = useRouter()

    const onFormSubmit =async function(e:React.FormEvent<HTMLFormElement>){
        e.preventDefault()
            try {
                setError('')
                const res  =   await fetch("/api/auth",{
                    method:"POST",
                    body:JSON.stringify({
                        email:emailRef.current.value,
                        authKey:authKeyRef.current.value
                    })
                })
                const data = await res.json()
                if(!res.ok){
                    throw data.message
                }

                setSessionStorage("user",data)
                router.push("/")
            } catch (error:any) {
            // show warning in the client
             setError(error)
            }

    }

    return(
        <Box>
            <VStack as="header" spacing="6" m="8">
                {/* add logo for money mate */}
                <Heading 
                    as="h1" 
                    fontWeight="300"
                    fontSize={24}
                    letterSpacing={-0.5}
                >
                    Sign in to MoneyMate
                </Heading>
            </VStack>
            <Stack spacing="4">
                <Center>
                    <Card 
                        bg='#f6f8fa'
                        variant="outline"
                        border="1px"
                        borderColor="black"
                        maxW="308px"
                    >
                        <CardBody>
                            <form onSubmit={onFormSubmit}>
                                <Stack spacing="4">
                                    <FormControl>
                                        <FormLabel size="sm">Enter email address</FormLabel>
                                        <Input 
                                        variant={"outline"}
                                            ref={emailRef} 
                                            id="email" 
                                            type="email"  
                                            //defaultValue="Noam@test.com" 
                                            required 
                                            bg="white" 
                                            borderColor='#d8dee4'
                                            size="sm" 
                                            borderRadius="6px"
                                        />
                                    </FormControl>
                                    <FormControl>
                                        <FormLabel size="sm">Enter Validation string</FormLabel>
                                        <Input 
                                            ref={authKeyRef} 
                                            id="auth" 
                                            type="string" 
                                            //defaultValue="24283" 
                                            required
                                            bg="white" 
                                            borderColor='#d8dee4' 
                                            size="sm" 
                                            borderRadius="6px"
                                        />
                                    </FormControl>
                                    <Button 
                                        type= "submit"
                                        colorScheme="telegram"
                                        size="sm" 
                                        _hover={{bg: "#003FBC"}} 
                                        _active={{bg: "darkblue"}}
                                    >
                                        Login
                                    </Button>
                                </Stack>
                                {/* Errors */}
                                <p style={{color:"red"}}>  {error}</p>
                            </form>
                        </CardBody>
                    </Card>
                </Center>
                <Card>
                    <CardBody>
                        <Center>
                            <Text fontSize="sm">© Sadna Project 2023</Text>
                        </Center>
                    </CardBody>
                </Card>
            </Stack>
        </Box>
    )
}



export default Login