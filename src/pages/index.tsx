import * as React from 'react'
import { Text, Button, useToast, Box } from '@chakra-ui/react'
import { useState } from 'react'
import { BrowserProvider, Contract, Eip1193Provider, parseEther } from 'ethers'
import { useWeb3ModalProvider, useWeb3ModalAccount } from '@web3modal/ethers/react'

import { Head } from '../components/layout/Head'
import { SITE_NAME, SITE_DESCRIPTION } from '../utils/config'

export default function Home() {
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [data, setData] = useState<any>(null) // State to store fetched data

  const { walletProvider } = useWeb3ModalProvider()
  const provider: Eip1193Provider | undefined = walletProvider
  const toast = useToast()

  const fetchFromNestJson = async () => {
    setIsLoading(true)
    try {
      const response = await fetch('/api/fetch', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      })

      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`)
      }

      const data = await response.json()
      setData(data) // Store the fetched data in the state
      console.log(data)
      toast({
        title: 'Success',
        description: 'Data fetched successfully',
        status: 'success',
        duration: 5000,
        isClosable: true,
      })
    } catch (error: any) {
      toast({
        title: 'Error',
        description: error.message,
        status: 'error',
        duration: 5000,
        isClosable: true,
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <>
      <Head title={'Testing Nest.js'} description={SITE_DESCRIPTION} />
      <main>
        <Button
          colorScheme="blue"
          variant="outline"
          type="submit"
          onClick={fetchFromNestJson}
          isLoading={isLoading}
          loadingText="Fetching..."
          spinnerPlacement="end">
          Fetch
        </Button>
        {data && (
          <Box mt={4} p={4} borderWidth={1} borderRadius="md">
            <Text>ID: {data.id}</Text>
            <Text>Name: {data.name}</Text>
            <Text>Description: {data.description}</Text>
          </Box>
        )}
      </main>
    </>
  )
}
