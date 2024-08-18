import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { RouterProvider } from 'react-router-dom'
import router from './router/routes.tsx'
import { ChakraProvider } from '@chakra-ui/react'
import theme from './theme.ts'
import { HelmetProvider } from 'react-helmet-async'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <HelmetProvider>
      <ChakraProvider theme={theme}>
        <RouterProvider router={router}/>
      </ChakraProvider>
    </HelmetProvider>
  </StrictMode>
)
