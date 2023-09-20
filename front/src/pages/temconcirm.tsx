// import { useNavigate } from "react-router-dom";
// import React, { useState, useEffect } from "react";
// import styles from "./StudentTalking.module.css";
// import SpeechRecognition, {
//   useSpeechRecognition,
// } from "react-speech-recognition";
// import { Configuration, OpenAIApi } from "openai";
// import TTSsentence from "../Common/TTSsentence";
// import axios from "axios";

// export default function StudentTalking() {
//   // 음성인식 관련
//   const { transcript, listening, resetTranscript } = useSpeechRecognition();
//   const [generatedText, setGeneratedText] = useState("");
//   const [allConversations, setallConversations] = useState("");
//   const [diaryEntry, setDiaryEntry] = useState("");
//   // TTS 관련
//   const [count, setCount] = useState(0);
//   const [msg, setMsg] = useState(null);
//   // 이미지 생성 관련
//   const [img, setImg] = useState(null);

//   const navigate = useNavigate();

//   const REST_API_KY = "89ae5201fafea456b3499642e2253100";

//   const ttsMaker = async (msg, timer) => {
//     return new Promise((resolve) => {
//       setTimeout(() => {
//         setMsg(msg);
//         resolve();
//       }, timer);
//     });
//   };

//   const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

//   useEffect(() => {
//     async function makeRequest(data) {
//       await delay(1000);

//       ttsMaker(data, 0);
//       await delay(data.length * 210);
//       ttsMaker("", 0);

//       SpeechRecognition.startListening();
//       // SpeechRecognition.startListening({ continuous: true });
//       await delay(6000); // 7.5초 -> 6초로 줄임
//       SpeechRecognition.stopListening();
//       // resetTranscript();

//       setCount(count + 1);
//     }

//     if (count === 0) {
//       makeRequest("오늘은 무엇을 하셨나요?");
//     } else if (count === 1) {
//       helpGpt(transcript);
//     } else if (count === 2) {
//       makeRequest(generatedText);
//     } else if (count === 3) {
//       helpGpt(transcript);
//     } else if (count === 4) {
//       makeRequest(generatedText);
//     } else if (count === 5) {
//       generateDiary(transcript);
//     } else {
//       ttsMaker("일기를 생성중입니다.", 0);
//       makeImg();
//     }
//   }, [count]);

//   const helpGpt = async (message) => {
//     console.log("사용자 : " + message);

//     const apiKey = "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";

//     const configuration = new Configuration({
//       apiKey: apiKey,
//     });
//     const openai = new OpenAIApi(configuration);

//     const response = await openai.createChatCompletion({
//       model: "gpt-3.5-turbo",
//       messages: [
//         {
//           role: "system",
//           content:
//             "You are a helpful assistant. Whenever the user shares a statement or sentiment, ask a relevant and engaging question in response, using Korean honorifics (존댓말).",
//         },
//         {
//           role: "user",
//           content: `${message}`,
//         },
//       ],
//     });

//     const generatedMessage = response.data.choices[0].message.content;
//     setGeneratedText(generatedMessage);
//     setallConversations(
//       allConversations + message + ".\n" + generatedMessage + ".\n"
//     );
//     console.log(allConversations);
//     setCount(count + 1);
//     console.log("gpt : " + generatedMessage);
//   };

//   const generateDiary = async (message) => {
//     console.log("사용자 : " + message);

//     setallConversations(allConversations + message + ".\n");

//     const apiKey = "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";

//     const configuration = new Configuration({
//       apiKey: apiKey,
//     });
//     const openai = new OpenAIApi(configuration);

//     const response = await openai.createChatCompletion({
//       model: "gpt-3.5-turbo",
//       messages: [
//         {
//           role: "system",
//           content:
//             "You are a helpful assistant. Based on the provided user statements, generate a diary in Korean entry in 4 sentences and within 150 characters, written as if by a 70-year-old elderly person. The tone should remain positive and optimistic.",
//         },
//         {
//           role: "user",
//           content: allConversations + message + ". ",
//         },
//       ],
//     });

//     setDiaryEntry(response.data.choices[0].message.content);
//     setCount(count + 1);
//   };

//   const makeImg = async () => {
//     const apiKey = "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";

//     const configuration = new Configuration({
//       apiKey: apiKey,
//     });
//     const openai = new OpenAIApi(configuration);

//     const response = await openai.createChatCompletion({
//       model: "gpt-3.5-turbo",
//       messages: [
//         {
//           role: "system",
//           content:
//             "Translate the following into English and summarize it in under 200 characters.",
//         },
//         {
//           role: "user",
//           content: diaryEntry,
//         },
//       ],
//     });

//     let translatedDiary = response.data.choices[0].message.content;
//     if (translatedDiary.length > 200) {
//       translatedDiary = translatedDiary.substring(0, 201) + "...";
//     }
//     const prompt =
//       "drawing done with a pencil, only scenery, in color " + translatedDiary;
//     createImage(prompt);
//   };

//   const createImage = (prompt) => {
//     console.log(prompt);
//     console.log("호출됨");
//     fetch("https://api.kakaobrain.com/v2/inference/karlo/t2i", {
//       method: "POST",
//       headers: {
//         Authorization: `KakaoAK ${REST_API_KY}`,
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify({
//         prompt: prompt.substr(0, Math.min(250, prompt.length)),
//       }),
//     })
//       .then((response) => response.json())
//       .then((data) => {
//         console.log(data);
//         setImg(data.images[0].image);
//       })
//       .catch((error) => {
//         console.error(error);
//       });
//   };

//   useEffect(() => {
//     async function saveDiary() {
//       await axios
//         .post(`https://i9e206.p.ssafy.io/api/v1/diaries`, {
//           content: diaryEntry,
//           imageUrl: img,
//         })
//         .then(() => {
//           navigate("/diary", { state: { diaryEntry, img } });
//         });
//     }

//     if (img !== null) {
//       saveDiary();
//     }
//   }, [img]);

//   return (
//     <div className={styles.main}>
//       <div className={styles.square}>
//         <div className={styles.theme}>
//           <div className={styles.microphone}>
//             <h1 className={styles.generatedMessage}>오늘은 무엇을 하셨나요?</h1>
//             {/*
//             {allConversations.split(".\n").map((conversation, index) => (
//               index % 2 === 1 && (
//                 <div
//                 key={index}
//                 className={styles.generatedMessage}
//                 >
//                   {conversation}
//                 </div>
//               )
//               ))} */}

//             {allConversations.split(".\n").map((conversation, index) => (
//               <div
//                 key={index}
//                 className={
//                   index % 2 === 0 ? styles.userMessage : styles.generatedMessage
//                 }
//               >
//                 {conversation}
//               </div>
//             ))}

//             <p className={styles.volume}>{listening ? "🔊" : "🔇"}</p>
//             {/* <p className={styles.userMessage}>{transcript}</p> */}
//             {/* {img && <img src={img}></img>} */}
//             {allConversations.split(".\n").length === 6 && (
//               <div className={styles.diaryMessage}>"일기를 생성중입니다."</div>
//             )}

//             {msg && <TTSsentence message={msg} />}

//             {/* {diaryEntry && <p>{diaryEntry}</p>} */}
//             <div></div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }
import React from "react";

const temconcirm = () => {
  return <div>temconcirm</div>;
};

export default temconcirm;
