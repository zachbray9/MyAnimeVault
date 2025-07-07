import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { RouterProvider } from 'react-router-dom'
import router from './router/routes.tsx'
import { ChakraProvider, PortalManager } from '@chakra-ui/react'
import theme from './theme.ts'
import { HelmetProvider } from 'react-helmet-async'
import { store, StoreContext } from './stores/store.ts'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <StoreContext.Provider value={store}>
      <HelmetProvider>
        <ChakraProvider theme={theme}>
          <PortalManager zIndex={9999}>
            <RouterProvider router={router}/>
          </PortalManager>
        </ChakraProvider>
      </HelmetProvider>
    </StoreContext.Provider>
  </StrictMode>
)
