import { Product } from "./types"

/**
 * AI Bargaining Engine
 * Rule-based initially, can be replaced with OpenAI GPT-4o-mini
 */

interface BargainResponse {
  status: "accepted" | "rejected" | "counter"
  message: string
  finalPrice?: number
}

export const calculateFloorPrice = (price: number): number => {
  // Floor price is 70% of the listed price
  return Math.round(price * 0.7)
}

export const processUserOffer = (
  userOffer: number,
  originalPrice: number,
  floorPrice: number
): BargainResponse => {
  // If user offer is above or equal to floor price, accept
  if (userOffer >= floorPrice) {
    return {
      status: "accepted",
      message: "Theek hai bhaiya! Yeh price maan gaya. Order kar de abb.",
      finalPrice: userOffer,
    }
  }

  // If user offer is too low (less than 60% of floor price), reject
  if (userOffer < floorPrice * 0.6) {
    return {
      status: "rejected",
      message:
        "Nahi ho payega bhaiya, itna kam nahi ho sakta. Aur kam price dede jo samajh mein aaye.",
    }
  }

  // Counter offer: average between user offer and floor price
  const counterPrice = Math.round((userOffer + floorPrice) / 2)
  return {
    status: "counter",
    message: `Bhav toh achha hai, par itna possible nahi. Dekh ₹${counterPrice} mein deal kar ja?`,
    finalPrice: counterPrice,
  }
}

/**
 * AI Bargaining with OpenAI (Optional)
 * Requires OPENAI_API_KEY environment variable
 */
export const processOfferWithOpenAI = async (
  userOffer: number,
  originalPrice: number,
  floorPrice: number,
  product: Product,
  conversationHistory: Array<{ role: string; content: string }>
): Promise<BargainResponse> => {
  const apiKey = process.env.OPENAI_API_KEY

  if (!apiKey) {
    // Fallback to rule-based logic
    return processUserOffer(userOffer, originalPrice, floorPrice)
  }

  try {
    const systemPrompt = `You are "Bhaiya Ji", a friendly Indian street vendor character selling products online. 
Your personality:
- Speak in a mix of Hindi, English, and Hinglish (Hindi + English blend)
- Be charming, persuasive, but also firm on your floor price
- Use casual Indian expressions like "Bhaiya", "Dekh", "Theek hai", "Nahi ho payega"
- Be fun and engaging, make jokes occasionally
- The product is: ${product.name}
- Original price: ₹${originalPrice}
- Your minimum price (floor price): ₹${floorPrice}
- Customer's offer: ₹${userOffer}

Rules for you:
1. If offer >= floor price: Accept enthusiastically with message like "Theek hai! Deal pakka!"
2. If offer < floor_price * 0.6: Reject firmly but kindly, suggest they offer higher
3. Else: Counter with a price between their offer and your floor price
4. Always respond in 1-2 sentences max
5. Respond in Hinglish/Hindi
6. Do NOT mention exact floor price to customer, just say "this is minimum I can go"

Customer's current offer: ₹${userOffer}`

    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        messages: [
          {
            role: "system",
            content: systemPrompt,
          },
          ...conversationHistory.map((msg) => ({
            role: msg.role as "user" | "assistant",
            content: msg.content,
          })),
          {
            role: "user",
            content: `My offer is ₹${userOffer}`,
          },
        ],
        max_tokens: 100,
        temperature: 0.7,
      }),
    })

    const data = await response.json()
    const aiMessage =
      data.choices[0]?.message?.content || "Something went wrong, try again."

    // Determine status based on offer amount
    let status: "accepted" | "rejected" | "counter"
    let finalPrice: number | undefined

    if (userOffer >= floorPrice) {
      status = "accepted"
      finalPrice = userOffer
    } else if (userOffer < floorPrice * 0.6) {
      status = "rejected"
    } else {
      status = "counter"
      finalPrice = Math.round((userOffer + floorPrice) / 2)
    }

    return {
      status,
      message: aiMessage,
      finalPrice,
    }
  } catch (error) {
    console.error("OpenAI API Error:", error)
    // Fallback to rule-based logic
    return processUserOffer(userOffer, originalPrice, floorPrice)
  }
}

/**
 * Generate shareable "Bargain Win" card image
 * Uses html-to-image library for client-side image generation
 */
export const generateBargainWinCard = async (
  productName: string,
  originalPrice: number,
  finalPrice: number,
  savedAmount: number
) => {
  const htmlContent = `
    <div style="
      width: 600px;
      height: 800px;
      background: linear-gradient(135deg, #FF9933 0%, #2874F0 50%, #388E3C 100%);
      padding: 40px;
      color: white;
      font-family: Poppins, sans-serif;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      text-align: center;
    ">
      <div style="font-size: 48px; margin-bottom: 20px;">🎉</div>
      <div style="font-size: 32px; font-weight: bold; margin-bottom: 30px;">
        Bargain Win!
      </div>
      <div style="
        background: rgba(255, 255, 255, 0.1);
        padding: 30px;
        border-radius: 15px;
        margin-bottom: 30px;
        backdrop-filter: blur(10px);
      ">
        <div style="font-size: 20px; margin-bottom: 15px;">${productName}</div>
        <div style="display: flex; justify-content: space-around; margin-bottom: 20px;">
          <div>
            <div style="font-size: 14px; opacity: 0.8;">Original Price</div>
            <div style="font-size: 24px; font-weight: bold; text-decoration: line-through;">
              ₹${originalPrice}
            </div>
          </div>
          <div>
            <div style="font-size: 14px; opacity: 0.8;">Your Price</div>
            <div style="font-size: 28px; font-weight: bold; color: #FFD700;">
              ₹${finalPrice}
            </div>
          </div>
        </div>
        <div style="
          background: rgba(255, 215, 0, 0.2);
          padding: 15px;
          border-radius: 10px;
          border: 2px solid #FFD700;
        ">
          <div style="font-size: 12px; opacity: 0.8;">You Saved</div>
          <div style="font-size: 28px; font-weight: bold; color: #FFD700;">
            ₹${savedAmount}
          </div>
        </div>
      </div>
      <div style="
        font-size: 24px;
        font-weight: bold;
        margin-bottom: 20px;
      ">SmartBazaar</div>
      <div style="font-size: 14px; opacity: 0.9;">
        The Art of Smart Shopping
      </div>
    </div>
  `

  return htmlContent
}
