import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useMemo, useState } from "react";

/**
  Calculates the time difference between the server time and client time.
  @param {Date} serverTime - The server time.
  @param {Date} clientTime - The client time.
  @returns {string} The time difference in the format "{days} days, {hours} hours, {minutes} minutes, {seconds} seconds".
*/
const calculateTimeDifference = (server: Date, client: Date): string => {
  const time = client.getTime() - server.getTime()
  const seconds = Math.floor(time / 1000)
  const minutes = Math.floor(seconds / 60)
  const hours = Math.floor(minutes / 60)
  const days = Math.floor(hours / 24)

  const dateFormatee = days + " " + hours + ":" + minutes + ":" + seconds  ;
  return `${dateFormatee}`
};

const simpleFormatDate = (date: Date) => {
  const year = date.getFullYear();
  const month = ("0" + (date.getMonth() + 1)).slice(-2);
  const days = ("0" + date.getDate()).slice(-2);
  const hour = ("0" + date.getHours()).slice(-2);
  const minutes = ("0" + date.getMinutes()).slice(-2);

  const dateFormatee = year + "-" + month + "-" + days + " " + hour + ":" + minutes ;
  return `${dateFormatee}`
}

interface Props {
  serverTime: Date
}

export default function Home(props: Props) {
  const { serverTime } = props
  const [timeDiff, setTimeDiff] = useState("")
  const serverFormatTime = useMemo(()=>simpleFormatDate(new Date(serverTime)),[serverTime])
  useEffect(()=>{
    setInterval(()=>{
      setTimeDiff(calculateTimeDifference(new Date(serverTime), new Date(Date.now())))
    },1000)
  },[])
  const router = useRouter();
  const moveToTaskManager = () => {
    router.push("/tasks");
  }
  return (
    <>
      <Head>
        <title>Web 2 - Exam TD</title>
        <meta name="description" content="Just an exam" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <h1>The easiest exam you will ever find</h1>
        <div>
          {/* Display here the server time (DD-MM-AAAA HH:mm)*/}
          <p>
            Server time:{" "}
            <span className="serverTime">{serverFormatTime}</span>
          </p>

          {/* Display here the time difference between the server side and the client side */}
          <p>
            Time diff:{" "}
            <span className="serverTime">{timeDiff}</span>
          </p>
        </div>

        <div>
          <button onClick={moveToTaskManager}>Go to task manager</button>
        </div>
      </main>
    </>
  );
}

export async function getServerSideProps() {
  return {
    props: {
      serverTime: Date.now()
    },
  };
}
