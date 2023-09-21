import { useRef, useState } from 'react'

import axios from 'axios'
import cls from 'classnames'
import { useNavigate } from 'react-router-dom'
import Webcam from 'react-webcam'

import { StartBackgroundSvg } from '../../assets/icons/start-background-svg'
import Steps from '../../components/Steps'
import { useTransition } from '../../contexts/useTranslation'
import { useUserId } from '../../contexts/useUserId'
import styles from './styles.module.css'
import { enTexts, faTexts } from './texts'

const StartContainer = () => {
    const webcamRef = useRef<Webcam | null>(null) // Specify the correct type for webcamRef
    const navigate = useNavigate()
    const { setUserId } = useUserId()
    const [text, setText] = useState('')
    const { locale } = useTransition()
    const texts = locale === 'en' ? enTexts : faTexts

    interface Response {
        id?: number
        result?: string
        status?: string
    }

    async function capture() {
        const imageSrc = webcamRef.current?.getScreenshot()

        try {
            await axios
                .post<Response>('/recognition', { file: imageSrc })
                .then((response) => {
                    if (response.data.result === 'Recognized') {
                        setUserId(response.data.id)
                        navigate('/game')
                    } else if (response.data.result === 'Repeated') {
                        setText(texts.repeatUser)
                    } else {
                        setText(texts.noFace)
                    }
                })
                .catch((error) => console.log(error))
            console.log('Image sent to server.')
        } catch (error) {
            console.error('Error sending image to server:', error)
        }
    }

    const persianLng = cls({
        'persian-lng': locale === 'fa',
    })

    return (
        <div className={styles['start-container']}>
            <StartBackgroundSvg className={styles['background-svg']} />
            <div className={styles['content-wrapper']}>
                <p className={styles.description}>{text}</p>
                <button
                    className={cls(styles['start-button'], styles[persianLng])}
                    onClick={() => {
                        capture()
                                 navigate('/game')
                    }}
                >
                    {texts.start}
                </button>
                <Steps />
            </div>
            <div className={styles['start-webcam']}>
                <Webcam
                    screenshotFormat="image/png"
                    mirrored={true}
                    imageSmoothing={true}
                    audio={false}
                    ref={webcamRef}
                    style={{
                        position: 'absolute',
                        left: 0,
                        right: 0,
                        textAlign: 'center',
                        zIndex: 9,
                        width: 400,
                        height: 400,
                    }}
                />
            </div>
        </div>
    )
}

export default StartContainer
