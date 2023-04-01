// Write a class which encapsulates the logic for simulating gravity on a dom element, with a render function which updates its position.
class GravityElement {
  element: HTMLElement
  top: number
  left: number
  velocity = 0

  constructor(element: HTMLElement) {
    this.element = element
    this.top = element.offsetTop
    this.left = element.offsetLeft

    this.element.style.left = this.left + "px"
    this.element.style.top = this.top + "px"
    this.element.style.position = "absolute"
  }

  render() {
    const windowSize = { width: window.innerWidth, height: window.innerHeight }

    // Update the element's velocity. Make it bounce off the bottom of the page.
    this.velocity += 0.5
    if (this.top + this.velocity > windowSize.height - this.element.offsetHeight) {
      this.velocity *= - 0.8
    }

    // Launch the element upward if it is below the bottom of the page.
    if (this.top > windowSize.height - this.element.offsetHeight) {
      this.velocity = - 15
    }

    // Update the element's position.
    this.top += this.velocity
    this.element.style.top = this.top + "px"
  }
}

// Write a function which takes an array of dom elements and simulates gravity on them, pulling them to the bottom of the page.
export function simulateGravity(elements: HTMLElement[]) {
  const gravityElements = elements.map((element) => new GravityElement(element))

  // Render the elements
  function render() {
    gravityElements.forEach((gravityElement) => gravityElement.render())
    requestAnimationFrame(render)
  }

  render()
}
