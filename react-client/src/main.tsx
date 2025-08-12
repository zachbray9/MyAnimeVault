import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { RouterProvider } from 'react-router-dom'
import router from './router/routes.tsx'
import { HelmetProvider } from 'react-helmet-async'
import { store, StoreContext } from './stores/store.ts'
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { Provider } from './components/ui/provider.tsx'

const queryClient = new QueryClient()

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <StoreContext.Provider value={store}>
        <HelmetProvider>
          <Provider>
            <RouterProvider router={router} />
          </Provider>
        </HelmetProvider>
      </StoreContext.Provider>
    </QueryClientProvider>
  </StrictMode>
)
