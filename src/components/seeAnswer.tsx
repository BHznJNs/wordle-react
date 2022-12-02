import "./seeAnswer.css"

export default function seeAnswer(props: any) {
    return (
    <button
        onClick={() => {alert(props.answer)}}
        className="see-answer"
    >Click here to get answer
    </button>)
}