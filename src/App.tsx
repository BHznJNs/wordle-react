import React from "react"
import "./App.css"
import state from "./assets/globalState"
import SeeAnswer from "./components/seeAnswer"
import Keyboard from "./components/keyboard"
import wordData from "./assets/word.json"

function checkWord(word: string) {
    return wordData.includes(word)
}

const targetWord: string = wordData[Math.round(Math.random() * 12972)]
console.log(targetWord)

class App extends React.Component {
    posX: number
    posY: number
    state: Readonly<{
        charStates:   Array<Array<number>>,
        currentWords: Array<Array<string>>,
    }>
    constructor(props: any) {
        super(props);

        this.posX = 0;
        this.posY = 0;

        this.state = {
            charStates: [
                [0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0],
            ],
            currentWords: [
                ["","","","",""],
                ["","","","",""],
                ["","","","",""],
                ["","","","",""],
                ["","","","",""],
            ],
        }
    }
    componentDidMount(): void {
        window.onkeydown = (e: KeyboardEvent) => {
            console.log(e.key)
            const asciiCode = e.key.charCodeAt(0)
            if (97 <= asciiCode && asciiCode <= 122) {
                this.getKey(e.key.toUpperCase())
            } else if (e.key === "Enter") {
                this.getKey(state["ENTER"])
            } else if (e.key === "Backspace") {
                this.getKey(state["BACK"])
            }
        }
    }

    getKey(key: string | number): void {
        const {posY, posX} = this

        if (typeof key === "string") {
            this.state.currentWords[posY][(posX > 4 ? 4 : posX)] = key
            this.posX = (posX < 5 ? posX + 1 : 5)
            this.setState({currentWords: this.state.currentWords})
        } else if (key === state.BACK) {
            this.state.currentWords[posY][posX - 1] = ""
            this.setState({currentWords: this.state.currentWords})
            this.posX = (posX > 0 ? posX - 1 : 0)
        } else if (key === state.ENTER) {
            if (this.posX != 5) {
                alert("Inputed word is too short")
                return
            }

            const currentLine: Array<string> = this.state.currentWords[this.posY]
            const currentLineWord: string = currentLine.join("")
            if (!checkWord(currentLineWord.toLowerCase())) {
                alert("Invalid word")
                return
            }

            for (let index in currentLine) {
                const char = currentLine[index].toLowerCase()
                if (char === targetWord[index]) {
                    // char is in right position
                    this.state.charStates[posY][index] = state.charStatesMap.rightPos
                } else if (targetWord.includes(char)) {
                    // char exist
                    this.state.charStates[posY][index] = state.charStatesMap.exist
                } else {
                    // char is not found
                    this.state.charStates[posY][index] = state.charStatesMap.notFound
                }
                this.setState({charStates: this.state.charStates})
            }

            if (currentLineWord.toLowerCase() === targetWord) {
                alert("You win!")
                return
            }
            this.posX = 0
            this.posY += 1
        }
    }

    render(): React.ReactNode {
        return (<>
            <SeeAnswer answer={targetWord}></SeeAnswer>
            <div className="user-input">
            {
                this.state.currentWords.map((line, index) => {
                    return (
                        <div key={index}>
                            {
                                line.map((item, __index) => {
                                    const stateID = this.state.charStates[index][__index]
                                    const stateClass = state.charStates[stateID]
                                    return (<span
                                        className={ stateClass }
                                        key={index*10 + __index}
                                    > { item }
                                    </span>)
                                })
                            }
                        </div>
                    )
                })
            }
            </div>
            <Keyboard getKey={ this.getKey.bind(this) }></Keyboard>
        </>)
    }
}

export default App