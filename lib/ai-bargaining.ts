export function processUserOffer(
  userOffer: number,
  currentPrice: number,
  floorPrice: number
): { accepted: boolean; message: string; newPrice?: number } {
  if (userOffer >= currentPrice) {
    return {
      accepted: false,
      message: `Namaste ji 🙏 Yeh toh already best price hai aapke liye! ₹${currentPrice} mein le lijiye, bahut accha deal hai.`,
    }
  }

  if (userOffer >= currentPrice * 0.92) {
    return {
      accepted: true,
      message: `Ji bilkul! 😊 Aapke liye special price maan liya. ₹${userOffer} final. Bahut badhiya choice hai aapki!`,
      newPrice: userOffer,
    }
  }

  if (userOffer >= currentPrice * 0.85) {
    const newPrice = Math.ceil((userOffer + currentPrice) / 2)
    return {
      accepted: false,
      message: `Aapke liye main try karta hoon ji. ₹${newPrice} tak de sakta hoon. Kya yeh theek rahega?`,
      newPrice,
    }
  }

  if (userOffer >= currentPrice * 0.75) {
    const newPrice = Math.ceil(currentPrice * 0.88)
    return {
      accepted: false,
      message: `Namaste ji, thoda aur sochiye. Main aapke liye ₹${newPrice} tak jaa sakta hoon. Bahut accha product hai yeh.`,
      newPrice,
    }
  }

  return {
    accepted: false,
    message: `Ji, yeh offer thoda kam hai. Minimum ₹${Math.ceil(currentPrice * 0.82)} se shuru kijiye. Main aapki madad karunga.`,
  }
}

export function calculateFloorPrice(sellingPrice: number): number {
  return Math.ceil(sellingPrice * 0.72)
}
