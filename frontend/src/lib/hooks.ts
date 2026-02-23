import { useState, useEffect, useRef } from "react";

interface SSEOptions {
    url: string,
    onMessage: (data: any) => void,
}

export function useSSE({url, onMessage}: SSEOptions) {
  const [isConnected, setIsConnected] = useState<boolean>(false);
  const onMessageRef = useRef(onMessage);
  // Assign incoming function to useRef instance. 
  useEffect(() => {
    onMessageRef.current = onMessage;
  }, [onMessage])
  //
  useEffect(() => {
    const es = new EventSource(url);
    
    es.onopen = () => {
        setIsConnected(true);
        console.log(`Connected to SSE, url: ${url}`);
    }

    es.onmessage = (event: MessageEvent) => {
        onMessageRef.current(JSON.parse(event.data));
    }

    es.onerror = (event: Event) => {
      let message = `Error connecting to SSE, url: ${url}'`;
      setIsConnected(false);

      if(event instanceof MessageEvent) {
        message = `Error connecting to SSE, url: ${url}, error: ${event.data}`;
      }
      
      console.error(message, event);
    }

    return () => {
        es.close();
        console.log(`Disconnected from SSE, url: ${url}`);
    }

  }, [url])

  return { isConnected }
}