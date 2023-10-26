import { MailOutlined } from "@ant-design/icons"
import { Button, Input, Select, message } from "antd"
import axios from "axios"
import { useCallback, useState } from "react"

const AiEmailTabPane = () => {
    const [inputText, setInputText] = useState('')

    const [loading, setLoading] = useState(false)

    const [emailText, setEmailText] = useState('')

    const handleParaphrase = useCallback(async () => {
        if (!inputText) {
            message.error("Please input your email purpose and key messages")
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
                        {"role": "user", "content": `Hello! Can you generate a formal email based on the following information?`},
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

            setEmailText(resp.data.choices[0].message.content)
        } catch(err) {
            console.error(err)
            message.error('Email generation failed: ' + err.message || 'unknown error occurred')
        } finally {
            setLoading(false)
        }
    }, [inputText])

    return (
        <div>
            <div style={{ fontSize: 14, margin: '8px 0 4px' }}>Type in your email purpose and key messages:</div>
            <Input.TextArea onChange={e => {
                setInputText(e.target.value)
            }} />

            <Button icon={<MailOutlined />} type="primary" style={{ marginTop: 8 }} loading={loading} onClick={handleParaphrase}>Generate Email</Button>

            {!loading && emailText && (
                <div>
                    <div style={{ fontSize: 14, margin: '16px 0 8px' }}>Formal Email</div>
                    <div style={{ borderLeft: '4px solid lightgrey', paddingLeft: 8 }}>{emailText}</div>
                </div>
            )}
        </div>
    )
}

export default AiEmailTabPane