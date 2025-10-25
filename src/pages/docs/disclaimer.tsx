import { Box, Container, Text, VStack } from '@chakra-ui/react'

import { colors } from '@/theme/cssVariables'

export default function DisclaimerPage() {
  return (
    <Box display="flex" justifyContent="center">
      <Container maxW="6xl" my={[2, 10]} px={0}>
        <VStack spacing={[2, 10]} maxW="4xl" mx="auto">
          <Text fontSize={['2xl', '4xl']} textAlign="center" color={colors.textPrimary} fontWeight="bold" mb={4}>
            Disclaimer
          </Text>
          <VStack
            p={[6, 16]}
            bg={colors.backgroundDark}
            borderRadius="lg"
            fontSize="base"
            color={colors.textTertiary}
            boxShadow="md"
            spacing={['2', '4']}
          >
            <Text fontSize={{ base: 'sm', md: 'md' }} lineHeight={1.625}>
              This website-hosted user interface (this “Interface”) is an open-source frontend software portal to the Sherex Protocol, a
              decentralized and community-driven collection of blockchain-enabled smart contracts, trading tools, and liquidity systems (the
              “Sherex Protocol”). This Interface and the Sherex Protocol are made available by the Sherex Foundation; however, all
              transactions conducted through the protocol are executed by related permissionless smart contracts. As the Interface is
              open-sourced and the Sherex Protocol and its related smart contracts are accessible by any user, entity, or third party, there
              may exist a number of independent third-party web and mobile interfaces that allow interaction with the Sherex Protocol.
            </Text>
            <Text fontSize={{ base: 'sm', md: 'md' }} lineHeight={1.625}>
              THIS INTERFACE AND THE SHEREX PROTOCOL ARE PROVIDED “AS IS”, AT YOUR OWN RISK, AND WITHOUT WARRANTIES OF ANY KIND. The Sherex
              Foundation does not own, operate, or control the Sherex Protocol or any transactions conducted through the protocol or related
              smart contracts. By using or accessing this Interface or the Sherex Protocol and its related smart contracts, you agree that
              no developer or entity involved in creating, deploying, or maintaining this Interface or the Sherex Protocol shall be liable
              for any claims or damages whatsoever arising from your use, inability to use, or interaction with other users of this
              Interface or the Sherex Protocol, including any direct, indirect, incidental, special, exemplary, punitive, or consequential
              damages, or any loss of profits, digital assets, tokens, or other items of value.
            </Text>
            <Text fontSize={{ base: 'sm', md: 'md' }} lineHeight={1.625}>
              The Sherex Protocol is not available to residents of Belarus, the Central African Republic, the Democratic Republic of Congo,
              the Democratic People's Republic of Korea, the Crimea, Donetsk People's Republic, and Luhansk People's Republic regions of
              Ukraine, Cuba, Iran, Libya, Somalia, Sudan, South Sudan, Syria, the United States of America, Yemen, Zimbabwe, and any other
              jurisdiction where accessing or using the Sherex Protocol is prohibited (the “Prohibited Jurisdictions”).
            </Text>
            <Text fontSize={{ base: 'sm', md: 'md' }} lineHeight={1.625}>
              By using or accessing this Interface, the Sherex Protocol, or related smart contracts, you represent and warrant that you are
              not located in, incorporated or established in, or a citizen or resident of the Prohibited Jurisdictions. You further
              represent that you are not subject to sanctions or otherwise listed on any restricted, denied, or prohibited persons lists
              maintained by the United States Department of Treasury’s Office of Foreign Assets Control (OFAC), the United Nations Security
              Council, the European Union or its Member States, or any other governmental authority.
            </Text>
          </VStack>
        </VStack>
      </Container>
    </Box>
  )
}

export async function getStaticProps() {
  return {
    props: { title: 'Disclaimer' }
  }
}
