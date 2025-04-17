import React, { useContext } from 'react'
import './Main.css'
import { assets } from '../../assets/assets'
import { Context } from '../../context/Context'
import btdIcon2 from '../../assets/btd_icon2.png';

const Main = () => {

    const {onSent, recentPrompt, setRecentPrompt, setPrevPrompts, prevPrompts, showResult, loading, resultData, input, setInput} = useContext(Context)

  return (
    <div className='main'>
      <div className="nav">
        <p>Gemini</p>
        <img src={btdIcon2} alt="BTD Icon 2" />
      </div>
        <div className="main-container">

            {!showResult
            ?<>
                <div className="greet">
                <p><span>Hello,</span></p>
                <p><span>How can I help you today?</span></p>
            </div>
            <div className="cards">
                <div className="card">
                    <p>Suggest beautiful places to see on an upcoming road trip.</p>
                    <img src={assets.compass_icon} alt="" />
                </div>
                <div className="card">
                    <p>Briefly summarize this concept: Urban Planning.</p>
                    <img src={assets.bulb_icon} alt="" />
                </div>
                <div className="card">
                    <p>Brainstorm team bonding activities for our work retreat.</p>
                    <img src={assets.message_icon} alt="" />
                </div>
                <div className="card">
                    <p>Improve the readability of the following code:</p>
                    <img src={assets.code_icon} alt="" />
                </div>
            </div>
            </>
            : <div className='result'>
                <div className="result-title">
                    <img src={assets.user_icon} alt="" />
                    <p>{recentPrompt}</p>
                </div>
                <div className="result-data">
                    <img src={assets.gemini_icon} alt="" />
                    {loading
                    ?<div className='loader'>
                        <hr />
                        <hr />
                        <hr />
                    </div>
                    :
                    <p dangerouslySetInnerHTML={{__html: resultData }}></p>
                    }
                </div>
            </div>
            }
            <div className="main-bottom">
                <div className="search-box">
                    <input onChange={(e) => setInput(e.target.value)} value={input} type="text" placeholder='Enter Prompt Here'/>
                    <div>
                        <img className='cursor-none' src={assets.gallery_icon} alt="" />
                        <img className='cursor-none' src={assets.mic_icon} alt="" />
                        {input?<img onClick={() => onSent()} className='cursor' src={assets.send_icon} alt="" />:null}
                    </div>
                </div>
                <p className="bottom-info">Gemini may display inaccurate info, including about peaople, so double check its response.</p>
            </div>
        </div>
    </div>
  )
}

export default Main
