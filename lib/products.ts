import { supabase } from "./supabase"

export async function getProducts(filters?: any) {
  try {
    let query = supabase
      .from("products")
      .select("*")
      .eq("approved", true)

    if (filters?.category) {
      query = query.eq("category", filters.category)
    }

    if (filters?.brand) {
      query = query.eq("brand", filters.brand)
    }

    if (filters?.minPrice && filters?.maxPrice) {
      query = query
        .gte("price", filters.minPrice)
        .lte("price", filters.maxPrice)
    }

    const { data, error } = await query

    if (error) throw error
    return data
  } catch (error: any) {
    throw new Error(error.message || "Failed to fetch products")
  }
}

export async function getProductById(id: string) {
  try {
    const { data, error } = await supabase
      .from("products")
      .select("*")
      .eq("id", id)
      .single()

    if (error) throw error
    return data
  } catch (error: any) {
    throw new Error(error.message || "Failed to fetch product")
  }
}

export async function createProduct(product: any) {
  try {
    const { data, error } = await supabase
      .from("products")
      .insert([product])
      .select()
      .single()

    if (error) throw error
    return data
  } catch (error: any) {
    throw new Error(error.message || "Failed to create product")
  }
}

export async function updateProduct(id: string, updates: any) {
  try {
    const { data, error } = await supabase
      .from("products")
      .update(updates)
      .eq("id", id)
      .select()
      .single()

    if (error) throw error
    return data
  } catch (error: any) {
    throw new Error(error.message || "Failed to update product")
  }
}

export async function deleteProduct(id: string) {
  try {
    const { error } = await supabase.from("products").delete().eq("id", id)

    if (error) throw error
  } catch (error: any) {
    throw new Error(error.message || "Failed to delete product")
  }
}
