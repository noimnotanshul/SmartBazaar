/**
 * AI Bargaining Logic for SmartBazaar
 * Simulates a respectful negotiation experience with Bhaiya Ji character
 */

export function processUserOffer(
  userOffer: number,
  currentPrice: number,
  floorPrice: number
): { accepted: boolean; message: string; newPrice?: number } {
  const possibleDiscount = currentPrice - floorPrice

  // If offer is more than or equal to the listed price — politely decline the excess
  if (userOffer >= currentPrice) {
    return {
      accepted: true,
      message: `Arre nahi ji, itna zyada dene ki koi zaroorat nahi hai! 😊 Aapki niyat achhi hai, lekin hum aapse extra nahi lenge. Actual price ₹${currentPrice} hi sahi hai — isi mein deal fix karte hain!`,
      newPrice: currentPrice,
    }
  }

  // If offer is reasonable (70-85% of current price)
  if (userOffer >= currentPrice * 0.7 && userOffer < currentPrice * 0.85) {
    const newPrice = Math.ceil(userOffer + possibleDiscount * 0.3)
    return {
      accepted: false,
      message: `Aapne accha offer diya hai ji 🤔 Lekin thoda aur badhaiye. Main ₹${newPrice} tak de sakta hoon — isse kam mushkil hai. Bataiye, theek hai?`,
      newPrice,
    }
  }

  // If offer is within reasonable range (85-95% of current price)
  if (userOffer >= currentPrice * 0.85 && userOffer < currentPrice * 0.95) {
    const newPrice = Math.ceil(userOffer + possibleDiscount * 0.15)
    return {
      accepted: false,
      message: `Wah, aap to sahi mol-bhaav karte hain! 😊 Chaliye ₹${newPrice} final kar dete hain — isse neeche mushkil hai bhai sahab.`,
      newPrice,
    }
  }

  // If offer is very reasonable (95-100% of current price)
  if (userOffer >= currentPrice * 0.95) {
    return {
      accepted: true,
      message: `🎉 Bilkul theek hai ji! ₹${userOffer} mein deal pakki! Aapse dobara business karna acha lagega.`,
      newPrice: userOffer,
    }
  }

  // If offer is too low (below 70%)
  return {
    accepted: false,
    message: `Arre ji, itne mein to lagat bhi nahi nikalti! 🙏 Thoda samjhiye, kam se kam ₹${Math.ceil(
      currentPrice * 0.85
    )} to deni hi padegi. Isse kam mushkil hoga.`,
  }
}

export function calculateFloorPrice(sellingPrice: number): number {
  // Floor price is typically 65% of selling price
  return Math.ceil(sellingPrice * 0.65)
}

export function extractOfferFromText(message: string): number | null {
  // Extracts the first number found in a free-text message
  const match = message.replace(/,/g, "").match(/\d+/)
  return match ? parseInt(match[0]) : null
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
