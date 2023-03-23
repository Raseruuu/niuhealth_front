import Lottie from "lottie-react"
// import lottieData from "../../assets/lottie/invalid.json"
import lottieData from "../../assets/lottie/ring-loading.json"

function RingLoading({size=160}) {
  return (
    <Lottie animationData={lottieData} style={{ width: size, height: size }} />
  )
}



export default RingLoading
