import React, { useEffect, useRef } from 'react'
import { useState } from 'react';
export default function useSocket() {

    const [socket, setSocket] = useState(null);
    const [message, setMessage] = useState(null);
    const [connected, setConnected] = useState(false);

    useEffect(() => {
        let retryTimeout;
        let ws;
        let isActive = true;
        function connect() {

            if (!isActive) return;

            console.log('📶 trying to connect to the Web Socket');
            ws = new WebSocket(import.meta.env.VITE_SOCKET);

            ws.onopen = (e) => {
                if (!isActive) {
                    ws.close();
                    return;
                }
                console.log('✅ connected to the web Socket')
                setSocket(ws);
                setConnected(true);
            }

            ws.onmessage = (message) => {
                if (!isActive) return;
                setMessage(JSON.parse(message.data));
            }

            ws.onclose = (e) => {

                console.log('🔴connection was closed');

                if (!isActive) return;

                console.log('🔁 trying to connect again in 3 second');

                setSocket(null);

                setConnected(false);

                retryTimeout = setTimeout(connect, 3000);
            }

            ws.onerror = (err) => {
                if (!isActive) return;
                console.log(err);
            };
        }
        connect();

        return () => {
            isActive = false;
            if (retryTimeout) clearTimeout(retryTimeout);
        }

    }, [])

    return { connected, socket, message };
}
