export function rotate3d(x: number, y: number, z: number, theta: number, phi: number) {
  const sinTheta = Math.sin(theta)
  const cosTheta = Math.cos(theta)
  const sinPhi = Math.sin(phi)
  const cosPhi = Math.cos(phi)
  const xPrime = x * cosTheta + y * sinTheta
  const yPrime = - x * sinTheta * cosPhi + y * cosTheta * cosPhi + z * sinPhi
  const zPrime = x * sinTheta * sinPhi - y * cosTheta * sinPhi + z * cosPhi
  return [ xPrime, yPrime, zPrime ]
}
