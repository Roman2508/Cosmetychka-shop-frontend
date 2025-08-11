"use client"

import { Provider } from "react-redux"
import { persistor, store } from "@/store/store"
import { type PropsWithChildren, useState } from "react"
import { PersistGate } from "redux-persist/integration/react"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"

export function Providers({ children }: PropsWithChildren) {
  const [queryclient] = useState(
    new QueryClient({
      defaultOptions: {
        queries: { refetchOnWindowFocus: false },
      },
    }),
  )

  return (
    <QueryClientProvider client={queryclient}>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          {children}
        </PersistGate>
      </Provider>
    </QueryClientProvider>
  )
}
