import { TranslationOutlined } from "@ant-design/icons"
import { Button, Input, Select, message } from "antd"
import axios from "axios"
import { useCallback, useState } from "react"

const AiContentPolishTabPane = () => {
    const [inputText, setInputText] = useState('')

    const [loading, setLoading] = useState(false)

    const [paraphrasedText, setParaphrasedText] = useState('')

    const handleParaphrase = useCallback(async () => {
        if (!inputText) {
            message.error("Please input the text to be paraphrased")
            return
        }

        setLoading(true)

        try {
            const resp = await axios({
                url: 'https://api.openai.com/v1/chat/completions',
                method: 'POST',
                data: {
                    "model": "gpt-3.5-turbo-16k",
                    "messages": [
                        {"role": "user", "content": `Hello! Can you paraphrase the following text?`},
                        {"role": "user", "content": inputText}
                    ],
                    "temperature": 1.0
                },
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer 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'
                }
            })

            if (resp.status !== 200) {
                throw new Error("invalid http status code. expect 200, received " + resp.status)
            }

            if (!resp.data?.choices?.[0]?.message?.content) {
                throw new Error("invalid response received")
            }

            setParaphrasedText(resp.data.choices[0].message.content)
        } catch(err) {
            console.error(err)
            message.error('Paraphrasing failed: ' + err.message || 'unknown error occurred')
        } finally {
            setLoading(false)
        }
    }, [inputText])

    return (
        <div>
            <div style={{ fontSize: 14, margin: '8px 0 4px' }}>Text to be paraphrased</div>
            <Input.TextArea onChange={e => {
                setInputText(e.target.value)
            }} />

            <Button icon={<TranslationOutlined />} type="primary" style={{ marginTop: 8 }} loading={loading} onClick={handleParaphrase}>Paraphrase</Button>

            {!loading && paraphrasedText && (
                <div>
                    <div style={{ fontSize: 14, margin: '16px 0 8px' }}>Paraphrased text</div>
                    <div style={{ borderLeft: '4px solid lightgrey', paddingLeft: 8 }}>{paraphrasedText}</div>
                </div>
            )}
        </div>
    )
}

export default AiContentPolishTabPane