import Lottie from "lottie-react"
// import lottieData from "../../assets/lottie/invalid.json"
import lottieData from "../../assets/lottie/loading.json"

function LottieFailed() {
  return (
    <Lottie animationData={lottieData} style={{ width: 200, height: 200 }} />
  )
}

export default LottieFailed
