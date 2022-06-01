import React from 'react'
import { ChakraProvider, Button, Select } from '@chakra-ui/react'
import { ChevronDownIcon } from '@chakra-ui/icons'

const App = () => (
  <ChakraProvider resetCSS>
    <Select icon={<ChevronDownIcon />} variant="outline" size="md" />
    <Button variant="solid" size="md">
      Execute Query
    </Button>
  </ChakraProvider>
)

export default App