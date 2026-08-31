/**
 * AI Bargaining Logic for SmartBazaar
 * Simulates a realistic negotiation experience with Bhaiya Ji character
 */

export function processUserOffer(
  userOffer: number,
  currentPrice: number,
  floorPrice: number
): { accepted: boolean; message: string; newPrice?: number } {
  const priceGap = currentPrice - userOffer
  const possibleDiscount = currentPrice - floorPrice
  const discountPercentage = (priceGap / currentPrice) * 100

  // If offer matches or exceeds floor price
  if (userOffer >= currentPrice) {
    return {
      accepted: false,
      message: `Oye! 😄 Tum sabse zyada chahte ho. Mujhe bhi margain karna hai! Ye price already best hai. Lelo abhi!`,
    }
  }

  // If offer is reasonable (70-85% of current price)
  if (userOffer >= currentPrice * 0.7 && userOffer < currentPrice * 0.85) {
    const newPrice = Math.ceil(userOffer + (possibleDiscount * 0.3))
    return {
      accepted: false,
      message: `Accha accha, tum samajhdar ho! 🤔 Sunno... aise kaise? ₹${newPrice} par de du? Ya iska matlab ye hai ki mujhe aur bargaining karna padega?`,
      newPrice,
    }
  }

  // If offer is within reasonable range (85-95% of current price)
  if (userOffer >= currentPrice * 0.85 && userOffer < currentPrice * 0.95) {
    const newPrice = Math.ceil(userOffer + (possibleDiscount * 0.15))
    return {
      accepted: false,
      message: `Wah! 😊 Tu to sachme khush rakhna chahta hai. Dekh, ₹${newPrice} last offer. Isse kam nahi kar sakta bhai!`,
      newPrice,
    }
  }

  // If offer is very reasonable (95-100% of current price)
  if (userOffer >= currentPrice * 0.95) {
    return {
      accepted: true,
      message: `🎉 Bilkul! Deal kar lete hain! ₹${userOffer} pe le de! Tum to sach mein smart ho!`,
      newPrice: userOffer,
    }
  }

  // If offer is too low (below 70%)
  return {
    accepted: false,
    message: `Arrey! 😤 Kya kar raha hai tu? Ye price to mera khoon pi jayega! Kam se kam ₹${Math.ceil(
      currentPrice * 0.85
    )} to de. Usske bhi kam nahi! 🙅`,
  }
}

export function calculateFloorPrice(sellingPrice: number): number {
  // Floor price is typically 60-70% of selling price
  // This ensures seller still makes a profit
  return Math.ceil(sellingPrice * 0.65)
}

export function generateBargainingResponse(
  userOffer: number,
  productName: string,
  currentPrice: number
): string {
  const responses = [
    `Bhaiya, ye ${productName} ka price bahut jyada lagta hai. Kya discount de sakte ho?`,
    `Uncle, last month to same product ${Math.ceil(
      currentPrice * 0.9
    )} mein mila tha. Ab kyu mehenga kar diya?`,
    `Dada, student hun. Thoda kam kar do na. Padhai bhi chalti rahegi!`,
    `Anpadh hoon! Discount baat sun raha hun, samajh bhi le.`,
  ]
  return responses[Math.floor(Math.random() * responses.length)]
}

export interface BargainState {
  initialPrice: number
  currentPrice: number
  userOffer: number
  rounds: number
  accepted: boolean
  totalDiscount: number
}

export function updateBargainState(
  state: BargainState,
  userOffer: number
): BargainState {
  const { accepted, newPrice } = processUserOffer(
    userOffer,
    state.currentPrice,
    calculateFloorPrice(state.currentPrice)
  )

  return {
    ...state,
    userOffer,
    rounds: state.rounds + 1,
    accepted,
    currentPrice: newPrice || state.currentPrice,
    totalDiscount: state.initialPrice - (newPrice || state.currentPrice),
  }
}
