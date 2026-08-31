"use client"

import { useEffect, useState } from "react"
import { useAuthStore } from "./store"
import { supabase } from "./supabase"

export const useAuth = () => {
  const { user, setUser, isLoading, setIsLoading } = useAuthStore()

  useEffect(() => {
    setIsLoading(true)

    // Get current user
    const getUser = async () => {
      const {
        data: { user: authUser },
      } = await supabase.auth.getUser()

      if (authUser) {
        // Fetch user profile from database
        const { data: profile } = await supabase
          .from("users")
          .select("*")
          .eq("id", authUser.id)
          .single()

        setUser(profile)
      } else {
        setUser(null)
      }

      setIsLoading(false)
    }

    getUser()

    // Subscribe to auth changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (session?.user) {
        const { data: profile } = await supabase
          .from("users")
          .select("*")
          .eq("id", session.user.id)
          .single()

        setUser(profile)
      } else {
        setUser(null)
      }
    })

    return () => {
      subscription?.unsubscribe()
    }
  }, [setUser, setIsLoading])

  return { user, isLoading }
}

export const useLocalStorage = <T,>(key: string, initialValue: T) => {
  const [storedValue, setStoredValue] = useState<T>(initialValue)

  useEffect(() => {
    try {
      const item =
        typeof window !== "undefined" ? window.localStorage.getItem(key) : null
      if (item) {
        setStoredValue(JSON.parse(item))
      }
    } catch (error) {
      console.error(error)
    }
  }, [key])

  const setValue = (value: T | ((val: T) => T)) => {
    try {
      const valueToStore =
        value instanceof Function ? value(storedValue) : value
      setStoredValue(valueToStore)
      if (typeof window !== "undefined") {
        window.localStorage.setItem(key, JSON.stringify(valueToStore))
      }
    } catch (error) {
      console.error(error)
    }
  }

  return [storedValue, setValue] as const
}
