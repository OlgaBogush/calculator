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

  delete() {
    this._currentValue = this._currentValue.slice(0, -1)
  }

  appendNumber(number) {
    if (isNaN(this._currentValue)) return
    if (this.hasCalculated) {
      this._currentValue = ""
      this.hasCalculated = false
    }
    this._currentValue += number
  }

  getDisplayNumber(number) {
    const strNum = number.toString()
    if (strNum !== "" && !isNaN(strNum)) {
      if (strNum.includes(".")) {
        return `${parseFloat(strNum.split(".")[0]).toLocaleString("ru")}.${
          strNum.split(".")[1]
        }`
      } else {
        return parseFloat(strNum).toLocaleString("ru")
      }
    }
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
    if (this._prevValue !== "") {
      this.calculate()
    }
    if (operation === "sqrt") {
      this._operation = operation
      this.calculate()
    } else {
      this._prevValue = this._currentValue
      this._currentValue = ""
      this._operation = operation
    }
  }

  addSign() {
    if (this._currentValue === "") return
    this._currentValue = this._currentValue * -1
  }

  addDecimal() {
    if (
      this._currentValue.toString().includes(".") ||
      isNaN(this._currentValue)
    ) {
      return
    }
    if (this._currentValue !== "") {
      this._currentValue = `${this._currentValue}.`
    }
    if (this._currentValue === "") {
      this._currentValue = "0."
    }
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
        if (this._currentValue < 0) {
          res = "Error"
        } else {
          res = Number(
            Math.sqrt(this._currentValue).toString().substring(0, 15)
          )
        }
        break
      default:
        return
    }
    this._currentValue = res
    this._prevValue = ""
    this._operation = undefined
    this.hasCalculated = true
  }
}

const numberBtns = document.querySelectorAll("[data-number]")
const operationBtns = document.querySelectorAll("[data-operation]")
const prev = document.querySelector(".prev")
const current = document.querySelector(".current")
const acBtn = document.querySelector("[data-ac]")
const delBtn = document.querySelector("[data-del]")
const signBtn = document.querySelector("[data-sign]")
const decimalBtn = document.querySelector("[data-decimal]")
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

acBtn.addEventListener("click", () => {
  calculator.clear()
  calculator.updateDisplay()
})

delBtn.addEventListener("click", () => {
  calculator.delete()
  calculator.updateDisplay()
})

signBtn.addEventListener("click", () => {
  calculator.addSign()
  calculator.updateDisplay()
})

decimalBtn.addEventListener("click", () => {
  calculator.addDecimal()
  calculator.updateDisplay()
})

equalsBtn.addEventListener("click", () => {
  calculator.calculate()
  calculator.updateDisplay()
})
