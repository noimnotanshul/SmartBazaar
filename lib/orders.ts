import { supabase } from "./supabase"

export async function createOrder(
  userId: string,
  items: any[],
  total: number,
  address: any,
  paymentMethod: string
) {
  try {
    const { data, error } = await supabase
      .from("orders")
      .insert([
        {
          user_id: userId,
          items,
          total,
          address,
          payment_method: paymentMethod,
          status: "pending",
        },
      ])
      .select()
      .single()

    if (error) throw error
    return data
  } catch (error: any) {
    throw new Error(error.message || "Failed to create order")
  }
}

export async function getOrdersByUser(userId: string) {
  try {
    const { data, error } = await supabase
      .from("orders")
      .select("*")
      .eq("user_id", userId)
      .order("created_at", { ascending: false })

    if (error) throw error
    return data
  } catch (error: any) {
    throw new Error(error.message || "Failed to fetch orders")
  }
}

export async function getOrderById(orderId: string) {
  try {
    const { data, error } = await supabase
      .from("orders")
      .select("*")
      .eq("id", orderId)
      .single()

    if (error) throw error
    return data
  } catch (error: any) {
    throw new Error(error.message || "Failed to fetch order")
  }
}

export async function updateOrderStatus(orderId: string, status: string) {
  try {
    const { data, error } = await supabase
      .from("orders")
      .update({ status })
      .eq("id", orderId)
      .select()
      .single()

    if (error) throw error
    return data
  } catch (error: any) {
    throw new Error(error.message || "Failed to update order")
  }
}
