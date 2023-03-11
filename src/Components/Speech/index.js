import React, {useState} from 'react';
import { Predictions } from '@aws-amplify/predictions';
import MicrophoneStream from 'microphone-stream';
import { FaMicrophone, FaMicrophoneSlash} from 'react-icons/fa';
import {Buffer} from 'buffer';
window.Buffer = window.Buffer || require("buffer").Buffer;

const SpeechToText = (props) => {   
    const [response, setResponse] = useState("Press 'start recording' to begin your transcription. Press STOP recording once you finish speaking.")
  

    function AudioRecorder(props) {      
        const [recording, setRecording] = useState(false);
        const [micStream, setMicStream] = useState();
        const [audioBuffer] = useState(
          (function() {
            let buffer = [];
            function add(raw) {
              buffer = buffer.concat(...raw);
              return buffer;
            }
            function newBuffer() {
              console.log("resetting buffer");
              buffer = [];
            }
     
            return {
              reset: function() {
                newBuffer();
              },
              addData: function(raw) {
                return add(raw);
              },
              getData: function() {
                return buffer;
              }
            };
          })()
        );

      async function startRecording() {
        console.log('start recording');
        audioBuffer.reset();

        window.navigator.mediaDevices.getUserMedia({ video: false, audio: true }).then((stream) => {
            const startMic = new MicrophoneStream();

            startMic.setStream(stream);
            startMic.on('data', (chunk) => {
            var raw = MicrophoneStream.toRaw(chunk);
            if (raw == null) {
                return;
            }
            audioBuffer.addData(raw);

            });

            setRecording(true);
            setMicStream(startMic);
        });
      }
  
      async function stopRecording() {
      console.log('stop recording');
      const { finishRecording } = props;

      micStream.stop();
      setMicStream(null);
      setRecording(false);

      const resultBuffer = audioBuffer.getData();

      if (typeof finishRecording === "function") {
        finishRecording(resultBuffer);
      }

    }
  
      return (
        <div className="audioRecorder">
          <div>
            {recording && <button name="stop recording" onClick={stopRecording} className="btn btn-secondary round  recording" >
                <FaMicrophoneSlash className="famic" /> 
                </button>}
            {!recording && <button name="start recording"  onClick={startRecording} className="btn btn-secondary round white">
                <FaMicrophone className='famic'/> 
                </button>}
          </div>
        </div>
      );
    }
  
    function convertFromBuffer(bytes) {
        setResponse('Converting text...');
    
        Predictions.convert({
          transcription: {
            source: {
              bytes
            },
            // language: "en-US", // other options are "en-GB", "fr-FR", "fr-CA", "es-US"
          },
        }).then(({ transcription: { fullText } }) => setResponse(fullText))
          .catch(err => setResponse(JSON.stringify(err, null, 2)))
      }
  
    console.log("response", response);
    return (     
      <div>         
        <AudioRecorder finishRecording={convertFromBuffer} />                        
      </div>
    );
  }

  export default SpeechToText;