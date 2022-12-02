import { MouseEvent } from "react"
import "./keyboard.css"
import state from "../assets/globalState"

export default function Keyboard(props: any) {
    function keyDownEvent(event: MouseEvent): void {
        const el = event.target as HTMLSpanElement
        if (el.tagName === "SPAN") {
            const id = el.id as string
            if (!id) {
                props.getKey(el.innerText)
            } else {
                props.getKey(state[id as keyof typeof state])
            }
        }
    }

    return <div className="keyboard" onClick={keyDownEvent}>
        <div>
            <span>Q</span>
            <span>W</span>
            <span>E</span>
            <span>R</span>
            <span>T</span>
            <span>Y</span>
            <span>U</span>
            <span>I</span>
            <span>O</span>
            <span>P</span>
            <span id="BACK">BACK</span>
        </div>
        <div>
            <span>A</span>
            <span>S</span>
            <span>D</span>
            <span>F</span>
            <span>G</span>
            <span>H</span>
            <span>J</span>
            <span>K</span>
            <span>L</span>
        </div>
        <div>
            <span>Z</span>
            <span>X</span>
            <span>C</span>
            <span>V</span>
            <span>B</span>
            <span>N</span>
            <span>M</span>
            <span id="ENTER">ENTER</span>
        </div>
    </div>
}