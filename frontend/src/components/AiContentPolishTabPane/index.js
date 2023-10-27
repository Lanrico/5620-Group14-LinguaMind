import { HighlightOutlined } from "@ant-design/icons"
import { Button, Input, Select, message } from "antd"
import axios from "axios"
import { useCallback, useState } from "react"

const AiContentPolishTabPane = () => {
    const [inputText, setInputText] = useState('')

    const [loading, setLoading] = useState(false)

    const [paraphrasedText, setParaphrasedText] = useState('')

    const handleParaphrase = useCallback(async () => {
        if (!inputText) {
            message.error("Please input the text to be polished")
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
                        {"role": "user", "content": `Hello! Can you paraphrase and polish the following text?`},
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
        <div style={{ display: 'flex', flexDirection: 'row' }}>
        <div style={{ flex: 1, marginRight: '16px', minWidth: '50%', minHeight: '70%' }}>
            <div style={{ fontSize: 14, margin: '8px 0 4px' }}>Text to be polished</div>
            <Input.TextArea onChange={e => {
                setInputText(e.target.value)
            }} />
    
            <Button icon={<HighlightOutlined />} type="primary" style={{ marginTop: 8 }} loading={loading} onClick={handleParaphrase}>
                Polish
            </Button>
        </div>
    
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