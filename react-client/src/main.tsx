import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { RouterProvider } from 'react-router-dom'
import router from './router/routes.tsx'
import { ChakraProvider } from '@chakra-ui/react'
import theme from './theme.ts'
import { HelmetProvider } from 'react-helmet-async'
import { store, StoreContext } from './stores/store.ts'
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"

const queryClient = new QueryClient()

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <StoreContext.Provider value={store}>
        <HelmetProvider>
          <ChakraProvider theme={theme}>
            <RouterProvider router={router} />
          </ChakraProvider>
        </HelmetProvider>
      </StoreContext.Provider>
    </QueryClientProvider>
  </StrictMode>
)
