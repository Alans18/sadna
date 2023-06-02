import { Heading, Spacer, Button, Flex } from "@chakra-ui/react"


type HeaderProps = {
    isAdmin:boolean;
    user:{
        user_name:string;
    };
    onLogout:()=>void
}

const Header = function(props:HeaderProps){

    return <div className='home-page--header'>
    <Heading 
      as="h1" 
      fontWeight="300"
      fontSize={24}
      letterSpacing={-0.5}
    >
      <Flex alignItems={'center'}>
        <img src="/iconBlueNew.png" alt="Icon" width={120}/>
        <p>Hello   <span>{props.user?.user_name || ""}  {props.isAdmin ? " (admin user)" : "" } </span> </p>
      </Flex>
    </Heading>
    <Spacer />
    <Button  colorScheme='red' height={8} margin={'1rem'} onClick={props.onLogout}>logout</Button>
  </div>
}

export default Header