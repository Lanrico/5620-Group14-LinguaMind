import { TranslationOutlined } from "@ant-design/icons"
import { Button, Input, Select, message } from "antd"
import axios from "axios"
import { useCallback, useState } from "react"

const AiTranslationTabPane = () => {
    const [inputText, setInputText] = useState('')

    const [targetLang, setTargetLang] = useState('English')
    const [loading, setLoading] = useState(false)

    const [translatedText, setTranslatedText] = useState('')

    const handleTranslate = useCallback(async () => {
        if (!targetLang || !inputText) {
            message.error("Please input both target language and text to be translated")
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
                        {"role": "user", "content": `Hello! Can you translate the following text to ${targetLang}?`},
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

            setTranslatedText(resp.data.choices[0].message.content)
        } catch(err) {
            console.error(err)
            message.error('Translation failed: ' + err.message || 'unknown error occurred')
        } finally {
            setLoading(false)
        }
    }, [inputText, targetLang])

    return (
        <div>
            <div style={{ fontSize: 14, marginBottom: 4 }}>Target language</div>
            <Select defaultValue={targetLang} options={[
                { label: 'Korean', value: 'Korean' },
                { label: 'Chinese', value: 'Chinese' },
                { label: 'Japanese', value: 'Japanese' },
                { label: 'English', value: 'English' }
            ]} onChange={v => {
                setTargetLang(v)
            }}></Select>

            <div style={{ fontSize: 14, margin: '8px 0 4px' }}>Text to be translated</div>
            <Input.TextArea onChange={e => {
                setInputText(e.target.value)
            }} />

            <Button icon={<TranslationOutlined />} type="primary" style={{ marginTop: 8 }} loading={loading} onClick={handleTranslate}>Translate</Button>

            {!loading && translatedText && (
                <div>
                    <div style={{ fontSize: 14, margin: '16px 0 8px' }}>Translated text</div>
                    <div style={{ borderLeft: '4px solid lightgrey', paddingLeft: 8 }}>{translatedText}</div>
                </div>
            )}
        </div>
    )
}

export default AiTranslationTabPane