import { supabase } from "./supabase"

export async function signUp(
  email: string,
  password: string,
  name: string
): Promise<any> {
  try {
    // Sign up with Supabase Auth
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          name,
        },
      },
    })

    if (error) throw error

    if (data.user) {
      // Create user profile
      const { error: profileError } = await supabase.from("users").insert({
        id: data.user.id,
        email,
        name,
        role: "customer",
        referral_code: `REF_${Math.random().toString(36).substring(7).toUpperCase()}`,
      })

      if (profileError) throw profileError
    }

    return data
  } catch (error: any) {
    throw new Error(error.message || "Sign up failed")
  }
}

export async function signIn(
  email: string,
  password: string
): Promise<any> {
  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    if (error) throw error

    return data
  } catch (error: any) {
    throw new Error(error.message || "Sign in failed")
  }
}

export async function signOut(): Promise<void> {
  try {
    const { error } = await supabase.auth.signOut()
    if (error) throw error
  } catch (error: any) {
    throw new Error(error.message || "Sign out failed")
  }
}

export async function getCurrentUser(): Promise<any> {
  try {
    const { data } = await supabase.auth.getUser()
    return data.user
  } catch (error: any) {
    throw new Error(error.message || "Failed to get current user")
  }
}

export async function getUserProfile(userId: string): Promise<any> {
  try {
    const { data, error } = await supabase
      .from("users")
      .select("*")
      .eq("id", userId)
      .single()

    if (error) throw error
    return data
  } catch (error: any) {
    throw new Error(error.message || "Failed to get user profile")
  }
}

export async function updateUserProfile(
  userId: string,
  updates: any
): Promise<any> {
  try {
    const { data, error } = await supabase
      .from("users")
      .update(updates)
      .eq("id", userId)
      .select()
      .single()

    if (error) throw error
    return data
  } catch (error: any) {
    throw new Error(error.message || "Failed to update profile")
  }
}
