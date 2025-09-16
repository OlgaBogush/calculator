class Calculator {
  constructor(prevElement, currentElement) {
    this.prevElement = prevElement
    this.currentElement = currentElement

    this.clear()
  }

  clear() {
    this._prevValue = ""
    this._currentValue = ""
    this._operation = undefined
  }

  appendNumber(number) {
    this._currentValue += number
  }

  getDisplayNumber(number) {
    return number
  }

  updateDisplay() {
    this.currentElement.innerText = this.getDisplayNumber(this._currentValue)

    if (this._operation !== undefined) {
      this.prevElement.innerText = `${this.getDisplayNumber(this._prevValue)} ${
        this._operation
      }`
    } else {
      this.prevElement.innerText = ""
    }
  }

  chooseOperation(operation) {
    if (this._currentValue === "" || isNaN(this._currentValue)) return
    if (operation === "sqrt") {
      this._operation = operation
      this.calculate()
    } else {
      this._prevValue = this._currentValue
      this._currentValue = ""
      this._operation = operation
      console.log(this._operation)
    }
  }

  addSign() {
    if(this._currentValue === "") return
    this._currentValue = this._currentValue * -1
  }

  calculate() {
    let res
    switch (this._operation) {
      case "*":
        res = Number(this._prevValue * this._currentValue)
          .toString()
          .substring(0, 15)
        break
      case "/":
        res = Number(this._prevValue / this._currentValue)
          .toString()
          .substring(0, 15)
        break
      case "-":
        res = Number(this._prevValue - this._currentValue)
          .toString()
          .substring(0, 15)
        break
      case "+":
        res = Number(+this._prevValue + +this._currentValue)
          .toString()
          .substring(0, 15)
        break
      case "^":
        res = Number(this._prevValue ** this._currentValue)
          .toString()
          .substring(0, 15)
        break
      case "sqrt":
        res = Number(Math.sqrt(this._currentValue).toString().substring(0, 15))
        break
      default:
        return
    }
    this._currentValue = res
    this._prevValue = ""
    this._operation = undefined
  }
}

const numberBtns = document.querySelectorAll("[data-number]")
const operationBtns = document.querySelectorAll("[data-operation]")
const prev = document.querySelector(".prev")
const current = document.querySelector(".current")
const dataSign = document.querySelector("[data-sign]")
const equalsBtn = document.querySelector(".result")

const calculator = new Calculator(prev, current)

numberBtns.forEach((item) => {
  item.addEventListener("click", (e) => {
    const number = e.target.dataset.value
    calculator.appendNumber(number)
    calculator.updateDisplay()
  })
})

operationBtns.forEach((item) => {
  item.addEventListener("click", (e) => {
    const operation = e.target.dataset.value
    calculator.chooseOperation(operation)
    calculator.updateDisplay()
  })
})

dataSign.addEventListener("click", () => {
  calculator.addSign()
  calculator.updateDisplay()
})

equalsBtn.addEventListener("click", () => {
  calculator.calculate()
  calculator.updateDisplay()
})
